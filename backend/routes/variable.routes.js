import express from 'express'
import {
    getAll,
    getById,
    create,
    update,
    destory
} from '../controllers/variable.controller.js'

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', destory);

export default router;