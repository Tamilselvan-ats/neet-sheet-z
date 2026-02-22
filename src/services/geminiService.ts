import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../data/questions";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAIQuestions(subject: string, chapter: string, count: number = 5): Promise<Question[]> {
  const prompt = `Generate ${count} high-quality NEET UG 2026 level multiple choice questions for ${subject}, Chapter: ${chapter}. 
  Include realistic options, the correct answer index (0-3), and a brief explanation. 
  Ensure the questions follow the latest NCERT pattern.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4
              },
              answer: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
              topic: { type: Type.STRING }
            },
            required: ["question", "options", "answer", "explanation", "topic"]
          }
        },
        tools: [{ googleSearch: {} }]
      }
    });

    const data = JSON.parse(response.text || "[]");
    return data.map((q: any, i: number) => ({
      id: `AI_${subject.charAt(0)}_${Date.now()}_${i}`,
      subject: subject as any,
      chapter,
      ...q,
      year: 2026
    }));
  } catch (error) {
    console.error("AI Generation failed:", error);
    return [];
  }
}
