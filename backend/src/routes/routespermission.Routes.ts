import express from 'express'
const router = express.Router()

import { obtenerpermissionsR, 
        obtenerPermissionR,
         crearPermissionR,
        actualizarPermissionR,
        eliminarPermissionR} from '../controllers/routePermissions.controllers';

router.get('/', obtenerpermissionsR);

router.get('/:idRoutePermission',obtenerPermissionR);

router.post('/',crearPermissionR);

router.patch('/:idRoutePermission',actualizarPermissionR);

router.delete('/:idrol/:idRoutePermission', eliminarPermissionR);

export default router