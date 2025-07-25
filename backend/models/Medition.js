import {DataTypes} from 'sequelize';
import {sequelize} from '../server/db.js';
import {Sensor} from './Sensor.js';
import {Variable} from './Variable.js';

export const Medition = sequelize.define('Medition', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        required: true,
    },
    frequency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
    },
    sensorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: Sensor,
            key: 'id'
        }
    },
},
{
    tableName: 'meditions',
}
)