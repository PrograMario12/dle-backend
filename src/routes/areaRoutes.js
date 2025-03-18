import express from 'express';
import { getAllAreas, getItemById, createArea, updateItem, deleteItem,  } from '../controllers/areaController.js';

const router = express.Router();

router.get('/', getAllAreas);
router.get('/:id', getItemById);
router.post('/', createArea);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;