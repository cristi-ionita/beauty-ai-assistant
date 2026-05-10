import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { rateLimit } from "@/lib/rate-limit";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json(
        { error: "Missing email" },
        { status: 400 }
      );
    }

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const limit = rateLimit({
      key: `check-user:${normalizedEmail}`,
      limit: 10,
      windowMs: 60 * 60 * 1000,
    });

    if (!limit.success) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (error) {
      console.error("Email check failed:", error);

      return NextResponse.json(
        { error: "Could not check email" },
        { status: 500 }
      );
    }

    const exists = data.users.some(
      (user) => user.email?.toLowerCase() === normalizedEmail
    );

    return NextResponse.json({ exists });
  } catch (error) {
    console.error("Check user error:", error);

    return NextResponse.json(
      { error: "Could not check email" },
      { status: 500 }
    );
  }
}