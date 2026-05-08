import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customerId, userId, email } = body;

    let stripeCustomerId = customerId;

    if (!stripeCustomerId && email) {
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      });

      const customer = customers.data[0];

      if (customer) {
        stripeCustomerId = customer.id;

        if (userId) {
          await supabase
            .from("user_credits")
            .update({
              stripe_customer_id: customer.id,
            })
            .eq("user_id", userId);
        }
      }
    }

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "Stripe customer not found" },
        { status: 400 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: "https://beauty-ai-assistant-kappa.vercel.app/dashboard",
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