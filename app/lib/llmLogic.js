import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line no-undef
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("API key not found.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Prompt is yet to be written
export async function summarizeCommits(diffs) {
    // Example: https://github.com/fudge-fantastic/WordSmith/commit/55fc71d0b18a2e297427d85dcc2850c2b682cf80
    // https://github.com/fudge-fantastic/WordSmith/commit/<commitHash>.diff 
    const template = `You're expert at summarizing code changes. Summarize the following changes in short sentences in bullets: ${diffs}`;
    const result = await model.generateContent(template);
    return (result.response.text());
}