import { where, Op } from "sequelize";
import { Variable } from "../models/index.js"; 
import { sequelize } from "../server/db.js";

export const getAll = async (req, res) => {
    try{
        const variables = await Variable.findAll();
        res.status(200).json({variables});
    } catch (error) {
        console.error("Error fetching variables: ", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export const getById = async (req, res) => {
    try {
        const variable = await Variable.findByPk(req.params.id);
        if(!variable){
            res.status(404).json({message: "Variable not found"});
        }
        res.status(200).json({variable});
    } catch (error){
        console.error("Error fetching variable: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const create = async (req, res) => {
    try {
        const {name, unit} = req.body;

        if (!name || !unit){
            return res.status(400).json({
                message: "Name and unit required"
            });
        }

        const existingVariable = await Variable.findOne({
            where: {
                name: {
                    [Op.iLike]: name
                }
            }
        });

        if (existingVariable) {
            return res.status(409).json({ 
                message: "Variable already exists",
                existingVariable
            })    
        } 

        const newVariable = await Variable.create({
            name: name.trim(),
            unit: unit.trim()
        })

        res.status(201).json({
            message: "Variable created successfully",
            data: newVariable
        });
         
    } catch (error){
        console.error({"Error creating variables": error});
        res.status(500).json({message: "Internal server error"});
    }
}

export const update = async (req, res) => {
    try {
        const variable = await Variable.findByPk(req.params.id);

        if (!variable) {
            return res.status(404).json({ message: "Variable not found" });
        }

        const { name, unit } = req.body;

        if (!name && !unit) {
            return res.status(400).json({
                message: "Include at least one piece of information"
            });
        }

        if(name) {
            const existingVariable = await Variable.findOne({
                    where: {
                        name: sequelize.where(
                            sequelize.fn('LOWER', sequelize.col('name')),
                            'LIKE', `%${name.toLowerCase()}%`
                        ),
                        id: { [Op.ne]: req.params.id }
                    }
                });

            if(existingVariable){
                return res.status(409).json({
                    message: "Variable name already exists",
                    existingVariable
                })
            }

            variable.name = name
        }

        if (unit) variable.unit = unit;

        await variable.save();

        res.status(200).json({
            message: "Variable updated successfully",
            variable
        });

    } catch (error) {
        console.error("Error updating variable:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const destory = async (req, res) => {
    try {
        const variable = await Variable.findByPk(req.params.id);

        if(!variable){
            return res.status(404).json({ message: "Variable not found"});
        }

        await variable.destroy();

        res.status(200).json({message: "Variable deleted successfully"});

    } catch (error) {
        console.error("Error deleting variable");
        res.status(500).json({ message: "Internal server error"});
    }
}