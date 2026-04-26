import { pool } from "../db"

const userHasPermission = async (userId: number, route: string, method: string): Promise<boolean> => {
    const result = await pool.query(
        `
        SELECT 1
                    
                    FROM usuarios_de_gatos

                    JOIN role_permissions
                        ON usuarios_de_gatos.id_rol = role_permissions.id_rol
                    JOIN route_permissions
                        ON role_permissions.id_permission = route_permissions.id_permission
                    WHERE usuarios_de_gatos.id = $1
                    AND route_permissions.route = $2
                    AND route_permissions.method = $3
                    `,
                    [userId,route,method]
    )
   
    return result.rowCount !== 0;
}
export default{
    userHasPermission
}