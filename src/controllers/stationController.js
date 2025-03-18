import { getAll, getById, create, update, deleteItemModel, getByModelAssetId } from '../models/stationModel.js';

export const getAllStations = async (req, res) => {
    try {
        const stations = await getAll(req.pool);
        res.json(stations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener las estaciones',
            message: error.message,
            stack: error.stack
        });
    }
};

export const getStationByModelAssetId = async (req, res) => {
    const { id } = req.params;
    try {
        const stations = await getByModelAssetId(req.pool, id);
        if (stations.length > 0) {
            res.json(stations);
        } else {
            res.status(404).json({ error: `No se encontraron estaciones con el model_asset_id proporcionado: ${id}` });
        }
    } catch (error) {
        console.error(`Error al obtener las estaciones por model_asset_id: ${id}`, error);
        res.status(500).json({ 
            error: 'Error al obtener las estaciones por model_asset_id',
            message: error.message,
            stack: error.stack
        });
    }
};

export const getStationById = async (req, res) => {
    const { id } = req.params;
    try {
        const station = await getById(req.pool, id);
        if (station) {
            res.json(station);
        } else {
            res.status(404).json({ error: 'Estación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la estación' });
    }
};

export const createStation = async (req, res) => {
    const newStation = req.body;
    try {
        const createdStation = await create(req.pool, newStation);
        res.status(201).json(createdStation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al crear la estación',
            message: error.message,
            stack: error.stack
        });
    }
};

export const updateStation = async (req, res) => {
    const { id } = req.params;
    const updatedStation = req.body;
    try {
        const station = await update(req.pool, id, updatedStation);
        if (station) {
            res.json(station);
        } else {
            res.status(404).json({ error: 'Estación no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al actualizar la estación',
            message: error.message,
            stack: error.stack
        });
    }
};

export const deleteStation = async (req, res) => {
    const { id } = req.params;
    try {
        const station = await deleteItemModel(req.pool, id);
        if (station) {
            res.json(station);
        } else {
            res.status(404).json({ error: 'Estación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la estación' });
    }
};