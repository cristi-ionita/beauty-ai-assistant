export default function TermsPage() {
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
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-zinc-500 sm:text-base">
            Last updated: May 8, 2026
          </p>
        </div>

        <div className="mt-10 space-y-6 sm:space-y-8">
          <TermsSection title="1. Acceptance of terms">
            By using BusinessContent AI, you agree to these Terms of Service.
            If you do not agree, do not use the platform.
          </TermsSection>

          <TermsSection title="2. Service description">
            BusinessContent AI provides AI-generated marketing content and
            image generation tools for beauty, local service and wellness
            businesses.
          </TermsSection>

          <TermsSection title="3. Accounts">
            You are responsible for maintaining the security of your account
            and any activity that occurs under your account.
          </TermsSection>

          <TermsSection title="4. Subscription billing">
            Paid subscriptions renew automatically unless canceled before the
            next billing cycle. You may manage or cancel your subscription
            through the billing portal.
          </TermsSection>

          <TermsSection title="5. AI-generated content">
            AI-generated content may contain inaccuracies or outputs similar
            to content generated for other users. You are responsible for
            reviewing all generated content before publishing or using it.
          </TermsSection>

          <TermsSection title="6. Acceptable use">
            You may not use the platform for illegal, abusive, misleading,
            fraudulent, harmful, or infringing activities.
          </TermsSection>

          <TermsSection title="7. Limitation of liability">
            BusinessContent AI is provided "as is" without warranties of any
            kind. We are not liable for indirect, incidental, or consequential
            damages resulting from the use of the platform.
          </TermsSection>

          <TermsSection title="8. Changes to the service">
            We may modify, suspend, or discontinue parts of the service at
            any time without prior notice.
          </TermsSection>

          <TermsSection title="9. Contact">
            For questions regarding these terms, contact:
            <br />
            <span className="text-pink-300">
              support@beautyai.app
            </span>
          </TermsSection>
        </div>
      </div>
    </main>
  );
}

function TermsSection({
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