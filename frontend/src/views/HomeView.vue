<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'
  import {ref,onMounted} from 'vue'
  import axios from 'axios'
  const lemail = ref<string>('');
  const lpassword = ref<string>('');

  const rusername = ref<string>('');
  const remail = ref<string>('');
  const rpassword = ref<string>('');

    let data;
    const logearse = async() => {
        try{
          const login = await axios.post('http://localhost:3000/usuarios/login', 
            {
              email: lemail.value,
              password: lpassword.value
            },
            {
              withCredentials:true
            }
          );
          data = login.data;
          console.log('Enviado correctamente:', login.data);
        }catch(error) {
          console.error('Error al iniciar ', error)
        }
        
    }

    // const Registro = async() =>{
    //http://localhost:3000/usuarios/registrarse'
    //}
        
    const registrarse = async() => {
        try{
          const registro = await axios.post('http://localhost:3000/usuarios/registrarse', 
            {
              username:rusername.value,
              email: remail.value,
              password: rpassword.value
            }
          );
          data = registro.data;
          console.log('Enviado correctamente:', registro.data);
        }catch(error) {
          console.error('Error al iniciar ', error)
        }
        
    }

</script>

<template>
  <main>
    <h1>Login</h1>
    <form @submit.prevent="logearse">
      <label for="">email</label>
      <input type="text" v-model="lemail">
      <label for="">password</label>
      <input type="password" v-model="lpassword">
      <button type="submit">Enviar</button>
    </form>
    <h1>Registro</h1>
    <form @submit.prevent="registrarse">
      <label for="">Username</label>
      <input type="text" v-model="rusername">
      <label for="">Email</label>
      <input type="text" v-model="remail">
      <label for="">Password</label>
      <input type="text" v-model="rpassword">
      <button type="submit">Enviar</button>
    </form>
  </main>
</template>
