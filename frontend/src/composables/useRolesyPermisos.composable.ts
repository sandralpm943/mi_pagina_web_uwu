import {
obtenerRolyPermiso,
crearRolyPermiso,
eliminarRolesyPermisos  
} from '@/api/rolesypermisos.api'
import {ref} from 'vue'
import type { role_permission } from '@/types/role_permission.type';

export function useRolPermiso() {
    
    const role_permission = ref<role_permission[]>([])

    const input_IdRol = ref<number | null>(null);

    const input_IdPermission = ref<number | null> (null);
    
    const resetRolesPermissionFormulario = () => {
       
        input_IdRol.value = null;
        input_IdPermission.value = null;
    }
    const obtenerFRolesPermissions = async() => {
        try{
            role_permission.value = await obtenerRolyPermiso()
        }catch(error){
            console.error("error no se obtuvo los roles permissions", error);
        }
    } 
    const crearFRolesPermission = async() =>{
        
        try{
            let data = {
                id_rol: input_IdRol.value,
                id_permission: input_IdPermission.value
            }

            const enviar = await crearRolyPermiso(data)

            resetRolesPermissionFormulario();

        }catch(error){
            console.error("error no se pudo crear  los permisos", error);
        }
    }
//     const editarFroles = async(roles: roles_gatos) => {
//         nombreRoles.value = roles.rol_gatos
//         idrolesSeleccionado.value = roles.id_rol
       
//     }
  const  eliminarFRolesPermisos= async(id_permission:number,id_rol:number) => {
        if (!confirm('¿Seguro que quieres eliminar este permiso?')) return
        try{
         await eliminarRolesyPermisos(id_permission,id_rol)
        role_permission.value = role_permission.value.filter(
             rp => 
                !(
                    rp.id_rol === id_rol &&
                    rp.id_permission === id_permission
                )
         );
     }catch(error) {
         console.error('Error al eliminar rol gato', error)
     }
    }


    return{
        obtenerFRolesPermissions,
        role_permission,
        input_IdRol,
        input_IdPermission,
        crearFRolesPermission,
        eliminarFRolesPermisos
        
    }
}