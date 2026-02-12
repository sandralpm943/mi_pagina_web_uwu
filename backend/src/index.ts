import express from 'express'

import { PORT, IP } from './config'
import gatoRouter from './routes/tipos_de_gatos'

import morgan from 'morgan';

import cors from 'cors';
 
import { test } from './dbtest'

import usuarioRouter from './routes/usuarios'

import cookieParser from 'cookie-parser'

const app = express()

app.use('/uploads', express.static('uploads'));

app.use(cors())
app.use(morgan('dev'))

console.log(test)

app.use(express.json()) //Midleware que transforma el req.body a un JSON.

app.use(cookieParser())

app.get('/ping', (_req,res)=>{
    console.log('Un putito hizo ping')
    res.send('pong')
})
app.use('/api/tipos_de_gatos', gatoRouter)

app.use('/usuarios', usuarioRouter)

app.listen(PORT,()=>{ 
    console.log(`El servidor se inicia en http://${IP}:${PORT}`)
})