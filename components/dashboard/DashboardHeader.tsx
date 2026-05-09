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
    <section className="mb-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.18),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.12),transparent_35%)]" />

        <div className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-pink-300">
                BusinessContent AI
              </div>

              <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
                Content Generator
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
                Generate premium social media posts, captions, campaigns and AI
                visuals for local businesses, creators and service brands.
              </p>
            </div>

            <div className="grid min-w-[280px] gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <MetricCard
                label="Current Plan"
                value={planLabel}
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

          {!isPaid && (
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <button
                onClick={onUpgradeNormal}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white p-6 text-left text-zinc-950 transition hover:scale-[1.01] hover:bg-zinc-100"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-pink-500/20 blur-3xl transition group-hover:bg-pink-500/30" />

                <div className="relative">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
                    Normal
                  </p>

                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-black">€19</span>
                    <span className="mb-1 text-sm font-semibold text-zinc-500">
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

                  <p className="mt-6 text-sm font-bold">
                    Upgrade Normal →
                  </p>
                </div>
              </button>

              <button
                onClick={onUpgradePro}
                className="group relative overflow-hidden rounded-3xl border border-pink-500/30 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 p-6 text-left text-white shadow-[0_0_45px_rgba(236,72,153,0.25)] transition hover:scale-[1.01]"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/20 blur-3xl transition group-hover:bg-white/30" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-100">
                      Pro
                    </p>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
                      Best Value
                    </span>
                  </div>

                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-black">€49</span>
                    <span className="mb-1 text-sm font-semibold text-pink-100">
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

                  <p className="mt-6 text-sm font-bold">
                    Upgrade Pro →
                  </p>
                </div>
              </button>
            </div>
          )}

          {isPaid && (
            <div className="mt-8 rounded-3xl border border-pink-500/20 bg-zinc-950/70 p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
                    {planLabel} Plan
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-white">
                    Unlimited creative access
                  </h3>

                  <p className="mt-3 max-w-2xl leading-7 text-zinc-400">
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
                className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
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
        dark
          ? "bg-zinc-950/10 text-zinc-700"
          : "bg-white/15 text-white"
      }`}
    >
      ✓ {text}
    </span>
  );
}