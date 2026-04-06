import express from 'express'

import {obternerUsuarios,obternerUsuario,crearUsuario,actualizarUsuario,eliminarUsuario} from '../controllers/usuariosgatosadmin.controllers'

const router = express.Router()

//router.get('/', verifyToken, authorizePermission(PERMISSION.GATOS_VER), obtenerTiposdeGatos)

router.get('/',obternerUsuarios);

router.get('/:email',obternerUsuario);

router.post('/',crearUsuario);

router.patch('/:email',actualizarUsuario);

router.delete('/:email',eliminarUsuario);

export default router