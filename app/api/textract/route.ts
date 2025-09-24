import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { s3Bucket, s3Key } = await request.json();

    const client = new TextractClient({
      region: "us-east-1",
      // credentials: {
      //   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      // },
    });

    const command = new AnalyzeDocumentCommand({
      Document: {
        S3Object: {
          Bucket: s3Bucket,
          Name: s3Key,
        },
      },
      FeatureTypes: ["TABLES", "FORMS"],
    });

    const response = await client.send(command);

    // Extract tables and text
    const tables = response.Blocks?.filter(block => block.BlockType === "TABLE") || [];
    
    return NextResponse.json({ 
      tables: tables.length,
      extractedText: response.Blocks?.filter(block => block.BlockType === "LINE")
        .map(block => block.Text).join("\n"),
      rawResponse: response.Blocks
    });
  } catch (error) {
    console.error('Textract error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process document" },
      { status: 500 }
    );
  }
}