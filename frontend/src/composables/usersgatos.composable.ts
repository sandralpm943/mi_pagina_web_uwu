  import {ref} from 'vue'
import type { tiposDeGatos } from '@/types/gatos.types';
import {
  obtenerGato,
  crearGato,
  editarGato,
  eliminarGato
} from '@/api/gatos.api'

import { computed } from 'vue'
const razaInput = ref<string>('')
const personalidadInput = ref<string>('')
const descripcionInput = ref<string>('')
const procedenciaInput = ref<string>('')
const datos_curiososInput = ref<string>('')

const imagenFile = ref<File | null>(null)
const imagenPreview = ref<string | null>(null)

const idSeleccionado = ref<number | null> (null);
const modoFormulario = ref<'crear' | 'editar'>('crear');
const busqueda = ref<string>('')
export function useGatos() {

    // const razaInput = ref<string>('')
    // const personalidadInput = ref<string>('')
    // const descripcionInput = ref<string>('')
    // const procedenciaInput = ref<string>('')
    // const datos_curiososInput = ref<string>('')

    // const imagenFile = ref<File | null>(null)
    // const imagenPreview = ref<string | null>(null)

    const gatos = ref<tiposDeGatos[]>([])

    // const idSeleccionado = ref<number | null> (null);
    // const modoFormulario = ref<'crear' | 'editar'>('crear');
   // const busqueda = ref<string>('')
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


    const obtenerFGato = async () =>{
        try{

            gatos.value = await obtenerGato()
        }catch(error){
            console.error('Error al obtener datos', error)
        }
        
    }
    

    const crearFGato = async () => {
        
        try{
            const formData = new FormData()
            formData.append('raza', razaInput.value);
            formData.append('personalidad', personalidadInput.value);
            formData.append('descripcion', descripcionInput.value);
            formData.append('procedencia', procedenciaInput.value);
            formData.append('datos_curiosos', datos_curiososInput.value);

            
            if(imagenFile.value)formData.append('imagen', imagenFile.value);

            let data;

            if (modoFormulario.value === 'crear') {
                if (!imagenFile.value) {
                    alert('Falta la imagen')
                    return
                }

                const nuevoGato = await crearGato(formData)
                console.log('Enviado correctamente:', nuevoGato);
                gatos.value.push(nuevoGato);
            }else{
                if(!idSeleccionado.value) {
                    console.error("No hay ID selecionada :(")
                    return
                }

                const edicionGatos = await editarGato (idSeleccionado.value, formData)
                

                const index = gatos.value.findIndex(s => s.id === idSeleccionado.value);
                if (index !== -1) {
                    gatos.value.splice(index, 1, edicionGatos);
                }
            }
             
            // Resetear formulario
            resetFormulario();
      
            
        }catch(error){
            console.error('Error al obtener datos', error)
        }
        
    }

    const editarFGato = (gato: tiposDeGatos) => {
        try{ 
            // Llenar inputs
            razaInput.value = gato.raza;
            personalidadInput.value = gato.personalidad;
            descripcionInput.value = gato.descripcion;
            procedenciaInput.value = gato.procedencia;
            datos_curiososInput.value = gato.datos_curiosos;
            imagenPreview.value = `http://localhost:3000${gato.imagen}`;
            imagenFile.value = null; // Solo si quiere reemplazar

            // Cambiar modo a editar
            idSeleccionado.value = gato.id;
            modoFormulario.value = 'editar';
  
        }catch(error){
            console.error('Error al obtener datos', error)
        }

    }

    const eliminarFGato = async(id:number) => {
        if (!confirm('¿Seguro que quieres eliminar este gato?')) return
        try {
            await eliminarGato(id)
            gatos.value = gatos.value.filter(
                gato => gato.id !== id
            )
        }catch(error) {
            console.error('Error al eliminar gato', error)
        }
    }
    

    const gatosFiltrados = computed(() => {
        if (!busqueda.value) return gatos.value
        const term = busqueda.value.toLowerCase()
        return gatos.value.filter(gato =>
        gato.raza.toLowerCase().includes(term) ||
        gato.personalidad.toLowerCase().includes(term) ||
        gato.descripcion.toLowerCase().includes(term) ||
        gato.datos_curiosos.toLowerCase().includes(term)
        )
    })

        
    



    return{
        razaInput,
        personalidadInput,
        descripcionInput,
        procedenciaInput,
        datos_curiososInput,
        imagenPreview,
        idSeleccionado,
        modoFormulario,
        gatos,
        busqueda,
        gatosFiltrados,
        obtenerFGato,
        crearFGato,
        editarFGato,
        eliminarFGato,
        onFileChange,
        

    }
}