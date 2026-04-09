import { pool } from "../db";
import { Request, Response } from "express";
import { DB_TABLE_PERMISSIONS } from "../config";

const permissionsColumns = [
    "id_permission",//0
    "nombre",//1
    

]

export const obternerPermisos = async (_req:Request, res: Response) =>{
    const { rows } = await pool.query(` SELECT ${permissionsColumns} FROM ${DB_TABLE_PERMISSIONS}`);
    console.log("Tabla de permisos",DB_TABLE_PERMISSIONS)
    return res.status(200).json(rows)
}
export const obternerPermiso = async (req:Request, res: Response) =>{
     const { idpermission} = req.params;
     try {
        const result = await pool.query(
            `SELECT ${permissionsColumns} FROM ${DB_TABLE_PERMISSIONS} WHERE ${permissionsColumns[0]} = $1`,
            [idpermission]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "permisos no encontrado" });
        }
        const permiso = result.rows[0];
        return res.status(200).json(permiso);
     }catch(error){
        console.error(error);
        return res.status(500).json({ error: "Error al obtener el usuario" });
     }

};

export const crearPermisos = async (_req:Request, res: Response) =>{
    return res.status(200).json({"msg":"creando permisos"})
}
export const actualizarPermisos = async (req:Request, res: Response) =>{
    const { idpermission } = req.params;
    const data = req.body;

    try {
        const { rows }= await pool.query(
            `
            UPDATE ${DB_TABLE_PERMISSIONS}
            SET ${permissionsColumns[1]} = COALESCE($1, ${permissionsColumns[1]})
            WHERE ${permissionsColumns[0]} = $2
            RETURNING *
            
            `,
            [
            
            data.nombre,
            //data.id_rol,
            idpermission

            ]
        )

    if (rows.length === 0) {
        return res.status(404).json({ error: 'permiso no encontrado' });
    }
    return res.json(rows[0]);
    }catch(error) {
        console.error(error);
    return res.status(500).json({ error: "Error al actualizar los permisos" });
     }
    return res.status(200).json({"msg":"actualizando permisos"})
};
export const eliminarPermisos = async (req:Request, res: Response) =>{
    const { idpermission } = req.params;
    try{
          // 1️⃣ Obtener el servidor antes de borrar
            const result = await pool.query(
              `SELECT * FROM ${DB_TABLE_PERMISSIONS} WHERE ${permissionsColumns[0]} = $1`,
              [idpermission]
            );
            if (result.rowCount === 0) {
      return res.status(404).json({ error: 'permiso no encontrado' });
    }
     await pool.query(
          `DELETE FROM ${DB_TABLE_PERMISSIONS}
           WHERE id = $1
           RETURNING *`,
          [idpermission]
        );

         return res.status(200).json({"msg":"eliminando permiso"})
    }catch(error){
            console.error(error);
    return res.status(500).json({ error: "Error al eliminar el permiso" });
    }
   
};