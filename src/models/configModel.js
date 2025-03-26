import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA

export async function getNameModelRunning(pool, id) {
    const result = await pool.query(`
        SELECT
            ttaa.area_asset_name,
            taa.area_asset_number,
            tma.model_asset_name
        FROM 
            ${schema}.tbl_model_asset tma
        INNER JOIN
            ${schema}.tbl_area_assets taa ON taa.area_asset_id = tma.area_asset_id
        INNER JOIN
            ${schema}.tbl_type_area_assets ttaa ON ttaa.area_asset_id = taa.area_type_asset
        WHERE tma.model_asset_id = $1
    `, [id]);
    return result.rows[0];
}
