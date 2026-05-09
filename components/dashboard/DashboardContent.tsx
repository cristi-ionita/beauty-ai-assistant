import type { Dispatch, SetStateAction } from "react";

import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LockedFeatures from "@/components/dashboard/LockedFeatures";

type DashboardContentProps = {
  businessType: string;
  setBusinessType: Dispatch<SetStateAction<string>>;

  topic: string;
  setTopic: Dispatch<SetStateAction<string>>;

  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;

  platform: string;
  setPlatform: Dispatch<SetStateAction<string>>;

  tone: string;
  setTone: Dispatch<SetStateAction<string>>;

  goal: string;
  setGoal: Dispatch<SetStateAction<string>>;

  postCount: number;
  setPostCount: Dispatch<SetStateAction<number>>;

  loading: boolean;
  imageLoading: boolean;
  checkingAuth: boolean;

  creditsLeft: number | null;
  imageCreditsLeft: number | null;
  plan: string | null;

  showUpgradeModal: boolean;
  setShowUpgradeModal: Dispatch<SetStateAction<boolean>>;

  imageHistoryVersion: number;

  isPaid: boolean;

  generatePosts: () => void;
  generateImage: () => void;

  upgradeToPlan: (planType: "normal" | "pro") => void;
  manageSubscription: () => void;
  logout: () => void;
};

export default function DashboardContent({
  checkingAuth,

  creditsLeft,
  imageCreditsLeft,
  plan,

  isPaid,

  upgradeToPlan,
  manageSubscription,
  logout,
}: DashboardContentProps) {
  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <DashboardNav onLogout={logout} />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.18),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.12),transparent_35%)]" />

          <div className="relative">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  Content Generator
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                  Generate premium social media posts, captions, campaigns and
                  cinematic AI visuals for local businesses and modern brands.
                </p>

                <div className="mt-8">
                  <a
                    href="/generate"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-6 py-4 text-sm font-bold text-white shadow-[0_0_35px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] sm:w-auto"
                  >
                    Generate Now
                  </a>
                </div>
              </div>

              <div className="grid w-full gap-3 sm:min-w-[280px] sm:grid-cols-3 lg:grid-cols-1">
                <MetricCard
                  label="Current Plan"
                  value={plan || "free"}
                  highlight
                />

                <MetricCard
                  label="Text Credits"
                  value={isPaid ? "Unlimited" : creditsLeft ?? "..."}
                />

                <MetricCard
                  label="Image Credits"
                  value={isPaid ? "Unlimited" : imageCreditsLeft ?? "..."}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <DashboardHeader
            plan={plan}
            creditsLeft={creditsLeft}
            imageCreditsLeft={imageCreditsLeft}
            onUpgradeNormal={() => upgradeToPlan("normal")}
            onUpgradePro={() => upgradeToPlan("pro")}
            onManageSubscription={manageSubscription}
            onLogout={logout}
          />
        </div>

        <div className="mt-8">
          <LockedFeatures isPaid={isPaid} />
        </div>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-5 py-4">
      <p className="text-xs text-zinc-500">{label}</p>

      <p
        className={`mt-1 font-bold capitalize ${
          highlight ? "text-pink-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}