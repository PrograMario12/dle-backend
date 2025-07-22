import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA;

export async function getPositionsModel(pool, id) {
    const result = await pool.query(`
        SELECT 
            t_stations.station_id,
            t_stations.name_station,
            tts.type_side_desc,
            t_side.side_id
        FROM ${schema}.tbl_side t_side
        INNER JOIN ${schema}.tbl_stations t_stations
            ON t_side.station_id = t_stations.station_id
        INNER JOIN ${schema}.tbl_type_sides tts
            ON tts.type_side_id = t_side.type_side_id
        WHERE t_stations.model_asset_id = $1
    `, [id]);
    return result.rows;
}

export async function registerPositionModel(pool, id, position, typeMovement) {
    const result = await pool.query(`
        INSERT INTO ${schema}.tbl_attendance_records (employee_card_id, side_id, movement_type)
        VALUES ($1, $2, $3)
        RETURNING *;
    `, [id, position, typeMovement]);
    return result.rows[0];
}
