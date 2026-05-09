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
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-xl font-bold sm:text-2xl">
          Generate content
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Choose your business, goal and campaign idea.
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

        <FormField label="Language">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="field-input"
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
        </FormField>

        <FormField label="Platform">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="field-input"
          >
            <option>Instagram</option>
            <option>Facebook</option>
            <option>TikTok</option>
            <option>LinkedIn</option>
            <option>Google Business Profile</option>
          </select>
        </FormField>

        <FormField label="Tone">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="field-input"
          >
            <option>Friendly</option>
            <option>Professional</option>
            <option>Luxury</option>
            <option>Bold</option>
            <option>Funny</option>
            <option>Elegant</option>
            <option>Warm</option>
            <option>Trustworthy</option>
            <option>Premium</option>
            <option>Casual</option>
            <option>Local</option>
          </select>
        </FormField>

        <FormField label="Goal">
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="field-input"
          >
            <option>Get bookings</option>
            <option>Promote offer</option>
            <option>Educate clients</option>
            <option>Announce service</option>
            <option>Increase engagement</option>
            <option>Sell gift cards</option>
            <option>Win back old clients</option>
            <option>Get more calls</option>
            <option>Drive website visits</option>
            <option>Promote new product</option>
            <option>Build local trust</option>
            <option>Generate leads</option>
          </select>
        </FormField>

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
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Upgrade to Normal or Pro for 5 and 10 post generations.
            </p>
          )}
        </FormField>

        <FormField label="Topic / Promotion">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: weekend offer, new service, lunch special, client testimonial, seasonal campaign..."
            className="min-h-[120px] w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-pink-500 sm:min-h-[130px]"
          />
        </FormField>

        <div className="grid gap-3">
          <button
            onClick={onGeneratePosts}
            disabled={loading || creditsLeft === 0}
            className="w-full rounded-xl bg-pink-500 py-4 text-sm font-bold transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="w-full rounded-xl border border-zinc-700 py-4 text-sm font-bold transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {imageLoading
              ? "Generating Image..."
              : "Generate AI Image"}
          </button>
        </div>

        {creditsLeft === 0 && !isPro && (
          <p className="text-sm leading-6 text-zinc-400">
            You used all free credits. Upgrade to continue generating content.
          </p>
        )}
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
      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      {children}
    </div>
  );
}