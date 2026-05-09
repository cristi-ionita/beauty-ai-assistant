"use client";

import { toast } from "sonner";
import type { GeneratedPost } from "@/types/dashboard";

type ResultsPanelProps = {
  posts: GeneratedPost[];
  generatedImage: string | null;
};

export default function ResultsPanel({
  posts,
  generatedImage,
}: ResultsPanelProps) {
  function copyPost(post: GeneratedPost) {
    const text = `${post.caption}\n\n${post.hashtags}\n\n${post.cta}`;

    navigator.clipboard.writeText(text);

    toast.success("Post copied to clipboard");
  }

  function copyAllPosts() {
    const text = posts
      .map(
        (post, index) =>
          `POST ${index + 1}\n\n${post.caption}\n\n${post.hashtags}\n\n${post.cta}`
      )
      .join("\n\n-------------------\n\n");

    navigator.clipboard.writeText(text);

    toast.success("All posts copied");
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {posts.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={copyAllPosts}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-bold text-zinc-100 transition hover:border-pink-500/40 hover:bg-zinc-800 sm:w-auto"
          >
            Copy All Posts
          </button>
        </div>
      )}

      {generatedImage && (
        <section className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 shadow-2xl">
          <div className="relative p-4 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.14),transparent_35%)]" />

            <div className="relative">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-pink-300">
                    AI Visual
                  </p>

                  <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                    Generated Image
                  </h3>
                </div>

                <a
                  href={generatedImage}
                  download="businesscontent-ai-image.png"
                  className="inline-flex w-full justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 sm:w-auto"
                >
                  Download
                </a>
              </div>

              <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
                <img
                  src={generatedImage}
                  alt="AI generated business marketing image"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {posts.length === 0 && !generatedImage && (
        <div className="overflow-hidden rounded-[2rem] border border-dashed border-zinc-800 bg-zinc-900 shadow-2xl">
          <div className="relative p-8 text-center sm:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.10),transparent_45%)]" />

            <div className="relative">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
                ✨
              </div>

              <p className="text-xs uppercase tracking-[0.25em] text-pink-300">
                Output Preview
              </p>

              <h3 className="mt-3 text-xl font-black text-white sm:text-2xl">
                Your AI content will appear here
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-500">
                Generate captions, hashtags, CTAs and premium AI marketing
                images for your business in seconds.
              </p>
            </div>
          </div>
        </div>
      )}

      {posts.map((post, index) => (
        <article
          key={index}
          className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 shadow-2xl"
        >
          <div className="relative p-4 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.10),transparent_35%)]" />

            <div className="relative">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-pink-300">
                    Generated Post
                  </p>

                  <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                    Post #{index + 1}
                  </h3>
                </div>

                <button
                  onClick={() => copyPost(post)}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-3 text-sm font-bold text-zinc-100 transition hover:border-pink-500/40 hover:bg-zinc-800 sm:w-auto"
                >
                  Copy
                </button>
              </div>

              <div className="space-y-5">
                <ResultSection label="Caption">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
                    {post.caption}
                  </p>
                </ResultSection>

                <ResultSection label="Hashtags">
                  <p className="break-words text-sm leading-7 text-pink-300 sm:text-base">
                    {post.hashtags}
                  </p>
                </ResultSection>

                <ResultSection label="CTA">
                  <p className="text-sm leading-7 text-zinc-300 sm:text-base">
                    {post.cta}
                  </p>
                </ResultSection>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ResultSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      {children}
    </section>
  );
}