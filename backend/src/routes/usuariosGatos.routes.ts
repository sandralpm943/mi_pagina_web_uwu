import express from 'express'

import {obternerUsuarios,obternerUsuario,actualizarUsuario,eliminarUsuario} from '../controllers/usuariosgatosadmin.controllers'
//import { verifyToken } from '../milddlewares/jwtmidleware';
//import { authorizePermission } from '../milddlewares/permisssions.middleware';
const router = express.Router()

//router.get('/', verifyToken, authorizePermission(PERMISSION.GATOS_VER), obtenerTiposdeGatos)
//verifyToken,authorizePermission(PERMISSION.USUARIOS_VER),

router.get('/',  obternerUsuarios);

router.get('/:id',obternerUsuario);

//router.post('/',crearUsuario);

router.patch('/:id',actualizarUsuario);

router.delete('/:id',eliminarUsuario);

export default router