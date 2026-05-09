type UpgradeModalProps = {
  open: boolean;
  onClose: () => void;
  onUpgradeNormal: () => void;
  onUpgradePro: () => void;
};

export default function UpgradeModal({
  open,
  onClose,
  onUpgradeNormal,
  onUpgradePro,
}: UpgradeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-6">
      <div className="flex min-h-full items-center justify-center">
        <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 text-white shadow-[0_0_80px_rgba(0,0,0,0.65)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.18),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.12),transparent_35%)]" />

          <div className="relative p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-pink-300 sm:text-sm">
                  Upgrade Required
                </p>

                <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-5xl">
                  Unlock Unlimited Content
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                  Upgrade your workspace to generate unlimited AI content,
                  premium campaigns and high quality marketing visuals.
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 text-sm transition hover:bg-zinc-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white p-5 text-zinc-950 transition hover:scale-[1.01] hover:bg-zinc-100 sm:p-7">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-pink-500/15 blur-3xl transition group-hover:bg-pink-500/25" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 sm:text-sm">
                      Normal
                    </p>

                    <span className="rounded-full bg-zinc-950/5 px-3 py-1 text-xs font-bold text-zinc-700">
                      Popular
                    </span>
                  </div>

                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-5xl font-black">€19</span>

                    <span className="mb-1 text-sm font-semibold text-zinc-500">
                      / month
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-zinc-600">
                    Perfect for businesses creating weekly content and premium
                    social media campaigns.
                  </p>

                  <div className="mt-6 space-y-3">
                    <Feature text="Unlimited text generations" dark />
                    <Feature text="30 AI image credits" dark />
                    <Feature text="Premium content quality" dark />
                    <Feature text="Multi-language support" dark />
                  </div>

                  <button
                    onClick={onUpgradeNormal}
                    className="mt-8 w-full rounded-2xl bg-zinc-950 py-4 text-sm font-black text-white transition hover:bg-zinc-800"
                  >
                    Upgrade to Normal
                  </button>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-[2rem] border border-pink-500/30 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 p-5 text-white shadow-[0_0_45px_rgba(236,72,153,0.25)] transition hover:scale-[1.01] sm:p-7">
                <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/15 blur-3xl transition group-hover:bg-white/25" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-pink-100 sm:text-sm">
                      Pro
                    </p>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black text-white">
                      BEST VALUE
                    </span>
                  </div>

                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-5xl font-black">€49</span>

                    <span className="mb-1 text-sm font-semibold text-pink-100">
                      / month
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-pink-50">
                    Designed for agencies, creators and brands running advanced
                    high-volume AI workflows.
                  </p>

                  <div className="mt-6 space-y-3">
                    <Feature text="Unlimited text generations" />
                    <Feature text="150 AI image credits" />
                    <Feature text="AI campaign generation" />
                    <Feature text="Priority AI processing" />
                    <Feature text="Future scheduler access" />
                  </div>

                  <button
                    onClick={onUpgradePro}
                    className="mt-8 w-full rounded-2xl bg-white py-4 text-sm font-black text-zinc-950 transition hover:bg-zinc-200"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs leading-6 text-zinc-500 sm:text-sm">
                Secure payments powered by Stripe. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ${
        dark
          ? "bg-zinc-950/5 text-zinc-700"
          : "bg-white/15 text-white"
      }`}
    >
      <span>✓</span>

      <span>{text}</span>
    </div>
  );
}