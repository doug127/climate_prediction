import express from 'express';
import {
    insertMeteostatData,
    paginated
} from '../controllers/value.controller.js';

const router = express.Router();

router.post('/meteostat', insertMeteostatData);
router.get('/paginated', paginated);

export default router;
