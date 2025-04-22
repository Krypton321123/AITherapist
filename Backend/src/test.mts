import { ElevenLabsClient, play } from "elevenlabs";
import dotenv from 'dotenv' 
import { pipeline } from "stream/promises";
import fs from 'fs'
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path'
import { fileURLToPath } from "url";
import mime from 'mime-types'



dotenv.config(); 

const gemini = new GoogleGenerativeAI('AIzaSyCPhMqrCjpB0zzMM_tP0gec0p2lDHRWxpw'); 
const model = gemini.getGenerativeModel({model: 'gemini-2.0-flash'})


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const playAudio = async (filePath: string) => {

    const file = fs.readFileSync(filePath);

    const audio = {
        inlineData: {
            data: Buffer.from(file).toString('base64'), 
            mimeType: mime.lookup(filePath) || 'audio/mpeg'
        }
    }

    const prompt = 'Extract text from this audio.';

    const result = await model.generateContent([
        audio,
        prompt
      ]);
    console.info(`Result from model: ${result.response.text()}`)
}


