import express from 'express';
import equipmentRouter from './equipment.routes.js';
import metaS from './value.routes.js'
const routes =  express.Router();

routes.use('/equpment', equipmentRouter);
routes.use('/meta', metaS)
export default routes;
