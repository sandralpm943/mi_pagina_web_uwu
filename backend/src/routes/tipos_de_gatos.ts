import express from 'express'
import * as gatosServices from "../services/gatosServices"
//import toNewGatosEntry from '../utils'
const router = express.Router()

router.get('/', (_req, res)=>{
    res.send(gatosServices.getEntries())
})

router.get('/:id', (_req, res)=>{
   res.send('Respuesta al metodo get con id')
})

router.post('/', (_req, res) => {
   res.send('Repuesta al metodo post')
});

export default router