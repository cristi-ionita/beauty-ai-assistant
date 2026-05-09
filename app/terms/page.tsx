export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <a href="/" className="text-sm text-pink-300">
          ← Back home
        </a>

        <h1 className="mt-8 text-4xl font-bold">
          Terms of Service
        </h1>

        <p className="mt-4 text-zinc-400">
          Last updated: May 8, 2026
        </p>

        <div className="mt-10 space-y-8 leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold text-white">
              1. Acceptance of terms
            </h2>

            <p className="mt-3">
              By using BusinessContent AI, you agree to these Terms of Service. If you do
              not agree, do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              2. Service description
            </h2>

            <p className="mt-3">
              BusinessContent AI provides AI-generated marketing content and image
              generation tools for beauty and wellness businesses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              3. Accounts
            </h2>

            <p className="mt-3">
              You are responsible for maintaining the security of your account
              and any activity that occurs under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              4. Subscription billing
            </h2>

            <p className="mt-3">
              Paid subscriptions renew automatically unless canceled before the
              next billing cycle. You may manage or cancel your subscription
              through the billing portal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              5. AI-generated content
            </h2>

            <p className="mt-3">
              AI-generated content may contain inaccuracies or outputs similar
              to content generated for other users. You are responsible for
              reviewing all generated content before publishing or using it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              6. Acceptable use
            </h2>

            <p className="mt-3">
              You may not use the platform for illegal, abusive, misleading,
              fraudulent, harmful, or infringing activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              7. Limitation of liability
            </h2>

            <p className="mt-3">
              BusinessContent AI is provided "as is" without warranties of any kind. We
              are not liable for indirect, incidental, or consequential damages
              resulting from the use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              8. Changes to the service
            </h2>

            <p className="mt-3">
              We may modify, suspend, or discontinue parts of the service at any
              time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              9. Contact
            </h2>

            <p className="mt-3">
              For questions regarding these terms, contact:
              support@beautyai.app
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}