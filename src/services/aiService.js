import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateSummary = async (jobTitle, experienceLevel, customPrompt = "") => {
  if (!API_KEY) throw new Error("Gemini API key is not configured.");
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  let prompt = `Write a professional 3-4 line resume summary for a ${jobTitle} with ${experienceLevel} level of experience. Focus on skills, value added, and achievements. Don't use markdown or asterisks, just plain text.`;
  if (customPrompt) prompt += `\nAdditionally, please exactly follow these custom instructions: ${customPrompt}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const generateExperienceBulletPoints = async (jobTitle, company, responsibilities) => {
  if (!API_KEY) throw new Error("Gemini API key is not configured.");
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  const prompt = `Rewrite the following responsibilities into 3-4 professional, action-oriented resume bullet points for a ${jobTitle} at ${company}. Use strong action verbs and focus on achievements. Keep it concise.
  
  Original responsibilities: ${responsibilities}
  
  Format the response as bullet points (-) without markdown bolding.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const generateProjectDescription = async (projectTitle) => {
  if (!API_KEY) throw new Error("Gemini API key is not configured.");
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  const prompt = `Write a professional 2-3 line project description for a resume. The project name is "${projectTitle}". Describe the possible technical scope, development, and typical impact of such a project. Do not use markdown bolding or asterisks. Keep it plain text. Make it sound professional and action-oriented.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
