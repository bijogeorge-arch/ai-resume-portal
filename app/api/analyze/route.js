import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: "Resume text is required" },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `
      Analyze the following resume text and provide a structured assessment.
      Return the response in strictly valid JSON format with the following structure:
      {
        "score": number (0-100),
        "skills": ["skill1", "skill2", ...],
        "missing_skills": ["skill1", "skill2", ...],
        "career_path": ["role1", "role2", ...],
        "summary": "Brief summary of the candidate's profile",
        "improvements": ["improvement1", "improvement2", ...]
      }

      Resume Text:
      ${text}
    `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        const analysis = JSON.parse(responseText);

        return NextResponse.json(analysis);
    } catch (error) {
        console.error("Analysis error:", error);
        return NextResponse.json(
            { error: "Failed to analyze resume" },
            { status: 500 }
        );
    }
}
