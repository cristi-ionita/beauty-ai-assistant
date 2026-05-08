import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function getPlanFromPrice(priceId?: string | null) {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
    return {
      plan: "pro",
      credits: 999999,
      imageCredits: 150,
    };
  }

  return {
    plan: "normal",
    credits: 999999,
    imageCredits: 30,
  };
}

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

    const lineItems = await stripe.checkout.sessions.listLineItems(
      session.id,
      {
        limit: 1,
      }
    );

    const priceId = lineItems.data[0]?.price?.id;
    const selectedPlan = getPlanFromPrice(priceId);

    console.log("Checkout completed for userId:", userId);
    console.log("Stripe customer:", customerId);
    console.log("Stripe price:", priceId);
    console.log("Selected plan:", selectedPlan.plan);

    if (!userId) {
      console.error("No userId found in Stripe metadata");
      return NextResponse.json({ received: true });
    }

    const { data, error } = await supabase
      .from("user_credits")
      .upsert(
        {
          user_id: userId,
          plan: selectedPlan.plan,
          credits: selectedPlan.credits,
          image_credits: selectedPlan.imageCredits,
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
      console.log("User upgraded:", data);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    console.log("Subscription ended for customer:", customerId);

    const { data, error } = await supabase
      .from("user_credits")
      .update({
        plan: "free",
        credits: 10,
        image_credits: 1,
      })
      .eq("stripe_customer_id", customerId)
      .select();

    if (error) {
      console.error("Failed to downgrade user:", error);
    } else {
      console.log("User downgraded to free:", data);
    }
  }

  return NextResponse.json({ received: true });
}