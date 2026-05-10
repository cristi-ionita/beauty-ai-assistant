import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="group relative inline-flex shrink-0 items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_40px_rgba(236,72,153,0.35)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />

            <span className="relative text-sm font-black tracking-wide text-white">
              B
            </span>
          </div>

          <div className="hidden flex-col leading-none sm:flex">
            <span className="bg-gradient-to-r from-white via-pink-100 to-pink-300 bg-clip-text text-xl font-black tracking-tight text-transparent">
              BusinessContent
            </span>

            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-pink-400">
              AI SUITE
            </span>
          </div>

          <div className="absolute -inset-3 rounded-3xl bg-pink-500/0 blur-2xl transition duration-500 group-hover:bg-pink-500/10" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 sm:px-5"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-4 py-2 text-sm font-bold text-white shadow-[0_0_25px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] hover:opacity-90 sm:px-5"
          >
            Start Free
          </Link>
        </div>
      </div>
    </nav>
  );
}