import axios from 'axios'
const API = "http://localhost:3000/admin/permisosyroles"
import type { role_permission } from '@/types/role_permission.type'

export const obtenerRolyPermiso = async(): Promise<role_permission[]> => {
     const res = await axios.get(`${API}`, {withCredentials:true});
    return res.data;
}
export const crearRolyPermiso = async(data: object): Promise<role_permission> => {
    const res = await axios.post(
        `${API}`, 
        data,
        {withCredentials:true}
    );
     return res.data;
}
// export const editarRolesyPermisos = async (idrolesSeleccionado: number , data: object): Promise<role_permission> => {
//  const res = await axios.patch(
//     `${API}/${idrolesSeleccionado}`,
//     data
//     //{withCredentials:true}

// )
// return res.data
// }
 export const eliminarRolesyPermisos = async(idrolesSeleccionado: number, idpermissionSeleccionado:number) => {
     const res = await axios.delete(`${API}/${idrolesSeleccionado}/${idpermissionSeleccionado}`,
      {withCredentials: true}
     )
}