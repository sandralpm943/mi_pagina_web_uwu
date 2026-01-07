<script setup lang="ts">
  import axios from 'axios'
  import {ref,onMounted} from 'vue'


  const raza = ref<string>('')
  const personalidad = ref<string>('')
  const descripcion = ref<string>('')
  const procedencia = ref<string>('')
  const datos_curiosos = ref<string>('')

  const imagenFile = ref<File | null>(null)
  const imagenPreview = ref<string | null>(null)

  const onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement

    if (input.files && input.files.length > 0) {
      const file = input.files[0]

      imagenFile.value = file              // 👈 ARCHIVO REAL
      imagenPreview.value = URL.createObjectURL(file) // 👈 PREVIEW
    }
  }

  const enviar_formulario = async() => {
    try{
      if (!imagenFile.value) {
          alert('Falta la imagen')
          return
      }
      const formData = new FormData()

        formData.append('raza', raza.value)
        formData.append('personalidad', personalidad.value)
        formData.append('descripcion',descripcion.value)
        formData.append('procedencia',procedencia.value)
        formData.append('datos_curiosos',datos_curiosos.value)
        formData.append('imagen', imagenFile.value)
      
      const postear= await axios.post('http://localhost:3000/api/tipos_de_gatos', formData)
      console.log('Enviado correctamente', postear.data)
    }
    catch (error){
      console.error('Error al obtener datos', error)
    }
    

  }


  const tipos_de_gatos = ref<{id: number,raza: string, personalidad: string,descripcion: string, procedencia: string, datos_curiosos: string, imagen: string, create_at: string}[]>([])
  
  const obtener_Datos = async()=> {
    try{
      const obtener = await axios.get('http://localhost:3000/api/tipos_de_gatos')
      tipos_de_gatos.value = obtener.data
    }
    catch(error){
      console.error('Error al obtener datos', error)
    }
    
  }
  onMounted(() => {
    obtener_Datos()
  })
</script>

<template>
  <div>
    <h1>Tipos de gatitos POST</h1>
    <form @submit.prevent="enviar_formulario">
      <label for="">raza</label>
      <input type="text" v-model="raza" placeholder="raza">
      <br>

      <label for="">personalidad</label>
      <input type="text" v-model="personalidad" placeholder="personalidad">
      <br>

      <label for="">descripcion</label>
      <input type="text" v-model="descripcion" placeholder="descripcion ">
      <br>

      <label for="">procedencia</label>
      <input type="text" v-model="procedencia" placeholder="procedencia">
      <br>

      <label for="">datos_curiosos</label>
      <input type="text" v-model="datos_curiosos" placeholder="datos_curiosos">
      <br>

      <label for="">imagen</label>
      <input type="file" @change="onFileChange" placeholder="imagen">

      <button type="submit">Enviar</button>
      
    </form>
    <div>
      <p>raza: {{ raza }}</p>
      <p>personalidad: {{ personalidad }}</p>
      <p>descripcion:{{ descripcion }}</p>
      <p>procedencia:{{ procedencia }}</p>
      <p>datos_curiosos:{{ datos_curiosos }}</p>
      <img v-if="imagenPreview" :src="imagenPreview" alt="Vista previa" />
    </div>

    <section class="metodoget">
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
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
