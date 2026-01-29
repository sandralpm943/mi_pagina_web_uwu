import 'dotenv/config';

export const PORT = 3000;
export const IP = "localhost";

export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.DB_HOST;
export const  DB_PASSWORD = process.env.DB_PASSWORD;
export const  DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT
    ? Number(process.env.DB_PORT)
    : undefined;
export const DB_TABLE_TIPOSGATOS = process.env.DB_TABLE_TIPOSGATOS;

if(!process.env.SECRET_JWT){
    throw new Error('SECRET_JWT no esta defenida')
}

export const SECRET_JWT = process.env.SECRET_JWT;