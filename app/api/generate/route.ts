import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      businessType,
      topic,
      language = "English",
      platform = "Instagram",
      tone = "Friendly",
      goal = "Get bookings",
      postCount = 3,
      userId,
    } = body;

    if (!businessType || !topic || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let { data: creditData } = await supabase
      .from("user_credits")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!creditData) {
      const { data: newCredits, error: insertError } = await supabase
        .from("user_credits")
        .insert({
          user_id: userId,
          credits: 10,
          image_credits: 1,
          plan: "free",
        })
        .select()
        .single();

      if (insertError || !newCredits) {
        console.error("Failed to create free credits:", insertError);

        return NextResponse.json(
          { error: "Failed to create user credits" },
          { status: 500 }
        );
      }

      creditData = newCredits;
    }

    const plan = creditData.plan || "free";
    const isPaid = plan === "normal" || plan === "pro";

    if (!isPaid && creditData.credits <= 0) {
      return NextResponse.json(
        { error: "No credits left" },
        { status: 403 }
      );
    }

    const safePostCount = isPaid
      ? Math.min(Number(postCount) || 3, 10)
      : Math.min(Number(postCount) || 3, 3);

    const prompt = `
You are an expert social media strategist and copywriter for beauty, grooming, and wellness businesses.

Business type:
${businessType}

Content topic / promotion:
${topic}

Platform:
${platform}

Goal:
${goal}

Tone:
${tone}

Language:
${language}

Generate exactly ${safePostCount} social media posts.

Strict rules:
- Write ONLY in ${language}.
- Write ONLY for ${businessType}.
- Optimize the content for ${platform}.
- Match the tone: ${tone}.
- Match the goal: ${goal}.
- If the language is Romanian, use natural Romanian from Romania.
- Do not mention unrelated services.
- Avoid repetitive phrases.
- Avoid fake marketing language.
- Avoid excessive emojis.
- Make every post meaningfully different.
- Include a strong CTA for each post.
- Return ONLY valid JSON.
- Do not include markdown.
- Do not include explanations.

JSON format:
[
  {
    "caption": "...",
    "hashtags": "#tag1 #tag2 #tag3",
    "cta": "..."
  }
]
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.85,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0].message.content || "[]";

    let posts;

    try {
      posts = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "AI returned invalid format. Please try again." },
        { status: 500 }
      );
    }

    if (!Array.isArray(posts)) {
      return NextResponse.json(
        { error: "AI returned invalid post structure." },
        { status: 500 }
      );
    }

    const validPosts = posts
      .filter(
        (post) =>
          post &&
          typeof post.caption === "string" &&
          typeof post.hashtags === "string" &&
          typeof post.cta === "string"
      )
      .slice(0, safePostCount);

    if (validPosts.length === 0) {
      return NextResponse.json(
        { error: "AI did not generate valid posts. Please try again." },
        { status: 500 }
      );
    }

    const rows = validPosts.map((post: any) => ({
      user_id: userId,
      business_type: businessType,
      language,
      topic,
      caption: post.caption,
      hashtags: post.hashtags,
      cta: post.cta,
    }));

    await supabase.from("generated_posts").insert(rows);

    let creditsLeft = creditData.credits;

    if (!isPaid) {
      creditsLeft = creditData.credits - 1;

      await supabase
        .from("user_credits")
        .update({
          credits: creditsLeft,
        })
        .eq("user_id", userId);
    }

    return NextResponse.json({
      result: validPosts,
      creditsLeft,
      imageCreditsLeft: creditData.image_credits,
      plan,
      maxPostsAllowed: isPaid ? 10 : 3,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}