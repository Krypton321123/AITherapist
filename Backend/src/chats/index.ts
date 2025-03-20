import express, { Request, Response } from 'express'; 
import { GoogleGenerativeAI } from '@google/generative-ai'

const chatRouter = express.Router(); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || ""); 
const model = genAI.getGenerativeModel(
    { model: 'gemini-2.0-flash' }
)


chatRouter.route('/create').post(async (req: Request, res: Response) => {
    try {
        
    } catch (err) {

    }
})

export default chatRouter; 