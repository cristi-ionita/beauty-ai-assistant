export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold">
          Everything you need to create business content
        </h2>

        <p className="mt-4 text-zinc-400">
          Built for modern local businesses, creators and small brands.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          "Instagram captions",
          "TikTok content ideas",
          "AI image generation",
          "Local promotions",
          "Professional brand tone",
          "Multi-language generation",
          "Hashtag generation",
          "Content history",
        ].map((feature) => (
          <div
            key={feature}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-zinc-300"
          >
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}