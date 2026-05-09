import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

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