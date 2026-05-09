"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function BillingPage() {
  const [plan, setPlan] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [imageCredits, setImageCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        await supabase.auth.signOut();
        window.location.href = "/";
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function loadBilling() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        await supabase.auth.signOut();
        window.location.href = "/";
        return;
      }

      const { data, error: creditsError } = await supabase
        .from("user_credits")
        .select("credits, image_credits, plan")
        .eq("user_id", user.id)
        .single();

      if (creditsError) {
        console.error(creditsError);
        toast.error("Could not load billing data");
        setLoading(false);
        return;
      }

      if (data) {
        setPlan(data.plan);
        setCredits(data.credits);
        setImageCredits(data.image_credits);
      }

      setLoading(false);
    }

    loadBilling();
  }, []);

  const isPaid = plan === "normal" || plan === "pro";
  const planLabel = plan || "free";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">Loading billing...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">

        <h1 className="mt-8 text-5xl font-bold">Billing</h1>

        <p className="mt-4 text-zinc-400">
          Manage your subscription and account usage.
        </p>

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-pink-300">
                Current Plan
              </p>

              <h2 className="mt-2 text-4xl font-bold capitalize">
                {planLabel}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
                {isPaid
                  ? "Your paid subscription is active. You have unlimited text generations and image credits based on your current plan."
                  : "You are currently on the Free plan. Upgrade to unlock unlimited text generation and more AI image credits."}
              </p>
            </div>

            <div
              className={`w-fit rounded-2xl px-5 py-3 text-sm font-semibold ${
                isPaid
                  ? "bg-pink-500/20 text-pink-300"
                  : "bg-zinc-800 text-zinc-300"
              }`}
            >
              {isPaid ? "ACTIVE" : "FREE"}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-500">Text Credits</p>

              <h3 className="mt-2 text-3xl font-bold">
                {isPaid ? "Unlimited" : credits ?? "..."}
              </h3>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-500">Image Credits</p>

              <h3 className="mt-2 text-3xl font-bold">
                {imageCredits ?? "..."}
              </h3>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm font-semibold text-white">Free</p>
              <p className="mt-2 text-sm text-zinc-400">
                10 text generations and 1 AI image.
              </p>
            </div>

            <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-5">
              <p className="text-sm font-semibold text-pink-300">Normal</p>
              <p className="mt-2 text-sm text-zinc-300">
                Unlimited text and 30 AI images.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm font-semibold text-white">Pro</p>
              <p className="mt-2 text-sm text-zinc-400">
                Unlimited text and 150 AI images.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/dashboard"
              className="rounded-2xl border border-zinc-700 px-6 py-3 hover:bg-zinc-800"
            >
              Back
            </a>

            <a
              href="/dashboard"
              className="rounded-2xl bg-pink-500 px-6 py-3 font-semibold hover:bg-pink-400"
            >
              Upgrade Plan
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}