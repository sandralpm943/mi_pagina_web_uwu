import express from 'express'
const router = express.Router()

import { obternerRoles,obternerRole,crearRoles,actualizarRoles,eliminarRoles } from '../controllers/roles_gatos.controllers';

router.get('/',  obternerRoles);

router.get('/:id_rol',obternerRole);

router.post('/',crearRoles);

router.patch('/:id_rol',actualizarRoles);

router.delete('/:id_rol',eliminarRoles);

export default router