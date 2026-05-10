import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://beauty-ai-assistant-kappa.vercel.app";

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, email } = body as {
      userId?: string;
      email?: string;
    };

    if (!userId || !email) {
      return NextResponse.json(
        { error: "Missing userId or email" },
        { status: 400 }
      );
    }

    const { data: creditsRow, error: creditsError } = await supabaseAdmin
      .from("user_credits")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (creditsError) {
      console.error("Failed to load billing customer:", creditsError);

      return NextResponse.json(
        { error: "Could not load billing customer" },
        { status: 500 }
      );
    }

    let stripeCustomerId = creditsRow?.stripe_customer_id || null;

    if (!stripeCustomerId) {
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      });

      const customer = customers.data.find(
        (item) => item.metadata?.userId === userId || item.email === email
      );

      if (customer) {
        stripeCustomerId = customer.id;

        const { error: updateError } = await supabaseAdmin
          .from("user_credits")
          .update({
            stripe_customer_id: customer.id,
          })
          .eq("user_id", userId);

        if (updateError) {
          console.error("Failed to save Stripe customer ID:", updateError);
        }
      }
    }

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "Stripe customer not found" },
        { status: 400 }
      );
    }

    const customer = await stripe.customers.retrieve(stripeCustomerId);

    if (customer.deleted) {
      return NextResponse.json(
        { error: "Stripe customer no longer exists" },
        { status: 400 }
      );
    }

    if (customer.metadata?.userId && customer.metadata.userId !== userId) {
      return NextResponse.json(
        { error: "Customer ownership mismatch" },
        { status: 403 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${siteUrl}/dashboard`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Portal failed:", error);

    return NextResponse.json(
      { error: "Portal failed" },
      { status: 500 }
    );
  }
}