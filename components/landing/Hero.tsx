export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.18),transparent_45%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-6 rounded-full border border-pink-500/20 bg-pink-500/10 px-5 py-2 text-sm text-pink-300">
          AI marketing assistant for local businesses
        </p>

        <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
          Generate high-converting business content in seconds.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Create captions, hashtags, CTAs, promotional posts and AI marketing
          images for restaurants, salons, gyms, clinics, real estate agents,
          local services and small brands.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/dashboard"
            className="rounded-full bg-pink-500 px-8 py-4 font-semibold text-white transition hover:bg-pink-400"
          >
            Start Free
          </a>

          <a
            href="#pricing"
            className="rounded-full border border-zinc-700 px-8 py-4 font-semibold text-zinc-200 transition hover:bg-zinc-900"
          >
            View Pricing
          </a>
        </div>

        <p className="mt-5 text-sm text-zinc-500">
          Start with 10 free text generations and 1 free AI image.
        </p>

        <div className="mt-16 grid w-full max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Instant AI Posts",
              text: "Generate social media posts optimized for Instagram, Facebook, TikTok, LinkedIn and Google Business Profile.",
            },
            {
              title: "AI Image Generation",
              text: "Create premium square marketing visuals for offers, launches, promotions and campaigns.",
            },
            {
              title: "Built for Local Businesses",
              text: "Designed for restaurants, salons, gyms, clinics, real estate, services and small brands.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur"
            >
              <h3 className="mb-3 text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="leading-7 text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}