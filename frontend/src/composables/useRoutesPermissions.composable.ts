import {
    obtenerRoutesPermissions,
    crearRoutePermiso,
    eliminarRoutesPermisos,
    editarRoutesPermisos
} from '@/api/Routespermissions.api'

import type { Routepermisos } from "@/types/routePermission.type"
import {ref} from 'vue'


export function  useRoutesPermissions() {
    const routePermiso = ref<Routepermisos[]>([])
    const input_RouteAPI = ref<string>('')
    const input_Method = ref<string>('')
    const input_R_IDPermission = ref<number | null> (null);
    const input_IsPublic = ref<boolean>(false)

    const modoFormularioRoutepermissions = ref<'crear' | 'editar'>('crear');
    const idpermissionRouteSeleccionado = ref<number | null> (null);

     const resetPermissionRoutesFormulario = () => {
        modoFormularioRoutepermissions.value = 'crear';
        input_RouteAPI.value = '';
        idpermissionRouteSeleccionado.value = null;
    }
    const obtenerFPermissionsRoutes = async() => {
        try{
            routePermiso.value = await obtenerRoutesPermissions()
        }catch(error){
            console.error("error no se obtuvo los routes permissions", error);
        }
    }
    const crearFPermissionsRoutes = async() =>{
        try{
            let data = {
                route: input_RouteAPI.value,
                method: input_Method.value,
                idPermission:input_R_IDPermission.value,
                is_public: input_IsPublic.value
            }
            if (modoFormularioRoutepermissions.value === 'crear') {

                const enviar = await crearRoutePermiso(data)
            } else{
                if(!idpermissionRouteSeleccionado.value) {
                    console.error("No hay ID selecionada :(")
                    return
                }
                const editar = await editarRoutesPermisos(idpermissionRouteSeleccionado.value,data)

                const index = routePermiso.value.findIndex(s => s.id_permission === idpermissionRouteSeleccionado.value);
                if (index !== -1) {
                    routePermiso.value.splice(index, 1, editar);
                }
            }
            
            resetPermissionRoutesFormulario();

        }catch(error){
            console.error("error no se pudo crear  los permisos routes", error);
        }
    } 
    const editarFRoutepermissions = async(Routepermiso: Routepermisos) => {
        input_RouteAPI.value= Routepermiso.route
        input_R_IDPermission.value = Routepermiso.id_permission
        input_Method.value=Routepermiso.method
        idpermissionRouteSeleccionado.value = Routepermiso.id_route_permission
        modoFormularioRoutepermissions.value = 'editar'
    }
    const  eliminarFRoutepermission= async(id_route_permission:number) => {
        if (!confirm('¿Seguro que quieres eliminar este permiso route?')) return
        try{
            await eliminarRoutesPermisos(id_route_permission)
            routePermiso.value = routePermiso.value.filter(
                routePermiso => routePermiso.id_route_permission !== id_route_permission
            );
        }catch(error) {
            console.error('Error al eliminar permiso route', error)
        }
    }
    return{
        obtenerFPermissionsRoutes,
        crearFPermissionsRoutes,
        editarFRoutepermissions,
        eliminarFRoutepermission,
        resetPermissionRoutesFormulario,
        routePermiso,
        modoFormularioRoutepermissions,
        input_RouteAPI,
        input_Method,
        input_R_IDPermission,
        input_IsPublic
    }
}

