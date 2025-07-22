
import express from 'express';
import { getAllSidesWorkstations } from '../controllers/sidesWorkstationsController.js';
const router = express.Router();

router.get('/', getAllSidesWorkstations);

export default router;