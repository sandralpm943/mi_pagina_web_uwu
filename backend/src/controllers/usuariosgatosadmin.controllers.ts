import { pool } from "../db";
import { Request, Response } from "express";
import { DB_TABLE_USUARIOS_DE_GATOS } from "../config";

const userColumns = [
    "id", // 0
    "username", // 1
    "email", // 2
    "create_at", // 3
    "id_rol", //4
    "verified" // 5
]

export const obternerUsuarios = async (_req:Request, res: Response) =>{
    const { rows } = await pool.query(` SELECT ${userColumns} FROM ${DB_TABLE_USUARIOS_DE_GATOS}`);
    console.log("Tabla de usuarios",DB_TABLE_USUARIOS_DE_GATOS)
    return res.status(200).json(rows)
}
export const obternerUsuario = async (req:Request, res: Response) =>{
     const { id} = req.params;
     try {
        const { rows } = await pool.query(
            `SELECT ${userColumns} FROM ${DB_TABLE_USUARIOS_DE_GATOS} WHERE id = $1`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "email no encontrado" });
        }
        return res.status(200).json(rows[0]);
     }catch(error){
        console.error(error);
        return res.status(500).json({ error: "Error al obtener el email" });
     }

};
export const crearUsuario = async (_req:Request, res: Response) =>{
    return res.status(200).json({"msg":"creando usuario"})
}
export const actualizarUsuario = async (req:Request, res: Response) =>{
    const { id } = req.params;
    const data = req.body;
    
    try {
        const { rows }= await pool.query(
            `
            UPDATE ${DB_TABLE_USUARIOS_DE_GATOS}
            SET ${userColumns[1]} = COALESCE($1,${userColumns[1]}),
                ${userColumns[2]} = COALESCE($2, ${userColumns[2]}),
                ${userColumns[4]} = COALESCE($3, ${userColumns[4]}),
                ${userColumns[5]} = COALESCE($4,${userColumns[5]})
            WHERE id = $5
            RETURNING *
            
            `,
            [
            data.username,
            data.email,
            data.id_rol,
            data.verified,
            id

            ]
        )

    if (rows.length === 0) {
        return res.status(404).json({ error: 'usuario no encontrado' });
    }
    return res.json(rows[0]);
    }catch(error) {
        console.error(error);
    return res.status(500).json({ error: "Error al actualizar el email" });
     }
    return res.status(200).json({"msg":"actualizando usuario"})
};
export const eliminarUsuario = async (req:Request, res: Response) =>{
    const { id } = req.params;
    try{
          // 1️⃣ Obtener el servidor antes de borrar
            const result = await pool.query(
              `SELECT * FROM ${DB_TABLE_USUARIOS_DE_GATOS} WHERE id = $1`,
              [id]
            );
            if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
     await pool.query(
          `DELETE FROM ${DB_TABLE_USUARIOS_DE_GATOS}
           WHERE id = $1
           RETURNING *`,
          [id]
        );

         return res.status(200).json({"msg":"eliminando usuario"})
    }catch(error){
            console.error(error);
    return res.status(500).json({ error: "Error al eliminar el usuario" });
    }
   
};