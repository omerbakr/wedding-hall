"use client";

import { use, useEffect, useState, useMemo } from "react";
import Image from "next/image";

import { createClient } from "@/utils/supabase/client";
import ImageUpload from "@/components/ImageUpload";

type Photo = {
  id: number;
  image_url: string;
};

const PATTERNS = [
  "aspect-[3/4]",
  "aspect-[9/16]",
  "aspect-square",
  "aspect-[4/5]",
];

export default function LivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isEventActive, setIsEventActive] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const checkEventActive = async () => {
      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from("events")
        .select("id")
        .eq("slug", slug)
        .lte("starts_at", now)
        .gte("ends_at", now)
        .maybeSingle();

      if (!error && data) {
        setIsEventActive(true);
      } else {
        setIsEventActive(false);
      }
    };

    checkEventActive();

    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .eq("event_slug", slug)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch approved photos for event:", error);
      } else {
        setPhotos(data || []);
      }
    };

    fetchPhotos();

    const channel = supabase
      .channel("realtime-photos")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "photos",
          filter: `event_slug=eq.${slug}`,
        },
        (payload) => {
          if (payload.new.is_approved) {
            setPhotos((prev) => [payload.new as Photo, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [ slug ]);

  return (
    <section className="min-h-screen py-8 px-8 md:px-12 lg:px-24 relative pt-10">
      <Image
        src="/images/flower-tl-corner.webp"
        alt="Event background"
        width={750}
        height={750}
        className="absolute top-30 left-5 hidden md:block md:top-20 md:left-10 w-[70%] min-w-sm max-w-xl opacity-50"
      />
      <Image
        src="/images/flower-br-corner.webp"
        alt="Event background"
        width={500}
        height={500}
        className="absolute bottom-10 right-10 w-[40%] min-w-2/12 max-w-xs"
      />

      <div className="flex-center gap-4 mb-6">
        <Image
          src="/images/flower-left.webp"
          alt="flower"
          width={75}
          height={75}
          className="max-sm:hidden opacity-80 mb-2"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary capitalize z-50 font-corinthia">
          {slug} Düğün Albümü
        </h1>

        <Image
          src="/images/flower-right.webp"
          alt="flower"
          width={75}
          height={75}
          className="max-sm:hidden opacity-80 mb-2"
        />
      </div>

      {isEventActive && <ImageUpload activeSlug={slug} />}

      <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
        {photos.map((photo, index) => {
          const aspectClass = PATTERNS[index % PATTERNS.length];

          return (
            <div
              key={photo.id}
              className={`relative break-inside-avoid rounded-lg overflow-hidden shadow-md mb-4 w-full group ${aspectClass}`}
            >
              <Image
                src={photo.image_url}
                alt="Düğün Hatırası"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
      </div>

      {photos.length === 0 && (
        <div className="col-center h-[75vh] text-gray-500">
          <p className="text-xl md:text-2xl">Henüz fotoğraf yok.</p>
          <p className="text-sm md:text-lg">QR kodu okutup ilk fotoğrafı sen gönder!</p>
        </div>
      )}
    </section>
  );
}
