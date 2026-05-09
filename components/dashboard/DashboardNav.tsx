type DashboardNavProps = {
  onLogout: () => void;
};

export default function DashboardNav({
  onLogout,
}: DashboardNavProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/dashboard"
          className="group relative inline-flex items-center gap-3"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_35px_rgba(236,72,153,0.35)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />

            <span className="relative text-sm font-black text-white">
              B
            </span>
          </div>

          <div className="hidden flex-col leading-none sm:flex">
            <span className="bg-gradient-to-r from-white via-pink-100 to-pink-300 bg-clip-text text-lg font-black tracking-tight text-transparent">
              BusinessContent
            </span>

            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.32em] text-pink-400">
              AI SUITE
            </span>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="/generate"
            className="rounded-xl px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          >
            Generate
          </a>

          <a
            href="/history"
            className="rounded-xl px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          >
            History
          </a>

          <a
            href="/dashboard/billing"
            className="rounded-xl px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          >
            Billing
          </a>

          <button
            onClick={onLogout}
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:bg-zinc-900"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}