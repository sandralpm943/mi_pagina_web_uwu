import {
obtenerRoles,
crearRoles,
editarRoles,
eliminarRoles
} from '@/api/roles.api'
import {ref} from 'vue'
import type { roles_gatos } from '@/types/roles_gatos.type';
export function useRoles() {
    
    const roles_gatos = ref<roles_gatos[]>([])

    const nombreRoles = ref<string>('')
    const modoFormularioroles = ref<'crear' | 'editar'>('crear');
    const idrolesSeleccionado = ref<number | null> (null);
    
    const resetRolesFormulario = () => {
        modoFormularioroles.value = 'crear';
        nombreRoles.value = '';
        idrolesSeleccionado.value = null;
    }
    const obtenerFRoles = async() => {
        try{
            roles_gatos.value = await obtenerRoles()
        }catch(error){
            console.error("error no se obtuvo los usuarios", error);
        }
    } 
    const crearFRoles = async() =>{
        
        try{
            let data = {
                rol_gatos: nombreRoles.value
            }
            if (modoFormularioroles.value === 'crear') {

                const enviar = await crearRoles(data)
            } else{
                if(!idrolesSeleccionado.value) {
                    console.error("No hay ID selecionada :(")
                    return
                }
                const editar = await editarRoles(idrolesSeleccionado.value,data)

                const index = roles_gatos.value.findIndex(s => s.id_rol === idrolesSeleccionado.value);
                if (index !== -1) {
                    roles_gatos.value.splice(index, 1, editar);
                }
            }
            
            resetRolesFormulario();

        }catch(error){
            console.error("error no se pudo crear  los permisos", error);
        }
    }
    const editarFroles = async(roles: roles_gatos) => {
        nombreRoles.value = roles.rol_gatos
        idrolesSeleccionado.value = roles.id_rol
        modoFormularioroles.value = 'editar'
    }
   const  eliminarFroles= async(id_permission:number) => {
    if (!confirm('¿Seguro que quieres eliminar este permiso?')) return
    try{
        await eliminarRoles(id_permission)
        roles_gatos.value = roles_gatos.value.filter(
            roles_gatos => roles_gatos.id_rol !== id_permission
        )
    }catch(error) {
        console.error('Error al eliminar rol gato', error)
    }
   }


    return{
        obtenerFRoles,
        roles_gatos,
        nombreRoles,
        crearFRoles,
        editarRoles,
        resetRolesFormulario,
        modoFormularioroles,
        editarFroles,
        eliminarFroles
    }
}