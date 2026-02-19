import {Request,Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {SECRET_JWT} from '../config'
import {TokenPayload} from '../models/usuario.model'

export const verifyToken = (req:Request &{email?: string} , res:Response, next: NextFunction) => {
    let token = req.cookies["access-token"]

    if(!token) {
        res.status(401).json({error: "El token no se ha obtenido"})
        return
    }
    
    try{
       const decoded = jwt.verify(token,SECRET_JWT ) as TokenPayload
       req.email = decoded.email

    next();
    }catch(error){
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'Token es invalido vuelve a intentarlo'
        })
        return
    }
}
