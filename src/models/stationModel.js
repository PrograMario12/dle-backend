import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA;

export async function getAll(pool) {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_stations ORDER BY station_id ASC`);
    return result.rows;
}

export async function getById(pool, id) {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_stations WHERE station_id = $1`, [id]);
    return result.rows[0];
}

export async function create(pool, item) {
    const { model_asset_id, name_station } = item;
    const result = await pool.query(
        `INSERT INTO ${schema}.tbl_stations (model_asset_id, name_station) VALUES ($1, $2) RETURNING *`,
        [model_asset_id, name_station]
    );
    return result.rows[0];
}

export async function update(pool, id, item) {
    const { name_station } = item;
    const result = await pool.query(
        `UPDATE ${schema}.tbl_stations SET name_station = $1 WHERE station_id = $2 RETURNING *`,
        [name_station, id]
    );
    return result.rows[0];
}

const _delete = async (pool, id) => {
    const result = await pool.query(`DELETE FROM ${schema}.tbl_stations WHERE station_id = $1 RETURNING *`, [id]);
    return result.rows[0];
};
export { _delete as deleteItemModel };

const getByModelAssetId = async (pool, id) => {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_stations WHERE model_asset_id = $1 ORDER BY station_id ASC`, [id]);
    return result.rows;
}
export { getByModelAssetId };