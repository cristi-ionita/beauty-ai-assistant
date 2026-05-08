"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type GeneratedPost = {
  id: number;
  business_type: string;
  language: string;
  topic: string;
  caption: string;
  hashtags: string;
  cta: string;
  created_at: string;
};

export default function HistoryPage() {
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadPosts() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("generated_posts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setPosts(data || []);
      setLoading(false);
    }

    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return posts;

    return posts.filter((post) =>
      [
        post.business_type,
        post.language,
        post.topic,
        post.caption,
        post.hashtags,
        post.cta,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [posts, search]);

  function copyPost(post: GeneratedPost) {
    const text = `${post.caption}\n\n${post.hashtags}\n\n${post.cta}`;
    navigator.clipboard.writeText(text);
  }

  function copyAllFiltered() {
    const text = filteredPosts
      .map(
        (post, index) =>
          `POST ${index + 1}\n\n${post.caption}\n\n${post.hashtags}\n\n${post.cta}`
      )
      .join("\n\n-------------------\n\n");

    navigator.clipboard.writeText(text);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a href="/dashboard" className="text-sm text-pink-300">
              ← Back to dashboard
            </a>

            <h1 className="mt-4 text-4xl font-bold">Your History</h1>

            <p className="mt-3 text-zinc-400">
              Search, copy, and reuse your generated content.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none sm:w-72"
            />

            {filteredPosts.length > 0 && (
              <button
                onClick={copyAllFiltered}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm hover:bg-zinc-900"
              >
                Copy Results
              </button>
            )}
          </div>
        </div>

        {loading && <div className="text-zinc-500">Loading...</div>}

        {!loading && posts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
            No generated posts yet.
          </div>
        )}

        {!loading && posts.length > 0 && filteredPosts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
            No posts match your search.
          </div>
        )}

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3 text-sm text-zinc-500">
                  <span>{post.business_type}</span>
                  <span>•</span>
                  <span>{post.language}</span>
                  <span>•</span>
                  <span>{post.topic}</span>
                  <span>•</span>
                  <span>
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>

                <button
                  onClick={() => copyPost(post)}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
                >
                  Copy
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-sm text-zinc-500">Caption</p>
                  <p className="whitespace-pre-wrap leading-8 text-zinc-300">
                    {post.caption}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-zinc-500">Hashtags</p>
                  <p className="text-pink-300">{post.hashtags}</p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-zinc-500">CTA</p>
                  <p className="text-zinc-300">{post.cta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}