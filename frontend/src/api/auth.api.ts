import axios from 'axios'
import {ref,onMounted} from 'vue'

const API = "http://localhost:3000/auth"


const routes = [
    "/login", //0
    "/registrarse",//1
    "/perfil",//2
    "/logout",//3
    "/admin/data" //4
]

export const admin = ref("");
export const user = ref<{ id: string;  email: string; username: string; } | null>(null); 
export const lemail = ref<string>('');
export const lpassword = ref<string>('');

export const rusername = ref<string>('');
export const remail = ref<string>('');
export const rpassword = ref<string>('');
let data;

export const loginAPI = async() =>{
    const resAPI= await axios.post(
        `${API}${routes[0]}`,
        
        {
            email: lemail.value,
              password: lpassword.value
        },
        {
              withCredentials:true
        }
    )
    data =resAPI.data
}
export const registroAPI = async() => {
    
    const resAPI = await axios.post(
        `${API}${routes[1]}`, 
        {
            username: rusername.value,
            email: remail.value,
            password: rpassword.value
        }
    );
    data = resAPI.data;
}

export const obtenerperfilAPI = async() => {
    const {data} = await axios.get(
        `${API}${routes[2]}`, 
        {withCredentials: true}
    )
    user.value = {
        id: "", 
        username: data.gato.username,
        email: data.gato.email
    };
    console.log(data.gato);
}
export const logoutAPI = async () => {
    const resAPI= await axios.post(
        `${API}${routes[3]}`,
        {},
        {withCredentials: true}
    )
}
export const adminDataAPI= async () => {
        
    const {data} = await axios.get(
        `${API}${routes[4]}`,
        {withCredentials: true}
    )
    admin.value = data.secretData 
    
}   
    
