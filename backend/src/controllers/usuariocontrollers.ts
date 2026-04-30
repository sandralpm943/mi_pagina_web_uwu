import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { usuariosModel } from "../models/usuario.model";
import {SECRET_JWT } from '../config';
import jwt from 'jsonwebtoken';
import { rolesModel } from "../models/roles.model";
import { emailValidator } from "../services/email.services";
import crypto from "crypto";









// export const obtenerUsuarios = async(_req:Request, res:Response) => {
//     res.send("Obtendremos usuario")
// };

// export const obtenerUsuarioID = async(_req:Request, res:Response) =>{
//     res.send("Login")
// };

// export const obtenerUsuarios = async(_req:Request, res:Response) => {
//     res.send("Registrarse")
// };

// export const actualizarUsuario = async(_req:Request, res:Response) => {
//     res.send("Actualizar usuario")
// };

// export const eliminarUsuario = async(_req:Request, res:Response) =>{
//     res.send("Eliminar usuario")
// };

export const nuevoUsuario = async(req:Request, res:Response) => {
    try{
        const {username, email, password} = req.body 

        //Conexion a base de datos
        const useremail = await usuariosModel.findOneByEmail(email)
        if(useremail){
             res.status(409).json({
                ok:false,
                msg: "El email del usuario ya existe."
            })
            return
        }

        //hashear contraseña
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        //Crea token provisional para validar email
        const verified_token  = crypto
        .randomBytes(32)
        .toString("hex");
        console.log(`Token mailer: ${verified_token }`)

        
       

        //Nuevo usuario
        const rolPrincipal= 1;


        const newuser = await usuariosModel.createUser({
            username,
            email,
            password:hashedPassword,
            id_rol: rolPrincipal,
            verified_token : verified_token,
            verified: false

            });
            //Envia un correo de verificación al email con su token provisional
            await emailValidator(
                email,
                verified_token 
            )
                
         //Valida si el rol se puede usar o no   
        const rolExist = await rolesModel.findById(rolPrincipal);
        if (!rolExist) {
            res.status(400).json({ok:false, msg: 'Rol no valido'})
            return
        }
         //Este token hay que averiguar, en teoria inicial igual?
        const token = jwt.sign(
            { email: newuser.email, id_rol: rolExist },
            SECRET_JWT,
            { expiresIn: '1h' }
        );
        //Cuando nos registramos y todo esta correcto devuelve el token.
        res.status(201).json({ok: true, msg:token})
    

    } catch (error) {

        //Error externo al servidor.
        console.log(error)
         res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
        return
    }
};

export const loginUsuarioID = async(req:Request, res:Response) =>{
    try{
        
        const{email, password} = req.body 
        
        if( !email || !password) {
            res.status(400).json({
                ok:false,
                msg:'Se requiere: Email y contraseña'
            })
            return
        }
        const useremail = await usuariosModel.findOneByEmail(email)
        
        if(!useremail){
             res.status(409).json({
                ok:false,
                msg: "El email del usuario no existe o no es correcto."
            })
            return
        }

        const isMatch = await bcryptjs.compare(password, useremail.password)

        if(!isMatch) {
            res.status(401).json({error: "Credenciales incorrectas."})
            return
        }
        

        const token = jwt.sign(
            {   id:useremail.id,
                email: useremail.email,
                 id_rol: useremail.id_rol },
            SECRET_JWT,
            { expiresIn: '1h' }
        );
        res
        .cookie('access-token', token, {
            httpOnly: true,
            sameSite: true,
            maxAge: 1000 * 60 * 60
        })
        .status(201).json({ok: true, msg:token})

    } catch (error) {
        console.log(error)
         res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
        return
    }
};
 export const perfil = async (req: Request &{user?:{email?:string}} , res: Response) => {
    try{
        if(!req.user?.email){
            res.status(401).json({ error: "Usuario no autenticado"})
            return 
        }

        const useremail = await usuariosModel.findOneByEmail(req.user.email)
        if(!useremail){
            res.status(404).json({ error: "Usuario no encontrado"})
            return
        }
        res.json({ 
            ok: true,
            gato: {
                id: useremail?.id,
                email: useremail?.email,
                username: useremail?.username
            } })
        return
    }
    catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error en el servidor'
        })
        return
    }
 };

 export const logout = async(_req:Request, res:Response) =>{
    res.clearCookie("access-token",{
        httpOnly:true,
        sameSite:true
    }).json({
        ok:true,
        msg: "Sesion cerrada"
    })
 }
 interface AuthUser{
    id: number
    id_rol: number
 }

//  interface AuthRequest extends Request {
//     user?:AuthUser
//  }

 export const soloAdmin = (req: Request &{user?:{email?:AuthUser,id_rol?:number}} , res: Response) => {
   // console.log(req.email)
    console.log("SoloAdmin:", req.user?.id_rol)
    if (!req.user?.email) {
         res.status(401).json({ msg: "No has autenticado" })
         return
    }

    if(!req.user?.id_rol) {
         res.status(401).json({ msg: "Error no hay rol" })
         return
    }

    
    if(req.user.id_rol !== 2) {
         res.status(403).json ({msg: "No autorizado"})
         return
    }
    res.json({ secretData: "¡Bienvenido!"})
 }
