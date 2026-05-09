export default function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.18),transparent_40%)]" />

        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative px-6 py-16 text-center sm:px-10 sm:py-24">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 text-2xl font-black text-white shadow-[0_0_35px_rgba(236,72,153,0.35)]">
            AI
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-300">
            BusinessContent AI
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Ready to grow your business with AI?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Generate premium marketing content, captions, campaigns and AI
            visuals for your business in seconds.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/signup"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_35px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] sm:w-auto"
            >
              Start Generating
            </a>

            <a
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-950/70 px-8 py-4 text-sm font-bold text-zinc-200 transition hover:border-pink-500/40 hover:bg-zinc-800 sm:w-auto"
            >
              View Pricing
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <FeaturePill text="AI captions" />
            <FeaturePill text="AI visuals" />
            <FeaturePill text="Multi-platform" />
            <FeaturePill text="Unlimited workflows" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-zinc-700 bg-zinc-950/70 px-4 py-2 text-xs font-semibold text-zinc-300">
      ✦ {text}
    </span>
  );
}