import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA;

export async function getAll(pool) {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_area_assets ORDER BY area_area_asset_number ASC`);
    return result.rows;
}

export async function getById(pool, id) {
    const result = await pool.query(`SELECT area_asset_number FROM ${schema}.tbl_area_assets WHERE area_asset_id = $1`, [id]);
    return result.rows[0];
}

export async function create(pool, item) {
    console.log (item);
    const { area_id, area_type_asset, area_asset_number } = item;
    const result = await pool.query(
        `INSERT INTO ${schema}.tbl_area_assets (area_id, area_type_asset, area_asset_number) VALUES ($1, $2, $3) RETURNING *`,
        [area_id, area_type_asset, area_asset_number]
    );
    return result.rows[0];
}

export async function update(pool, id, item) {
    const { area_asset_number } = item;
    const result = await pool.query(
        `UPDATE ${schema}.tbl_area_assets SET area_asset_number = $1 WHERE area_asset_id = $2 RETURNING *`,
        [area_asset_number, id]
    );
    return result.rows[0];
}

const _delete = async (pool, id) => {
    const result = await pool.query(`DELETE FROM ${schema}.tbl_area_assets WHERE area_asset_id = $1 RETURNING *`, [id]);
    return result.rows[0];
};
export { _delete as deleteItemModel };

const getByAreaId = async (pool, id) => {
    const result = await pool.query(`
    SELECT taa.area_asset_id, ttas.area_asset_name, taa.area_asset_number, ta.area_name
    FROM ${schema}.tbl_area_assets taa
    INNER JOIN ${schema}.tbl_type_area_assets ttas ON taa.area_type_asset = ttas.area_asset_id
    INNER JOIN ${schema}.tbl_areas ta ON ta.area_id = taa.area_id
    WHERE ta.area_id = $1
    ORDER BY taa.area_asset_number ASC
    `, [id]);
    return result.rows;
}
export { getByAreaId };

const getTypeAssetModel = async (pool) => {
    const result = await pool.query(`
    SELECT area_asset_id, area_asset_name FROM ${schema}.tbl_type_area_assets
    `);
    return result.rows;
}
export { getTypeAssetModel };