export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-bold">
          BusinessContent AI
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
  );
}