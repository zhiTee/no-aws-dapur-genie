import { NextRequest, NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // Convert File to buffer for AssemblyAI
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    
    const params = {
      audio: buffer,
      speech_model: "best" as const,
    };

    const transcript = await client.transcripts.transcribe(params);
    
    return NextResponse.json({ 
      transcription: transcript.text || "Transcription failed"
    });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}