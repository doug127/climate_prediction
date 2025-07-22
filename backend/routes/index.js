import express from 'express';
import equipmentRouter from './equipment.routes.js';

const routes =  express.Router();

routes.use('/', equipmentRouter);


export default routes;
