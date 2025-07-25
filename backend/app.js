import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  sensorRouter, 
  equipmentRouter, 
  valueRouter,
  variableRouter
} from './routes/index.js';

// Configuración inicial
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/sensor', sensorRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/value', valueRouter);
app.use('/api/variable', variableRouter);

try {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Server error:', error);
}