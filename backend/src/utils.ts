import { GatosEntry, razaGatos } from "./types";


const parserazaGatos = (razaGatosFromrequest: any): razaGatos => {
    if(!isString(razaGatosFromrequest) || !israzaGatos(razaGatosFromrequest)) {
        throw new Error ('Ups esta raza aun no esta...')
    }
    return razaGatosFromrequest
}
const parsePersonalidad = (personalidadFromRequest: any ): string => {
    if (!isString (personalidadFromRequest)){
        throw new Error('no he encontrado la personalidad que buscabas...')
    }
    return personalidadFromRequest
}

const parseDescripcion = (descripcionFromRequest: any ): string => {
    if (!isString (descripcionFromRequest)){
        throw new Error('La descripción que buscas aun no esta...')
    }
    return descripcionFromRequest
}

const parseProcedencia = (procedenciaFromRequest: any ): string => {
    if (!isString (procedenciaFromRequest)){
        throw new Error('La procedencia no esta...')
    }
    return procedenciaFromRequest
}

const parseDatos_curiosos = (datos_curiososFromRequest: any ): string => {
    if (!isString (datos_curiososFromRequest)){
        throw new Error('este dato curioso aun no esta... intentalo otro dia')
    }
    return datos_curiososFromRequest
}
const parseImagen = (imagenFromRequest: any ): string => {
    if (!isString (imagenFromRequest)){
        throw new Error('La imagen no ha sido encontrada!!')
    }
    return imagenFromRequest
}
const parseDate = (dateFromRequest: any): string => {
    if(!isString(dateFromRequest)|| !isDate(dateFromRequest)){
        throw new Error('La fecha aun no esta o es incorrecta!')
    }

    return dateFromRequest
}
const israzaGatos = (string:string):boolean => {
    return typeof string == 'string'
}
const isString = (string:string):boolean => {
    return typeof string == 'string'
}

const isDate = (date: string): boolean =>  {
    return Boolean(Date.parse(date))
}


const toNewGatosEntry = (object: any): GatosEntry=>{
    const newEntry: GatosEntry = {
        
        
        raza: parserazaGatos(object.razaGatos),
        personalidad: parsePersonalidad(object.personalidad),
        descripcion: parseDescripcion(object.descripcion),
        procedencia: parseProcedencia(object.procedencia),
        datos_curiosos: parseDatos_curiosos(object.datos_curiosos),
        imagen: parseImagen(object.imagen),
        date: parseDate(object.date),
        // ... 
    }
    return newEntry
}
export default toNewGatosEntry