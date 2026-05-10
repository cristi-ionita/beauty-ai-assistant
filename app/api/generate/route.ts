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

const DEFAULT_FREE_CREDITS = 10;
const DEFAULT_FREE_IMAGE_CREDITS = 1;

function cleanText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;

  return value.trim().slice(0, 2000);
}

function getSafePostCount(postCount: unknown, isPaid: boolean) {
  const count = Number(postCount) || 3;

  if (isPaid) {
    return Math.min(Math.max(count, 1), 10);
  }

  return Math.min(Math.max(count, 1), 3);
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const businessType = cleanText(body.businessType);
    const topic = cleanText(body.topic);
    const language = cleanText(body.language, "English");
    const platform = cleanText(body.platform, "Instagram");
    const tone = cleanText(body.tone, "Friendly");
    const goal = cleanText(body.goal, "Get bookings");
    const userId = cleanText(body.userId);

    if (!businessType || !topic || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
      key: `text:${userId}`,
      limit: 30,
      windowMs: 60 * 60 * 1000,
    });

    if (!limit.success) {
      return NextResponse.json(
        {
          error:
            "Too many generation requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    const { data: loadedCreditData, error: creditsError } =
      await supabaseAdmin
        .from("user_credits")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (creditsError) {
      console.error("Failed to load credits:", creditsError);

      return NextResponse.json(
        { error: "Failed to load user credits" },
        { status: 500 }
      );
    }

    let creditData = loadedCreditData;

    if (!creditData) {
      const { data: newCredits, error: insertError } =
        await supabaseAdmin
          .from("user_credits")
          .insert({
            user_id: userId,
            credits: DEFAULT_FREE_CREDITS,
            image_credits: DEFAULT_FREE_IMAGE_CREDITS,
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

    const safePostCount = getSafePostCount(body.postCount, isPaid);

    const prompt = `
You are an expert social media strategist and direct-response copywriter for local businesses, service businesses, creators, and small brands.

Business type:
${businessType}

Content topic / promotion / campaign:
${topic}

Platform:
${platform}

Goal:
${goal}

Tone:
${tone}

Language:
${language}

Generate exactly ${safePostCount} social media posts for this specific business type.

Strict rules:
- Write ONLY in ${language}.
- Write ONLY for ${businessType}.
- Optimize the content for ${platform}.
- Match the tone: ${tone}.
- Match the goal: ${goal}.
- Use industry-specific language that fits ${businessType}.
- If the language is Romanian, use natural Romanian from Romania.
- Do not mention unrelated services or industries.
- Avoid repetitive phrases.
- Avoid generic AI-sounding marketing language.
- Avoid excessive emojis.
- Make every post meaningfully different.
- Include a clear CTA for each post.
- Make the copy useful for a real business owner who wants more customers, bookings, calls, orders, leads, or visits.
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

    const text = response.choices[0]?.message?.content || "[]";

    const posts = safeJsonParse(text);

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
      .map((post) => ({
        caption: post.caption.trim(),
        hashtags: post.hashtags.trim(),
        cta: post.cta.trim(),
      }))
      .filter((post) => post.caption && post.hashtags && post.cta)
      .slice(0, safePostCount);

    if (validPosts.length === 0) {
      return NextResponse.json(
        { error: "AI did not generate valid posts. Please try again." },
        { status: 500 }
      );
    }

    const rows = validPosts.map((post) => ({
      user_id: userId,
      business_type: businessType,
      language,
      topic,
      caption: post.caption,
      hashtags: post.hashtags,
      cta: post.cta,
    }));

    const { error: insertPostsError } = await supabaseAdmin
      .from("generated_posts")
      .insert(rows);

    if (insertPostsError) {
      console.error("Failed to save generated posts:", insertPostsError);
    }

    let creditsLeft = creditData.credits;

    if (!isPaid) {
      creditsLeft = Math.max(creditData.credits - 1, 0);

      const { error: updateCreditsError } = await supabaseAdmin
        .from("user_credits")
        .update({
          credits: creditsLeft,
        })
        .eq("user_id", userId);

      if (updateCreditsError) {
        console.error("Failed to update credits:", updateCreditsError);
      }
    }

    return NextResponse.json({
      result: validPosts,
      creditsLeft,
      imageCreditsLeft: creditData.image_credits,
      plan,
      maxPostsAllowed: isPaid ? 10 : 3,
    });
  } catch (error) {
    console.error("Text generation failed:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}