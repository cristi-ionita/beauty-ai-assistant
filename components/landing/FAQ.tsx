const faqs = [
  {
    q: "Which platforms are supported?",
    a: "You can generate content for Instagram, Facebook, TikTok, LinkedIn and Google Business Profile.",
  },
  {
    q: "Which business types are supported?",
    a: "Restaurants, cafes, salons, gyms, clinics, real estate agents, auto services, cleaning services, hotels, creators, local shops and more.",
  },
  {
    q: "Which languages are supported?",
    a: "The app supports multiple languages including English, Spanish, French, German, Italian, Portuguese, Romanian, Dutch, Polish, Turkish and Arabic.",
  },
  {
    q: "How many AI images do I get?",
    a: "Free users get 1 AI image. Normal includes 30 AI images per month. Pro includes 150 AI images per month.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Paid subscriptions can be managed and canceled from the billing portal.",
  },
  {
    q: "What happens when I cancel?",
    a: "You keep paid access until the end of your billing period. After that, your account returns to the Free plan.",
  },
];

export default function FAQ() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-300">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Frequently asked questions
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Common questions before getting started.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <article
              key={item.q}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5 shadow-2xl transition hover:border-pink-500/30 sm:p-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.10),transparent_35%)] opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pink-500/10 text-sm font-black text-pink-300">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-lg font-black leading-7 text-white sm:text-xl">
                      {item.q}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}