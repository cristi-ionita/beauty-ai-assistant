import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);

    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const customerId = session.customer as string;

    console.log("Checkout completed for userId:", userId);
    console.log("Stripe customer:", customerId);

    if (!userId) {
      console.error("No userId found in Stripe metadata");
      return NextResponse.json({ received: true });
    }

    const { data, error } = await supabase
      .from("user_credits")
      .upsert(
        {
          user_id: userId,
          plan: "pro",
          credits: 999999,
          stripe_customer_id: customerId,
        },
        {
          onConflict: "user_id",
        }
      )
      .select();

    if (error) {
      console.error("Supabase update failed:", error);
    } else {
      console.log("User upgraded to Pro:", data);
    }
  }

  return NextResponse.json({ received: true });
}