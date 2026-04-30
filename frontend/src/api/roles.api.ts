import axios from 'axios'
const API = "http://localhost:3000/admin/roles"
import type { roles_gatos } from '@/types/roles_gatos.type'

export const obtenerRoles = async(): Promise<roles_gatos[]> => {
     const res = await axios.get(`${API}`, {withCredentials:true})
    return res.data;
}
export const crearRoles = async(data: object): Promise<roles_gatos> => {
    const res = await axios.post(
        `${API}`, 
        data,
        {withCredentials:true}
    )
     return res.data;
}
export const editarRoles = async (idrolesSeleccionado: number , data: object): Promise<roles_gatos> => {
 const res = await axios.patch(
    `${API}/${idrolesSeleccionado}`,
    data,
    {withCredentials:true}

)
return res.data
}
export const eliminarRoles = async(idrolesSeleccionado: number) => {
    const res = await axios.delete(`${API}/${idrolesSeleccionado}`,
     {withCredentials: true}
    )
}