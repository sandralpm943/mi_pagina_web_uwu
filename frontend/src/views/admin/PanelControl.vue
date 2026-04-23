
<script setup lang="ts">
    import {ref, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth.composable';
import usuariosAPI from '@/components/controlPanel/usuarios.API.vue';
import PermisosYRoles from '@/components/controlPanel/PermisosYRoles.vue';


    
    

    const {
        adminData
    } = useAuth()


import {admin} from '@/api/auth.api'
import PermisosModulares from '@/components/controlPanel/PermisosModulares.vue';
    onMounted(() => {
        adminData()
    })

</script>




<template>
    <main>
        <h1>Panel Administrador</h1>
        <p>{{ admin }}</p>
        <usuariosAPI></usuariosAPI>
        <PermisosYRoles></PermisosYRoles>
        <PermisosModulares></PermisosModulares>
    </main>
</template>