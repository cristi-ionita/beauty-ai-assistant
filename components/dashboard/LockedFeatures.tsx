type LockedFeaturesProps = {
  isPaid: boolean;
};

export default function LockedFeatures({
  isPaid,
}: LockedFeaturesProps) {
  if (isPaid) return null;

  const features = [
    {
      title: "AI Video Content",
      description:
        "Generate short-form video concepts, reel ideas and cinematic promo campaign directions for social media.",
      plan: "Coming Soon",
      icon: "🎥",
    },
    {
      title: "AI Music Ads",
      description:
        "Create ad jingle concepts, background music styles and premium audio campaign ideas.",
      plan: "Coming Soon",
      icon: "🎵",
    },
    {
      title: "Voiceover Scripts",
      description:
        "Generate premium voiceover scripts for TikTok ads, reels, local business promos and launches.",
      plan: "Pro",
      icon: "🎙️",
    },
    {
      title: "AI Content Calendar",
      description:
        "Plan weekly and monthly social campaigns with automated content strategies.",
      plan: "Pro",
      icon: "📅",
    },
    {
      title: "Scheduled Posting",
      description:
        "Prepare content in advance and manage publishing workflows faster.",
      plan: "Pro",
      icon: "⏳",
    },
    {
      title: "Saved Brand Profiles",
      description:
        "Save your tone, services, hashtags and business identity settings.",
      plan: "Normal",
      icon: "✨",
    },
    {
      title: "Campaign Generator",
      description:
        "Generate launch campaigns, promotions and seasonal marketing ideas.",
      plan: "Pro",
      icon: "🚀",
    },
  ];

  return (
    <section className="mt-8 overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 shadow-2xl">
      <div className="relative overflow-hidden p-5 sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.14),transparent_35%)]" />

        <div className="relative">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-pink-300 sm:text-sm">
                Premium Features
              </p>

              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
                Unlock advanced AI tools
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                Upgrade your workspace with automation, campaigns, video
                concepts and premium creative workflows for growing brands.
              </p>
            </div>

            <div className="w-fit rounded-2xl border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-300">
              Premium Access
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 transition hover:border-pink-500/30 hover:bg-zinc-950"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-500/10 text-2xl">
                      {feature.icon}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white sm:text-lg">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] ${
                      feature.plan === "Coming Soon"
                        ? "border border-purple-500/20 bg-purple-500/10 text-purple-300"
                        : "border border-pink-500/20 bg-pink-500/10 text-pink-300"
                    }`}
                  >
                    {feature.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-pink-500/20 bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-purple-500/10 p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-pink-300">
                  Future Roadmap
                </p>

                <h3 className="mt-2 text-lg font-black text-white sm:text-xl">
                  AI video & music generation coming soon
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
                  We are building next-generation creative tools including AI
                  reels, promo videos, ad music concepts and cinematic campaign
                  workflows.
                </p>
              </div>

              <a
                href="/dashboard/billing"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 sm:w-auto"
              >
                View Plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}