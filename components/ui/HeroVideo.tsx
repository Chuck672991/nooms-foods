"use client";

import { useEffect, useRef } from "react";
import type { HeroVideo as HeroVideoContent } from "@/restaurants/types";

/**
 * Muted, looping, autoplaying hero footage (`playsInline` so it starts on
 * phones with no controls). `preload="metadata"` defers the full payload and
 * the poster covers the gap. Under reduced motion it is paused on the poster.
 */
export function HeroVideo({
  video,
  fallbackPoster,
  position,
}: {
  video: HeroVideoContent;
  fallbackPoster: string;
  position?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause();
  }, []);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      style={{ objectPosition: position ?? "50% 50%" }}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={video.poster ?? fallbackPoster}
    >
      <source src={video.src} type={video.type ?? "video/webm"} />
    </video>
  );
}
