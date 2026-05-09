"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function BillingPage() {
  const [plan, setPlan] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [imageCredits, setImageCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBilling() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session?.user) {
          window.location.replace("/login");
          return;
        }

        const { data, error: creditsError } = await supabase
          .from("user_credits")
          .select("credits, image_credits, plan")
          .eq("user_id", session.user.id)
          .single();

        if (creditsError) {
          console.error(creditsError);
          toast.error("Could not load billing data");
          return;
        }

        if (data) {
          setPlan(data.plan);
          setCredits(data.credits);
          setImageCredits(data.image_credits);
        }
      } finally {
        setLoading(false);
      }
    }

    loadBilling();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.replace("/");
  }

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
    <main className="min-h-screen bg-zinc-950 text-white">
      <DashboardNav onLogout={logout} />

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-pink-300 sm:text-sm">
            Account
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Billing
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
            Manage your subscription, current plan and account usage.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.16),transparent_35%)]" />

          <div className="relative">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-pink-300 sm:text-sm">
                  Current Plan
                </p>

                <h2 className="mt-2 text-3xl font-black capitalize leading-tight sm:text-4xl">
                  {planLabel}
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
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

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <UsageCard
                label="Text Credits"
                value={isPaid ? "Unlimited" : credits ?? "..."}
              />

              <UsageCard
                label="Image Credits"
                value={imageCredits ?? "..."}
              />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <PlanSmallCard
                title="Free"
                description="10 text generations and 1 AI image."
              />

              <PlanSmallCard
                title="Normal"
                description="Unlimited text and 30 AI images."
                highlight
              />

              <PlanSmallCard
                title="Pro"
                description="Unlimited text and 150 AI images."
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/dashboard"
                className="inline-flex w-full justify-center rounded-2xl border border-zinc-700 px-6 py-3 text-sm font-semibold transition hover:bg-zinc-800 sm:w-auto"
              >
                Dashboard
              </a>

              <a
                href="/dashboard"
                className="inline-flex w-full justify-center rounded-2xl bg-pink-500 px-6 py-3 text-sm font-semibold transition hover:bg-pink-400 sm:w-auto"
              >
                Upgrade Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function UsageCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-sm text-zinc-500">{label}</p>

      <h3 className="mt-2 text-2xl font-black sm:text-3xl">{value}</h3>
    </div>
  );
}

function PlanSmallCard({
  title,
  description,
  highlight = false,
}: {
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-pink-500/30 bg-pink-500/10"
          : "border-zinc-800 bg-zinc-950"
      }`}
    >
      <p
        className={`text-sm font-semibold ${
          highlight ? "text-pink-300" : "text-white"
        }`}
      >
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}