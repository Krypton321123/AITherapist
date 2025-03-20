import express from 'express'
import cors from 'cors'
import chatRouter from './chats/index.js';
import userRouter from './users/index.js';

const app = express(); 

app.use(cors({
    origin: '*', 
}))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true, limit: '16kb' }))

app.use('/api/chat', chatRouter)
app.use('/api/user', userRouter); 

export default app; 