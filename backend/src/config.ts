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
export const DB_TABLE_USUARIOS_DE_GATOS = process.env.DB_TABLE_USUARIOS_DE_GATOS;
export const DB_TABLE_PERMISSIONS = process.env.DB_TABLE_PERMISSIONS;
export const DB_TABLE_ROLE_PERMISSIONS = process.env.DB_TABLE_ROLE_PERMISSIONS;
export const DB_TABLE_ROLES_GATOS = process.env.DB_TABLE_ROLES_GATOS;

if(!process.env.SECRET_JWT){
    throw new Error('SECRET_JWT no esta defenida')
}

export const SECRET_JWT = process.env.SECRET_JWT;

export const EMAIL_MAILER= process.env.EMAIL_MAILER;
export const MAILER_CODE= process.env.MAILER_CODE;