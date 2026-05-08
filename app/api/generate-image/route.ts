import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt" },
        { status: 400 }
      );
    }

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const image = response.data?.[0];

    if (!image?.b64_json) {
      return NextResponse.json(
        { error: "Image generation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: `data:image/png;base64,${image.b64_json}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}