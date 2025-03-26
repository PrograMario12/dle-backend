import express from 'express';
import { getAllSides, getSideById, createSide, updateSide, deleteSide, getSideByStationId, getAllTypeSides } from '../controllers/sideController.js';

const router = express.Router();

router.get('/types', getAllTypeSides);
router.get('/station/:id', getSideByStationId);
router.get('/', getAllSides);
router.get('/:id', getSideById);
router.post('/', createSide);
router.put('/:id', updateSide);
router.delete('/:id', deleteSide);

export default router;