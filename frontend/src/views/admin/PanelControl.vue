
<script setup lang="ts">
    import {ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const admin = ref("");

    const adminData = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/usuarios/admin/data', {withCredentials: true})
            admin.value = data.secretData 
        }catch (error:any){
            
            if(error.response?.status === 401) {
                router.push("/")
            }
            if(error.response?.status === 403) {
                router.push("/perfil")
            }
            
            
        }   
    }

    onMounted(() => {
        adminData()
    })

</script>




<template>
    <main>
        <h1>Panel Administrador</h1>
        <p>{{ adminData }}</p>

    </main>
</template>