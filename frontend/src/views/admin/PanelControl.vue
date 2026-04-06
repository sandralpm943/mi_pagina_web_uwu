
<script setup lang="ts">
    import {ref, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth.composable';
import usuariosAPI from '@/components/controlPanel/usuarios.API.vue';


    
    

    const {
        adminData
    } = useAuth()


import {admin} from '@/api/auth.api'
    onMounted(() => {
        adminData()
    })

</script>




<template>
    <main>
        <h1>Panel Administrador</h1>
        <p>{{ admin }}</p>
        <usuariosAPI></usuariosAPI>
    </main>
</template>