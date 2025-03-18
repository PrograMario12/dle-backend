import express from 'express';
import { getAllModelAssets, getModelAssetById, createModelAsset, updateModelAsset, deleteModelAsset, getModelAssetByAreaAssetId } from '../controllers/modelAssetController.js';

const router = express.Router();

router.get('/area-asset/:id', getModelAssetByAreaAssetId);
router.get('/', getAllModelAssets);
router.get('/:id', getModelAssetById);
router.post('/', createModelAsset);
router.put('/:id', updateModelAsset);
router.delete('/:id', deleteModelAsset);

export default router;