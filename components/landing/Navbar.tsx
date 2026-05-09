export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="group relative inline-flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_40px_rgba(236,72,153,0.35)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />

            <span className="relative text-sm font-black tracking-wide text-white">
              B
            </span>
          </div>

          <div className="flex flex-col leading-none">
            <span className="bg-gradient-to-r from-white via-pink-100 to-pink-300 bg-clip-text text-xl font-black tracking-tight text-transparent">
              BusinessContent
            </span>

            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-pink-400">
              AI SUITE
            </span>
          </div>

          <div className="absolute -inset-3 rounded-3xl bg-pink-500/0 blur-2xl transition duration-500 group-hover:bg-pink-500/10" />
        </a>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            Login
          </a>

          <a
            href="/signup"
            className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] hover:opacity-90"
          >
            Start Free
          </a>
        </div>
      </div>
    </nav>
  );
}