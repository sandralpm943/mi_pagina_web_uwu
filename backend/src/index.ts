import express from 'express'

import { PORT, IP } from './config'
import gatoRouter from './routes/tipos_de_gatos'

import morgan from 'morgan';

import cors from 'cors';
 
import { test } from './dbtest'

import authRoutes from './routes/auth.routes'
import adminRoutes from './routes/admin.routes'
import emailRoutes from './routes/mailer.routes'
import usuariosRoutes from './routes/usuariosGatos.routes'
import permissionsRoutes from "./routes/permissions.routes"
import permissionsandRolesRoutes from './routes/permisos_and_roles.routes'
import roles_gatosRoutes from './routes/roles_gatos.routes'
import cookieParser from 'cookie-parser'

import {emailTest} from './milddlewares/mailer.middleware'



 

const app = express()

app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(morgan('dev'))

console.log(test)

app.use(express.json()) //Midleware que transforma el req.body a un JSON.

app.use(cookieParser())

app.get('/ping', (_req,res)=>{
    console.log('Un putito hizo ping')
    res.send('pong')
})
app.use('/api/tipos_de_gatos', gatoRouter)

app.use('/auth', authRoutes)

app.use('/usuarios',usuariosRoutes)

app.use("/permisos", permissionsRoutes)

app.use("/roles", roles_gatosRoutes)

app.use("/permisosyroles", permissionsandRolesRoutes)

app.use("/admin", adminRoutes)

app.get("/emailTest", emailTest)

app.use("/email",emailRoutes )

app.listen(PORT,()=>{ 
    console.log(`El servidor se inicia en http://${IP}:${PORT}`)
})