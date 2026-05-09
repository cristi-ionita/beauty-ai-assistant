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

const businessTypes = [
  "Restaurant",
  "Cafe",
  "Bakery",
  "Barbershop",
  "Beauty Salon",
  "Nail Salon",
  "Lash Studio",
  "Hair Salon",
  "Spa",
  "Massage Studio",
  "Med Spa",
  "Gym",
  "Fitness Coach",
  "Yoga Studio",
  "Dental Clinic",
  "Medical Clinic",
  "Real Estate Agent",
  "Hotel",
  "Auto Detailing",
  "Car Wash",
  "Cleaning Service",
  "Tattoo Studio",
  "Pet Grooming",
  "Law Firm",
  "Accounting Firm",
  "Local Shop",
  "Online Store",
  "Event Planner",
  "Photographer",
  "Personal Brand",
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Romanian",
  "Dutch",
  "Polish",
  "Turkish",
  "Arabic",
];

const platforms = [
  "Instagram",
  "Facebook",
  "TikTok",
  "LinkedIn",
  "Google Business Profile",
];

const tones = [
  "Friendly",
  "Professional",
  "Luxury",
  "Bold",
  "Funny",
  "Elegant",
  "Warm",
  "Trustworthy",
  "Premium",
  "Casual",
  "Local",
];

const goals = [
  "Get bookings",
  "Promote offer",
  "Educate clients",
  "Announce service",
  "Increase engagement",
  "Sell gift cards",
  "Win back old clients",
  "Get more calls",
  "Drive website visits",
  "Promote new product",
  "Build local trust",
  "Generate leads",
];

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
  const hasNoCredits = creditsLeft === 0;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 p-4 shadow-2xl sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.16),transparent_35%)]" />

      <div className="relative">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-pink-300">
            AI Generator
          </p>

          <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl">
            Create content
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Select your business, platform and campaign direction.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <FormField label="Business Type">
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="field-input"
            >
              {businessTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Language">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="field-input"
              >
                {languages.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Platform">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="field-input"
              >
                {platforms.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Tone">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="field-input"
              >
                {tones.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Goal">
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="field-input"
              >
                {goals.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField label="Number of posts">
            <select
              value={postCount}
              onChange={(e) => setPostCount(Number(e.target.value))}
              className="field-input"
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
              <div className="mt-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3">
                <p className="text-xs leading-5 text-zinc-500">
                  Upgrade to Normal or Pro for larger 5 and 10 post batches.
                </p>
              </div>
            )}
          </FormField>

          <FormField label="Topic / Promotion">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: weekend offer, new service, lunch special, client testimonial, seasonal campaign..."
              className="min-h-[120px] w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-pink-500 sm:min-h-[140px]"
            />
          </FormField>

          <div className="grid gap-3 pt-1">
            <button
              onClick={onGeneratePosts}
              disabled={loading || hasNoCredits}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-5 py-4 text-sm font-black text-white shadow-[0_0_35px_rgba(236,72,153,0.28)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative">
                {loading
                  ? "Generating posts..."
                  : hasNoCredits
                    ? "No credits left"
                    : "Generate Posts"}
              </span>
            </button>

            <button
              onClick={onGenerateImage}
              disabled={imageLoading || !topic.trim()}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-sm font-black text-zinc-100 transition hover:border-pink-500/40 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {imageLoading ? "Generating image..." : "Generate AI Image"}
            </button>
          </div>

          {hasNoCredits && !isPro && (
            <div className="rounded-2xl border border-pink-500/20 bg-pink-500/10 px-4 py-3">
              <p className="text-sm leading-6 text-pink-200">
                You used all free credits. Upgrade to continue generating
                content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </label>

      {children}
    </div>
  );
}