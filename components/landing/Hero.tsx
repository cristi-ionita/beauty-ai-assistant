const heroCards = [
  {
    title: "Instant AI Posts",
    text: "Generate social media posts optimized for Instagram, Facebook, TikTok, LinkedIn and Google Business Profile.",
    icon: "⚡",
  },
  {
    title: "AI Image Generation",
    text: "Create premium square marketing visuals for offers, launches, promotions and campaigns.",
    icon: "🖼️",
  },
  {
    title: "Built for Businesses",
    text: "Designed for restaurants, salons, gyms, clinics, real estate, services and modern brands.",
    icon: "🚀",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.18),transparent_40%)]" />

      <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-pink-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32">
        <div className="inline-flex items-center rounded-full border border-pink-500/20 bg-pink-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-pink-300 sm:text-sm">
          AI marketing assistant for local businesses
        </div>

        <h1 className="mt-8 max-w-6xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          Generate high-converting business content in seconds.
        </h1>

        <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-lg sm:leading-8">
          Create captions, hashtags, CTAs, promotional posts and AI marketing
          images for restaurants, salons, gyms, clinics, real estate agents,
          local services and modern brands.
        </p>

        <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:w-auto sm:flex-row">
          <a
            href="/signup"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_35px_rgba(236,72,153,0.35)] transition hover:scale-[1.02]"
          >
            Start Free
          </a>

          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/70 px-8 py-4 text-sm font-bold text-zinc-200 transition hover:border-pink-500/30 hover:bg-zinc-800"
          >
            View Pricing
          </a>
        </div>

        <p className="mt-5 text-sm text-zinc-500">
          Start with 10 free text generations and 1 free AI image.
        </p>

        <div className="mt-16 grid w-full max-w-6xl gap-5 md:grid-cols-3">
          {heroCards.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/70 p-5 text-left shadow-2xl backdrop-blur transition hover:-translate-y-1 hover:border-pink-500/30 sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.10),transparent_35%)] opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-2xl">
                  {item.icon}
                </div>

                <h3 className="text-xl font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}