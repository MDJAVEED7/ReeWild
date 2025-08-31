import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

const genAI = new GoogleGenerativeAI(apiKey);
//console.log(apiKey);
export async function getIngredientsFromAI(dish: string): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  You are a model that provides a detailed breakdown of a dish's ingredients and its estimated carbon footprint. 
  The output must be in **valid JSON** format and just json in json format.

  JSON format:
  {
    "dish_name": "Dish Name",
    "ingredients": [
      { "name": "ingredient1", "quantity": "amount", "carbon_footprint_estimate": 0.0 },
      { "name": "ingredient2", "quantity": "amount", "carbon_footprint_estimate": 0.0 }
    ],
    "total_carbon_footprint_estimate": 0.0
  }

  Provide the JSON for: "${dish}"
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text().trim();

try {
  // Remove Markdown code fences if they exist
  const cleaned = responseText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
} catch (err) {
  console.error("AI response parse error:", responseText);
  throw new Error("Failed to parse AI ingredients JSON");
}

}
