
import { Request, Response } from "express";


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

export const nuevoUsuario = async(_req:Request, res:Response) => {
    try{
        const {username, email, password} = req.body 



    } catch (error) {
        console.log(error)
         res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
        return
    }
};

export const loginUsuarioID = async(_req:Request, res:Response) =>{
    try{

    } catch (error) {
        console.log(error)
         res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
        return
    }
};

