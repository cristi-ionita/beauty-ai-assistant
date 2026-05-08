import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, email } = body;

    if (!userId || !email) {
      return NextResponse.json(
        { error: "Missing userId or email" },
        { status: 400 }
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
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
      subscription_data: {
        metadata: {
          userId,
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