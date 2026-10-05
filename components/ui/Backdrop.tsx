import Image from "next/image";
import type { HeroVideo as HeroVideoContent, Img } from "@/restaurants/types";
import { HeroVideo } from "./HeroVideo";
import { Parallax } from "./Parallax";

/**
 * Atmospheric full-bleed media layer. Photos can be small, so as a background
 * they are blurred and scaled: it reads as the glow of the real scene rather
 * than a pixelated enlargement. Optional `video` footage replaces the photo
 * (sharp, un-blurred, with the photo as its poster). With `parallax` the layer
 * is over-cropped at 1.08× and drifts with scroll. Sits behind content
 * (absolute, inset-0), so the parent needs `relative isolate overflow-hidden`.
 * The crop focus comes from `image.position`.
 */
export function Backdrop({
  image,
  blur = 28,
  opacity = 0.55,
  priority = false,
  parallax = false,
  video,
}: {
  image: Img;
  /** Blur radius in px (photo only). */
  blur?: number;
  opacity?: number;
  /** Preload (LCP) for above-the-fold heroes. */
  priority?: boolean;
  /** Scroll parallax + 1.08× over-crop (hero media). */
  parallax?: boolean;
  video?: HeroVideoContent;
}) {
  const layer = video ? (
    <HeroVideo video={video} fallbackPoster={image.src} position={image.position} />
  ) : (
    <Image
      src={image.src}
      alt=""
      fill
      sizes="(max-width: 768px) 100vw, 640px"
      quality={60}
      preload={priority}
      // 1.157 × the parallax layer's 1.08 = the same 1.25 crop that hides blur edges.
      className={`${parallax ? "scale-[1.157]" : "scale-125"} object-cover saturate-[1.25]`}
      style={{
        objectPosition: image.position ?? "50% 50%",
        filter: `blur(${blur}px)`,
        opacity,
      }}
    />
  );

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-deep" aria-hidden="true">
      {parallax ? <Parallax>{layer}</Parallax> : layer}
    </div>
  );
}
