import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyA7qP5hiG1nggdNY3ivbpom3L-T8mgZHXU";
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  const models = ["gemini-flash-latest", "gemini-2.0-flash-lite", "gemma-3-4b-it", "gemma-3-27b-it"];
  for (const modelName of models) {
    const model = genAI.getGenerativeModel({ model: modelName });
    try {
      await model.generateContent("Say 'hello'");
      console.log(`${modelName} works!`);
    } catch (e) {
      console.error(`${modelName} fail:`, e.message.substring(0, 80));
    }
  }
}
run();
