import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

if (!stripeWebhookSecret) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET environment variable");
}

const stripe = new Stripe(stripeSecretKey);

type PlanType = "normal" | "pro";

function getPlanFromPrice(priceId?: string | null): {
  plan: PlanType;
  credits: number;
  imageCredits: number;
} {
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

async function activateSubscription({
  userId,
  customerId,
  priceId,
}: {
  userId: string;
  customerId: string;
  priceId?: string | null;
}) {
  const selectedPlan = getPlanFromPrice(priceId);

  const { error } = await supabaseAdmin.from("user_credits").upsert(
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
  );

  if (error) {
    console.error("Failed to activate subscription:", error);
    throw error;
  }
}

async function addMonthlyRolloverCredits({
  customerId,
  priceId,
}: {
  customerId: string;
  priceId?: string | null;
}) {
  const selectedPlan = getPlanFromPrice(priceId);

  const { data: currentRow, error: fetchError } = await supabaseAdmin
    .from("user_credits")
    .select("image_credits")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (fetchError) {
    console.error("Failed to fetch current image credits:", fetchError);
    throw fetchError;
  }

  if (!currentRow) {
    console.error("No user_credits row found for customer:", customerId);
    return;
  }

  const currentImageCredits = Number(currentRow.image_credits || 0);
  const newImageCredits =
    currentImageCredits + selectedPlan.imageCredits;

  const { error: updateError } = await supabaseAdmin
    .from("user_credits")
    .update({
      plan: selectedPlan.plan,
      credits: selectedPlan.credits,
      image_credits: newImageCredits,
    })
    .eq("stripe_customer_id", customerId);

  if (updateError) {
    console.error("Failed to apply rollover credits:", updateError);
    throw updateError;
  }
}

async function downgradeCustomer(customerId: string) {
  const { error } = await supabaseAdmin
    .from("user_credits")
    .update({
      plan: "free",
      credits: 10,
      image_credits: 1,
    })
    .eq("stripe_customer_id", customerId);

  if (error) {
    console.error("Failed to downgrade customer:", error);
    throw error;
  }
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.userId;
  const customerId =
    typeof session.customer === "string" ? session.customer : null;

  if (!userId || !customerId) {
    console.error("Checkout completed without userId/customerId");
    return;
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(
    session.id,
    {
      limit: 1,
    }
  );

  const priceId = lineItems.data[0]?.price?.id;

  await activateSubscription({
    userId,
    customerId,
    priceId,
  });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId =
    typeof invoice.customer === "string" ? invoice.customer : null;

  if (!customerId) {
    console.error("Invoice paid without customerId");
    return;
  }

  if (invoice.billing_reason === "subscription_create") {
    return;
  }

  let subscriptionId: string | null = null;

  if (
    invoice.parent &&
    invoice.parent.type === "subscription_details" &&
    typeof invoice.parent.subscription_details?.subscription === "string"
  ) {
    subscriptionId =
      invoice.parent.subscription_details.subscription;
  }

  if (!subscriptionId) {
    console.error("Invoice paid without subscriptionId");
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId
  );

  const priceId = subscription.items.data[0]?.price?.id;

  await addMonthlyRolloverCredits({
    customerId,
    priceId,
  });
}

async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : null;

  const userId = subscription.metadata?.userId;
  const priceId = subscription.items.data[0]?.price?.id;

  if (!customerId) {
    console.error("Subscription updated without customerId");
    return;
  }

  if (
    subscription.status === "canceled" ||
    subscription.status === "unpaid" ||
    subscription.status === "incomplete_expired"
  ) {
    await downgradeCustomer(customerId);
    return;
  }

  if (
    subscription.status === "active" ||
    subscription.status === "trialing"
  ) {
    const selectedPlan = getPlanFromPrice(priceId);

    if (userId) {
      const { error } = await supabaseAdmin
        .from("user_credits")
        .update({
          plan: selectedPlan.plan,
          credits: selectedPlan.credits,
          stripe_customer_id: customerId,
        })
        .eq("user_id", userId);

      if (error) {
        console.error("Failed to update active subscription:", error);
        throw error;
      }
    }
  }
}

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : null;

  if (!customerId) {
    console.error("Subscription deleted without customerId");
    return;
  }

  await downgradeCustomer(customerId);
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
      stripeWebhookSecret!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);

    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription
        );
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        );
        break;

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handling failed:", error);

    return NextResponse.json(
      { error: "Webhook handling failed" },
      { status: 500 }
    );
  }
}