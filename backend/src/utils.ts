import { newDiaryEntry, Weather, Visibility } from "./types";

const parseComment = (commentFromRequest: any ): string => {
    if (!isString (commentFromRequest)){
        throw new Error('incorrecto o comentario invalido puto')
    }
    return commentFromRequest
}

const parseDate = (dateFromRequest: any): string => {
    if(!isString(dateFromRequest)|| !isDate(dateFromRequest)){
        throw new Error('incorrecto o la fecha invailida puto!')
    }

    return dateFromRequest
}
const parseWeather = (weatherFromrequest: any): Weather => {
    if(!isString(weatherFromrequest) || !isWeather(weatherFromrequest)) {
        throw new Error ('incorrecto o tiempo invalido puto!')
    }
    return weatherFromrequest
}

const parseVisibility = (visibilityFromRequest: any): Visibility =>{
    if (!isString(visibilityFromRequest)|| !isVisibility(visibilityFromRequest)){
        throw new Error ('Incorrecto o visibilidad incorrecta!')
    }
    return visibilityFromRequest
} 

const isWeather =(param: any): boolean => {
    return Object.values(Weather).includes(param)
}
const isVisibility = (param: any): boolean =>{
    return Object.values(Visibility).includes(param)
}

const isString = (string:string):boolean => {
    return typeof string == 'string'
}

const isDate = (date: string): boolean =>  {
    return Boolean(Date.parse(date))
}

const toNewDiaryEntry = (object: any): newDiaryEntry=>{
    const newEntry: newDiaryEntry = {
        comment: parseComment(object.comment),
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility)
        // ... 
    }
    return newEntry
}
export default toNewDiaryEntry