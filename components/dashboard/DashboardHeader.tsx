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
}: DashboardHeaderProps) {
  const isPro = plan === "pro";
  const isNormal = plan === "normal";
  const isPaid = isNormal || isPro;

  const planLabel = plan || "free";

  return (
    <section className="mb-8 sm:mb-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.18),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.12),transparent_35%)]" />

        <div className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-pink-300 sm:text-sm">
                Subscription
              </p>

              <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Plans & Access
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                Upgrade your workspace to unlock more creative output, premium
                workflows and higher-volume AI image generation.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:min-w-[280px] sm:grid-cols-3 lg:w-auto lg:grid-cols-1">
              <MetricCard label="Current Plan" value={planLabel} highlight />

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

          {!isPaid && (
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <button
                onClick={onUpgradeNormal}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white p-5 text-left text-zinc-950 transition hover:scale-[1.01] hover:bg-zinc-100 sm:p-6"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-pink-500/20 blur-3xl transition group-hover:bg-pink-500/30" />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 sm:text-sm">
                    Normal
                  </p>

                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-3xl font-black sm:text-4xl">
                      €19
                    </span>

                    <span className="mb-1 text-xs font-semibold text-zinc-500 sm:text-sm">
                      / month
                    </span>
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-6 text-zinc-600">
                    For businesses posting every week with premium AI content
                    and consistent marketing output.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <PlanPill dark text="Unlimited text" />
                    <PlanPill dark text="30 AI images" />
                    <PlanPill dark text="Premium tones" />
                  </div>

                  <p className="mt-6 text-sm font-bold">Upgrade Normal</p>
                </div>
              </button>

              <button
                onClick={onUpgradePro}
                className="group relative overflow-hidden rounded-3xl border border-pink-500/30 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 p-5 text-left text-white shadow-[0_0_45px_rgba(236,72,153,0.25)] transition hover:scale-[1.01] sm:p-6"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/20 blur-3xl transition group-hover:bg-white/30" />

                <div className="relative">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-100 sm:text-sm">
                      Pro
                    </p>

                    <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
                      Best Value
                    </span>
                  </div>

                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-3xl font-black sm:text-4xl">
                      €49
                    </span>

                    <span className="mb-1 text-xs font-semibold text-pink-100 sm:text-sm">
                      / month
                    </span>
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-6 text-pink-50">
                    For agencies, power users and multi-brand workflows that
                    need advanced creative volume.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <PlanPill text="Unlimited text" />
                    <PlanPill text="150 AI images" />
                    <PlanPill text="Campaign workflows" />
                  </div>

                  <p className="mt-6 text-sm font-bold">Upgrade Pro</p>
                </div>
              </button>
            </div>
          )}

          {isPaid && (
            <div className="mt-8 rounded-3xl border border-pink-500/20 bg-zinc-950/70 p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-pink-300 sm:text-sm">
                    {planLabel} Plan
                  </p>

                  <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
                    Unlimited creative access
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                    Your subscription is active. Generate premium business
                    content, campaigns, captions and AI visuals with your
                    current plan.
                  </p>
                </div>

                <div className="w-fit rounded-2xl bg-pink-500/20 px-4 py-2 text-sm font-semibold text-pink-300">
                  ACTIVE
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <PlanPill text="Unlimited text generations" />
                <PlanPill text="AI image generation" />
                <PlanPill text="Premium tones and goals" />
                <PlanPill text="Multi-platform optimization" />
              </div>

              <button
                onClick={onManageSubscription}
                className="mt-6 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 sm:w-auto"
              >
                Manage Subscription
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-4 sm:px-5">
      <p className="text-xs text-zinc-500">{label}</p>

      <p
        className={`mt-1 text-sm font-bold capitalize sm:text-base ${
          highlight ? "text-pink-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function PlanPill({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        dark ? "bg-zinc-950/10 text-zinc-700" : "bg-white/15 text-white"
      }`}
    >
      ✓ {text}
    </span>
  );
}