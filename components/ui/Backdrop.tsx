import Image from "next/image";
import type { Img } from "@/lib/images";

/**
 * Atmospheric full-bleed photo layer. The supplied photos are small, so as a
 * background they are blurred and scaled: it reads as the glow of the real
 * scene rather than a pixelated enlargement. Sits behind content (absolute,
 * inset-0), so the parent needs `relative isolate overflow-hidden`.
 */
export function Backdrop({
  image,
  position = "50% 50%",
  blur = 28,
  opacity = 0.55,
  priority = false,
}: {
  image: Img;
  position?: string;
  /** Blur radius in px. */
  blur?: number;
  opacity?: number;
  /** Preload (LCP) for above-the-fold heroes. */
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ink-950" aria-hidden="true">
      <Image
        src={image.src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 640px"
        quality={60}
        preload={priority}
        className="scale-125 object-cover saturate-[1.25]"
        style={{
          objectPosition: position,
          filter: `blur(${blur}px)`,
          opacity,
        }}
      />
    </div>
  );
}
