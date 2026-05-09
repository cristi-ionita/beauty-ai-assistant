type UpgradeModalProps = {
  open: boolean;
  onClose: () => void;
  onUpgradeNormal: () => void;
  onUpgradePro: () => void;
};

export default function UpgradeModal({
  open,
  onClose,
  onUpgradeNormal,
  onUpgradePro,
}: UpgradeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-pink-300">
              Upgrade Required
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Unlock Unlimited Content
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-zinc-400">
              Upgrade your plan to continue generating premium beauty marketing
              content, AI images and campaigns.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-900"
          >
            ✕
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">NORMAL</p>

            <h3 className="mt-3 text-4xl font-bold">€19</h3>

            <p className="mt-1 text-zinc-500">per month</p>

            <ul className="mt-6 space-y-3 text-zinc-300">
              <li>✓ Unlimited text generations</li>
              <li>✓ 30 AI image credits</li>
              <li>✓ Premium content quality</li>
              <li>✓ Multi-language support</li>
            </ul>

            <button
              onClick={onUpgradeNormal}
              className="mt-8 w-full rounded-2xl bg-white py-4 font-semibold text-zinc-950 hover:bg-zinc-200"
            >
              Upgrade to Normal
            </button>
          </div>

          <div className="rounded-3xl border border-pink-500/30 bg-pink-500/10 p-6">
            <p className="text-sm text-pink-300">PRO</p>

            <h3 className="mt-3 text-4xl font-bold">€49</h3>

            <p className="mt-1 text-zinc-400">per month</p>

            <ul className="mt-6 space-y-3 text-zinc-200">
              <li>✓ Unlimited text generations</li>
              <li>✓ 150 AI image credits</li>
              <li>✓ AI campaign generation</li>
              <li>✓ Future scheduler access</li>
              <li>✓ Priority AI generation</li>
            </ul>

            <button
              onClick={onUpgradePro}
              className="mt-8 w-full rounded-2xl bg-pink-500 py-4 font-semibold hover:bg-pink-400"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}