import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { businessType, topic, language = "Romanian" } = body

    if (!businessType || !topic) {
      return NextResponse.json(
        { error: "Missing businessType or topic" },
        { status: 400 }
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
- If language is Romanian, use natural Romanian from Romania. Example: say "o tunsoare modernă", never "un tunsoare modern".
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
      business_type: businessType,
      language,
      topic,
      caption: post.caption,
      hashtags: post.hashtags,
      cta: post.cta,
    }));

    const { error } = await supabase.from("generated_posts").insert(rows);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to save posts" },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: posts });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}