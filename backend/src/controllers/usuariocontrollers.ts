import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { usuariosModel } from "../models/usuario.model";
import {SECRET_JWT } from '../config';
import jwt from 'jsonwebtoken';






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

        if(!username || !email || !password) {
            res.status(400).json({
                ok:false,
                msg:'faltan datos'
            })
            return
        }
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
        

        
       

        //Nuevo usuario
        const newuser = await usuariosModel.createUser({username,
             email,
             password:hashedPassword  
            });
        
         
        const token = jwt.sign(
            { email: newuser.email },
            SECRET_JWT,
            { expiresIn: '1h' }
        );

        res.status(201).json({ok: true, msg:token})
    

    } catch (error) {
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
            { email: useremail.email },
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
 export const perfil = async (req: Request &{email?:string} , res: Response) => {
    try{
        if(!req.email){
            res.status(401).json({ error: "Usuario no autenticado"})
            return 
        }
        
        res.json({ ok: true, email: req.email })
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

