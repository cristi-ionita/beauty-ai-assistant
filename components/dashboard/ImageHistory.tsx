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

export default function ImageHistory({
  refreshKey,
}: ImageHistoryProps) {
  const [images, setImages] = useState<GeneratedImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
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
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-500">
          Loading image history...
        </p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900 p-8 text-center">
        <h2 className="text-xl font-semibold text-white">
          Image History
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Your generated AI images will appear here after you create them.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-pink-300">
            Image History
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Recent AI visuals
          </h2>
        </div>

        <span className="text-sm text-zinc-500">
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