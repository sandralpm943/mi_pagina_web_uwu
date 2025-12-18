export enum razaGatos{
    Siames = 'Siames',
    Persa = 'Persa',
    British = 'British',
    Ragdoll = 'Ragdoll'

}
export interface GatosEntry{
   // id: number,
    raza: razaGatos,
    personalidad: string,
    descripcion: string,
    procedencia: string,
    datos_curiosos: string,
    imagen: string,
    date: string
    
}

//export const NonSensitiveInfoDiaryEntry {}