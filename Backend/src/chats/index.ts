import express, { Request, Response } from 'express'; 
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import fs from 'fs'
import upload from '../middlewares/multer.middleware';
import { ElevenLabsClient } from 'elevenlabs';
import path from 'path'
import { pipeline } from 'stream';
const chatRouter = express.Router(); 
import { promisify } from 'util';

dotenv.config(); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || ""); 
const model = genAI.getGenerativeModel(
    { model: 'gemini-2.0-flash' }
)
const client = new ElevenLabsClient({apiKey: process.env.ELEVENLABS_API_KEY})


chatRouter.route('/generate').post(async (req: Request, res: Response) => {
    const { messageHistory } = req.body; // Receive chat history

    console.log(messageHistory)

    let AIResponse = '';

    try {
        
        const conversation = messageHistory.map(({ isUser, text }: { isUser: boolean, text: string }) => `${isUser ? 'User: ' : 'AI: '}: "${text}"`).join("\n");

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
        return res.status(200).json({ status: true, message: "Response generated successfully", generatedText: AIResponse });
    } catch (err) {
        console.log("Generation error: ", err);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

chatRouter.post('/generateVoice', upload.single('file'), async (req: Request, res: Response) => {

    const conversation = JSON.parse(req.body.conversation)
    console.log("conversation: ", conversation)

    const formattedConversation = conversation.map((item: {userText: string, AIResponse: string}) => {return `User:${item.userText} AI:${item.AIResponse}`}).join('\n')

    console.log(formattedConversation)

        
    if (!req.file) {
        console.log("came here")
        return res.status(400).json({ status: false, message: 'file not received' })
    }

    const filePath = path.join(__dirname, '..', '..','uploads', req.file?.filename)
    const file = fs.readFileSync(filePath)

    const fileBase64 = Buffer.from(file).toString('base64')
    const mimeType = 'audio/mpeg'

    let AIResponse = '';

    const audio = {
        inlineData: {
            data: fileBase64, 
            mimeType
        }
    }

    const prompt = 'Extract the text from this.'

    const response = await model.generateContent([
        audio, prompt
    ])

    const userText = response.response.text(); 
    console.log(userText); 

    const prompt2 = `
            You are an AI Therapist. Below is a conversation history between you and a user:
            ${formattedConversation}

            Now generate a new response while retaining context from the conversation history.

            This is what the user has said now: ${userText}

            Continue the conversation as the AI Therapist. 
            Give me a response in the following JSON format: 
            {
                "WellnessScore": should be a number out of 100 judged by you on their well-being,
                "depressionScore": should be a number out of 10 judged by you based on how depressed they are,
                "response": your response to what they say, kindly make sure to keep it within 50 words or less
            }
            Please strictly follow the format. Don't include anything apart from that.
        `;

        console.log("generating response...")

        await model.generateContent(prompt2).then(async (result) => {
            const cleanJsonString = result.response.text().replace(/```json|```/g, '').trim();
            const response = await JSON.parse(cleanJsonString);
            AIResponse = response.response;
        }); 

        console.log(AIResponse)

        const textToSpeech = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
            text: AIResponse, 
            model_id: "eleven_multilingual_v2",
            output_format: 'mp3_44100_128'
        })

        const airesponsePath = path.join(__dirname, '..', '..', 'generatedResponses', `airesponse${Date.now()}.mp3`)

        const pipelineAsync = promisify(pipeline)

        await pipelineAsync(textToSpeech, fs.createWriteStream(airesponsePath))

        const fileToSend = fs.readFileSync(airesponsePath); 

        const filebase64 = Buffer.from(fileToSend).toString('base64')
     

        return res.status(200).json({status: true, message: "Result generated successfully", data: {
            AIResponse, 
            userText, 
            
        }, audio: {
            filebase64, 
            mime: 'audio/mp4'
        }})


})


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