import express from 'express'

import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json()) //Midleware que transforma el req.body a un JSON.

const PUERTO = 3000
const IP = "localhost"

app.get('/ping', (_req,res)=>{
    console.log('Un putito hizo ping')
    res.send('pong')
})
app.use('/api/diaries', diaryRouter)

app.listen(PUERTO,()=>{ 
    console.log(`El servidor se inicia en http://${IP}:${PUERTO}`)
})