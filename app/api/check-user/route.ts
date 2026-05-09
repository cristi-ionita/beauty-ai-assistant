import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Missing email" },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email)
      .trim()
      .toLowerCase();

    const { data, error } = await supabaseAdmin
      .schema("auth")
      .from("users")
      .select("id,email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Could not check email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      exists: Boolean(data),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Could not check email" },
      { status: 500 }
    );
  }
}