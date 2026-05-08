type DashboardHeaderProps = {
  plan: string | null;
  creditsLeft: number | null;
  imageCreditsLeft: number | null;
  onUpgradeNormal: () => void;
  onUpgradePro: () => void;
  onManageSubscription: () => void;
  onLogout: () => void;
};

export default function DashboardHeader({
  plan,
  creditsLeft,
  imageCreditsLeft,
  onUpgradeNormal,
  onUpgradePro,
  onManageSubscription,
  onLogout,
}: DashboardHeaderProps) {
  const isPro = plan === "pro";
  const isNormal = plan === "normal";

  return (
    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold">
          Content Generator
        </h1>

        <p className="mt-3 text-zinc-400">
          Generate social media content and AI images for beauty businesses.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <p className="text-xs text-zinc-500">
              Current Plan
            </p>

            <p className="mt-1 font-semibold capitalize text-pink-300">
              {plan || "free"}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <p className="text-xs text-zinc-500">
              Text Credits
            </p>

            <p className="mt-1 font-semibold">
              {creditsLeft ?? "..."}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <p className="text-xs text-zinc-500">
              Image Credits
            </p>

            <p className="mt-1 font-semibold">
              {imageCreditsLeft ?? "..."}
            </p>
          </div>
        </div>

        {!isNormal && !isPro && (
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onUpgradeNormal}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
            >
              Upgrade Normal — €19
            </button>

            <button
              onClick={onUpgradePro}
              className="rounded-xl bg-pink-500 px-5 py-3 text-sm font-semibold hover:bg-pink-400"
            >
              Upgrade Pro — €49
            </button>
          </div>
        )}

        {(isNormal || isPro) && (
          <button
            onClick={onManageSubscription}
            className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
          >
            Manage Subscription
          </button>
        )}
      </div>

      <div className="flex gap-3">
        <a
          href="/history"
          className="rounded-xl border border-zinc-700 px-5 py-3 text-sm hover:bg-zinc-900"
        >
          History
        </a>

        <button
          onClick={onLogout}
          className="rounded-xl border border-zinc-700 px-5 py-3 text-sm hover:bg-zinc-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
}