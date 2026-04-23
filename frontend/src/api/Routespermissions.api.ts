import axios from 'axios'
const API = "http://localhost:3000/routespermisos"
import type { Routepermisos } from '@/types/routePermission.type'

export const obtenerRoutesPermissions = async(): Promise<Routepermisos[]> => {
     const res = await axios.get(`${API}`);
    return res.data;
}
export const crearRoutePermiso = async(data: object): Promise<Routepermisos> => {
    const res = await axios.post(
        `${API}`, 
        data
        //{withCredentials:true}
    );
     return res.data;
}
export const editarRoutesPermisos = async (idPermissionsRSeleccionado: number , data: object): Promise<Routepermisos> => {
 const res = await axios.patch(
    `${API}/${idPermissionsRSeleccionado}`,
    data
    //{withCredentials:true}

)
return res.data
}
 export const eliminarRoutesPermisos = async(idPermissionsRSeleccionado: number) => {
     const res = await axios.delete(`${API}/${idPermissionsRSeleccionado}`
      //{withCredentials: true}
     )
}