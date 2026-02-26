import express from 'express'



import {
    // obtenerUsuarios, 
    // obtenerUsuarioID, 
    // crearUsuario, 
    // actualizarUsuario, 
    // eliminarUsuario,
    loginUsuarioID, 
    logout, 
    nuevoUsuario,
    perfil
} from '../controllers/usuariocontrollers'

import { validatorRegistro } from '../validators/usuarios.validators'

import { validarCampos } from '../milddlewares/validation.middleware'

import { verifyToken } from '../milddlewares/jwtmidleware'

const router = express.Router()

// router.get('/', obtenerUsuarios)

// router.get('/:id', obtenerUsuarioID)

// router.post('/', crearUsuario)

// router.patch('/:id', actualizarUsuario)

// router.delete('/:id', eliminarUsuario)

 router.post('/registrarse', validatorRegistro,validarCampos,nuevoUsuario)
 router.post('/login', loginUsuarioID )
 router.get('/perfil', verifyToken, perfil )
  router.post('/logout', logout)
export default router