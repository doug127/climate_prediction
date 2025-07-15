import {Sensor, Value, Moment, Medition} from '../models/index.js'; 
import { getWeatherData } from '../services/meteostat.js';
import {sequelize} from '../server/db.js'; 
import { Op } from 'sequelize';

export const insertMeteostatData = async (req, res) => {
    try {
        const { station, start, end } = req.query;
        const {frequency} = req.body;
        console.log(req.body);
        console.log(frequency);
        const response = await getWeatherData(station, start, end);
        const data = response.data;

        const moment = await Moment.findOne({ where: { hour: "18:00" } });
        if (!moment) {
            return res.status(404).json({ message: 'Moment not found' });
        }

        const momentId = moment.id;

        for (const record of data){
            const date = record.date.split(' ')[0];

            for (const [code, value] of Object.entries(record)){
                if (['date', 'snow', 'wpgt', 'tsun'].includes(code)) continue;
                if (value === null || value === undefined) continue;

                const sensor = await Sensor.findOne({ where: { code } });
                if(!sensor) continue;

                const medition = await Medition.create({
                    date,
                    frequency,
                    sensorId: sensor.id,
                });

                await Value.create({
                    value,
                    momentId, 
                    meditionId: medition.id,
                })
            }
        }
        res.status(200).json({ message: 'Values processed successfully' });
    } catch (error) {
        console.error('Error processing values:', error);
        res.status(500).json({ message: error.message });
    }
}

export const paginated = async (req, res) => {
    const limitPerSensor = parseInt(req.query.limit) || 5;

    try {
        const sensors = await Sensor.findAll();

        const results = [];

        for (const sensor of sensors) {
            const meditions = await Medition.findAll({
                where: { sensorId: sensor.id },
                include: [
                {
                    model: Value,
                    include: [{ model: Moment, attributes: ['hour'] }]
                }
                ],
                order: [['date', 'ASC']],
                limit: limitPerSensor 
            });

            const sensorValues = [];
            for (const medition of meditions) {
                for (const value of medition.Values) {
                if (sensorValues.length >= limitPerSensor) break;
                sensorValues.push({
                    value: value.value,
                    moment: value.Moment?.hour || 'N/A',
                });
                }
                if (sensorValues.length >= limitPerSensor) break;
            }

            results.push({
                sensor: sensor.name,
                code: sensor.code,
                values: sensorValues
            });
        }

        res.status(200).json({
        message: 'Values grouped by sensor retrieved successfully',
        data: results
        });
    } catch (error) {
        console.error('Error retrieving values:', error);
        res.status(500).json({ message: error.message });
    }
}

export const createValue = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { sensorId, date, frequency, values } = req.body;
    const createdValues = [];
    const skippedValues = [];
    let hasDuplicates = false;

    if (!sensorId || !date || frequency === undefined || !Array.isArray(values)) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Missing required fields or invalid data format' });
    }

    const dateNow = new Date();
    const today = dateNow.toISOString().split('T')[0];

    const inputDate = new Date(date).toISOString().split('T')[0];
    if (inputDate > today){
      await transaction.rollback();
      return res.status(400).json({ message: 'Date cannot be in the future' });
    } 

    const sensor = await Sensor.findByPk(sensorId);
    if (!sensor) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Sensor not found' });
    }

    if (values.length > frequency) {
      await transaction.rollback();
      return res.status(400).json({
        message: `Number of values (${values.length}) exceeds frequency (${frequency})`
      });
    }

    const [medition] = await Medition.findOrCreate({
      where: { sensorId, date },
      defaults: { frequency, sensorId, date }
    });

    for (const entry of values) {
      const { momentId, value } = entry;

      if (momentId === undefined || value === undefined) {
        skippedValues.push({ ...entry, reason: 'Missing momentId or value' });
        hasDuplicates = true;
        continue;
      }

      const moment = await Moment.findByPk(momentId, { transaction });
      if (!moment) {
        hasDuplicates = true;
        skippedValues.push({ ...entry, reason: 'Moment not found' });
        continue;
      }

      // Verificar que no exista valor duplicado (fecha+sensor+momento)
      const existingValue = await Value.findOne({
        include: [{
          model: Medition,
          where: { sensorId, date }
        }],
        where: { momentId },
        transaction
      });

      if (existingValue) {
        skippedValues.push({ ...entry, reason: 'Duplicate value for this moment and date' });
        hasDuplicates = true;
        continue;
      }
    }

    if (hasDuplicates) {
      await transaction.rollback();
      return res.status(400).json({
        message: 'Duplicate values found',
        skippedValues
      });
    }

    for (const entry of values) {
      const { momentId, value } = entry;

      const newValue = await Value.create({
        value,
        momentId,
        meditionId: medition.id
      }, { transaction });

      createdValues.push(newValue);
    }

    await transaction.commit();

    return res.status(201).json({
      message: 'Values processed',
      inserted: createdValues.length,
      skipped: skippedValues.length,
      createdValues,
      skippedValues
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};
