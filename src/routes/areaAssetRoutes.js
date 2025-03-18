import express from 'express';
import { getAllAreaAssets, getAreaAssetById, createAreaAsset, updateAreaAsset, deleteAreaAsset, getAreaAssetByAreaId, getTypeAsset } from '../controllers/areaAssetController.js';

const router = express.Router();

router.get('/type-asset', getTypeAsset);
router.get('/area/:id', getAreaAssetByAreaId);
router.get('/', getAllAreaAssets);
router.get('/:id', getAreaAssetById);
router.post('/', createAreaAsset);
router.put('/:id', updateAreaAsset);
router.delete('/:id', deleteAreaAsset);


export default router;