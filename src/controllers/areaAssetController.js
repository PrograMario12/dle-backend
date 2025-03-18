import { getAll, getById, create, update, deleteItemModel, getByAreaId, getTypeAssetModel } from '../models/areaAssetModel.js';

export const getAllAreaAssets = async (req, res) => {
    try {
        const areaAssets = await getAll(req.pool);
        res.json(areaAssets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener los activos de área',
            message: error.message,
            stack: error.stack
        });
    }
};

export const getAreaAssetByAreaId = async (req, res) => {
    const { id } = req.params;
    try {
        const areaAssets = await getByAreaId(req.pool, id);
        res.json(areaAssets);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los activos de área' });
    }
}

export const getAreaAssetById = async (req, res) => {
    const { id } = req.params;
    try {
        const areaAsset = await getById(req.pool, id);
        if (areaAsset) {
            res.json(areaAsset);
        } else {
            res.status(404).json({ error: 'Activo de área no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el activo de área' });
    }
};

export const createAreaAsset = async (req, res) => {
    const newAreaAsset = req.body;
    try {
        const createdAreaAsset = await create(req.pool, newAreaAsset);
        res.status(201).json(createdAreaAsset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al crear el activo de área',
            message: error.message,
            stack: error.stack
        });
    }
};

export const updateAreaAsset = async (req, res) => {
    const { id } = req.params;
    const updatedAreaAsset = req.body;
    try {
        const areaAsset = await update(req.pool, id, updatedAreaAsset);
        if (areaAsset) {
            res.json(areaAsset);
        } else {
            res.status(404).json({ error: 'Activo de área no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al actualizar el activo de área',
            message: error.message,
            stack: error.stack
        });
    }
};

export const deleteAreaAsset = async (req, res) => {
    const { id } = req.params;
    try {
        const areaAsset = await deleteItemModel(req.pool, id);
        if (areaAsset) {
            res.json(areaAsset);
        } else {
            res.status(404).json({ error: 'Activo de área no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el activo de área' });
    }
};

export const getTypeAsset = async (req, res) => {
    try {
        const typeAsset = await getTypeAssetModel(req.pool);
        res.json(typeAsset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener los tipos únicos de datos para activos ',
            message: error.message,
            stack: error.stack
        });
    }
}
