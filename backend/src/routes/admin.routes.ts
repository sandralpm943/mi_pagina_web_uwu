import express from 'express'

import { verifyToken } from '../milddlewares/jwtmidleware'
import tipos_de_gatosRoutes from './tipos_de_gatos.routes'

const router = express.Router()

router.use(verifyToken)

router.use("/tipos_de_gatos", authorizePermission(), tipos_de_gatosRoutes)



export default router