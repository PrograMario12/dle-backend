import { getAll, getById, create, update, deleteItemModel, getByStationId, getTypeSides } from '../models/sideModel.js';

export const getAllSides = async (req, res) => {
    try {
        const sides = await getAll(req.pool);
        res.json(sides);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener las posiciones',
            message: error.message,
            stack: error.stack
        });
    }
};

export const getSideByStationId = async (req, res) => {
    const { id } = req.params;
    try {
        const sides = await getByStationId(req.pool, id);
        res.json(sides);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las posiciones por station_id' });
    }
}

export const getSideById = async (req, res) => {
    const { id } = req.params;
    try {
        const side = await getById(req.pool, id);
        if (side) {
            res.json(side);
        } else {
            res.status(404).json({ error: 'Posición no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la posición' });
    }
};

export const createSide = async (req, res) => {
    const newSide = req.body;
    try {
        const createdSide = await create(req.pool, newSide);
        res.status(201).json(createdSide);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al crear la posición',
            message: error.message,
            stack: error.stack
        });
    }
};

export const updateSide = async (req, res) => {
    const { id } = req.params;
    const updatedSide = req.body;
    try {
        const side = await update(req.pool, id, updatedSide);
        if (side) {
            res.json(side);
        } else {
            res.status(404).json({ error: 'Posición no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al actualizar la posición',
            message: error.message,
            stack: error.stack
        });
    }
};

export const deleteSide = async (req, res) => {
    const { id } = req.params;
    try {
        const side = await deleteItemModel(req.pool, id);
        if (side) {
            res.json(side);
        } else {
            res.status(404).json({ error: 'Posición no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la posición' });
    }
};

export const getAllTypeSides = async (req, res) => {
    try {
        const typeSides = await getTypeSides(req.pool);
        res.json(typeSides);
    } catch (error) {
        console.error('Error al obtener los tipos de lados:', error);
        res.status(500).json({ 
            error: 'Error al obtener los tipos de lados',
            message: error.message,
            stack: error.stack
        });
    }
};