import { pool } from "../db";
import { Request, Response } from "express";
import { DB_TABLE_ROLES_GATOS } from "../config";

const RolesColumns = [
    "id_rol",//0
    "rol_gatos",//1
    

]

export const obternerRoles = async (_req:Request, res: Response) =>{
    const { rows } = await pool.query(` SELECT ${RolesColumns} FROM ${DB_TABLE_ROLES_GATOS}`);
    console.log("Tabla de permisos",DB_TABLE_ROLES_GATOS)
    return res.status(200).json(rows)
}
export const obternerRole = async (req:Request, res: Response) =>{
     const { id_rol} = req.params;
     try {
        const result = await pool.query(
            `SELECT ${RolesColumns} FROM ${DB_TABLE_ROLES_GATOS} WHERE ${RolesColumns[0]} = $1`,
            [id_rol]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "rol de gato no encontrado" });
        }
        const roles = result.rows[0];
        return res.status(200).json(roles);
     }catch(error){
        console.error(error);
        return res.status(500).json({ error: "Error al obtener el usuario" });
     }

};

export const crearRoles = async (req:Request, res: Response) =>{
    const data = req.body;
    const {rows} = await pool.query(`
        INSERT INTO ${DB_TABLE_ROLES_GATOS}
         ( ${RolesColumns[1]} )
         VALUES ( $1 ) 
        `,
        [
            
            data.rol_gatos
            
        ]
    )
    return res.json(rows[0]);
}
export const actualizarRoles = async (req:Request, res: Response) =>{
    const { id_rol } = req.params;
    const data = req.body;

    try {
        const { rows }= await pool.query(
            `
            UPDATE ${DB_TABLE_ROLES_GATOS}
            SET ${RolesColumns[1]} = COALESCE($1, ${RolesColumns[1]})
            WHERE ${RolesColumns[0]} = $2
            RETURNING *
            
            `,
            [
            
            data.rol_gatos,
            //data.id_rol,
            id_rol

            ]
        )

    if (rows.length === 0) {
        return res.status(404).json({ error: 'rol de gato no encontrado' });
    }
    return res.json(rows[0]);
    }catch(error) {
        console.error(error);
    return res.status(500).json({ error: "Error al actualizar los roles de gatos" });
     }

};


export const eliminarRoles = async (req:Request, res: Response) =>{
    const { id_rol } = req.params;
    try{
          // 1️⃣ Obtener el servidor antes de borrar
            const result = await pool.query(
              `SELECT * FROM ${DB_TABLE_ROLES_GATOS} WHERE ${RolesColumns[0]} = $1`,
              [id_rol]
            );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'permiso no encontrado' });
        }
     await pool.query(
          `DELETE FROM ${DB_TABLE_ROLES_GATOS}
           WHERE ${RolesColumns[0]} = $1
           RETURNING *`,
          [id_rol]
        );

         return res.status(200).json({"msg":"eliminando rol de gatos"})
    }catch(error){
            console.error(error);
    return res.status(500).json({ error: "Error al eliminar el rol de gatos" });
    }
   
};