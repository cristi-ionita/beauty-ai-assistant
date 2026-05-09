"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

import ImageCard, {
  type GeneratedImageItem,
} from "@/components/dashboard/ImageCard";

type ImageHistoryProps = {
  refreshKey: number;
};

export default function ImageHistory({ refreshKey }: ImageHistoryProps) {
  const [images, setImages] = useState<GeneratedImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("generated_images")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) {
        console.error("Failed to load generated images:", error);
        toast.error("Could not load image history");
        setLoading(false);
        return;
      }

      setImages(data || []);
      setLoading(false);
    }

    loadImages();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
        <p className="text-sm text-zinc-500">Loading image history...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900 p-6 text-center sm:p-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-2xl">
          🖼️
        </div>

        <h2 className="text-lg font-bold text-white sm:text-xl">
          Image History
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
          Your generated AI visuals will appear here after you create them.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-pink-300 sm:text-sm">
            Image History
          </p>

          <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
            Recent AI visuals
          </h2>
        </div>

        <span className="w-fit rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-400">
          {images.length} saved
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}