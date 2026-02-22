import { GoogleGenAI, Type } from "@google/genai";
import { Question, questionBank } from "../data/questions";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAIQuestions(subjects: string[], countPerSubject: number = 5): Promise<Question[]> {
  const prompt = `Generate a total of ${subjects.length * countPerSubject} high-quality NEET UG 2026 level multiple choice questions.
  Provide ${countPerSubject} questions for each of these subjects: ${subjects.join(', ')}.
  
  For each question:
  1. Use current NCERT 2024-25 syllabus trends.
  2. Include 4 realistic options where only one is correct.
  3. Provide a clear explanation.
  4. Ensure questions vary in difficulty.
  
  Return ONLY a JSON array of objects with these keys: subject, chapter, question, options (array of 4 strings), answer (0-3), explanation, topic.`;

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
              subject: { type: Type.STRING },
              chapter: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              answer: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
              topic: { type: Type.STRING }
            },
            required: ["subject", "chapter", "question", "options", "answer", "explanation", "topic"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    const data = JSON.parse(text);
    return data.map((q: any, i: number) => ({
      id: `AI_${Date.now()}_${i}`,
      ...q,
      year: 2026
    }));
  } catch (error) {
    console.error("AI Generation failed, using smart fallback:", error);
    
    // Smart Fallback: Generate a diverse set from the questionBank but randomized
    const fallbackQuestions: Question[] = [];
    subjects.forEach(sub => {
      const pool = questionBank.filter(q => q.subject === sub);
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      fallbackQuestions.push(...shuffled.slice(0, countPerSubject).map(q => ({
        ...q,
        id: `FALLBACK_${q.id}_${Date.now()}`,
        topic: "High Yield (AI Fallback)"
      })));
    });
    
    return fallbackQuestions;
  }
}
