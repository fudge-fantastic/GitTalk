import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line no-undef
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {throw new Error("API key not found.");}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function summarizeCommits(diffs) {
    // Example: https://github.com/fudge-fantastic/WordSmith/commit/55fc71d0b18a2e297427d85dcc2850c2b682cf80
    // https://github.com/fudge-fantastic/WordSmith/commit/<commitHash>.diff 
    const exampleDiff = `
    - Modified index.html to update meta tags for SEO.
    - Added new CSS file: light-605318cbe3a1.css.
    - Removed unused JavaScript functions from utils.js.`;

    const template = `You're an expert at summarizing code changes. Below is a diff of recent code changes. Please provide a neat and concise summary in a numbered list, where each item is a short, clear bullet point describing a key change. For example, if the diff is: ${exampleDiff}
    A good summary might look like:
    1. Updated meta tags in index.html for better SEO.
    2. Added new light theme stylesheet.
    3. Removed obsolete functions from utils.js.
    Now, please summarize the following diff: ${diffs}`;

    const result = await model.generateContent(template);
    return (result.response.text());
}