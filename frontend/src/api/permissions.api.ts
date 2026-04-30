import axios from 'axios'
const API = "http://localhost:3000/admin/permisos"
import type { permisos } from '@/types/permisos.type'

export const obtenerPermissions = async(): Promise<permisos[]> => {
     const res = await axios.get(`${API}`, {withCredentials:true})
    return res.data;
}
export const crearPermissions = async(data: object): Promise<permisos> => {
    const res = await axios.post(
        `${API}`, 
        data,
        {withCredentials:true}
    )
     return res.data;
}
export const editarPermission = async (idpermisoSeleccionado: number , data: object): Promise<permisos> => {
 const res = await axios.patch(
    `${API}/${idpermisoSeleccionado}`,
    data,
    {withCredentials:true}

)
return res.data
}
export const eliminarPermission = async(idpermisoSeleccionado: number) => {
    const res = await axios.delete(`${API}/${idpermisoSeleccionado}`,
     {withCredentials: true}
    )
}