import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { rateLimit } from "@/lib/rate-limit";

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

const client = new OpenAI({
  apiKey: openaiApiKey,
});

function cleanText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;

  return value.trim().slice(0, 4000);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = cleanText(body.prompt);
    const userId = cleanText(body.userId);
    const businessType = cleanText(body.businessType);
    const topic = cleanText(body.topic);
    const platform = cleanText(body.platform);
    const tone = cleanText(body.tone);
    const goal = cleanText(body.goal);

    if (!prompt || !userId) {
      return NextResponse.json(
        { error: "Missing prompt or userId" },
        { status: 400 }
      );
    }

    const { data: authUser, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (userError || !authUser?.user) {
      return NextResponse.json(
        { error: "Invalid user" },
        { status: 401 }
      );
    }

    const limit = rateLimit({
      key: `image:${userId}`,
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });

    if (!limit.success) {
      return NextResponse.json(
        {
          error: "Too many image requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    const { data: userCredits, error: fetchError } =
      await supabaseAdmin
        .from("user_credits")
        .select("image_credits, plan")
        .eq("user_id", userId)
        .maybeSingle();

    if (fetchError || !userCredits) {
      console.error("Failed to load image credits:", fetchError);

      return NextResponse.json(
        { error: "Failed to load user credits" },
        { status: 500 }
      );
    }

    const plan = userCredits.plan || "free";
    const isPaid = plan === "normal" || plan === "pro";

    if (!isPaid && userCredits.image_credits <= 0) {
      return NextResponse.json(
        { error: "No image credits left" },
        { status: 403 }
      );
    }

    if (isPaid && userCredits.image_credits <= 0) {
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

    const imageData = `data:image/png;base64,${image.b64_json}`;
    const newCredits = Math.max(userCredits.image_credits - 1, 0);

    const { error: imageInsertError } = await supabaseAdmin
      .from("generated_images")
      .insert({
        user_id: userId,
        business_type: businessType || null,
        topic: topic || null,
        platform: platform || null,
        tone: tone || null,
        goal: goal || null,
        image_data: imageData,
      });

    if (imageInsertError) {
      console.error("Failed to save generated image:", imageInsertError);
    }

    const { error: updateError } = await supabaseAdmin
      .from("user_credits")
      .update({
        image_credits: newCredits,
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error("Failed to update image credits:", updateError);
    }

    return NextResponse.json({
      image: imageData,
      imageCreditsLeft: newCredits,
      plan,
    });
  } catch (error) {
    console.error("Image generation failed:", error);

    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}