export default function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      <h2 className="text-4xl font-bold">
        Ready to grow your business with AI?
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        Generate better marketing content and premium AI visuals in seconds.
      </p>

      <a
        href="/signup"
        className="mt-10 inline-flex rounded-full bg-pink-500 px-8 py-4 font-semibold text-white hover:bg-pink-400"
      >
        Start Generating
      </a>
    </section>
  );
}