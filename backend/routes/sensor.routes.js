import express from 'express';
import { 
    getAll,
    paginated, 
    getById, 
    create, 
    update,
    destroy
} from '../controllers/sensor.controller.js';

const router = express.Router();

router.get('/', getAll);
router.get('/paginated', paginated);
router.get('/:id', getById);
router.post('/create', create);
router.patch('/update/:id', update);
router.delete('/destroy/:id', destroy);

export default router;
