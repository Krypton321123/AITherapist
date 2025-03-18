import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'

dotenv.config()

interface conversation {
    userResponse: string, APIResponse: string
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
const conversation: conversation[] = []; 



const prompt = conversation.length === 0 ? `Imagine you're a AI Therapist. A person comes into your office
and says "My wife divorced me"
Give me a response in the following json format: 
{
    WellnessScore: should be a number out of 100 judged by you on their well being
    depressionScore: should be a number out of 10 judged by you based on how depressed they are
    response: your respones to what they say, kindly make sure to keep it within 50 words or less
}
    Please strictly follow the Format I provided. Don't give anything apart from that
` : 'Based on this history prompt, '

model.generateContent(prompt).then((result) => {
    console.log(result.response.text()); 
}); 