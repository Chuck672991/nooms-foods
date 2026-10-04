import Image from "next/image";
import type { Img } from "@/restaurants/types";

/**
 * Atmospheric full-bleed photo layer. Photos can be small, so as a background
 * they are blurred and scaled: it reads as the glow of the real scene rather
 * than a pixelated enlargement. Sits behind content (absolute, inset-0), so
 * the parent needs `relative isolate overflow-hidden`. The crop focus comes
 * from `image.position`.
 */
export function Backdrop({
  image,
  blur = 28,
  opacity = 0.55,
  priority = false,
}: {
  image: Img;
  /** Blur radius in px. */
  blur?: number;
  opacity?: number;
  /** Preload (LCP) for above-the-fold heroes. */
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-deep" aria-hidden="true">
      <Image
        src={image.src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 640px"
        quality={60}
        preload={priority}
        className="scale-125 object-cover saturate-[1.25]"
        style={{
          objectPosition: image.position ?? "50% 50%",
          filter: `blur(${blur}px)`,
          opacity,
        }}
      />
    </div>
  );
}
