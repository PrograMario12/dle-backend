import express from 'express';
import { getPositions, registerPosition } from '../controllers/registerController.js';

const router = express.Router();

router.get('/:id', getPositions);
router.post('/', registerPosition);


export default router;

