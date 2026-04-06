import {ref,onMounted} from 'vue'
 import { useRouter } from 'vue-router';
import {loginAPI ,registroAPI,obtenerperfilAPI,logoutAPI, adminDataAPI} from '@/api/auth.api'

export function useAuth() {
  const router = useRouter()

  //errores:

  const errorLogin = ref("")
  const errorRegistro = ref("")
    
  const logearse = async() => {
        try{
          errorLogin.value = ""; //limpia errores anteriores

          const login = await loginAPI();
          console.log('Enviado correctamente:', login);
          router.push('/perfil')
        }catch(error:any) {
          console.error('Error al iniciar ', error)
          errorLogin.value = error.response?.data?.msg || "Error inesperado al iniciar sesion";
        }
        
    }
    const registrarse = async() => {
        try{

          errorRegistro.value = ""; //limpiar errores
          const registro = await registroAPI();
          console.log('Enviado correctamente:', registro);
        }catch(error: any) {

          console.error('Error al iniciar ', error)
        if(error.response?.data?.errors) {
          errorRegistro.value= error.response?.data?.errors 
          .map((e:any)=> e.msg)
          .join(", ");
        }else{
         errorRegistro.value = "Error inesperado al registrarse";
        }
          
        }
        
    }
        const obtenerPerfil = async () => {
        try {
            const res = await obtenerperfilAPI();
            
        } catch(error) {
            console.error("No se pudo obtener el perfil", error);
            router.push('/')
        }
    }

    const logout = async () => {
        try{
             const res= await logoutAPI();
            router.push('/')
        }catch(error){
            console.error("error de cerrar sesion", error)
        }
    }
    const adminData = async () => {
      try{
        const res = await adminDataAPI();
     }catch (error:any){
            
            if(error.response?.status === 401) {
                router.push("/")
            }
            if(error.response?.status === 403) {
                router.push("/perfil")
            }
          }
    }
    return {
        errorLogin,
        errorRegistro,
        logearse,
        registrarse,
        logout,
        obtenerPerfil,
        adminData
    }


}
