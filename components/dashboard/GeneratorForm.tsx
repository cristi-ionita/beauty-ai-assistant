type GeneratorFormProps = {
  businessType: string;
  setBusinessType: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  goal: string;
  setGoal: (value: string) => void;
  postCount: number;
  setPostCount: (value: number) => void;
  topic: string;
  setTopic: (value: string) => void;
  isPro: boolean;
  creditsLeft: number | null;
  loading: boolean;
  imageLoading: boolean;
  onGeneratePosts: () => void;
  onGenerateImage: () => void;
};

export default function GeneratorForm({
  businessType,
  setBusinessType,
  language,
  setLanguage,
  platform,
  setPlatform,
  tone,
  setTone,
  goal,
  setGoal,
  postCount,
  setPostCount,
  topic,
  setTopic,
  isPro,
  creditsLeft,
  loading,
  imageLoading,
  onGeneratePosts,
  onGenerateImage,
}: GeneratorFormProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Generate content</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Business Type
          </label>

          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
          >
            <option>Barbershop</option>
            <option>Nail Salon</option>
            <option>Lash Studio</option>
            <option>Hair Salon</option>
            <option>Beauty Salon</option>
            <option>Spa</option>
            <option>Massage Studio</option>
            <option>Makeup Artist</option>
            <option>Med Spa</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">Language</label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Italian</option>
            <option>Portuguese</option>
            <option>Romanian</option>
            <option>Dutch</option>
            <option>Polish</option>
            <option>Turkish</option>
            <option>Arabic</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">Platform</label>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
          >
            <option>Instagram</option>
            <option>Facebook</option>
            <option>TikTok</option>
            <option>LinkedIn</option>
            <option>Google Business Profile</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">Tone</label>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
          >
            <option>Friendly</option>
            <option>Professional</option>
            <option>Luxury</option>
            <option>Bold</option>
            <option>Funny</option>
            <option>Elegant</option>
            <option>Warm</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">Goal</label>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
          >
            <option>Get bookings</option>
            <option>Promote offer</option>
            <option>Educate clients</option>
            <option>Announce service</option>
            <option>Increase engagement</option>
            <option>Sell gift cards</option>
            <option>Win back old clients</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Number of posts
          </label>

          <select
            value={postCount}
            onChange={(e) => setPostCount(Number(e.target.value))}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
          >
            <option value={3}>3 Posts</option>

            {isPro && (
              <>
                <option value={5}>5 Posts</option>
                <option value={10}>10 Posts</option>
              </>
            )}
          </select>

          {!isPro && (
            <p className="mt-2 text-xs text-zinc-500">
              Upgrade to Pro for 5 and 10 post generations.
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Topic / Promotion
          </label>

          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: Summer nails promotion, new haircut service..."
            className="min-h-[130px] w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
          />
        </div>

        <button
          onClick={onGeneratePosts}
          disabled={loading || creditsLeft === 0}
          className="w-full rounded-xl bg-pink-500 py-4 font-semibold hover:bg-pink-400 disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : creditsLeft === 0
              ? "No credits left"
              : "Generate Posts"}
        </button>

        <button
          onClick={onGenerateImage}
          disabled={imageLoading || !topic.trim()}
          className="w-full rounded-xl border border-zinc-700 py-4 font-semibold hover:bg-zinc-800 disabled:opacity-50"
        >
          {imageLoading ? "Generating Image..." : "Generate AI Image"}
        </button>

        {creditsLeft === 0 && !isPro && (
          <p className="text-sm text-zinc-400">
            You used all free credits. Upgrade to Pro for unlimited generations.
          </p>
        )}
      </div>
    </div>
  );
}