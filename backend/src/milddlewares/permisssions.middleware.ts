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
            //Construir ruta real
            const route = req.originalUrl.split("?")[0]!.replace(/\/$/, "");

            // Metodo http
            const method = req.method

            console.log ("Route", route)
            console.log("Method", method)

            //Si es publico:

            //Verificar que existe

            //Usuario desde el token
            const userId = req.user?.id;

            console.log("User:", userId)

            if (!userId) {
                 res.status(401).json({
                    error: "Usuario no autenticado"
                })
                return
            }

            //query principal
            //llamar al model
            const haspermission = await permissionsModel.userHasPermission(
            userId,
                route,
                method
            )
            console.log("haspermission:", haspermission)
            if(!haspermission) {
                res.status(403).json({error: "No tienes permiso para esta ruta. "})
                return
            }
            next()

        }catch(error){
            console.error("Error en AuthorizePermission",error );
            console.error("userId:",req.user?.id);
            console.error("route:",req.originalUrl.split("?")[0]?.replace(/\/$/, ""));
            console.error("method:",req.method);

            res.status(500).json({ error: `Error verificando permisos.`});
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