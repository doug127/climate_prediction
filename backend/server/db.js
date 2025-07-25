import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,  
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host:  'localhost',
    dialect: 'postgres',
    port:  5432,
    logging: false,
  }
);