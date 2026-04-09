import express from 'express'
const router = express.Router()

import { obternerPermisos,obternerPermiso,crearPermisos,actualizarPermisos,eliminarPermisos } from '../controllers/permssions.controllers';

router.get('/',  obternerPermisos);

router.get('/:idpermission',obternerPermiso);

router.post('/',crearPermisos);

router.patch('/:idpermission',actualizarPermisos);

router.delete('/:idpermission',eliminarPermisos);

export default router