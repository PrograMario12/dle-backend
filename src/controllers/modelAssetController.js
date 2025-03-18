import { getAll, getById, create, update, deleteItemModel, getByAreaAssetId } from '../models/modelAssetModel.js';

export const getAllModelAssets = async (req, res) => {
    try {
        const modelAssets = await getAll(req.pool);
        res.json(modelAssets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener los modelos de activos',
            message: error.message,
            stack: error.stack
        });
    }
};

export const getModelAssetByAreaAssetId = async (req, res) => {
    const { id } = req.params;
    try {
        const modelAssets = await getByAreaAssetId(req.pool, id);
        res.json(modelAssets);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los modelos de activos por area_asset_id' });
    }
}

export const getModelAssetById = async (req, res) => {
    const { id } = req.params;
    try {
        const modelAsset = await getById(req.pool, id);
        if (modelAsset) {
            res.json(modelAsset);
        } else {
            res.status(404).json({ error: 'Modelo de activo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el modelo de activo' });
    }
};

export const createModelAsset = async (req, res) => {
    const newModelAsset = req.body;
    try {
        const createdModelAsset = await create(req.pool, newModelAsset);
        res.status(201).json(createdModelAsset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al crear el modelo de activo',
            message: error.message,
            stack: error.stack
        });
    }
};

export const updateModelAsset = async (req, res) => {
    const { id } = req.params;
    const updatedModelAsset = req.body;
    try {
        const modelAsset = await update(req.pool, id, updatedModelAsset);
        if (modelAsset) {
            res.json(modelAsset);
        } else {
            res.status(404).json({ error: 'Modelo de activo no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al actualizar el modelo de activo',
            message: error.message,
            stack: error.stack
        });
    }
};

export const deleteModelAsset = async (req, res) => {
    const { id } = req.params;
    try {
        const modelAsset = await deleteItemModel(req.pool, id);
        if (modelAsset) {
            res.json(modelAsset);
        } else {
            res.status(404).json({ error: 'Modelo de activo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el modelo de activo' });
    }
};