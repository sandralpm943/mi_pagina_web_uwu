<script setup lang="ts">
    import {ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    const router = useRouter()

    const user = ref<{ id: string;  email: string; username: string; } | null>(null); 

    const obtenerPerfil = async () => {
        try {
            const {data} = await axios.get('http://localhost:3000/usuarios/perfil', {withCredentials: true})
            user.value = {
                id: "", 
                username: data.gato.username,
                email: data.gato.email
            };
            console.log(data.gato);
        } catch(error) {
            console.error("No se pudo obtener el perfil", error);
            router.push('/')
        }
    }
    const token = "token";

    const logout = async () => {
        try{
             const logout = await axios.post('http://localhost:3000/usuarios/logout',{}, {withCredentials: true})
            router.push('/')
        }catch(error){
            console.error("error de cerrar sesion", error)
        }
    }

    onMounted(() => {
        obtenerPerfil();
    })
    
    
    

</script>

<template>
    <div>
        <h1>Perfil</h1>

        <p>Usuario: {{ user?.username || "Cargando..." }}</p>
        <p>Email: {{ user?.email || "Cargando..."}}</p>

        <button @click="logout">Cerrar sesion</button>
    </div>
</template>