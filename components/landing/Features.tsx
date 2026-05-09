const features = [
  {
    title: "Instagram Captions",
    description:
      "Generate engaging captions optimized for reach, engagement and conversions.",
    icon: "✍️",
  },
  {
    title: "TikTok Content Ideas",
    description:
      "Create viral-ready hooks, concepts and short-form content angles instantly.",
    icon: "🎬",
  },
  {
    title: "AI Image Generation",
    description:
      "Generate premium marketing visuals and branded AI creatives in seconds.",
    icon: "🖼️",
  },
  {
    title: "Local Promotions",
    description:
      "Create campaigns for offers, launches, seasonal events and local growth.",
    icon: "📍",
  },
  {
    title: "Professional Brand Tone",
    description:
      "Generate content with luxury, premium, casual or conversion-focused tone.",
    icon: "💎",
  },
  {
    title: "Multi-language Support",
    description:
      "Create business content in multiple languages for global audiences.",
    icon: "🌍",
  },
  {
    title: "Hashtag Generation",
    description:
      "Get optimized hashtags tailored to your industry and social platform.",
    icon: "#️⃣",
  },
  {
    title: "Content History",
    description:
      "Access, search and reuse all your previously generated content and visuals.",
    icon: "📚",
  },
];

export default function Features() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-300">
            Features
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Everything you need to create business content
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Built for modern local businesses, creators and small brands.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5 shadow-2xl transition hover:-translate-y-1 hover:border-pink-500/30 sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.12),transparent_35%)] opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-2xl">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-black text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}