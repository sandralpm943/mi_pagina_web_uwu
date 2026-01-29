import express from 'express'



import {
    // obtenerUsuarios, 
    // obtenerUsuarioID, 
    // crearUsuario, 
    // actualizarUsuario, 
    // eliminarUsuario,
    loginUsuarioID, 
    nuevoUsuario
} from '../controllers/usuariocontrollers'

const router = express.Router()

// router.get('/', obtenerUsuarios)

// router.get('/:id', obtenerUsuarioID)

// router.post('/', crearUsuario)

// router.patch('/:id', actualizarUsuario)

// router.delete('/:id', eliminarUsuario)

 router.post('/registrarse', nuevoUsuario)
 router.post('/login',loginUsuarioID )

export default router