<script setup lang="ts">
  import {ref, onMounted} from 'vue'
  import { useGatos } from '@/composables/usersgatos.composable';
  const {
    obtenerFGato,
    crearFGato,
    editarFGato,
    eliminarFGato,
    onFileChange,
    razaInput,
    personalidadInput,
    descripcionInput,
    procedenciaInput,
    datos_curiososInput,
    imagenPreview,
    gatos,
    modoFormulario,
    busqueda,
    gatosFiltrados
    
  } = useGatos()



  onMounted(()=> {
    obtenerFGato()
    
  })

  

  // const razaInput = ref<string>('')
  // const personalidadInput = ref<string>('')
  // const descripcionInput = ref<string>('')
  // const procedenciaInput = ref<string>('')
  // const datos_curiososInput = ref<string>('')

  // const imagenFile = ref<File | null>(null)
  // const imagenPreview = ref<string | null>(null)


  
  // const idSeleccionado = ref<number | null> (null);
  // const modoFormulario = ref<'crear' | 'editar'>('crear');

  
</script>

<template>
  <div>
    <form @submit.prevent="crearFGato">
      <h1>
    {{ modoFormulario === 'crear' 
        ? 'Creando un nuevo servidor' 
        : `Editando: ${razaInput}` }}
</h1>
      <label for="raza">raza</label>
      <input type="text" v-model="razaInput" placeholder="raza">
      <br>

      <label for="personalidad">personalidad</label>
      <input type="text" v-model="personalidadInput" placeholder="personalidad">
      <br>

      <label for="descripcion">descripcion</label>
      <input type="text" v-model="descripcionInput" placeholder="descripcion ">
      <br>

      <label for="procedencia">procedencia</label>
      <input type="text" v-model="procedenciaInput" placeholder="procedencia">
      <br>

      <label for="datos_curiosos">datos_curiosos</label>
      <input type="text" v-model="datos_curiososInput" placeholder="datos_curiosos">
      <br>

      <label for="imagen">imagen</label>
      <input type="file" @change="onFileChange" placeholder="imagen">

      <button type="submit">
    {{ modoFormulario === 'crear' ? 'Crear gato' : 'Actualizar gato' }}
</button>
      
    </form>
    <div>
      <p>raza: {{ razaInput }}</p>
      <p>personalidad: {{ personalidadInput }}</p>
      <p>descripcion:{{ descripcionInput }}</p>
      <p>procedencia:{{ procedenciaInput }}</p>
      <p>datos_curiosos:{{ datos_curiososInput }}</p>
      <img v-if="imagenPreview" :src="imagenPreview" alt="Vista previa" />
    </div>

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
  <h1 class="listatitulo">Lista de gatos</h1>
  <section class="lista">
    <article v-for="gato in gatos":key="gato.id">
      
      <img
              :src="`http://localhost:3000${gato.imagen}`"
              alt="Imagen del gato!"
              width="100">
      <div>
      <h2>{{ gato.raza }}</h2>
      <p class="personalidad">{{ gato.personalidad }}</p>
      </div>
    </article>
  </section>
</template>
<style scoped lang="scss">
  div{
    .metodoget{
      background-color: rgb(111, 198, 198);
    }
  }
  .listatitulo{
    text-align: center;
  }
  .lista{
    background-color: rgb(245, 201, 193);
    width: 100%;
    //height: 300px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    padding: 15px;
    justify-content: center;
    
    article{
      background-color: rgb(201, 91, 172);
      width: 300px;
      height: 550px;
      
      box-shadow: 5px 5px 5px black;
      border-radius: 10px 10px;
      img{
        width: 300px;
        height: 400px;
        
        object-fit: cover;
        border-radius: 10px 10px;
    
      }
    }

  }
  
</style>