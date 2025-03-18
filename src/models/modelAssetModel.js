import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA;

export async function getAll(pool) {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_model_asset ORDER BY model_asset_id ASC`);
    return result.rows;
}

export async function getById(pool, id) {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_model_asset WHERE model_asset_id = $1`, [id]);
    return result.rows[0];
}

export async function create(pool, item) {
    const { area_asset_id, model_asset_name } = item;
    const result = await pool.query(
        `INSERT INTO ${schema}.tbl_model_asset (area_asset_id, model_asset_name) VALUES ($1, $2) RETURNING *`,
        [area_asset_id, model_asset_name]
    );
    return result.rows[0];
}

export async function update(pool, id, item) {
    const { model_asset_name } = item;
    const result = await pool.query(
        `UPDATE ${schema}.tbl_model_asset SET model_asset_name = $1 WHERE model_asset_id = $2 RETURNING *`,
        [model_asset_name, id]
    );
    return result.rows[0];
}

const _delete = async (pool, id) => {
    const result = await pool.query(`DELETE FROM ${schema}.tbl_model_asset WHERE model_asset_id = $1 RETURNING *`, [id]);
    return result.rows[0];
};
export { _delete as deleteItemModel };

const getByAreaAssetId = async (pool, id) => {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_model_asset WHERE area_asset_id = $1 ORDER BY model_asset_id ASC`, [id]);
    return result.rows;
}
export { getByAreaAssetId };