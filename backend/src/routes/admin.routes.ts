import express from 'express'
//import { PERMISSION } from '../config/permissions'
import { verifyToken } from '../milddlewares/jwtmidleware'
import tipos_de_gatosRoutes from './tipos_de_gatos.routes'
import { authorizePermission } from '../milddlewares/permisssions.middleware'
import usuariosRoutes from './usuariosGatos.routes'
import permissionsRoutes from './permissions.routes'
import roles_gatosRoutes from './roles_gatos.routes'
import permissionsandRolesRoutes from './permisos_and_roles.routes'
import routespermissionRoutes from './routespermission.Routes'

const router = express.Router()

router.use(verifyToken)

router.use("/tipos_de_gatos" ,authorizePermission(), tipos_de_gatosRoutes)

router.use("/usuarios_gatos" ,authorizePermission(), tipos_de_gatosRoutes)
//admin
router.use('/usuarios',authorizePermission(),usuariosRoutes)
router.use("/permisos",authorizePermission(), permissionsRoutes)
router.use("/roles", authorizePermission(), roles_gatosRoutes)
router.use("/permisosyroles", authorizePermission(),permissionsandRolesRoutes)
router.use("/routespermisos", authorizePermission(),routespermissionRoutes)

export default router