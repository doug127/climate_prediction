import {Equipment} from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const equipments = await Equipment.findAll();
    res.status(200).json(equipments);
  } catch (error) {
    console.error("Error fetching equipments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getById = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }
        res.status(200).json(equipment);
    } catch (error) {
        console.error("Error fetching equipment:", error);
        res.status(500).json({ message: "Internal server error" });     
    }
};

export const paginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const { count, rows } = await Equipment.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']]
        });
        const totalPages = Math.ceil(count / limit);

        res.status(200).json({ total: count, page, totalPages, equipments: rows });
    } catch (error) {
        console.error("Error fetching paginated equipments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const create = async (req, res) => {
    try {
        const newEquipment = await Equipment.create(req.body);
        res.status(201).json(newEquipment);
    } catch (error) {
        console.error("Error creating equipment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const update = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }
        await equipment.update(req.body);
        res.status(200).json(equipment);
    } catch (error) {
        console.error("Error updating equipment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const destroy = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }
        await equipment.destroy();
        res.status(200).json({ message: "Equipment deleted successfully" });
    } catch (error) {
        console.error("Error deleting equipment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
