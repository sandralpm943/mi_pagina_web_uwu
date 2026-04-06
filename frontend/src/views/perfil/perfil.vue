<script setup lang="ts">
    import {ref, onMounted } from 'vue';
    import GatosApicreate from '@/components/Gatos.server/Gatos.api.Edit.Create.vue';
    import GatosApicontenido from '@/components/Gatos.server/Gatos.API.Contenido.vue';
    import GatosApiArticulos from '@/components/Gatos.server/Gatos.API.Articulos.vue';
import { useAuth } from '@/composables/useAuth.composable';

const {
    obtenerPerfil,
    logout
} = useAuth()
import {user} from '@/api/auth.api'
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

        <GatosApicreate></GatosApicreate>
        <GatosApicontenido></GatosApicontenido>
        <GatosApiArticulos></GatosApiArticulos>
    </div>
</template>