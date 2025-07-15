import express from 'express';
import {
    insertMeteostatData,
    paginated,
    createValue
} from '../controllers/value.controller.js';

const router = express.Router();

router.post('/meteostat', insertMeteostatData);
router.get('/paginated', paginated);
router.post('/create', createValue);

export default router;
