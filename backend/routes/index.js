import express from 'express'
import sensorRouter from './sensor.routes.js';
import equipmentRouter from './equipment.routes.js';
import valueRouter from './value.routes.js';
import variableRouter from './variable.routes.js'

const routes = express.Router();

routes.use('/sensor', sensorRouter);
routes.use('/equipment', equipmentRouter);
routes.use('/value', valueRouter);
routes.use('/variable', variableRouter);

export default routes;