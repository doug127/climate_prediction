import {Sensor, Equipment, Variable} from '../models/index.js';

export const getAll = async (req, res) => {
  try {
    const sensors = await Sensor.findAll({
      include: [
        { model: Equipment, attributes: ['serial'] },
        { model: Variable, attributes: ['name', 'unit'] }
      ]
    });
    res.json({
        message: 'Sensors retrieved successfully',
        total: sensors.length,
        data: sensors.map(sensor => ({
          id: sensor.id,
          serial: sensor.Equipment.serial,
          name: sensor.name,
          variable: {
            name: sensor.Variable.name,
            unit: sensor.Variable.unit
          }
        }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}   

export const paginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Sensor.findAndCountAll({
            include: [
                { model: Equipment, attributes: ['serial'] },
                { model: Variable, attributes: ['name', 'unit'] }
            ],
            limit,
            offset,
            order: [['id', 'ASC']]
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            message: 'Sensors retrieved successfully',
            total: count,
            page,
            totalPages,
            data: rows.map(sensor => ({
                id: sensor.id,
                serial: sensor.Equipment.serial,
                name: sensor.name,
                variable: {
                    name: sensor.Variable.name,
                    unit: sensor.Variable.unit
                }
            }))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getById = async (req, res) => {
    
    const { id } = req.params;
    
    try {
        const sensor = await Sensor.findByPk(id, {
            include: [
                { model: Equipment, attributes: ['serial'] },
                { model: Variable, attributes: ['name', 'unit'] }
            ]
        });
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }
        res.json({
            message: 'Sensor retrieved successfully',
            data: {
                id: sensor.id,
                serial: sensor.Equipment.serial,
                name: sensor.name,
                variable: {
                    name: sensor.Variable.name,
                    unit: sensor.Variable.unit
                }
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const create = async (req, res) => {
    const {name, code, variableId, equipmentId} = req.body;
    try {
        const equipment = await Equipment.findOne({ where: { id: equipmentId } });

        if (!equipment) {
            return res.status(404).json({ message: `Equipment not found` });
        }
        
        const variable = await Variable.findByPk(variableId);
        
        if (!variable) {
            return res.status(404).json({ message: `Variable not found` });
        }

        const sensor = await Sensor.create({
            name,
            code,
            variableId,
            equipmentId
        });
        res.status(201).json({
            message: 'Sensor created successfully',
            data: sensor
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error creating sensor',
            error: error.message 
        });
    }
}

// Method PATCH
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, variableId, equipmentId } = req.body;

        const sensor = await Sensor.findByPk(id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }

        if (equipmentId) {
            const equipment = await Equipment.findOne({ where: { id: equipmentId } });
            if (!equipment) {
                return res.status(404).json({ message: 'Equipment not found' });
            }
        }

        if (variableId) {
            const variable = await Variable.findByPk(variableId);
            if (!variable) {
                return res.status(404).json({ message: 'Variable not found' });
            }
        }

        sensor.name = name || sensor.name;
        sensor.code = code || sensor.code;
        sensor.variableId = variableId || sensor.variableId;
        sensor.equipmentId = equipmentId || sensor.equipmentId;

        await sensor.save();

        res.json({
            message: 'Sensor updated successfully',
            data: sensor
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        const sensor = await Sensor.findByPk(id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }
        await sensor.destroy();
        res.json({ message: 'Sensor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}