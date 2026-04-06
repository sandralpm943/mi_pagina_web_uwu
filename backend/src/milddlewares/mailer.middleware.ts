
import { Request, Response, NextFunction} from "express";
import nodemailer from "nodemailer"

import { EMAIL_MAILER, MAILER_CODE } from '../config'


export const emailTest = async (_req:Request, res: Response, next: NextFunction)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
            auth: {
                user: EMAIL_MAILER,
                pass: MAILER_CODE,
            },
        });
        const info  =  ({
            from: EMAIL_MAILER, // sender address
            to: "sandralopez.ife@gmail.com", // list of recipients
            subject: "Hello miauuu", // subject line
            text: "Hello world? Gatitos web haciendo pruebas", // plain text body
            html: "<b>Hello world? Gatitos web haciendo pruebas</b>", // HTML body
        });
        await transporter.sendMail(info);
        console.log("Email enviado")
        res.json({
            message: "Ruta ejectuda y enviada miauuu",
        });
        next();


    }catch(error){
        console.error("Error al enviar el email", error)
        next();
    }

}







