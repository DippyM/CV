import { GoogleGenAI } from "@google/genai";
import { CVData } from "../types";

export const generateElevatorPitch = async (cvData: CVData): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured. Please add your Gemini API key to .env";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Jsi zkušený IT recruiter. Přečti si následující data z životopisu uchazeče a vygeneruj krátký, úderný "Elevator Pitch" (maximálně 2-3 věty) v češtině.
      Cílem je prodat tohoto uchazeče (Matouš) firmě, která hledá juniora na kybernetickou bezpečnost.
      Zdůrazni jeho proaktivitu, studium a certifikace.
      
      Data:
      Jméno: ${cvData.personal.name}
      Titul: ${cvData.personal.title}
      Dovednosti: ${cvData.skills.map(s => s.name).join(', ')}
      Certifikace: ${cvData.certifications.join(', ')}
      Zkušenosti: ${cvData.experience.map(e => `${e.role} v ${e.company}`).join(', ')}
      Vzdělání: ${cvData.education.map(e => e.school).join(', ')}
      Souhrn: ${cvData.summary}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Nepodařilo se vygenerovat text.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Omlouváme se, AI momentálně neodpovídá.";
  }
};