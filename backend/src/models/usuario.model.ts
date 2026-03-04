
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
    id_rol: number
}
export interface TokenPayload {
  email: string
}
const createUser = async ({ email, password, username, id_rol }: CreateUserParams): Promise<User> => {
    const query = {
        text: `INSERT INTO usuarios_de_gatos (username, email, password, id_rol)
        VALUES ($1, $2, $3, $4)
        RETURNING username, email, id, id_rol
         `, 
         values:[username, email, password, id_rol]
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
