import { DataTypes } from "sequelize";
import { sequelize } from "../server/db.js";
import {Equipment} from './Equipment.js';
import {Variable} from './Variable.js';

export const Sensor = sequelize.define("Sensor", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    code: {
        type: DataTypes.CHAR(4),
        allowNull: false,
        required: true,
        unique: true,
    },
    equipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: Equipment,
            key: 'id'
        }         
    },
    variableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: Variable,
            key: 'id'
        }         
    }
},
{
    tableName: 'sensors'
}
)