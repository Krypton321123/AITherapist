import express, { Request, Response } from 'express'; 
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import fs from 'fs'
import multer from 'multer'
import OpenAI from 'openai'

const chatRouter = express.Router(); 

dotenv.config(); 


const openai = new OpenAI({apiKey: process.env.OPEN_API_KEY!})
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || ""); 
const model = genAI.getGenerativeModel(
    { model: 'gemini-2.0-flash' }
)
const upload = multer({dest: 'uploads/'})


chatRouter.route('/create').post(async (req: Request, res: Response) => {
    const { chatHistory } = req.body; // Receive chat history

    console.log(chatHistory)

    let AIResponse = '';

    try {
        // Convert chat history to a formatted conversation string
        const conversation = chatHistory.map(({ sender, text }: { sender: string, text: string }) => `${sender}: "${text}"`).join("\n");

        console.log(conversation)

        const prompt = `
            You are an AI Therapist. Below is a conversation history between you and a user:
            ${conversation}

            Continue the conversation as the AI Therapist. 
            Give me a response in the following JSON format: 
            {
                "WellnessScore": should be a number out of 100 judged by you on their well-being,
                "depressionScore": should be a number out of 10 judged by you based on how depressed they are,
                "response": your response to what they say, kindly make sure to keep it within 50 words or less
            }
            Please strictly follow the format. Don't include anything apart from that.
        `;

        await model.generateContent(prompt).then(async (result) => {
            const cleanJsonString = result.response.text().replace(/```json|```/g, '').trim();
            const response = await JSON.parse(cleanJsonString);
            AIResponse = response.response;
        }); 

        console.log(AIResponse);
        return res.status(200).json({ status: true, message: "Response generated successfully", response: AIResponse });
    } catch (err) {
        console.log("Generation error: ", err);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});


// chatRouter.route('/call').post(upload.single('file'), async (req: Request, res: Response) => {
//     try {
//       console.log("Received file:", req.file);
  
//       if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//       }
  
     
//       const audioBuffer = fs.readFileSync(req.file.path);
//       const audioBase64 = audioBuffer.toString('base64');
  
      
//       const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//       const response: any = await model.generateContent([
//         { type: 'text', text: 'Transcribe this audio:' },
//         { type: 'audio', source: { data: audioBase64, mime_type: 'audio/mpeg' } }
//       ]);
  
//       const transcription = response.candidates[0]?.content.parts[0]?.text || 'Transcription failed';
  
//       console.log("Transcribed Text:", transcription);
      
     
//       res.json({ text: transcription });
  
      
//       fs.unlinkSync(req.file.path);
//     } catch (error) {
//       console.error('Error in transcription:', error);
//       res.status(500).json({ error: 'Transcription failed' });
//     }
//   });

export default chatRouter; 