
import nodemailer from "nodemailer"

import { EMAIL_MAILER, MAILER_CODE } from '../config'




export const emailValidator = async ( email:string, token: string)=>{
    try{
        //Ponemos los datos del servidor mailer.
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
            auth: {
                user: EMAIL_MAILER,
                pass: MAILER_CODE,
            },
            
        });
        //Enlace con token provisional
        const verificationLink = `http://localhost:3000/email/veryficationMailer/${token}`;
        //Información para enviar al cliente para que verifique el email junto al enlace anterior.
        const info  =  ({
            from: EMAIL_MAILER, // sender address
            to: email, // list of recipients
            subject: "Hello miauuu", // subject line
            html: `
                <h2>Verifacación de la cuenta</h2>
                <p>Haz clic en el enlace:</p>
                <a href="${verificationLink}">
                    Verificar cuenta
                </a>
            `, // HTML body
        });

        //Enviar email con la información.

        await transporter.sendMail(info);
        //verificar en consola si se ha enviado el email.
         console.log("Email enviado")
        


    }catch(error){
        console.error("Error al validar el email", error)
    }
}
    