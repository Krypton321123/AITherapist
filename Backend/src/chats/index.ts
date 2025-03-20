import express, { Request, Response } from 'express'; 
import { GoogleGenerativeAI } from '@google/generative-ai'

const chatRouter = express.Router(); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || ""); 
const model = genAI.getGenerativeModel(
    { model: 'gemini-2.0-flash' }
)


chatRouter.route('/create').post(async (req: Request, res: Response) => {

    let AIResponse = ''

    try {
        const prompt = `Imagine you're a AI Therapist. A person comes into your office
                and says "My wife divorced me"
                Give me a response in the following json format: 
                {
                    WellnessScore: should be a number out of 100 judged by you on their well being
                    depressionScore: should be a number out of 10 judged by you based on how depressed they are
                    response: your respones to what they say, kindly make sure to keep it within 50 words or less
                }
                    Please strictly follow the Format I provided. Don't give anything apart from that
                `

    model.generateContent(prompt).then((result) => {
        AIResponse = result.response.text(); 
    }); 
    return res.status(200).json({status: true, message: "Response genreated successfully", response: AIResponse})
        } catch (err) {
            console.log("generation error: ", err)
            return res.status(500).json({status: false, message: "Internal Server Error"})
        }
    })

export default chatRouter; 