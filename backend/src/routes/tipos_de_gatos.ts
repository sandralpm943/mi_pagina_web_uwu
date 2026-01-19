import express from 'express'
//import * as gatosServices from "../services/gatosServices"

import {upload} from '../milddlewares/upload'
import {
   insertarGatos,
   obtenerTiposdeGatos,
   actualizarGato,
   obtenerGatoPorId,
   eliminarGato
} from '../controllers/tipos_de_gatos.controllers'
//import toNewGatosEntry from '../utils'
const router = express.Router()

router.get('/', obtenerTiposdeGatos)


router.post('/', upload.single("imagen"), insertarGatos);

router.patch('/:id', upload.single("imagen"), actualizarGato);

router.get("/:id", obtenerGatoPorId);

router.delete("/:id", eliminarGato);

export default router