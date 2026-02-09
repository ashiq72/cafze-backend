
import { GoogleGenAI, Type } from "@google/genai";
import { CareerRoadmap } from "../types";

export const generateWorkPermitRoadmap = async (role: string, country: string): Promise<CareerRoadmap> => {
  // Always use process.env.API_KEY directly and instantiate GoogleGenAI inside the function as per best practices.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional work permit and relocation roadmap for a ${role} looking to work in ${country}. 
      Include 4-5 key steps covering documentation, visa application, and job placement. 
      Provide realistic timelines and a specific checklist for each step. 
      Conclude with professional advice for international candidates.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING },
            country: { type: Type.STRING },
            generalAdvice: { type: Type.STRING },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  requirements: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  estimatedTimeline: { type: Type.STRING }
                },
                required: ["step", "title", "description", "requirements", "estimatedTimeline"]
              }
            }
          },
          required: ["role", "country", "roadmap", "generalAdvice"]
        }
      }
    });

    // Access the .text property directly and parse the JSON string.
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
