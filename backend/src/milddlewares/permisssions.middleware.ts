import {Request,Response, NextFunction } from 'express';
import permissionsModel from '../models/permissions.model';
//import { error } from 'node:console';

interface AuthRequest extends Request{
   user?:{
    id:number
    email?: string
   }
}
export const authorizePermission = () => {  
    return async (req: AuthRequest, res: Response, next: NextFunction)=> {
        try{
            //Usuario desde el token
            const userId = req.user?.id;
            
            if (!userId) {
                 res.status(401).json({
                    error: "Usuario no autenticado"
                })
                return
            }
                //Construir ruta real
                const route =(req.baseUrl + req.route.path).replace(/\/$/,"");
                
                // Metodo http
                const method = req.method

                console.log("User:", userId)
                console.log ("Route", route)
                console.log("Method", method)

                //query principal
                //llamar al model
                const haspermission = await permissionsModel.userHasPermission(
                    userId,
                    route,
                    method
                )
                if(!haspermission) {
                     res.status(403).json({error: "No tienes permiso para esta ruta. "})
                     return
                }
                next()

        }catch(error){
            console.error("Error en AuthorizePermission",error );
            res.status(500).json({ error: "Error verificando permisos."});
        }
    }
}


// export const authorizePermission = (permission: string)=>{
//     return async (req: AuthRequest, res: Response, next: NextFunction)=> {
//         if(!req.email){
//             res.status(401).json({ msg: "No autenticado" })
//             return
//         }
//         try{
//             const permisos = await permissionsModel.getUserPermissions(req.email)
//             if(!permisos.includes(permission)) {
//                 res.status(403).json({ msg: "No autorizado" })
//                 return
//             }

//             next()

//         } catch(error) {
//             console.error(error)
//             res.status(500).json({ msg: "Error verificando permisos" })

//         }
        
//     }
// }