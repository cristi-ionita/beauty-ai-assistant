"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BillingPage() {
  const [plan, setPlan] = useState("");
  const [credits, setCredits] = useState<number | null>(null);
  const [imageCredits, setImageCredits] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("user_credits")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setPlan(data.plan);
        setCredits(data.credits);
        setImageCredits(data.image_credits);
      }
    }

    load();
  }, []);

  const isPaid = plan === "normal" || plan === "pro";

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold">Billing</h1>

        <p className="mt-4 text-zinc-400">
          Manage your subscription and account usage.
        </p>

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-pink-300">
                Current Plan
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {plan?.toUpperCase()}
              </h2>
            </div>

            <div className="rounded-2xl bg-pink-500/20 px-5 py-3 text-pink-300">
              ACTIVE
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-500">Text Credits</p>

              <h3 className="mt-2 text-3xl font-bold">
                {isPaid ? "Unlimited" : credits}
              </h3>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-500">Image Credits</p>

              <h3 className="mt-2 text-3xl font-bold">
                {isPaid ? "Unlimited" : imageCredits}
              </h3>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
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