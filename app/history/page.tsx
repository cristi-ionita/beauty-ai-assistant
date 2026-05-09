"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ImageCard, {
  type GeneratedImageItem,
} from "@/components/dashboard/ImageCard";

type GeneratedPost = {
  id: number;
  user_id: string;
  business_type: string;
  language: string;
  topic: string;
  caption: string;
  hashtags: string;
  cta: string;
  created_at: string;
};

type ActiveTab = "posts" | "images";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("posts");

  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [images, setImages] = useState<GeneratedImageItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session?.user) {
          window.location.replace("/login");
          return;
        }

        const userId = session.user.id;

        const [postsResponse, imagesResponse] = await Promise.all([
          supabase
            .from("generated_posts")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false }),

          supabase
            .from("generated_images")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false }),
        ]);

        if (postsResponse.error) {
          console.error(postsResponse.error);
          toast.error("Could not load generated posts");
        } else {
          setPosts(postsResponse.data || []);
        }

        if (imagesResponse.error) {
          console.error(imagesResponse.error);
          toast.error("Could not load generated images");
        } else {
          setImages(imagesResponse.data || []);
        }
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
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

  const filteredImages = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return images;

    return images.filter((image) =>
      [
        image.business_type,
        image.topic,
        image.platform,
        image.tone,
        image.goal,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [images, search]);

  async function copyPost(post: GeneratedPost) {
    const text = `${post.caption}\n\n${post.hashtags}\n\n${post.cta}`;

    await navigator.clipboard.writeText(text);

    toast.success("Post copied to clipboard");
  }

  async function copyAllFilteredPosts() {
    const text = filteredPosts
      .map(
        (post, index) =>
          `POST ${index + 1}\n\n${post.caption}\n\n${post.hashtags}\n\n${post.cta}`
      )
      .join("\n\n-------------------\n\n");

    await navigator.clipboard.writeText(text);

    toast.success("Posts copied to clipboard");
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.replace("/");
  }

  const visibleCount =
    activeTab === "posts" ? filteredPosts.length : filteredImages.length;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <DashboardNav onLogout={logout} />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>

            <h1 className="mt-4 text-4xl font-bold">Your History</h1>

            <p className="mt-3 text-zinc-400">
              Search, copy, download, and reuse your generated posts and images.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                activeTab === "posts"
                  ? "Search posts..."
                  : "Search images..."
              }
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-pink-500 sm:w-72"
            />

            {activeTab === "posts" && filteredPosts.length > 0 && (
              <button
                onClick={copyAllFilteredPosts}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm transition hover:bg-zinc-900"
              >
                Copy Results
              </button>
            )}
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-zinc-800 bg-zinc-900 p-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("posts")}
              className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                activeTab === "posts"
                  ? "bg-pink-500 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              Posts ({posts.length})
            </button>

            <button
              onClick={() => setActiveTab("images")}
              className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                activeTab === "images"
                  ? "bg-pink-500 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              Images ({images.length})
            </button>
          </div>

          <span className="pr-3 text-sm text-zinc-500">
            {visibleCount} result{visibleCount === 1 ? "" : "s"}
          </span>
        </div>

        {loading && <div className="text-zinc-500">Loading...</div>}

        {!loading && activeTab === "posts" && posts.length === 0 && (
          <EmptyState text="No generated posts yet." />
        )}

        {!loading &&
          activeTab === "posts" &&
          posts.length > 0 &&
          filteredPosts.length === 0 && (
            <EmptyState text="No posts match your search." />
          )}

        {!loading && activeTab === "images" && images.length === 0 && (
          <EmptyState text="No generated images yet." />
        )}

        {!loading &&
          activeTab === "images" &&
          images.length > 0 &&
          filteredImages.length === 0 && (
            <EmptyState text="No images match your search." />
          )}

        {!loading && activeTab === "posts" && filteredPosts.length > 0 && (
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
                    className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
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
        )}

        {!loading && activeTab === "images" && filteredImages.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
      {text}
    </div>
  );
}