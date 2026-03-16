import { pool } from "../db"

const getUserPermissions = async (email:string): Promise<string[]> => {
    const result = await pool.query(
        `
        SELECT permissions.nombre
        FROM usuarios_de_gatos
        JOIN roles_gatos ON usuarios_de_gatos.id_rol = roles_gatos.id_rol
        JOIN role_permissions ON roles_gatos.id_rol = role_permissions.id_rol
        JOIN permissions ON role_permissions.id_permission = permissions.id_permission
        WHERE usuarios_de_gatos.email = $1;
        `,
        [email]
    )
    return result.rows.map(row => row.nombre)
}
export default{
    getUserPermissions
}