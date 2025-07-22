import express from 'express';
import {
    getAll, 
    getById, 
    paginated,
    create,
    update,
    destroy
} from '../controllers/equipment.controller.js';

const router = express.Router();

router.get('/', getAll);
router.get('/paginated', paginated);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;