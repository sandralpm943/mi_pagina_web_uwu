import express from 'express'
const router = express.Router()

import { obternerPermisosyroles, crearPermisosyroles} from '../controllers/permisos_y_roles.controllers';

router.get('/',  obternerPermisosyroles);

// router.get('/:idpermission',obternerPermisoyroles);

 router.post('/',crearPermisosyroles);

// router.patch('/:idpermission',actualizarPermisosyroles);

// router.delete('/:idpermission',eliminarPermisosyroles);

export default router