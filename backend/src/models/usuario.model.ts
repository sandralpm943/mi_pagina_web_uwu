
import { pool } from "../db"

interface CreateUserParams{
    username: string
    email: string
    password: string
}

const create = async ({ email, password, username }: CreateUserParams) => {
    const query = {
        text: `INSERT INTO usuarios_de_gatos (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING username, email, id
         `, 
         values:[username, email, password]
    }
    const { rows } =await pool.query(query)
    return rows[0]
}

const findOneByEmail = async(email: string) => {
    const query = {
        text: `SELECT * FROM usuarios_de_gatos
        WHERE EMAIL = $1
        `,
        values: [email]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

export const usuariosModel = {
    create, 
    findOneByEmail
}
