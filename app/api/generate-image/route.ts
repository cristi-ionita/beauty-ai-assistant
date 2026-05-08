import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prompt, userId } = body;

    if (!prompt || !userId) {
      return NextResponse.json(
        { error: "Missing prompt or userId" },
        { status: 400 }
      );
    }

    const { data: userCredits, error: fetchError } = await supabase
      .from("user_credits")
      .select("image_credits")
      .eq("user_id", userId)
      .single();

    if (fetchError || !userCredits) {
      return NextResponse.json(
        { error: "Failed to load user credits" },
        { status: 500 }
      );
    }

    if (userCredits.image_credits <= 0) {
      return NextResponse.json(
        { error: "No image credits left" },
        { status: 403 }
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

    const newCredits = userCredits.image_credits - 1;

    const { error: updateError } = await supabase
      .from("user_credits")
      .update({
        image_credits: newCredits,
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error("Failed to update image credits:", updateError);
    }

    return NextResponse.json({
      image: `data:image/png;base64,${image.b64_json}`,
      imageCreditsLeft: newCredits,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}