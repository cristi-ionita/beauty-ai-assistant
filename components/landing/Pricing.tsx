const pricingPlans = [
  {
    name: "Free",
    price: "€0",
    description: "Perfect for testing the platform.",
    features: [
      "10 text generations",
      "1 AI image",
      "3 posts per generation",
      "Multi-language support",
      "Content history",
    ],
    button: "Start Free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Normal",
    price: "€19/mo",
    description: "For businesses posting every week.",
    features: [
      "Unlimited text generations",
      "30 AI images per month",
      "Up to 10 posts per generation",
      "Premium tones and goals",
      "Multi-platform optimization",
      "Cancel anytime",
    ],
    button: "Upgrade Normal",
    href: "/signup",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Pro",
    price: "€49/mo",
    description:
      "For agencies, power users and multi-brand workflows.",
    features: [
      "Unlimited text generations",
      "150 AI images per month",
      "Up to 10 posts per generation",
      "Advanced campaign generation",
      "Priority creative workflow",
      "Cancel anytime",
    ],
    button: "Upgrade Pro",
    href: "/signup",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-300">
            Pricing
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Simple pricing
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Start free. Upgrade when you need more content and AI visuals.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`group relative overflow-hidden rounded-[2rem] border p-6 shadow-2xl transition hover:-translate-y-1 sm:p-8 ${
                plan.highlighted
                  ? "border-pink-500/40 bg-gradient-to-br from-pink-500/15 via-zinc-900 to-purple-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.12),transparent_35%)] opacity-0 transition group-hover:opacity-100" />

              {plan.badge && (
                <div className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div className="relative">
                <p
                  className={`text-xs font-bold uppercase tracking-[0.3em] ${
                    plan.highlighted
                      ? "text-pink-300"
                      : "text-zinc-500"
                  }`}
                >
                  {plan.name}
                </p>

                <h3 className="mt-5 text-4xl font-black text-white sm:text-5xl">
                  {plan.price}
                </h3>

                <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
                  {plan.description}
                </p>

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          plan.highlighted
                            ? "bg-pink-500 text-white"
                            : "bg-zinc-800 text-pink-300"
                        }`}
                      >
                        ✓
                      </div>

                      <p className="text-sm leading-6 text-zinc-300 sm:text-base">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={plan.href}
                  className={`mt-10 inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm font-bold transition ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:scale-[1.02]"
                      : "border border-zinc-700 bg-zinc-950 text-zinc-100 hover:border-pink-500/30 hover:bg-zinc-800"
                  }`}
                >
                  {plan.button}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}