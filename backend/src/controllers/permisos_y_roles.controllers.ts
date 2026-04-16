import { pool } from "../db";
import { Request, Response } from "express";
// import { DB_ROLE_GATOS } from "../config";


export const obternerPermissionRole = async (_req:Request, res: Response) => {
    try{
        const {rows} = await pool.query(`
            SELECT 
                roles_gatos.id_rol,
                roles_gatos.rol_gatos AS role,
                permissions.id_permission,
                permissions.nombre AS permission

            FROM role_permissions
                
            JOIN roles_gatos
                ON role_permissions.id_rol = roles_gatos.id_rol
            JOIN permissions
                ON role_permissions.id_permission = permissions.id_permission

            ORDER BY roles_gatos.id_rol;
            
        `)

        return res.status(200).json(rows);
    }catch(error){
        console.error("Error al obtener roles y permisos")

        return res.status(500).json({
            error: 'Error al obtener roles y permisos'
        })
    }
}
export const crearPermissionRole = async  (req:Request, res: Response) =>{
    const { id_rol, id_permission } = req.body;

    try{
        await pool.query(`
                INSERT INTO role_permissions
                (id_rol, id_permission)
                VALUES ($1, $2)
            `,
            [id_rol, id_permission]
        );

        return res.status(201).json({
            message: "Permiso asignado al rol"
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({ error: "Error al crear los rol/ permiso" });
    }
}
export const eliminarPermissionRole = async (req:Request, res: Response) =>{
    const {idRol, idPermission} = req.body;

    try{
        const result = await pool.query(
        `
        DELETE FROM role_permissions 
        WHERE id_rol = $1 
        AND id_permission = $2 
        `,
        [idRol, idPermission]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Rol/permiso no encontrado' });
        }
        return res.status(200).json({"msg":"eliminando rol/permiso"})
    }catch(error){
            
            console.error(error);
            return res.status(500).json({ error: "Error al crear los rol/ permiso" });
    }
}