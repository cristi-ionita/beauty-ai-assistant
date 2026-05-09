export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-20">
        <a
          href="/"
          className="inline-flex items-center text-sm font-semibold text-pink-300 transition hover:text-pink-200"
        >
          ← Back home
        </a>

        <div className="mt-8 sm:mt-10">
          <p className="text-xs uppercase tracking-[0.25em] text-pink-300 sm:text-sm">
            Legal
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-zinc-500 sm:text-base">
            Last updated: May 8, 2026
          </p>
        </div>

        <div className="mt-10 space-y-6 sm:space-y-8">
          <PolicySection title="1. Information we collect">
            We collect information you provide when creating an account, using
            the app, generating content, and managing your subscription. This
            may include your email address, generated content, account status,
            usage data, and subscription information.
          </PolicySection>

          <PolicySection title="2. How we use your information">
            We use your information to provide the service, generate AI content,
            manage credits, process subscriptions, improve the product, prevent
            abuse, and communicate important account updates.
          </PolicySection>

          <PolicySection title="3. Payments">
            Payments are processed by Stripe. We do not store your full card
            details. Stripe may collect and process payment information
            according to its own privacy policy.
          </PolicySection>

          <PolicySection title="4. AI-generated content">
            Prompts and generated outputs may be processed by AI providers to
            deliver the service. Do not submit sensitive personal data,
            confidential business information, or content you do not have the
            right to use.
          </PolicySection>

          <PolicySection title="5. Data storage">
            We store account data, generated content, usage data, and credit
            balances in our database provider. We use reasonable safeguards to
            protect your information.
          </PolicySection>

          <PolicySection title="6. Your rights">
            You may request access, correction, or deletion of your personal
            information by contacting us. Some data may be retained where
            required for legal, security, or billing purposes.
          </PolicySection>

          <PolicySection title="7. Contact">
            For privacy questions, contact us at:
            <br />
            <span className="text-pink-300">
              support@beautyai.app
            </span>
          </PolicySection>
        </div>
      </div>
    </main>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-7">
      <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
        {children}
      </p>
    </section>
  );
}