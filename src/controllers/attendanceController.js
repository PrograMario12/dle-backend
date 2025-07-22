import { getLastMovement } from '../models/attendanceModel.js';

export const getAttendanceStatus = async (req, res) => {
    const { scannedCardNumber } = req.params;

    try {
        // Llama al modelo para obtener el último movimiento
        const lastMovement = await getLastMovement(req.pool, scannedCardNumber);

        if (!lastMovement) {
            // No hay registros previos
            return res.json({ lastMovementType: null });
        }

        // Devuelve el último movimiento
        res.json({ lastMovementType: lastMovement.movement_type });
    } catch (error) {
        console.error('Error al obtener el estado de asistencia:', error.message, error.stack);

        // Respuesta más detallada para el cliente
        res.status(500).json({ 
            error: 'Error interno del servidor',
            message: 'Hubo un problema al intentar obtener el estado de asistencia. Por favor, inténtelo nuevamente más tarde.',
            details: error.message // Opcional: incluir detalles del error si es seguro compartirlos
        });
    }
};