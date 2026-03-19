import axios from 'axios'
import type { tiposDeGatos } from '@/types/gatos.types'

const API = "http://localhost:3000/api/tipos_de_gatos"

export const obtenerGato = async (): Promise<tiposDeGatos[]> => {
    const res = await axios.get(API)
    return res.data
}

export const crearGato = async (FormData: FormData): Promise<tiposDeGatos> => {
    const res = await axios.post(API, FormData)
    return res.data
}

export const editarGato = async (id: number , FormData: FormData): Promise<tiposDeGatos> => {
    const res = await axios.patch( `${API}/${id}`, FormData)
    return res.data
}

export const eliminarGato = async (id: number) => {
    const res = await axios.delete( `${API}/${id}`)
}

