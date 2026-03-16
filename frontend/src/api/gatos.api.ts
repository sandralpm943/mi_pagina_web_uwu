import axios from 'axios'
import { tipos_de_gatos } from '@/types/gatos.types'

const API = "http://localhost:3000/api/tipos_de_gatos"

export const obtenerGato = async (): Promise<tipos_de_gatos[]> => {
    const res = await axios.get(API)
    return res.data
}

export const crearGato = async (fromData: fromData): Promise<tipos_de_gatos[]> => {
    const res = await axios.post(API, fromData)
    return res.data
}

export const editarGato = async (id: number , fromData: fromData): Promise<tipos_de_gatos[]> => {
    const res = await axios.patch( `${API}/${id}`, fromData)
    return res.data
}

export const eliminarGato = async (id: number) => {
    const res = await axios.patch( `${API}/${id}`)
}