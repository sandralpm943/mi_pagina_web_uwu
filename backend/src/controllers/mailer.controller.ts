import { Request, Response } from "express";
import { usuariosModel } from "../models/usuario.model";

export const emailVerification = async(req:Request, res:Response) =>{
   //Obtiene el token provisional que se ha creado
    const { token }= req.params;
    //Si no esta pues pedira que se require para continuar
    if(!token){
      res.status(400).send("Token requerido");
      return;
    }
    //Busca el token provisional
     const user = await usuariosModel.findOneByVerificationToken(token);

     if(!user) {
        res.status(400).send("Token invalidado");
        return;
     }
     //Busca por el token y asigna true al verificado y elimina el token
     await usuariosModel.verifyUser(token);

     res.send("Cuenta verificada correctamente")
};