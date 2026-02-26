import {body } from 'express-validator'


export const validatorRegistro = [
    body ("username" )
        .trim() //Quita espacios inecesarios
        .notEmpty().withMessage("Username obligatorio") //No debe estar vacio
        .isLength({ min: 3, max: 20}) //Maximo y minimo de caracteres
        .withMessage("Entre 3 y 20 caracteres") //Mensaje de error
        .escape(), //Evita HTML en el input para ataques XSS

    body("email")
        .trim()
        .isEmail() //Verifica si lleva el @ y quita mayusculas
        .withMessage("Email inválido")
        .normalizeEmail({
            gmail_remove_dots: false
        }) //Elimina simbolos raros como el . y otros más
        .escape(),

    body("password")
        .isLength({ min: 8})
        .withMessage("Tu password debe ser un minimo de 8 caracteres")
]