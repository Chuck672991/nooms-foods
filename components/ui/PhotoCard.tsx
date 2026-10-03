import Image from "next/image";
import type { CSSProperties } from "react";
import type { Img } from "@/lib/images";

/**
 * Sharp, framed photo shown at (or near) its native resolution: a tilted
 * "stuck-on" print that suits Nooms' casual, playful tone and keeps the real
 * photography crisp where full-bleed would not.
 */
export function PhotoCard({
  image,
  sizes,
  rotate = 0,
  caption,
  className = "",
  imageClassName = "",
  position,
  priority = false,
  style,
}: {
  image: Img;
  sizes: string;
  /** Tilt in degrees. */
  rotate?: number;
  caption?: string;
  className?: string;
  imageClassName?: string;
  position?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  return (
    <figure
      className={`bg-cream p-2 pb-2 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.8)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, borderRadius: 10, ...style }}
    >
      <div className="relative overflow-hidden" style={{ borderRadius: 6 }}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          preload={priority}
          className={`h-full w-full object-cover ${imageClassName}`}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
      {caption ? (
        <figcaption className="px-1 pt-2 pb-1 text-center text-[0.8rem] font-semibold tracking-wide text-on-yellow">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
