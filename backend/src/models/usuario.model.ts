
import { pool } from "../db"

export interface User {
    id: number
    username: string
    email: string
    password: string
}

export interface CreateUserParams{
    username: string
    email: string
    password: string
}
export interface TokenPayload {
  email: string
}
const createUser = async ({ email, password, username }: CreateUserParams): Promise<User> => {
    const query = {
        text: `INSERT INTO usuarios_de_gatos (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING username, email, id
         `, 
         values:[username, email, password]
    }
    const { rows } =await pool.query<User>(query)
    if(!rows[0]){
        throw new Error ('No se pudo crear el usuario')
    }
    return rows[0]
}

const findOneByEmail = async(email: string): Promise<User | null> => {
    const query = {
        text: `SELECT * FROM usuarios_de_gatos
        WHERE EMAIL = $1
        `,
        values: [email]
    }
    const { rows } = await pool.query<User>(query)
    return rows[0] ?? null
}

export const usuariosModel = {
    createUser, 
    findOneByEmail
}
