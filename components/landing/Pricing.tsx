export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold">Simple pricing</h2>

        <p className="mt-4 text-zinc-400">
          Start free. Upgrade when you need more content and images.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-sm text-zinc-400">FREE</p>

          <h3 className="mt-3 text-4xl font-bold">€0</h3>

          <p className="mt-4 text-zinc-400">
            Perfect for testing the platform.
          </p>

          <ul className="mt-8 space-y-4 text-zinc-300">
            <li>• 10 text generations</li>
            <li>• 1 AI image</li>
            <li>• 3 posts per generation</li>
            <li>• Multi-language support</li>
            <li>• Content history</li>
          </ul>

          <a
            href="/signup"
            className="mt-10 inline-flex rounded-full border border-zinc-700 px-6 py-3 font-semibold hover:bg-zinc-800"
          >
            Start Free
          </a>
        </div>

        <div className="relative rounded-3xl border border-pink-500/40 bg-pink-500/10 p-8">
          <div className="absolute -top-4 left-8 rounded-full bg-pink-500 px-4 py-1 text-sm font-semibold">
            Most Popular
          </div>

          <p className="text-sm text-pink-300">NORMAL</p>

          <h3 className="mt-3 text-4xl font-bold">€19/mo</h3>

          <p className="mt-4 text-zinc-300">
            For businesses posting every week.
          </p>

          <ul className="mt-8 space-y-4 text-zinc-200">
            <li>• Unlimited text generations</li>
            <li>• 30 AI images per month</li>
            <li>• Up to 10 posts per generation</li>
            <li>• Premium tones and goals</li>
            <li>• Multi-platform optimization</li>
            <li>• Cancel anytime</li>
          </ul>

          <a
            href="/signup"
            className="mt-10 inline-flex rounded-full bg-pink-500 px-6 py-3 font-semibold text-white hover:bg-pink-400"
          >
            Upgrade Normal
          </a>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-sm text-zinc-400">PRO</p>

          <h3 className="mt-3 text-4xl font-bold">€49/mo</h3>

          <p className="mt-4 text-zinc-400">
            For agencies, power users and multi-brand content workflows.
          </p>

          <ul className="mt-8 space-y-4 text-zinc-300">
            <li>• Unlimited text generations</li>
            <li>• 150 AI images per month</li>
            <li>• Up to 10 posts per generation</li>
            <li>• Advanced campaign generation</li>
            <li>• Priority creative workflow</li>
            <li>• Cancel anytime</li>
          </ul>

          <a
            href="/signup"
            className="mt-10 inline-flex rounded-full border border-zinc-700 px-6 py-3 font-semibold hover:bg-zinc-800"
          >
            Upgrade Pro
          </a>
        </div>
      </div>
    </section>
  );
}