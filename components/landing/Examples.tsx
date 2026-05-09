const examples = [
  {
    title: "Restaurant",
    text: "Fresh ingredients, warm atmosphere and your next favorite dinner spot. Book your table this weekend before the best times are gone.",
    tags: "#restaurant #localfood #dinnerplans",
  },
  {
    title: "Gym",
    text: "Your strongest month starts with one session. Join today and get a personalized training plan built around your goals.",
    tags: "#fitness #gymmotivation #healthylifestyle",
  },
  {
    title: "Real Estate Agent",
    text: "Thinking about selling this season? Get a clear home value estimate and a simple plan to attract serious buyers.",
    tags: "#realestate #homevalue #propertymarket",
  },
];

export default function Examples() {
  return (
    <section id="examples" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-300">
            Examples
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            AI-generated content for real businesses
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            High-quality marketing content for different industries generated in
            seconds.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {examples.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5 shadow-2xl transition hover:border-pink-500/30 sm:p-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.12),transparent_35%)] opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-xl">
                  ✦
                </div>

                <h3 className="text-xl font-black text-pink-300">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
                  {item.text}
                </p>

                <p className="mt-6 break-words text-sm font-semibold leading-7 text-pink-400">
                  {item.tags}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}