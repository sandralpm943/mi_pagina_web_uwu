import {Request,Response, NextFunction } from 'express';

export const authorizePermission = (permission: string)=>{
    async (req: Request, res: Response, next: NextFunction)=> {
        if(!req.email){
            res.status(401).json({ msg: "No autenticado" })
            return
        }
        try{
            const permisos = await permisosModel.getUserPermissions(req.email)

            if(!permisos.includes(permission)) {
                res.status(403).json({ msg: "No autorizado" })
                return
            }

            next()

        } catch(error) {
            console.error(error)
            res.status(500).json({ msg: "Error verificando permisos" })

        }
        return
    }
}