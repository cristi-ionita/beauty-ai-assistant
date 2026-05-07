"use client";

import { useState } from "react";

type GeneratedPost = {
  caption: string;
  hashtags: string;
  cta: string;
};

export default function DashboardPage() {
  const [businessType, setBusinessType] = useState("Barbershop");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("Romanian");

  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [loading, setLoading] = useState(false);

  async function generatePosts() {
    if (!topic.trim()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessType,
          topic,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("AI generation failed");
        return;
      }

      setPosts(data.result);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function copyPost(post: GeneratedPost) {
    const text = `
${post.caption}

${post.hashtags}

${post.cta}
`;

    navigator.clipboard.writeText(text);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Content Generator
          </h1>

          <p className="mt-3 text-zinc-400">
            Generate social media content for beauty businesses.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* LEFT PANEL */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">
              Generate content
            </h2>

            <div className="space-y-5">
              {/* BUSINESS TYPE */}
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
                </select>
              </div>

              {/* LANGUAGE */}
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Language
                </label>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
                >
                  <option>Romanian</option>
                  <option>English</option>
                  <option>German</option>
                </select>
              </div>

              {/* TOPIC */}
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Topic / Promotion
                </label>

                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Example: Summer nails promotion..."
                  className="min-h-[120px] w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={generatePosts}
                disabled={loading}
                className="w-full rounded-xl bg-pink-500 py-4 font-semibold hover:bg-pink-400 disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Posts"}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">
            {posts.length === 0 && (
              <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
                Generated posts will appear here.
              </div>
            )}

            {posts.map((post, index) => (
              <div
                key={index}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-pink-300">
                    Post #{index + 1}
                  </h3>

                  <button
                    onClick={() => copyPost(post)}
                    className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                  >
                    Copy
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="mb-2 text-sm text-zinc-500">
                      Caption
                    </p>

                    <p className="whitespace-pre-wrap leading-8 text-zinc-300">
                      {post.caption}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-zinc-500">
                      Hashtags
                    </p>

                    <p className="text-pink-300">
                      {post.hashtags}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-zinc-500">
                      CTA
                    </p>

                    <p className="text-zinc-300">
                      {post.cta}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}