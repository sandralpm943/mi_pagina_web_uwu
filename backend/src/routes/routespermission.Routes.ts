import express from 'express'
const router = express.Router()

import { obternerpermissionsR, 
        obternerPermissionsR,
         crearPermissionR,
        actualizarPermissionR,
        eliminarPermissionR} from '../controllers/routePermissions.controllers';
router.get('/',  obternerpermissionsR);

router.get('/:idRoutePermission',obternerPermissionsR);

 router.post('/',crearPermissionR);

 router.patch('/:idRoutePermission',actualizarPermissionR);

router.delete('/:idrol/:idRoutePermission',eliminarPermissionR);



export default router