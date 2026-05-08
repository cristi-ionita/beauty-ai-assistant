import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { businessType, topic, language = "Romanian", userId } = body;

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
      const { data: newCredits } = await supabase
        .from("user_credits")
        .insert({
          user_id: userId,
          credits: 10,
          plan: "free",
        })
        .select()
        .single();

      creditData = newCredits;
    }

    const isPro = creditData?.plan === "pro";

    if (!isPro && (!creditData || creditData.credits <= 0)) {
      return NextResponse.json(
        { error: "No credits left" },
        { status: 403 }
      );
    }

    const prompt = `
You are an expert Instagram copywriter for beauty and grooming businesses.

Business type:
${businessType}

Content topic:
${topic}

Language:
${language}

Generate exactly 3 Instagram posts.

Strict rules:
- Write ONLY in ${language}.
- Write ONLY for ${businessType}.
- Use correct native grammar.
- If language is Romanian, use natural Romanian from Romania.
- Do NOT mention unrelated services.
- Avoid repetitive phrases.
- Avoid fake marketing language.
- Avoid too many emojis.
- Return ONLY valid JSON.

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
      temperature: 0.9,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0].message.content || "[]";
    const posts = JSON.parse(text);

    const rows = posts.map((post: any) => ({
      user_id: userId,
      business_type: businessType,
      language,
      topic,
      caption: post.caption,
      hashtags: post.hashtags,
      cta: post.cta,
    }));

    await supabase.from("generated_posts").insert(rows);

    let creditsLeft = creditData?.credits ?? 0;

    if (!isPro) {
      creditsLeft = creditData.credits - 1;

      await supabase
        .from("user_credits")
        .update({
          credits: creditsLeft,
        })
        .eq("user_id", userId);
    }

    return NextResponse.json({
      result: posts,
      creditsLeft: isPro ? 999999 : creditsLeft,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}