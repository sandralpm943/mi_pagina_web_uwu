import express from 'express'
//import * as gatosServices from "../services/gatosServices"

import {upload} from '../milddlewares/upload'

import { verifyToken } from '../milddlewares/jwtmidleware'

//import {PERMISSION} from '../config/permissions'

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

router.get('/', verifyToken, authorizePermission(), obtenerTiposdeGatos)


router.post('/', verifyToken, authorizePermission(), upload.single("imagen"), insertarGatos);

router.patch('/:id', verifyToken, authorizePermission(), upload.single("imagen"), actualizarGato);

router.get("/:id", verifyToken, authorizePermission(), obtenerGatoPorId);

router.delete("/:id", verifyToken, authorizePermission(), eliminarGato);

export default router