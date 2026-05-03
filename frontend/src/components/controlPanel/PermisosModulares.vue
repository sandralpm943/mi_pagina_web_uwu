<script setup lang="ts">
    import { useRoutesPermissions } from '@/composables/useRoutesPermissions.composable';
    import { onMounted } from 'vue';

    const {
        obtenerFPermissionsRoutes,
        crearFPermissionsRoutes,
        eliminarFRoutepermission,
        editarFRoutepermissions,
        modoFormularioRoutepermissions,
        routePermiso,
        input_RouteAPI,
        input_Method,
        input_R_IDPermission,
        input_IsPublic
    } = useRoutesPermissions()
    
    onMounted(() =>{

        obtenerFPermissionsRoutes()
    })
</script>

<template>
    <div>
        <h1>Crear rutas</h1>
             <form @submit.prevent="crearFPermissionsRoutes">
            <input type="text" v-model="input_RouteAPI" placeholder="Escribe el Route API ">
            <input type="text" v-model="input_Method" placeholder="Escribe el method  ">
            <input type="text" v-model="input_R_IDPermission" placeholder="Escribe la ID permiso">
            <select v-model="input_IsPublic">
                <option :value="true">Publica</option>
                <option :value="false">Privada</option>
            </select>
            <button type="submit" >{{ modoFormularioRoutepermissions === 'crear' ? 'crear permiso' : 'Editar permiso' }}</button>
        </form>
        <h1>Tabla de rutas API</h1>
        <table>
            <thead>
                <tr>
                    <th>ID RouteAPI</th>
                    <th>RouteAPI</th>
                    <th>Method</th>
                    <th>ID Permiso</th>
                    <th>Es publico</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="routePermisos in routePermiso" :key="routePermisos.id_route_permission">
                    <td>{{ routePermisos.id_route_permission }}</td>
                    <td>{{ routePermisos.route }}</td>
                    <td>{{ routePermisos.method }}</td>
                    <td>{{ routePermisos.id_permission }}</td>
                    <td>{{ routePermisos.is_public }}</td>
                    <td><button @click="editarFRoutepermissions(routePermisos)">Editar</button></td>
                    <td><button @click="eliminarFRoutepermission(routePermisos.id_route_permission)" >Eliminar</button></td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>