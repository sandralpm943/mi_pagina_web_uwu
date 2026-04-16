<script setup lang="ts">
import { onMounted } from 'vue';
import { usePernissions } from '@/composables/usePermissions.composable';
import { useRoles } from '@/composables/useRoles.composable';
import { useRolPermiso } from '@/composables/useRolesyPermisos.composable';


const {
    permisos,
    obtenerFPermissions,
    crearFPermissions,
    nombrePermiso,
    modoFormulariopermissions,
    editarFpermissions,
    eliminarFpermission,
    
} = usePernissions()

const {
    roles_gatos,
    obtenerFRoles,
    crearFRoles,
    editarFroles,
    eliminarFroles,
    nombreRoles,
    modoFormularioroles
    
} = useRoles()
const {
    obtenerFRolesPermissions,
    crearFRolesPermission,
    role_permission,
    input_IdRol,
    input_IdPermission
} = useRolPermiso()
onMounted(() =>{
    obtenerFPermissions(),
    obtenerFRoles(),
    obtenerFRolesPermissions()
    
})
</script>
<template>
    <div>
        

        <h1>Tabla de Permisos</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre permission</th>
                    <th>Id permission</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="permiso in permisos" :key="permiso.id_permission">
                    <td>{{ permiso.id_permission }}</td>
                    <td>{{ permiso.nombre }}</td>
                    <td><button @click="editarFpermissions(permiso)" >Editar</button></td>
                    <td><button @click="eliminarFpermission(permiso.id_permission)" >Eliminar</button></td>
                </tr>
            </tbody>
        </table>
        <form @submit.prevent="crearFPermissions">
            <input type="text" v-model="nombrePermiso" placeholder="Escribe el permiso ">
            <button type="submit" >{{ modoFormulariopermissions === 'crear' ? 'crear permiso' : 'Editar permiso' }}</button>
        </form>

        <h1>Tabla de roles</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre permission</th>
                    <th>Id permission</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="roles_gato in roles_gatos" :key="roles_gato.id_rol">
                    <td>{{ roles_gato.id_rol }}</td>
                    <td>{{ roles_gato.rol_gatos }}</td>
                    <td><button @click="editarFroles(roles_gato)" >Editar</button></td>
                    <td><button @click="eliminarFroles(roles_gato.id_rol)" >Eliminar</button></td>
                </tr>
            </tbody>
        </table>
        <form @submit.prevent="crearFRoles">
            <input type="text" v-model="nombreRoles" placeholder="Escribe el permiso ">
            <button type="submit" >{{ modoFormularioroles === 'crear' ? 'crear roles' : 'Editar roles' }}</button>
        </form>

        <h1>Lista de permisos y roles</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre rol</th>
                    <th>Id rol</th>
                    <th>Nombre permission</th>
                    <th>Id permission</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="RP in role_permission" :key="RP.id_rol + '-' + RP.id_permission">
                    <td>{{ RP.role }}</td>
                    <td>{{ RP.id_rol }}</td>
                    <td>{{ RP.permission }}</td>
                    <td>{{ RP.id_permission }}</td>
                </tr>
            </tbody>
        </table>
         <form @submit.prevent="crearFRolesPermission">
            <input type="text" v-model="input_IdPermission" placeholder="Escribe el permiso id ">
            <input type="text" v-model="input_IdRol" placeholder="Escribe el rol id  ">
            <button type="submit" >Crear</button>
        </form>
    </div>
</template>