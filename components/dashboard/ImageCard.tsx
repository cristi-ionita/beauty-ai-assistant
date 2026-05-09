"use client";

import { toast } from "sonner";

export type GeneratedImageItem = {
  id: string;
  user_id: string;
  business_type: string | null;
  topic: string | null;
  platform: string | null;
  tone: string | null;
  goal: string | null;
  image_data: string;
  created_at: string | null;
};

type ImageCardProps = {
  image: GeneratedImageItem;
};

export default function ImageCard({ image }: ImageCardProps) {
  function downloadImage() {
    const link = document.createElement("a");

    link.href = image.image_data;
    link.download = `businesscontent-ai-${image.id}.png`;
    link.click();

    toast.success("Image download started");
  }

  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition hover:border-pink-500/30">
      <div className="relative aspect-square overflow-hidden bg-zinc-950">
        <img
          src={image.image_data}
          alt={image.topic || "Generated AI image"}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100" />

        <button
          onClick={downloadImage}
          className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-zinc-950 shadow-lg transition hover:bg-zinc-200 sm:left-auto sm:right-4 sm:w-auto sm:opacity-0 sm:group-hover:opacity-100"
        >
          Download
        </button>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {image.business_type && (
            <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-300">
              {image.business_type}
            </span>
          )}

          {image.platform && (
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
              {image.platform}
            </span>
          )}
        </div>

        {image.topic && (
          <p className="line-clamp-2 text-sm leading-6 text-zinc-300">
            {image.topic}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-3">
          {image.created_at && (
            <p className="text-xs text-zinc-600">
              {new Date(image.created_at).toLocaleDateString()}
            </p>
          )}

          {image.tone && (
            <p className="text-xs text-zinc-500">{image.tone}</p>
          )}
        </div>
      </div>
    </div>
  );
}