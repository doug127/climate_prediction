import { DataTypes } from "sequelize";
import { sequelize } from "../server/db.js";

export const Equipment = sequelize.define("Equipment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    serial: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true,
    },
    
},
{
    tableName: "equipment",
}
)