import express from 'express';
import { getAttendanceStatus } from '../controllers/attendanceController.js';

const router = express.Router();

// Endpoint para obtener el estado de asistencia
router.get('/status/:scannedCardNumber', getAttendanceStatus);

export default router;