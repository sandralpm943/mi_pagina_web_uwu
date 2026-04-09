<script setup lang="ts">
import { onMounted } from 'vue';
import {input_email, input_id_rol, input_Usuario, input_verified, useUsuarios} from '../../composables/Usuarios.composable'
const {
    obtenerfUsuarios,
    usuarios,
    eliminarFUsuario,
    editarFUsuarios, 
    enviarFUsuarios
} = useUsuarios()
onMounted(() =>{
    obtenerfUsuarios()
})
</script>
<template>
    <div>
        <form @submit.prevent="enviarFUsuarios">

            <h1>Editar</h1>

            <label for="">Usuario</label>
            <input type="text" v-model="input_Usuario" placeholder="Usuario">

            <label for="">Email</label>
            <input type="text" v-model="input_email" placeholder="Email">

            <label for="">id_rol</label>
            <input type="text" v-model="input_id_rol" placeholder="id_rol">

            <label for="">verified</label>
            <input type="text" v-model="input_verified" placeholder="verified" >
            <button type="submit">Enviar</button>
        </form>
        <h1>Lista usuarios</h1>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Create_at</th>
                    <th>id_rol</th>
                    <th>verified</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.username }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ usuario.create_at }}</td>
                    <td> {{ usuario.id_rol }}</td>
                    <td>{{ usuario.verified }}</td>
                    <td>
                        <button @click="eliminarFUsuario(usuario.id)">Eliminar</button>
                    </td>
                    <td>
                        <button @click="editarFUsuarios(usuario)">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>