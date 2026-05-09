export default function FAQ() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold">FAQ</h2>

        <p className="mt-4 text-zinc-400">
          Common questions before getting started.
        </p>
      </div>

      <div className="space-y-4">
        {[
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
        ].map((item) => (
          <div
            key={item.q}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <h3 className="font-semibold text-white">
              {item.q}
            </h3>

            <p className="mt-3 leading-7 text-zinc-400">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}