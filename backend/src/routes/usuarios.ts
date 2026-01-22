import express from 'express'

import {UserModel} from '../models/usuario.model'

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

 router.post('/Registrarse', loginUsuarioID)
 router.post('/Login', nuevoUsuario)

export default router