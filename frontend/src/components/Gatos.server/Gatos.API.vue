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