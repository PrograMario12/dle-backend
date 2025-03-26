import { getNameModelRunning } from '../models/configModel.js';

export const getNameModel = async (req, res) => {
    const { id } = req.params;
    try {
        const model = await getNameModelRunning(req.pool, id);
        if (model) {
            res.json(model);
        } else {
            res.status(404).json({ error: 'Modelo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el modelo' });
    }
};
