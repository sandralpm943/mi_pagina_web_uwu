<script setup lang="ts">
    import {ref, onMounted } from 'vue';
    import axios from 'axios';



    const user = ref<{ id: string;  email: string; username: string; } | null>(null); 

    const obtenerPerfil = async () => {
        try {
            const {data} = await axios.get('http://localhost:3000/usuarios/perfil', {withCredentials: true})
            user.value = {
                id: "", 
                username: "",
                email: data.email
            };
            console.log(data.email);
        } catch(error) {
            console.error("No se pudo obtener el perfil", error);
        }
    }
    const token = "token";

    onMounted(() => {
        obtenerPerfil();
    })
    
    
    

</script>

<template>
    <div>
        <h1>Perfil</h1>

        <p>Usuario: {{ user?.username || "Cargando..." }}</p>
        <p>Email: {{ user?.email || "Cargando..."}}</p>
    </div>
</template>