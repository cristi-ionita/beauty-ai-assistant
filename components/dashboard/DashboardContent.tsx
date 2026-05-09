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

      <div className="mx-auto max-w-6xl px-6 py-10">
        <DashboardHeader
          plan={plan}
          creditsLeft={creditsLeft}
          imageCreditsLeft={imageCreditsLeft}
          onUpgradeNormal={() => upgradeToPlan("normal")}
          onUpgradePro={() => upgradeToPlan("pro")}
          onManageSubscription={manageSubscription}
          onLogout={logout}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="/generate"
            className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-pink-500/40 hover:bg-zinc-900/80"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
              Create
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Generate Content
            </h2>

            <p className="mt-3 leading-7 text-zinc-400">
              Create posts, captions, CTAs and premium AI visuals for your
              business.
            </p>

            <p className="mt-6 text-sm font-semibold text-pink-300">
              Open Generator →
            </p>
          </a>

          <a
            href="/history"
            className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-pink-500/40 hover:bg-zinc-900/80"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
              Library
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Content History
            </h2>

            <p className="mt-3 leading-7 text-zinc-400">
              Browse, copy, download and reuse your generated posts and images.
            </p>

            <p className="mt-6 text-sm font-semibold text-pink-300">
              View History →
            </p>
          </a>

          <a
            href="/dashboard/billing"
            className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-pink-500/40 hover:bg-zinc-900/80"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
              Account
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Billing
            </h2>

            <p className="mt-3 leading-7 text-zinc-400">
              Manage your subscription, billing portal and account plan.
            </p>

            <p className="mt-6 text-sm font-semibold text-pink-300">
              Manage Billing →
            </p>
          </a>
        </div>

        <div className="mt-8">
          <LockedFeatures isPaid={isPaid} />
        </div>
      </div>
    </main>
  );
}