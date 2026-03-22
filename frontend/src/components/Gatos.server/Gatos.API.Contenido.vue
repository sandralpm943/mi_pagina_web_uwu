<script setup lang="ts">
    import { onMounted} from 'vue'
    import { useGatos } from '@/composables/usersgatos.composable';
     const {
        gatos,
        obtenerFGato,
        editarFGato,
        eliminarFGato,
        busqueda,
        gatosFiltrados
      } = useGatos()

    onMounted(()=> {
        obtenerFGato()
    
    })
</script>

<template>
    <div>
        <section class="metodoget">
            <div>
                <input
                type="text"
                v-model="busqueda"
                placeholder="Buscar por raza o personalidad..."
                />
            </div>
            <tr v-for="gato in gatosFiltrados" :key="gato.id">
                <td>{{ gato.id }}</td>
                <td>{{ gato.raza }}</td>
                <td>{{ gato.personalidad }}</td>
                <td>
                    <img :src="gato.imagen" alt="Gato" width="50" />
                </td>
                <td>
                    <button @click="editarFGato(gato)">Editar</button>
                </td>
                <td>
                    <button @click="eliminarFGato(gato.id)">🗑 Eliminar</button>
                </td>
            </tr>
            <h1>Metodo get</h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Raza</th>
                        <th>Personalidad</th>
                        <th>Descripcion</th>
                        <th>procedencia</th>
                        <th>datos curiosos</th>
                        <th>imagen</th>
                        <th>Fecha de creacion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="gato in gatos" :key="gato.id">
                        <td>{{gato.id }}</td>
                        <td>{{ gato.raza }}</td>
                        <td>{{ gato.personalidad }}</td>
                        <td>{{ gato.descripcion }}</td>
                        <td>{{ gato.procedencia }}</td>
                        <td>{{ gato.datos_curiosos }}</td>
                        <td><img
                        :src="`http://localhost:3000${gato.imagen}`"
                        alt="Imagen del gato!"
                        width="100">
                        
                        </td>
                        <td>{{ gato.create_at }}</td>
                        <td>
                        <button @click="eliminarFGato(gato.id)">🗑 Eliminar</button>
                        <button @click="editarFGato(gato)">✏️ Editar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<style scoped lang="scss">
    div{
    .metodoget{
      background-color: rgb(111, 198, 198);
    }
  }
</style>