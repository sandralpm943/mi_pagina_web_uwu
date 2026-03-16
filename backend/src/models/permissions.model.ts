import { pool } from "../db"

const getUserPermissions = async (email:string): Promise<string[]> => {
    const result = await pool.query(
        `
        SELECT 
        FROM
        JOIN
        JOIN
        JOIN
        WHERE
        `,
        [email]
    )
    return result.rows.map(row => row.nombre)
}
export default{
    getUserPermissions
}