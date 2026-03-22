<script setup lang="ts">
  import {ref, onMounted} from 'vue'
  import { useGatos } from '@/composables/usersgatos.composable';

  const {
    obtenerFGato,
    crearFGato,
    onFileChange,
    razaInput,
    personalidadInput,
    descripcionInput,
    procedenciaInput,
    datos_curiososInput,
    imagenPreview,
    modoFormulario,
  } = useGatos()

      onMounted(()=> {
    obtenerFGato()
    
  })
  
</script>
<template>
  <div>
    <form @submit.prevent="crearFGato">
      <h1>
        {{ modoFormulario === 'crear' 
        ? 'Creando gatos' 
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
  </div>
</template>