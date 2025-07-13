import { DataTypes } from "sequelize";
import { sequelize } from "../server/db.js";
import { Moment } from "./Moment.js";
import { Medition } from "./Medition.js";

export const Value = sequelize.define("Value", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false,
        required: true,
    },
    meditionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: Medition,
            key: 'id'
        }
    },
    momentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: Moment,
            key: 'id'
        }
    },
},
{
    tableName: 'values'
}
)