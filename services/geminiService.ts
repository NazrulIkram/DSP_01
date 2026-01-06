import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure API key is available
const ai = new GoogleGenAI({ apiKey });

const HR_SYSTEM_Context = `
You are an expert HR Intelligence Assistant for a large company.
Key Data Context:
- The attrition rate is approximately 16%.
- Key drivers of attrition are OverTime, Age (younger employees leave more), and Low Job Satisfaction.
- Total employees tracked: 1470.
- Departments include Sales, Research & Development, and Human Resources.

Your tone should be professional, empathetic, and data-driven.
When asked about advice, provide actionable retention strategies.
`;

export const getRiskAdvice = async (riskLevel: string, probability: number, factors: string): Promise<string> => {
  if (!apiKey) return "Error: API Key not configured.";
  
  try {
    const prompt = `
      The employee has a ${riskLevel} risk of attrition (${probability}%).
      Key factors: ${factors}.
      Provide a single, concise, professional 1-sentence specific advice for the HR manager to retain this employee.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a concise HR advisor.",
      }
    });
    
    return response.text || "No advice generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate advice at this time.";
  }
};

export const chatWithHRBot = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  if (!apiKey) return "Error: API Key not configured.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: HR_SYSTEM_Context,
      },
      history: history,
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I didn't understand that.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I am having trouble connecting to the HR database right now.";
  }
};

export const generateExecutiveReport = async (): Promise<string> => {
  if (!apiKey) return "Error: API Key not configured.";

  try {
    const prompt = `
      Write a Formal HR Executive Summary regarding the importance of data-driven retention strategies.
      
      Structure:
      1. Executive Summary
      2. Current Landscape (Mention 16% attrition baseline)
      3. Key Risk Factors (Overtime, Commute, Job Satisfaction)
      4. Strategic Recommendations
      5. Conclusion
      
      Keep it professional, structured with Markdown headers, and insightful.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using Pro for better report writing
      contents: prompt,
    });

    return response.text || "Report generation failed.";
  } catch (error) {
    console.error("Gemini Report Error:", error);
    return "Failed to generate the executive report.";
  }
};