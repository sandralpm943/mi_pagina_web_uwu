<script setup lang="ts">
  import axios from 'axios'
  import {ref,onMounted} from 'vue'
  import { computed } from 'vue'


  const razaInput = ref<string>('')
  const personalidadInput = ref<string>('')
  const descripcionInput = ref<string>('')
  const procedenciaInput = ref<string>('')
  const datos_curiososInput = ref<string>('')

  const imagenFile = ref<File | null>(null)
  const imagenPreview = ref<string | null>(null)

  const tipos_de_gatos = ref<{
    id: number,
    raza: string,
    personalidad: string,
    descripcion: string,
    procedencia: string,
    datos_curiosos: string,
    imagen: string,
    create_at: string
  }[]>([])
  
  const idSeleccionado = ref<number | null> (null);
  const modoFormulario = ref<'crear' | 'editar'>('crear');

  const onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement

    if (input.files && input.files.length > 0) {
      const file = input.files[0]

      imagenFile.value = file              // 👈 ARCHIVO REAL
      imagenPreview.value = URL.createObjectURL(file) // 👈 PREVIEW
    }
  }

  const resetFormulario = () => {
    razaInput.value = '';
    personalidadInput.value = '';
    descripcionInput.value = '';
    procedenciaInput.value = '';
    datos_curiososInput.value = '';
    imagenFile.value = null;
    imagenPreview.value = null;

    idSeleccionado.value = null;
    modoFormulario.value = 'crear';
  };

  
  const enviar_formulario = async() => {
    try{
     
      const formData = new FormData()

      formData.append('raza', razaInput.value)
      formData.append('personalidad', personalidadInput.value)
      formData.append('descripcion',descripcionInput.value)
      formData.append('procedencia',procedenciaInput.value)
      formData.append('datos_curiosos',datos_curiososInput.value)

      if(imagenFile.value)formData.append('imagen', imagenFile.value)
      
      let data;

      if (modoFormulario.value === 'crear') {
        // POST
        if (!imagenFile.value) {
          alert('Falta la imagen')
          return
        }
        const postear = await axios.post('http://localhost:3000/api/tipos_de_gatos', formData);
        data = postear.data;
        console.log('Enviado correctamente:', postear.data);

        // Agregar a la lista local
        tipos_de_gatos.value.push(data);

      } else {
        // PATCH
        const res = await axios.patch(
          `http://localhost:3000/api/tipos_de_gatos/${idSeleccionado.value}`,
          formData
        );
        data = res.data;

        // Actualizar la lista local
        // const index = servidores.value.findIndex(s => s.id === idSeleccionado.value);
        // if (index !== -1) servidores.value[index] = data;


        // Actualizar la lista local de forma reactiva
        const index = tipos_de_gatos.value.findIndex(s => s.id === idSeleccionado.value);
        if (index !== -1) {
          tipos_de_gatos.value.splice(index, 1, data);
        }

      }

      // Resetear formulario
      resetFormulario();
    }
    catch (error){
      console.error('Error al obtener datos', error)
    }
    

  }



  
  const obtener_Datos = async()=> {
    try{
      const obtener = await axios.get('http://localhost:3000/api/tipos_de_gatos')
      tipos_de_gatos.value = obtener.data
    }
    catch(error){
      console.error('Error al obtener datos', error)
    }
    
  }
  
  const eliminarGato = async(id: number)=> {
    if (!confirm('¿Seguro que quieres eliminar este gato?')) return

    try {
      await axios.delete(
        `http://localhost:3000/api/tipos_de_gatos/${id}`
      )

      // 🔥 Quitar el gato eliminado de la tabla
      tipos_de_gatos.value = tipos_de_gatos.value.filter(
        gato => gato.id !== id
      )

      console.log('Gato eliminado')
    } catch (error) {
      console.error('Error al eliminar gato', error)
    }
  }

  const editarGato = (tipo_de_gato: typeof tipos_de_gatos.value[0]) => {
    // Llenar inputs
    razaInput.value = tipo_de_gato.raza;
    personalidadInput.value = tipo_de_gato.personalidad;
    descripcionInput.value = tipo_de_gato.descripcion;
    procedenciaInput.value = tipo_de_gato.procedencia;
    datos_curiososInput.value = tipo_de_gato.datos_curiosos;
    imagenPreview.value = `http://localhost:3000${tipo_de_gato.imagen}`;
    imagenFile.value = null; // Solo si quiere reemplazar

    // Cambiar modo a editar
    idSeleccionado.value = tipo_de_gato.id;
    modoFormulario.value = 'editar';
  };

const busqueda = ref<string>('')

// Computed para filtrar según busqueda
const gatosFiltrados = computed(() => {
  if (!busqueda.value) return tipos_de_gatos.value
  const term = busqueda.value.toLowerCase()
  return tipos_de_gatos.value.filter(gato =>
    gato.raza.toLowerCase().includes(term) ||
  gato.personalidad.toLowerCase().includes(term) ||
  gato.descripcion.toLowerCase().includes(term) ||
  gato.datos_curiosos.toLowerCase().includes(term)
  )
})

  onMounted(() => {
    obtener_Datos()
  })
</script>

<template>
  <div>
    <form @submit.prevent="enviar_formulario">
      <h1>
    {{ modoFormulario === 'crear' 
        ? 'Creando un nuevo servidor' 
        : `Editando: ${razaInput}` }}
</h1>
      <label for="">raza</label>
      <input type="text" v-model="razaInput" placeholder="raza">
      <br>

      <label for="">personalidad</label>
      <input type="text" v-model="personalidadInput" placeholder="personalidad">
      <br>

      <label for="">descripcion</label>
      <input type="text" v-model="descripcionInput" placeholder="descripcion ">
      <br>

      <label for="">procedencia</label>
      <input type="text" v-model="procedenciaInput" placeholder="procedencia">
      <br>

      <label for="">datos_curiosos</label>
      <input type="text" v-model="datos_curiososInput" placeholder="datos_curiosos">
      <br>

      <label for="">imagen</label>
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
        <button @click="editarGato(gato)">Editar</button>
      </td>
      <td>
        <button @click="eliminarGato(gato.id)">🗑 Eliminar</button>
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
          <tr v-for="tipo_de_gato in tipos_de_gatos" :key="tipo_de_gato.id">
            <td>{{tipo_de_gato.id }}</td>
            <td>{{ tipo_de_gato.raza }}</td>
            <td>{{ tipo_de_gato.personalidad }}</td>
            <td>{{ tipo_de_gato.descripcion }}</td>
            <td>{{ tipo_de_gato.procedencia }}</td>
            <td>{{ tipo_de_gato.datos_curiosos }}</td>
            <td><img
              :src="`http://localhost:3000${tipo_de_gato.imagen}`"
              alt="Imagen del gato!"
              width="100">
            
            </td>
            <td>{{ tipo_de_gato.create_at }}</td>
            <td>
              <button @click="eliminarGato(tipo_de_gato.id)">🗑 Eliminar</button>
              <button @click="editarGato(tipo_de_gato)">✏️ Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
