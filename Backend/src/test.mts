import { ElevenLabsClient, play } from "elevenlabs";
import dotenv from 'dotenv' 
import { pipeline } from "stream/promises";
import fs from 'fs'


dotenv.config(); 



const playAudio = async () => {
    const client = new ElevenLabsClient({apiKey: process.env.ELEVENLABS_API_KEY}); 

    const audio = await client.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
        text: "I am an AI Therapist. Let's talk!", 
        model_id: "eleven_multilingual_v2", 
        output_format: 'mp3_44100_128'
    })

    

    pipeline(audio, fs.createWriteStream('./intro.mp3'))


    
}

playAudio(); 
