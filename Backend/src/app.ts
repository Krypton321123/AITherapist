import express from 'express'
import cors from 'cors'

const app = express(); 

app.use(cors({
    origin: true, 
}))

app.use(express.json()); 
app.use(express.urlencoded({extended: true, limit: '16kb'}))

export default app; 