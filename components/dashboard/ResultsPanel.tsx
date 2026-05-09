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
            className="w-full rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold transition hover:bg-zinc-900 sm:w-auto"
          >
            Copy All Posts
          </button>
        </div>
      )}

      {generatedImage && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-pink-300">
                AI Visual
              </p>

              <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                Generated Image
              </h3>
            </div>

            <a
              href={generatedImage}
              download="businesscontent-ai-image.png"
              className="inline-flex w-full justify-center rounded-xl border border-zinc-700 px-4 py-3 text-sm font-semibold transition hover:bg-zinc-800 sm:w-auto sm:py-2"
            >
              Download
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <img
              src={generatedImage}
              alt="AI generated business marketing image"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      )}

      {posts.length === 0 && !generatedImage && (
        <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900 p-8 text-center sm:p-14">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
            ✨
          </div>

          <h3 className="text-lg font-bold text-white sm:text-xl">
            Your AI content will appear here
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-500">
            Generate captions, hashtags, CTAs and premium AI marketing images
            for your business in seconds.
          </p>
        </div>
      )}

      {posts.map((post, index) => (
        <div
          key={index}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-pink-300">
                Generated Post
              </p>

              <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                Post #{index + 1}
              </h3>
            </div>

            <button
              onClick={() => copyPost(post)}
              className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-sm font-semibold transition hover:bg-zinc-800 sm:w-auto sm:py-2"
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
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      {children}
    </div>
  );
}