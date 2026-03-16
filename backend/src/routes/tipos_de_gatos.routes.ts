import express from 'express'
//import * as gatosServices from "../services/gatosServices"

import {upload} from '../milddlewares/upload'

import { verifyToken } from '../milddlewares/jwtmidleware'

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

router.get('/', verifyToken, authorizePermission("gato.ver"), obtenerTiposdeGatos)


router.post('/', verifyToken, authorizePermission("gato.crear"), upload.single("imagen"), insertarGatos);

router.patch('/:id', verifyToken, authorizePermission("gato.editar"), upload.single("imagen"), actualizarGato);

router.get("/:id", verifyToken, authorizePermission("gato.obtenerID"), obtenerGatoPorId);

router.delete("/:id", verifyToken, authorizePermission("gato.eliminar"), eliminarGato);

export default router