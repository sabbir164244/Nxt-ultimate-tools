import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Yahan code Netlify se aapki mehfooz key uthayega jo aapne Step 1 mein save ki thi
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    // AI model select karna
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // AI ko prompt bhej kar content generate karwana
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Tayaar content ko frontend par wapas bhejna
    return NextResponse.json({ generatedContent: text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please check your API key setup on Netlify and try again." },
      { status: 500 }
    );
  }
                                }
