import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
    try {
        const { fileUrl } = await request.json();

        if (!fileUrl) {
            return NextResponse.json(
                { error: "File URL is required" },
                { status: 400 }
            );
        }

        const fileResponse = await fetch(fileUrl);
        if (!fileResponse.ok) {
            return NextResponse.json(
                { error: "Failed to fetch file from URL" },
                { status: 400 }
            );
        }

        const arrayBuffer = await fileResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = buffer.toString("base64");

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const result = await model.generateContent([
            {
                inlineData: {
                    data: base64Data,
                    mimeType: "application/pdf",
                },
            },
            "Extract all text from this resume. Return only the raw text content, no markdown formatting or explanations.",
        ]);

        const text = result.response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Extraction error:", error);
        return NextResponse.json(
            { error: "Failed to extract text" },
            { status: 500 }
        );
    }
}
