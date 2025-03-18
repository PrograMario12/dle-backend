import express from 'express';
import { getAllStations, getStationById, createStation, updateStation, deleteStation, getStationByModelAssetId } from '../controllers/stationController.js';

const router = express.Router();

router.get('/model-asset/:id', getStationByModelAssetId);
router.get('/', getAllStations);
router.get('/:id', getStationById);
router.post('/', createStation);
router.put('/:id', updateStation);
router.delete('/:id', deleteStation);

export default router;