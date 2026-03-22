<script setup lang="ts">
  import {ref, onMounted} from 'vue'
  import { useGatos } from '@/composables/usersgatos.composable';
  const {
    obtenerFGato,
    gatos,
  } = useGatos()

    onMounted(()=> {
    obtenerFGato()
    
  })

</script>
<template>
    <div>
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
    </div>
</template>

<style scoped lang="scss">
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