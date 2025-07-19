import {Equipment} from "../models/index.js";
import {where, Op} from "sequelize";
import { sequelize } from "../server/db.js";


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
        const {serial} = req.body;

        if(!serial) {
            return res.status(400).json({ message: "Serial required" }); 
        }

        const existingSerial = await Equipment.findOne({
            where: {
                serial: {
                    [Op.iLike]: serial 
                }
            }   
        });

        if(existingSerial){
            return res.status(409).json({
                message: "Serial already exists",
                existingSerial
            })
        }

        const newEquipment = await Equipment.create({ serial: serial.trim() });

        res.status(201).json({
            message: "Equipment register successfully",
            newEquipment
        });
        
    } catch (error) {
        console.error("Error creating equipment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const update = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);

        if (!equipment){
            return res.status(404).json({ message: "Equipment not found" });
        } 

        const {serial} = req.body;

        if(!serial) {
            return res.status(400).json({ message: "Serial required" }); 
        }

        const existingSerial = await Equipment.findOne({
            where: {
                serial: {
                    [Op.iLike]: serial
                },
                id: { [Op.ne]: req.params.id }
            }
        });

        if(existingSerial){
            return res.status(409).json({
                message: "Serial already exists",
                existingSerial
            })
        }

        await equipment.update(req.body);
        res.status(200).json({
            message: "Equipment updated successfully",
            equipment
        });

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
