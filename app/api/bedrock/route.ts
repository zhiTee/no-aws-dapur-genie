import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseAIResponseToHTML } from "@/lib/html-parser";

export async function POST(request: NextRequest) {
  try {
    const { message, language = "en", imageData } = await request.json();

    const languageInstructions = {
      en: "You must respond only in English. Do not use any other language.",
      ms: "Anda mesti menjawab dalam Bahasa Malaysia sahaja. Jangan gunakan bahasa lain.",
      zh: "你必须只用中文回答。不要使用任何其他语言。请用简体中文或繁体中文回答。",
    };

    const instruction =
      languageInstructions[
        language as keyof typeof languageInstructions
      ] || languageInstructions.en;

    // In your API route or server code
    console.log("Google API Key:", process.env.GEMINI_API_KEY);

    // In your API route or server code
    console.log("Google API Key:", process.env.GEMINI_API_KEY);

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // In your API route or server code
    console.log("Google API Key:", process.env.GEMINI_API_KEY);

    // Combine instruction + user input
    const prompt = `${instruction}\n\nConstraint: Utilise the use of HTML tables and lists if the output info is suitable for them. The HTML tables and lists have to be visible and has a table border for the table format.  \n\n User: ${message}`;
    
    let result;
    
    if (imageData) {
      // Handle image analysis
      const base64Data = imageData.split(',')[1];
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      };
      
      result = await model.generateContent([prompt, imagePart]);
    } else {
      // Handle text-only
      result = await model.generateContent(prompt);
    }

    // Result is already generated above
    const aiResponse = result.response.text();

    return NextResponse.json({
      response: aiResponse,
      htmlResponse: parseAIResponseToHTML(aiResponse),
      mode: "gemini",
    });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Gemini request failed" },
      { status: 500 }
    );
  }
}