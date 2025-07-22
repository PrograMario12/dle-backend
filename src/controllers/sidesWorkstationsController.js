import {getAllSW} from "../models/sidesWorkstationsModel.js";


export const getAllSidesWorkstations = async(req, res) => {
    try{
        const sidesWorkstations = await getAllSW(req.pool);
        res.json(sidesWorkstations);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener las estaciones',
            message: error.message,
        });
    }
};