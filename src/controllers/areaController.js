import { getAll, getById, create, update, deleteItemModel } from '../models/areaModel.js';

export const getAllAreas = async (req, res) => {
  try {
    const areas = await getAll(req.pool);
    res.json(areas);
  } catch (error) {
    console.error(error); // Esto imprimirá el error en la consola del servidor
    res.status(500).json({ 
        error: 'Error al obtener las áreas',
        message: error.message,
        stack: error.stack
    });
  }
};

export const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const area = await getById(req.pool, id);
    if (area) {
      res.json(area);
    } else {
      res.status(404).json({ error: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el área' });
  }
};

export const createArea = async (req, res) => {
  const newArea = req.body;
  try {
    const createdArea = await create(req.pool, newArea);
    res.status(201).json(createdArea);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el área' });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const updatedArea = req.body;
  try {
    const area = await update(req.pool, id, updatedArea);
    if (area) {
      res.json(area);
    } else {
      res.status(404).json({ error: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el área' });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const area = await deleteItemModel(req.pool, id);
    if (area) {
      res.json(area);
    } else {
      res.status(404).json({ error: 'Área no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el área' });
  }
};