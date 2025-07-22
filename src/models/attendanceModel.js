/**
 * Obtiene el último movimiento de un empleado por su número de tarjeta.
 * @param {Pool} pool - Conexión a la base de datos.
 * @param {string} cardNumber - Número de tarjeta del empleado.
 * @returns {Promise<{ movement_type: string } | null>} - Último movimiento o null si no hay registros.
 */
import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA

export const getLastMovement = async (pool, cardNumber) => {
    const query = `
        SELECT movement_type
        FROM ${schema}.tbl_attendance_records
        WHERE employee_card_id = $1
        ORDER BY date_time DESC
        LIMIT 1
    `;

    const { rows } = await pool.query(query, [cardNumber]);

    // Devuelve el último movimiento o null si no hay registros
    return rows.length > 0 ? rows[0] : null;
};