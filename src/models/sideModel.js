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
    const { station_id, side_desc, employee_necessary } = item;
    const result = await pool.query(
        `INSERT INTO ${schema}.tbl_side (station_id, side_desc, employee_necessary) VALUES ($1, $2, $3) RETURNING *`,
        [station_id, side_desc, employee_necessary]
    );
    return result.rows[0];
}

export async function update(pool, id, item) {
    const { side_desc, employee_necessary } = item;
    const result = await pool.query(
        `UPDATE ${schema}.tbl_side SET side_desc = $1, employee_necessary = $2 WHERE side_id = $3 RETURNING *`,
        [side_desc, employee_necessary, id]
    );
    return result.rows[0];
}

const _delete = async (pool, id) => {
    const result = await pool.query(`DELETE FROM ${schema}.tbl_side WHERE side_id = $1 RETURNING *`, [id]);
    return result.rows[0];
};
export { _delete as deleteItemModel };

const getByStationId = async (pool, id) => {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_side WHERE station_id = $1 ORDER BY side_id ASC`, [id]);
    return result.rows;
}
export { getByStationId };