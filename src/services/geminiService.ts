import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../data/questions";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAIQuestions(subjects: string[], countPerSubject: number = 5): Promise<Question[]> {
  const prompt = `Generate a total of ${subjects.length * countPerSubject} high-quality NEET UG 2026 level multiple choice questions.
  Provide ${countPerSubject} questions for each of these subjects: ${subjects.join(', ')}.
  
  For each question:
  1. Use current NCERT 2024-25 syllabus trends for NEET 2026.
  2. Include 4 realistic options where only one is correct.
  3. Provide a clear explanation of why the answer is correct and why others are wrong.
  4. Ensure questions vary in difficulty (Easy, Medium, Hard).
  5. Use the search tool to find recent high-yield topics or experimental-based questions common in recent NEET papers.`;

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
              subject: { type: Type.STRING, enum: subjects },
              chapter: { type: Type.STRING },
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
            required: ["subject", "chapter", "question", "options", "answer", "explanation", "topic"]
          }
        },
        tools: [{ googleSearch: {} }]
      }
    });

    const data = JSON.parse(response.text || "[]");
    return data.map((q: any, i: number) => ({
      id: `AI_${q.subject.charAt(0)}_${Date.now()}_${i}`,
      ...q,
      year: 2026
    }));
  } catch (error) {
    console.error("AI Generation failed:", error);
    return [];
  }
}
