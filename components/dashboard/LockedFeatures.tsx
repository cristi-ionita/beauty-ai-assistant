type LockedFeaturesProps = {
  isPaid: boolean;
};

export default function LockedFeatures({ isPaid }: LockedFeaturesProps) {
  if (isPaid) return null;

  const features = [
    {
      title: "AI Content Calendar",
      description: "Plan a full week or month of beauty content in minutes.",
      plan: "Pro",
    },
    {
      title: "Scheduled Posting",
      description: "Prepare posts now and publish them later.",
      plan: "Pro",
    },
    {
      title: "Saved Brand Profiles",
      description: "Save your salon tone, services, hashtags and style.",
      plan: "Normal",
    },
    {
      title: "Campaign Generator",
      description: "Create promo campaigns for offers, seasons and launches.",
      plan: "Pro",
    },
  ];

  return (
    <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm uppercase tracking-wide text-pink-300">
        Premium Features
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        Unlock more growth tools
      </h2>

      <p className="mt-3 text-sm leading-7 text-zinc-400">
        Upgrade to turn Beauty AI into a full marketing assistant for your
        salon, studio or agency.
      </p>

      <div className="mt-6 grid gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-white">
                  🔒 {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {feature.description}
                </p>
              </div>

              <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-300">
                {feature.plan}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}