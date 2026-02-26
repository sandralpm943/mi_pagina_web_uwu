import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


export const validarCampos = (req: Request, res: Response, next: NextFunction) => {

    //Errores de la petición 
    const errors = validationResult(req);

    //validación -- Si esta vacio muestra los errores
    if(!errors.isEmpty()){
        res.status(400).json({
            ok:false, //Falso significa que hay errores
            errors: errors.array()
        });
        return
    }

    next();
} 