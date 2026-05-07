"use client";

import { useEffect, useState } from "react";
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
        return;
      }

      setPosts(data || []);
      setLoading(false);
    }

    loadPosts();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <a href="/dashboard" className="text-sm text-pink-300">
              ← Back to dashboard
            </a>

            <h1 className="mt-4 text-4xl font-bold">
              Your History
            </h1>

            <p className="mt-3 text-zinc-400">
              All your generated posts.
            </p>
          </div>
        </div>

        {loading && (
          <div className="text-zinc-500">
            Loading...
          </div>
        )}

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-4 flex flex-wrap gap-3 text-sm text-zinc-500">
                <span>{post.business_type}</span>
                <span>•</span>
                <span>{post.language}</span>
                <span>•</span>
                <span>{post.topic}</span>
              </div>

              <p className="leading-8 text-zinc-300">
                {post.caption}
              </p>

              <p className="mt-5 text-pink-300">
                {post.hashtags}
              </p>

              <p className="mt-5 text-zinc-300">
                {post.cta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}