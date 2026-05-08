export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="text-lg font-bold">
            Beauty AI
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm hover:bg-zinc-900"
            >
              Login
            </a>

            <a
              href="/dashboard"
              className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold hover:bg-pink-400"
            >
              Start Free
            </a>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.18),transparent_45%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
          <p className="mb-6 rounded-full border border-pink-500/20 bg-pink-500/10 px-5 py-2 text-sm text-pink-300">
            AI marketing assistant for beauty businesses
          </p>

          <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Generate high-converting beauty content in seconds.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Create captions, hashtags, CTAs, promotional posts and social media
            campaigns for salons, spas, barbershops and beauty studios using AI.
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
            No credit card required to start.
          </p>

          <div className="mt-16 grid w-full max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                title: "Instant AI Posts",
                text: "Generate social media posts optimized for Instagram, Facebook, TikTok and more.",
              },
              {
                title: "Multiple Languages",
                text: "Create beauty marketing content in English, Spanish, French, German and more.",
              },
              {
                title: "Built for Salons",
                text: "Designed specifically for beauty, wellness and grooming businesses.",
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

      <section id="examples" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">
            Example AI-generated content
          </h2>

          <p className="mt-4 text-zinc-400">
            High-quality beauty marketing content generated in seconds.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Barbershop",
              text: "Fresh fade. Clean beard. Sharp confidence. Book your weekend appointment before all slots are gone. Your next look starts here.",
              tags: "#barbershop #fade #mensgrooming",
            },
            {
              title: "Nail Salon",
              text: "Minimal nude nails with a luxury finish. Perfect for summer appointments and elegant everyday looks. DM us to reserve your session.",
              tags: "#nailsalon #gelnails #luxurynails",
            },
            {
              title: "Lash Studio",
              text: "Natural volume lashes designed to make your mornings easier. Limited appointments available this week. Book now before they fill up.",
              tags: "#lashextensions #lashstudio #beauty",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7"
            >
              <h3 className="mb-4 text-xl font-semibold text-pink-300">
                {item.title}
              </h3>

              <p className="leading-8 text-zinc-300">{item.text}</p>

              <p className="mt-5 text-pink-400">{item.tags}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">
            Everything you need to create beauty content
          </h2>

          <p className="mt-4 text-zinc-400">
            Built for modern beauty and wellness brands.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Instagram captions",
            "TikTok content ideas",
            "Beauty promotion campaigns",
            "Luxury brand tone",
            "Multi-language generation",
            "Hashtag generation",
            "CTA optimization",
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

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Loved by beauty creators</h2>

          <p className="mt-4 text-zinc-400">
            Built for owners who need consistent content without hiring a full
            marketing team.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              quote:
                "This saves us hours every week. We can create promo posts in minutes instead of staring at a blank screen.",
              name: "Salon Owner",
            },
            {
              quote:
                "The captions feel much more specific than generic AI prompts. The beauty-focused options make a big difference.",
              name: "Lash Studio Founder",
            },
            {
              quote:
                "I use it for offers, booking reminders and seasonal posts. It helps us stay consistent on social media.",
              name: "Barbershop Manager",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7"
            >
              <p className="leading-8 text-zinc-300">“{item.quote}”</p>

              <p className="mt-6 text-sm font-semibold text-pink-300">
                — {item.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Simple pricing</h2>

          <p className="mt-4 text-zinc-400">Start free. Upgrade anytime.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <p className="text-sm text-zinc-400">FREE</p>

            <h3 className="mt-3 text-4xl font-bold">$0</h3>

            <p className="mt-4 text-zinc-400">
              Perfect for testing the platform.
            </p>

            <ul className="mt-8 space-y-4 text-zinc-300">
              <li>• 10 free generations</li>
              <li>• 3 posts per generation</li>
              <li>• Multi-language support</li>
              <li>• Content history</li>
            </ul>

            <a
              href="/dashboard"
              className="mt-10 inline-flex rounded-full border border-zinc-700 px-6 py-3 font-semibold hover:bg-zinc-800"
            >
              Start Free
            </a>
          </div>

          <div className="rounded-3xl border border-pink-500/30 bg-pink-500/10 p-8">
            <p className="text-sm text-pink-300">PRO</p>

            <h3 className="mt-3 text-4xl font-bold">$19/mo</h3>

            <p className="mt-4 text-zinc-300">
              For serious beauty businesses and agencies.
            </p>

            <ul className="mt-8 space-y-4 text-zinc-200">
              <li>• Unlimited generations</li>
              <li>• Up to 10 posts per generation</li>
              <li>• Advanced AI post generation</li>
              <li>• Premium marketing tones</li>
              <li>• Multi-platform optimization</li>
              <li>• Cancel anytime</li>
            </ul>

            <a
              href="/dashboard"
              className="mt-10 inline-flex rounded-full bg-pink-500 px-6 py-3 font-semibold text-white hover:bg-pink-400"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </section>

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
              q: "Which languages are supported?",
              a: "The app supports multiple languages including English, Spanish, French, German, Italian, Portuguese, Romanian, Dutch, Polish, Turkish and Arabic.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes. Pro subscriptions can be managed and canceled from the billing portal.",
            },
            {
              q: "What happens when I cancel Pro?",
              a: "You keep Pro access until the end of your paid billing period. After that, your account returns to the Free plan.",
            },
            {
              q: "Who is this for?",
              a: "Beauty salons, nail artists, lash studios, barbershops, spas, med spas, makeup artists and beauty marketing agencies.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h3 className="font-semibold text-white">{item.q}</h3>

              <p className="mt-3 leading-7 text-zinc-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="text-4xl font-bold">
          Ready to grow your beauty brand with AI?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Generate better beauty marketing content in seconds and stay
          consistent across every platform.
        </p>

        <a
          href="/dashboard"
          className="mt-10 inline-flex rounded-full bg-pink-500 px-8 py-4 font-semibold text-white hover:bg-pink-400"
        >
          Start Generating
        </a>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-8 text-center text-sm text-zinc-500">
        © 2026 Beauty AI. All rights reserved.
      </footer>
    </main>
  );
}