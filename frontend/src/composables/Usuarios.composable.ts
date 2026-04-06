import type { usuarios } from '@/types/usuarios.types'
import {ref} from 'vue'
import { obtenerUsuarios } from '@/api/usuarios.api'

export const input_Usuario = ref<string>('')
export const input_email = ref<string>('')
export const input_id_rol = ref<string>('')
export const input_verified = ref<string>('')

export function useUsuarios() {

const usuarios = ref<usuarios[]>([])
   const obtenerfUsuarios = async() => {
    try{
        usuarios.value = await obtenerUsuarios()
    }catch (error){
        console.error("error no se obtuvo los usuarios", error)
    }
   } 
   return {
    usuarios,
    obtenerfUsuarios
   }
}
