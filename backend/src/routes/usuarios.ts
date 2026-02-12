import express from 'express'



import {
    // obtenerUsuarios, 
    // obtenerUsuarioID, 
    // crearUsuario, 
    // actualizarUsuario, 
    // eliminarUsuario,
    loginUsuarioID, 
    nuevoUsuario,
    perfil
} from '../controllers/usuariocontrollers'
import { verifyToken } from '../milddlewares/jwtmidleware'

const router = express.Router()

// router.get('/', obtenerUsuarios)

// router.get('/:id', obtenerUsuarioID)

// router.post('/', crearUsuario)

// router.patch('/:id', actualizarUsuario)

// router.delete('/:id', eliminarUsuario)

 router.post('/registrarse', nuevoUsuario)
 router.post('/login', loginUsuarioID )
 router.get('/perfil', verifyToken, perfil )
export default router