import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA

export async function getAllSW(pool) {
    const result = await pool.query(
        `SELECT sw_id, pl.code_line, variation_code, a.type_machine
            FROM ${schema}.sides_workstations
            LEFT JOIN ${schema}.workstations w on sides_workstations.workstation_id = w.workstation_id
            LEFT JOIN ${schema}.line_variations lv on w.variation_id = lv.variation_id
            LEFT JOIN ${schema}.production_lines pl on lv.line_id_fk = pl.line_id
            LEFT JOIN ${schema}.areas a on pl.area_id = a.area_id;`
    )
    return result.rows;
}