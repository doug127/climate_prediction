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
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', destroy);

export default router;
