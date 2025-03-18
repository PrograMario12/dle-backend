import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA

export async function getAll(pool) {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_areas`);
    return result.rows;
  }

  export async function   getById(pool, id) {
    const result = await pool.query(`SELECT * FROM ${schema}.tbl_areas WHERE area_id = $1`, [id]);
    return result.rows[0];
  }

  export async function   create(pool, item) {
    const { name, description } = item;
    const result = await pool.query(
      `INSERT INTO ${schema}.tbl_areas (area_name) VALUES ($1) RETURNING *`,
      [name]
    );
    return result.rows[0];
  }

  export async function   update(pool, id, item) {
    const { name, description } = item;
    const result = await pool.query(
      `UPDATE ${schema}.tbl_areas SET area_name = $1 WHERE area_id = $2 RETURNING *`,
      [name, id]
    );
    return result.rows[0];
  }

  const _delete = async (pool, id) => {
  const result = await pool.query(`DELETE FROM ${schema}.tbl_areas WHERE area_id = $1 RETURNING *`, [id]);
  return result.rows[0];
};
export { _delete as deleteItemModel };
