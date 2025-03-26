import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA;

export async function getAll(pool) {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_side ORDER BY side_id ASC`);
    return result.rows;
}

export async function getById(pool, id) {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_side WHERE side_id = $1`, [id]);
    return result.rows[0];
}

export async function create(pool, item) {
    const { station_id, type_side_id, employee_necessary } = item;
    const result = await pool.query(
        `INSERT INTO ${schema}.tbl_side (station_id, type_side_id, employee_necessary) VALUES ($1, $2, $3) RETURNING *`,
        [station_id, type_side_id, employee_necessary]
    );
    return result.rows[0];
}

export async function update(pool, id, item) {
    const { type_side_id, employee_necessary } = item;
    const result = await pool.query(
        `UPDATE ${schema}.tbl_side SET type_side_id = $1, employee_necessary = $2 WHERE side_id = $3 RETURNING *`,
        [type_side_id, employee_necessary, id]
    );
    return result.rows[0];
}

const _delete = async (pool, id) => {
    const result = await pool.query(`DELETE FROM ${schema}.tbl_side WHERE side_id = $1 RETURNING *`, [id]);
    return result.rows[0];
};
export { _delete as deleteItemModel };

const getByStationId = async (pool, id) => {
    const result = await pool.query(`SELECT ts.side_id, ts.station_id, ts.employee_necessary, tts.type_side_desc FROM ${schema}.tbl_side ts INNER JOIN ${schema}.tbl_type_sides tts ON tts.type_side_id = ts.type_side_id WHERE ts.station_id = $1 ORDER BY ts.side_id ASC`, [id]);
    return result.rows;
}
export { getByStationId };

const getTypeSides = async (pool) => {
    const result = await pool.query(`SELECT type_side_id, type_side_desc FROM ${schema}.tbl_type_sides ORDER BY type_side_id ASC`);
    return result.rows;
}
export { getTypeSides };