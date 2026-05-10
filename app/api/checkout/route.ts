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

type PlanType = "normal" | "pro";

const VALID_PLANS: PlanType[] = ["normal", "pro"];

function getPriceId(planType: PlanType) {
  if (planType === "pro") {
    return process.env.STRIPE_PRO_PRICE_ID;
  }

  return process.env.STRIPE_NORMAL_PRICE_ID;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, email, planType = "normal" } = body as {
      userId?: string;
      email?: string;
      planType?: PlanType;
    };

    if (!userId || !email) {
      return NextResponse.json(
        { error: "Missing userId or email" },
        { status: 400 }
      );
    }

    if (!VALID_PLANS.includes(planType)) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const priceId = getPriceId(planType);

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing Stripe price configuration" },
        { status: 500 }
      );
    }

    const { data: creditsRow, error: creditsError } = await supabaseAdmin
      .from("user_credits")
      .select("stripe_customer_id, plan")
      .eq("user_id", userId)
      .maybeSingle();

    if (creditsError) {
      console.error("Failed to load user credits:", creditsError);

      return NextResponse.json(
        { error: "Could not load account billing data" },
        { status: 500 }
      );
    }

    if (creditsRow?.plan === "normal" || creditsRow?.plan === "pro") {
      return NextResponse.json(
        { error: "You already have an active subscription" },
        { status: 400 }
      );
    }

    let customerId = creditsRow?.stripe_customer_id || null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: {
          userId,
        },
      });

      customerId = customer.id;

      const { error: updateCustomerError } = await supabaseAdmin
        .from("user_credits")
        .update({
          stripe_customer_id: customerId,
        })
        .eq("user_id", userId);

      if (updateCustomerError) {
        console.error(
          "Failed to save Stripe customer ID:",
          updateCustomerError
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        planType,
      },
      subscription_data: {
        metadata: {
          userId,
          planType,
        },
      },
      allow_promotion_codes: true,
      success_url: `${siteUrl}/dashboard?success=true`,
      cancel_url: `${siteUrl}/dashboard?canceled=true`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Checkout failed:", error);

    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}