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
  const isPaid = isNormal || isPro;

  const planLabel = plan || "free";

  return (
    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="w-full">
        <h1 className="text-4xl font-bold">Content Generator</h1>

        <p className="mt-3 text-zinc-400">
          Generate social media content and AI images for beauty businesses.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <p className="text-xs text-zinc-500">Current Plan</p>

            <p className="mt-1 font-semibold capitalize text-pink-300">
              {planLabel}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <p className="text-xs text-zinc-500">Text Credits</p>

            <p className="mt-1 font-semibold">
              {isPaid ? "Unlimited" : creditsLeft ?? "..."}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <p className="text-xs text-zinc-500">Image Credits</p>

            <p className="mt-1 font-semibold">
              {isPaid ? "Unlimited" : imageCreditsLeft ?? "..."}
            </p>
          </div>
        </div>

        {isPaid && (
          <div className="mt-6 max-w-4xl rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-zinc-900 p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-pink-300">
                  {planLabel} Plan
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  Unlimited Access
                </h3>

                <p className="mt-3 max-w-2xl leading-7 text-zinc-300">
                  Your subscription is active. Generate premium beauty
                  marketing content, captions, campaigns and AI visuals with
                  your current plan.
                </p>
              </div>

              <div className="w-fit rounded-2xl bg-pink-500/20 px-4 py-2 text-sm font-semibold text-pink-300">
                ACTIVE
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                ✓ Unlimited text generations
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                ✓ Unlimited AI images
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                ✓ Premium tones and goals
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                ✓ Multi-platform optimization
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/dashboard/billing"
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold hover:bg-zinc-800"
              >
                Billing Settings
              </a>

              <button
                onClick={onManageSubscription}
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                Manage in Stripe
              </button>
            </div>
          </div>
        )}

        {!isPaid && (
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
      </div>

      <div className="flex shrink-0 flex-wrap gap-3">
        <a
          href="/dashboard/billing"
          className="rounded-xl border border-zinc-700 px-5 py-3 text-sm hover:bg-zinc-900"
        >
          Billing
        </a>

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