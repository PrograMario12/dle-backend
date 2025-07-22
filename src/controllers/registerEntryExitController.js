import {getLastRegister, registerEntry, registerExit} from '../models/registerEntryExitModel.js';

export const getLastRegisterControl = async (req, res) => {
    try {
        console.log('el id es ' , req.params.id);
        const sides = await getLastRegister(req.pool, req.params.id);
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

export async function registerEntryControl(req, res) {
    try {
        const newItem = await registerEntry(req.pool, req.body);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error al crear el registro:', error);
        res.status(500).json({ message: 'Error al crear registro', error: error.message });
    }
}

export async function registerExitControl(req, res) {
    try {
        const newItem = await registerExit(req.pool, req.body);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error al crear el registro:', error);
        res.status(500).json({ message: 'Error al crear registro', error: error.message });
    }
}
