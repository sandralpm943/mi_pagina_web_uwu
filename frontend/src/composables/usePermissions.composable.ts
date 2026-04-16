import {
obtenerPermissions,
crearPermissions,
editarPermission,
eliminarPermission
} from '@/api/permissions.api'
import {ref} from 'vue'
import type { permisos } from '@/types/permisos.type';
export function usePernissions() {
    
    const permisos = ref<permisos[]>([])

    const nombrePermiso = ref<string>('')
    const modoFormulariopermissions = ref<'crear' | 'editar'>('crear');
    const idpermisoSeleccionado = ref<number | null> (null);
    
    const resetPermissionFormulario = () => {
        modoFormulariopermissions.value = 'crear';
        nombrePermiso.value = '';
        idpermisoSeleccionado.value = null;
    }
    const obtenerFPermissions = async() => {
        try{
            permisos.value = await obtenerPermissions()
        }catch(error){
            console.error("error no se obtuvo los usuarios", error);
        }
    } 
    const crearFPermissions = async() =>{
        
        try{
            let data = {
                nombre: nombrePermiso.value
            }
            if (modoFormulariopermissions.value === 'crear') {

                const enviar = await crearPermissions(data)
            } else{
                if(!idpermisoSeleccionado.value) {
                    console.error("No hay ID selecionada :(")
                    return
                }
                const editar = await editarPermission(idpermisoSeleccionado.value,data)

                const index = permisos.value.findIndex(s => s.id_permission === idpermisoSeleccionado.value);
                if (index !== -1) {
                    permisos.value.splice(index, 1, editar);
                }
            }
            
            resetPermissionFormulario();

        }catch(error){
            console.error("error no se pudo crear  los permisos", error);
        }
    }
    const editarFpermissions = async(permiso: permisos) => {
        nombrePermiso.value = permiso.nombre
        idpermisoSeleccionado.value = permiso.id_permission
        modoFormulariopermissions.value = 'editar'
    }
   const  eliminarFpermission= async(id_permission:number) => {
    if (!confirm('¿Seguro que quieres eliminar este permiso?')) return
    try{
        await eliminarPermission(id_permission)
        permisos.value = permisos.value.filter(
            permiso => permiso.id_permission !== id_permission
        )
    }catch(error) {
        console.error('Error al eliminar permiso', error)
    }
   }


    return{
        obtenerFPermissions,
        permisos,
        nombrePermiso,
        crearFPermissions,
        editarPermission,
        resetPermissionFormulario,
        modoFormulariopermissions,
        editarFpermissions,
        eliminarFpermission
    }
}