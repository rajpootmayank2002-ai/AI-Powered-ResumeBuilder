import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyA7qP5hiG1nggdNY3ivbpom3L-T8mgZHXU";
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  const models = ["gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-2.5-pro", "gemma-3-1b-it"];
  for (const modelName of models) {
    const model = genAI.getGenerativeModel({ model: modelName });
    try {
      await model.generateContent("hello");
      console.log(`${modelName} works!`);
    } catch (e) {
      console.error(`${modelName} fail:`, e.message);
    }
  }
}
run();
