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

export default async function HistoryPage() {
  const { data: posts, error } = await supabase
    .from("generated_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 p-10 text-white">
        Failed to load history.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <a href="/dashboard" className="text-sm text-pink-300">
            ← Back to generator
          </a>

          <h1 className="mt-4 text-4xl font-bold">History</h1>

          <p className="mt-3 text-zinc-400">
            All generated posts saved in your database.
          </p>
        </div>

        <div className="space-y-6">
          {posts?.map((post: GeneratedPost) => (
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

              <p className="leading-8 text-zinc-300">{post.caption}</p>

              <p className="mt-5 text-pink-300">{post.hashtags}</p>

              <p className="mt-5 text-zinc-300">{post.cta}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}