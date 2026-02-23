"use server";

import { GoogleGenAI } from "@google/genai";
import prompt from './prompt';
import { metadataType, colorsType, analysisType } from "@/app/types";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

type returnType = {
    response: "error";
    error: string;
} | {
    response: "success";
    data: {
        assetMetadata: metadataType,
        designTokens: colorsType,
        aiAnalysis: analysisType,
    };
}

export default async function analyzeImage(base64Data: string, mimeType: string) : Promise<returnType> {

  try {

    const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
            {
                inlineData: {
                    data: base64Data,
                    mimeType,
                }
            },
            { text: prompt }
        ],
        config: {
            responseMimeType: "application/json",
        }
    });

    if(result?.text) {
        return {
            response: "success",
            data: JSON.parse(result.text),
        }
    }

    console.error(result);
    return {
        response: "error",
        error: "There was an error parsing the AI results. Please try again."
    }
    
    } catch (error: unknown) {
        
         if (error instanceof Error) {
            console.error(error.message);
            if(error.message.includes("Unexpected") || error.message.includes("invalid")) {
                return {
                    response: "error",
                    error: 'An unknown error occurred getting the AI response. Please try again.'
                }
            }
            const errorObj = JSON.parse(error.message)
            return { response: "error", error: errorObj.error.message };
        } else {
            console.error('An unknown error occurred:', error);
            return {
                response: "error",
                error: 'An unknown error occurred getting the AI response. Please try again.'
            }
        }
    }
}