import axios from 'axios'
import type { tiposDeGatos } from '@/types/gatos.types'

//const API = "http://localhost:3000/api/tipos_de_gatos"
const API2 = "http://localhost:3000/admin/tipos_de_gatos"   
export const obtenerGato = async (): Promise<tiposDeGatos[]> => {
    const res = await axios.get(API2 , {withCredentials: true})
    return res.data
}

export const crearGato = async (FormData: FormData): Promise<tiposDeGatos> => {
    const res = await axios.post(API2, FormData , {withCredentials: true})
    return res.data
}

export const editarGato = async (id: number , FormData: FormData): Promise<tiposDeGatos> => {
    const res = await axios.patch( `${API2}/${id}`, FormData , {withCredentials: true})
    return res.data
}

export const eliminarGato = async (id: number) => {
    const res = await axios.delete( `${API2}/${id}`, {withCredentials: true})
}

