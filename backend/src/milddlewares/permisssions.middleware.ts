import {Request,Response, NextFunction } from 'express';
import permissionsModel from '../models/permissions.model';

interface AuthRequest extends Request{
    email?: string
}

export const authorizePermission = (permission: string)=>{
    return async (req: AuthRequest, res: Response, next: NextFunction)=> {
        if(!req.email){
            res.status(401).json({ msg: "No autenticado" })
            return
        }
        try{
            const permisos = await permissionsModel.getUserPermissions(req.email)
            if(!permisos.includes(permission)) {
                res.status(403).json({ msg: "No autorizado" })
                return
            }

            next()

        } catch(error) {
            console.error(error)
            res.status(500).json({ msg: "Error verificando permisos" })

        }
        
    }
}