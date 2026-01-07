import express from 'express'
//import * as gatosServices from "../services/gatosServices"

import {upload} from '../milddlewares/upload'
import {
   insertarGatos,
   obtenerTiposdeGatos
} from '../controllers/tipos_de_gatos.controllers'
//import toNewGatosEntry from '../utils'
const router = express.Router()

router.get('/', obtenerTiposdeGatos)

router.get('/:id', (_req, res)=>{
   res.send('Respuesta al metodo get con id')
})

router.post('/',upload.single("imagen"), insertarGatos);

export default router