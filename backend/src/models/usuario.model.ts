
import { pool } from "../db"

export interface User {
    id: number
    username: string
    email: string
    password: string
    id_rol: number
}

export interface CreateUserParams{
    username: string
    email: string
    password: string
    id_rol: number
    verified_token: string
    verified: boolean
}
export interface TokenPayload {
  email: string
  idrol: number
}
const createUser = async ({ email, password, username, id_rol, verified_token , verified}: CreateUserParams): Promise<User> => {
    const query = {
        text: `INSERT INTO usuarios_de_gatos (username, email, password, id_rol, verified_token, verified)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING username, email, id, id_rol, verified_token, verified
         `, 
         values:[username, email, password, id_rol, verified_token, verified ]
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
const findOneByVerificationToken = async(token: string): Promise<User | null> => {
    const query= {
        text:`
        SELECT * FROM usuarios_de_gatos
        WHERE verified_token = $1
        `, 
        values:[token]
    }

    const { rows } = await pool.query<User>(query)
    return rows[0] ?? null
}

const verifyUser = async (token: string): Promise<User | null> =>{
      const query= {
        text:`
        UPDATE usuarios_de_gatos
        SET verified = true,
        verified_token = NULL
        WHERE verified_token = $1
        `, 
        values:[token]
    }  
    const { rows } = await pool.query<User>(query)
    return rows[0] ?? null
}


export const usuariosModel = {
    createUser, 
    findOneByEmail,
    findOneByVerificationToken,
    verifyUser
}
