import { getPositionsModel, registerPositionModel } from '../models/registerModel.js';

export const getPositions = async (req, res) => {
    const { id } = req.params;
    try {
        const positions = await getPositionsModel(req.pool, id);

        // Agrupar por station_id
        const groupedStations = positions.reduce((acc, station) => {
            const { station_id, name_station, type_side_desc, side_id } = station;
            const key = `${station_id}-${name_station}`;
            if (!acc[key]) {
            acc[key] = {
                station_id,
                name_station,
                type_side_desc: [],
                side_id: []
            };
            }
            acc[key].type_side_desc.push(type_side_desc);
            acc[key].side_id.push(side_id);
            return acc;
        }, {});

        res.json(Object.values(groupedStations));
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al obtener las posiciones',
            message: error.message,
            stack: error.stack
        });
    }
}

export const registerPosition = async (req, res) => {
    const { cardNumber, sideId, typeMovement } = req.body;
    try {
        const result = await registerPositionModel(req.pool, cardNumber, sideId, typeMovement);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al registrar la posición',
            message: error.message,
            stack: error.stack
        });
    }
}

