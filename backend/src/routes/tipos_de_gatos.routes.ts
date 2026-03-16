import express from 'express'
//import * as gatosServices from "../services/gatosServices"

import {upload} from '../milddlewares/upload'

import { verifyToken } from '../milddlewares/jwtmidleware'

import {PERMISSION} from '../config/permissions'

import { authorizePermission } from '../milddlewares/permisssions.middleware'
import {
   insertarGatos,
   obtenerTiposdeGatos,
   actualizarGato,
   obtenerGatoPorId,
   eliminarGato
} from '../controllers/tipos_de_gatos.controllers'
//import toNewGatosEntry from '../utils'
const router = express.Router()

router.get('/', verifyToken, authorizePermission(PERMISSION.GATOS_VER), obtenerTiposdeGatos)


router.post('/', verifyToken, authorizePermission(PERMISSION.GATOS_CREAR), upload.single("imagen"), insertarGatos);

router.patch('/:id', verifyToken, authorizePermission(PERMISSION.GATOS_EDITAR), upload.single("imagen"), actualizarGato);

router.get("/:id", verifyToken, authorizePermission(PERMISSION.GATOS_VER), obtenerGatoPorId);

router.delete("/:id", verifyToken, authorizePermission(PERMISSION.GATOS_ELIMINAR), eliminarGato);

export default router