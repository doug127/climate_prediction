import { DataTypes } from "sequelize";
import { sequelize } from "../server/db.js";

export const Moment = sequelize.define("Moment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hour: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
},
{
    tableName: 'moments'
}
)