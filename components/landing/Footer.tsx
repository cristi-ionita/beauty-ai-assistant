export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_30px_rgba(236,72,153,0.35)]">
                <span className="text-sm font-black text-white">B</span>
              </div>

              <div>
                <h3 className="bg-gradient-to-r from-white via-pink-100 to-pink-300 bg-clip-text text-xl font-black tracking-tight text-transparent">
                  BusinessContent AI
                </h3>

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-pink-400">
                  AI SUITE
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-500 sm:text-base">
              AI-powered content generation platform for local businesses,
              creators, agencies and modern brands.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-300">
                Platform
              </p>

              <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
                <a
                  href="/generate"
                  className="transition hover:text-white"
                >
                  Generate
                </a>

                <a
                  href="/history"
                  className="transition hover:text-white"
                >
                  History
                </a>

                <a
                  href="/dashboard/billing"
                  className="transition hover:text-white"
                >
                  Billing
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-300">
                Legal
              </p>

              <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
                <a
                  href="/privacy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </a>

                <a
                  href="/terms"
                  className="transition hover:text-white"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-800 pt-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 BusinessContent AI. All rights reserved.
          </p>

          <p>
            Built for creators, local businesses and modern marketing teams.
          </p>
        </div>
      </div>
    </footer>
  );
}