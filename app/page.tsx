export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border border-pink-500/30 px-4 py-2 text-sm text-pink-300">
          AI content generator for beauty businesses
        </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Generate Instagram content for salons in seconds.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Create captions, hashtags, story ideas and promo posts for barbershops,
          nail salons, lash studios and beauty salons.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/dashboard"
            className="rounded-full bg-pink-500 px-8 py-4 font-semibold text-white hover:bg-pink-400"
          >
            Start generating
          </a>

          <a
            href="#examples"
            className="rounded-full border border-zinc-700 px-8 py-4 font-semibold text-zinc-200 hover:bg-zinc-900"
          >
            See examples
          </a>
        </div>
      </section>

      <section id="examples" className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-8 text-3xl font-bold">Example outputs</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Barbershop",
              text: "Fresh fade, clean beard, sharp confidence. Book your weekend slot before it’s gone. #barbershop #freshfade",
            },
            {
              title: "Nail Salon",
              text: "Soft pink nails for a clean luxury look. Perfect for summer appointments. DM us to book. #nailsalon #gelnails",
            },
            {
              title: "Lash Studio",
              text: "Wake up ready with natural volume lashes. Limited appointments this week. Book now. #lashstudio #lashextensions",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h3 className="mb-3 text-xl font-semibold text-pink-300">
                {item.title}
              </h3>
              <p className="text-zinc-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}