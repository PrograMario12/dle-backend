import express from 'express';
import { getNameModel } from '../controllers/configController.js';

const router = express.Router();

router.get('/:id', getNameModel);

export default router;