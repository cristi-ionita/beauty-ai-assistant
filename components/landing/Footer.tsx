export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 md:flex-row">
        <p>
          © 2026 BusinessContent AI. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="/privacy"
            className="hover:text-white"
          >
            Privacy
          </a>

          <a
            href="/terms"
            className="hover:text-white"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}