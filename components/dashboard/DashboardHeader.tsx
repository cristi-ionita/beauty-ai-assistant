type DashboardHeaderProps = {
  isPro: boolean;
  creditsLeft: number | null;
  onUpgrade: () => void;
  onManageSubscription: () => void;
  onLogout: () => void;
};

export default function DashboardHeader({
  isPro,
  creditsLeft,
  onUpgrade,
  onManageSubscription,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="mb-10 flex items-center justify-between gap-6">
      <div>
        <h1 className="text-4xl font-bold">Content Generator</h1>

        <p className="mt-3 text-zinc-400">
          Generate social media content and AI images for beauty businesses.
        </p>

        <p className="mt-2 text-sm text-pink-300">
          {isPro ? "Plan: Pro" : `Credits left: ${creditsLeft ?? "..."}`}
        </p>

        {isPro ? (
          <button
            onClick={onManageSubscription}
            className="mt-4 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
          >
            Manage Subscription
          </button>
        ) : (
          <button
            onClick={onUpgrade}
            className="mt-4 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
          >
            Upgrade to Pro
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