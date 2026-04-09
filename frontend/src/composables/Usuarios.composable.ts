import type { usuarios } from '@/types/usuarios.types'
import {ref} from 'vue'
import { eliminarUsuario, obtenerUsuarios, enviarUsuarios } from '@/api/usuarios.api'

export const input_Usuario = ref<string>('')
export const input_email = ref<string>('')
export const input_id_rol = ref<number>()
export const input_verified = ref<boolean>()

export function useUsuarios() {

    const idusuarioSel = ref<number | null> (null);
    const usuarios = ref<usuarios[]>([])
    const obtenerfUsuarios = async() => {
        try{
            
            usuarios.value = await obtenerUsuarios();
        }catch (error){
            console.error("error no se obtuvo los usuarios", error);
            console.log('Obtener usuario debug', obtenerUsuarios())
        }
    } 
    const enviarFUsuarios = async() => {
        try{
            if (!idusuarioSel.value){
                console.error("No hay ID seleccionada")
                return
            }
            let inputsData = {
                username:input_Usuario.value,
                email:input_email.value,
                id_rol:input_id_rol.value,
                verefied:input_verified.value
            }
            const enviar = await enviarUsuarios(idusuarioSel.value,inputsData)
            
                const index = usuarios.value.findIndex(s => s.id === idusuarioSel.value);
                if (index !== -1) {
                    usuarios.value.splice(index, 1, enviar);
                }
            
        }catch(error){
            console.error('Error al editar usuario', error)
        }
    }
    const editarFUsuarios = async(usuario: usuarios) => {
        try{
            input_Usuario.value = usuario.username;
            input_email.value = usuario.email;
            input_id_rol.value = usuario.id_rol;
            input_verified.value = usuario.verified;

            idusuarioSel.value = usuario.id
        }catch(error){
            console.error('Error al imprimir datos en el input', error)
        }
    }


    const eliminarFUsuario = async(id:number) => {
        const confirmar = confirm('Seguro que quieres eliminar este usuario?');
        if(!confirmar) return;

        try{
           await eliminarUsuario(id);

            //quitar de la lista sin volver a pedir todo
            usuarios.value = usuarios.value.filter(
                usuarios => usuarios.id !== id
            );
        }catch(error){
            console.error('Error al eliminar el usuario', error)
            alert('No se ha podido eliminar el usuario');

        }
    }

    return {
        usuarios,
        obtenerfUsuarios,
        eliminarFUsuario,
        enviarFUsuarios,
        editarFUsuarios
    }   
}
