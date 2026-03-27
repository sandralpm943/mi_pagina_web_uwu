import express from 'express'
import { PERMISSION } from '../config/permissions'
import { verifyToken } from '../milddlewares/jwtmidleware'
import tipos_de_gatosRoutes from './tipos_de_gatos.routes'
import { authorizePermission } from '../milddlewares/permisssions.middleware'



const router = express.Router()

router.use(verifyToken)

router.use("/tipos_de_gatos" ,authorizePermission(PERMISSION.GATOS_VER), tipos_de_gatosRoutes)



export default router