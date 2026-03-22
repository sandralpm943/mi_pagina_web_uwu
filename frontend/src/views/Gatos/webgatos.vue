<script setup lang="ts">
  import GatosApi from '@/components/Gatos.server/Gatos.api.vue';
  import GatosApicreate from '@/components/Gatos.server/Gatos.api.Edit.Create.vue';
  import GatosApicontenido from '@/components/Gatos.server/Gatos.API.Contenido.vue';
  import GatosApiArticulos from '@/components/Gatos.server/Gatos.API.Articulos.vue';


  

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
   
   <GatosApicreate></GatosApicreate>
   <GatosApicontenido></GatosApicontenido>
   <GatosApiArticulos></GatosApiArticulos>
   
    
  </div>
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