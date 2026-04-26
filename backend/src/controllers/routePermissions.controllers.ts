import { pool } from "../db";
import { Request, Response } from "express";
import { DB_TABLE_ROUTE_PERMISSIONS } from "../config";

const routePermissionColumns = [
    "id_route_permission", //0
    "route", // 1
    "method", // 2
    "id_permission" // 3
]

export const obtenerpermissionsR = async (_req:Request, res: Response) =>{
    const { rows } = await pool.query(`SELECT ${routePermissionColumns} FROM ${DB_TABLE_ROUTE_PERMISSIONS}`);
    console.log("Tabla de routes_Permissions", DB_TABLE_ROUTE_PERMISSIONS)
    return res.status(200).json(rows)
}
export const obtenerPermissionR = async (req:Request, res: Response) =>{
     const { idRoutePermission} = req.params;
     try {
        const result = await pool.query(
            `SELECT ${routePermissionColumns} FROM ${DB_TABLE_ROUTE_PERMISSIONS} WHERE ${routePermissionColumns[0]} = $1`,
            [idRoutePermission]
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
export const crearPermissionR = async (req:Request, res: Response) =>{
    const data = req.body;
    const {rows} = await pool.query(`
         INSERT INTO ${DB_TABLE_ROUTE_PERMISSIONS}
            (route, method, id_permission)
            VALUES ($1, $2, $3)
            RETURNING *

        `,
        [
            
            data.route,
            data.method,
            data.idPermission
            
        ]
    )
    return res.json(rows[0]);
}

export const actualizarPermissionR = async (req:Request, res: Response) =>{
    const { idRoutePermission } = req.params;
    const data = req.body;

    try {
        const { rows }= await pool.query(
            `
            UPDATE ${DB_TABLE_ROUTE_PERMISSIONS}
            SET ${routePermissionColumns[1]} = COALESCE ($1,${routePermissionColumns[1]}),
            ${routePermissionColumns[2]} = COALESCE ($2,${routePermissionColumns[2]}), 
            ${routePermissionColumns[3]} = COALESCE ($3,${routePermissionColumns[3]})
            WHERE ${routePermissionColumns[0]} = $4
            RETURNING *            
            `,
            [
            
            data.route,
            data.method,
            data.idPermission,
            //data.id_rol,
            idRoutePermission //la id del permiso

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
    
};
export const eliminarPermissionR = async (req:Request, res: Response) =>{
    const { idRoutePermission } = req.params;
    try{
          // 1️⃣ Obtener el servidor antes de borrar
            const result = await pool.query(
              `SELECT * FROM ${DB_TABLE_ROUTE_PERMISSIONS} WHERE ${routePermissionColumns[0]} = $1`,
              [idRoutePermission]
            );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'permiso no encontrado' });
        }
     await pool.query(
          `DELETE FROM ${DB_TABLE_ROUTE_PERMISSIONS}
           WHERE ${routePermissionColumns[0]} = $1
           RETURNING *`,
          [idRoutePermission]
        );

         return res.status(200).json({"msg":"eliminando permiso"})
    }catch(error){
            console.error(error);
    return res.status(500).json({ error: "Error al eliminar el permiso" });
    }
   
};