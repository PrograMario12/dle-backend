import dotenv from 'dotenv';

dotenv.config();

const schema = process.env.DB_SCHEMA;

export async function getLastRegister(pool, id) {
    console.log('El id es ', id);
    const result = await pool.query(`
        SELECT register_id, card_number_employee, entry_hour, exit_hour, sw_id
        FROM ${schema}.register_entry_exit
        WHERE card_number_employee = $1
        ORDER BY entry_hour DESC
        LIMIT 1
    `, [id]);
    return result.rows;
}

export async function registerEntry(pool, res) {
    const { id, swId, entryTime, exitTime } = res;

    const [datePart, timePart] = entryTime.split(', ');
    const [day, month, year] = datePart.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${timePart}-06:00`;

    console.log(formattedDate);

    const result = await pool.query(`
        INSERT INTO ${schema}.register_entry_exit (card_number_employee, sw_id, entry_hour, exit_hour)
        VALUES (
            $1,
            $2,
            $3::timestamptz,
            $4
        )
        RETURNING *;
    `, [id, swId, formattedDate, exitTime]);

    return result.rows[0];
}

export async function registerExit(pool, body) {
    const { register_id } = body;
    const now = new Date();
    const mexicoDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));
    const formattedDate = `${mexicoDate.getDate()}/${mexicoDate.getMonth() + 1}/${mexicoDate.getFullYear()}, ${mexicoDate.getHours().toString().padStart(2, '0')}:${mexicoDate.getMinutes().toString().padStart(2, '0')}:${mexicoDate.getSeconds().toString().padStart(2, '0')}`;

    const result = await pool.query(`
        UPDATE ${schema}.register_entry_exit
        SET exit_hour = $1
        WHERE register_id = $2
            RETURNING *
    `, [formattedDate, register_id]);

    return result.rows[0];
}