import {Sensor, Value, Moment, Medition} from '../models/index.js'; 
import { getWeatherData } from '../services/meteostat.js'; 

export const insertMeteostatData = async (req, res) => {
    try {
        const { station, start, end } = req.query;
        const response = await getWeatherData(station, start, end);
        const data = response.data;

        const moment = await Moment.findOne({ where: { hour: "00:18" } });
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
                    // frequency: 1, 
                    sensorId: sensor.id,
                    variableId: sensor.variableId,
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
        // Buscar mediciones de ese sensor
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
                id: value.id,
                value: value.value,
                moment: value.Moment?.hour || 'N/A',
                sensorName: sensor.name
            });
            }
            if (sensorValues.length >= limitPerSensor) break;
        }

        results.push({
            sensor: sensor.name,
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

