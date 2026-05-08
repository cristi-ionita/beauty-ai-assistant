import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type PlanType = "normal" | "pro";

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

    const priceId =
      planType === "pro"
        ? process.env.STRIPE_PRO_PRICE_ID
        : process.env.STRIPE_NORMAL_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing Stripe price configuration" },
        { status: 500 }
      );
    }

    const customer = await stripe.customers.create({
      email,
      metadata: {
        userId,
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customer.id,
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
      success_url:
        "https://beauty-ai-assistant-kappa.vercel.app/dashboard?success=true",
      cancel_url:
        "https://beauty-ai-assistant-kappa.vercel.app/dashboard?canceled=true",
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