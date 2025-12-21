import express from 'express'

import { PORT, IP } from './config'
import gatoRouter from './routes/tipos_de_gatos'

import morgan from 'morgan';



const app = express()
app.use(morgan('dev'))
app.use(express.json()) //Midleware que transforma el req.body a un JSON.


app.get('/ping', (_req,res)=>{
    console.log('Un putito hizo ping')
    res.send('pong')
})
app.use('/api/tipos_de_gatos', gatoRouter)

app.listen(PORT,()=>{ 
    console.log(`El servidor se inicia en http://${IP}:${PORT}`)
})