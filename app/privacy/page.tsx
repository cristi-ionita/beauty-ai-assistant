export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <a href="/" className="text-sm text-pink-300">
          ← Back home
        </a>

        <h1 className="mt-8 text-4xl font-bold">Privacy Policy</h1>

        <p className="mt-4 text-zinc-400">Last updated: May 8, 2026</p>

        <div className="mt-10 space-y-8 leading-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold text-white">
              1. Information we collect
            </h2>
            <p className="mt-3">
              We collect information you provide when creating an account, using
              the app, generating content, and managing your subscription. This
              may include your email address, generated content, account status,
              usage data, and subscription information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              2. How we use your information
            </h2>
            <p className="mt-3">
              We use your information to provide the service, generate AI
              content, manage credits, process subscriptions, improve the
              product, prevent abuse, and communicate important account updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              3. Payments
            </h2>
            <p className="mt-3">
              Payments are processed by Stripe. We do not store your full card
              details. Stripe may collect and process payment information
              according to its own privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              4. AI-generated content
            </h2>
            <p className="mt-3">
              Prompts and generated outputs may be processed by AI providers to
              deliver the service. Do not submit sensitive personal data,
              confidential business information, or content you do not have the
              right to use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              5. Data storage
            </h2>
            <p className="mt-3">
              We store account data, generated content, usage data, and credit
              balances in our database provider. We use reasonable safeguards to
              protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              6. Your rights
            </h2>
            <p className="mt-3">
              You may request access, correction, or deletion of your personal
              information by contacting us. Some data may be retained where
              required for legal, security, or billing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">
              7. Contact
            </h2>
            <p className="mt-3">
              For privacy questions, contact us at: support@beautyai.app
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}