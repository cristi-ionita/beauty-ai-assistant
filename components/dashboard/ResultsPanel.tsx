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
  }

  function copyAllPosts() {
    const text = posts
      .map(
        (post, index) =>
          `POST ${index + 1}\n\n${post.caption}\n\n${post.hashtags}\n\n${post.cta}`
      )
      .join("\n\n-------------------\n\n");

    navigator.clipboard.writeText(text);
  }

  return (
    <div className="space-y-6">
      {posts.length > 0 && (
        <button
          onClick={copyAllPosts}
          className="rounded-xl border border-zinc-700 px-5 py-3 text-sm hover:bg-zinc-900"
        >
          Copy All Posts
        </button>
      )}

      {generatedImage && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-pink-300">
              AI Generated Image
            </h3>

            <a
              href={generatedImage}
              download="beauty-ai-image.png"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
            >
              Download
            </a>
          </div>

          <img
            src={generatedImage}
            alt="AI generated beauty marketing image"
            className="w-full rounded-2xl"
          />
        </div>
      )}

      {posts.length === 0 && !generatedImage && (
        <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
          Generated posts and images will appear here.
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
  );
}