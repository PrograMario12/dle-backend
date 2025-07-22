import express from 'express';
import {
    getLastRegisterControl,
    registerEntryControl,
    registerExitControl
} from '../controllers/registerEntryExitController.js';

const router = express.Router();

router.get('/:id', getLastRegisterControl);
router.post('/', registerEntryControl);
router.put('/exit', registerExitControl);

export default router;