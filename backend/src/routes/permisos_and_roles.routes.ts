import express from 'express'
const router = express.Router()

import { obternerPermissionRole, 
        crearPermissionRole,
         eliminarPermissionRole} from '../controllers/permisos_y_roles.controllers';

router.get('/',  obternerPermissionRole);

// router.get('/:idpermission',obternerPermisoyroles);

 router.post('/',crearPermissionRole);

// router.patch('/:idpermission',actualizarPermisosyroles);

router.delete('/:idrol/:idpermission',eliminarPermissionRole);

export default router