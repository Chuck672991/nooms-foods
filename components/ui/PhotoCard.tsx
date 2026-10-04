import Image from "next/image";
import type { CSSProperties } from "react";
import type { Img } from "@/restaurants/types";

/**
 * Sharp, framed photo shown at (or near) its native resolution: a tilted
 * "stuck-on" print that keeps real photography crisp where full-bleed would
 * not. The frame is always the light tone (`on-deep`) so it reads on any
 * theme; the crop focus comes from `image.position`.
 */
export function PhotoCard({
  image,
  sizes,
  rotate = 0,
  caption,
  className = "",
  imageClassName = "",
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
  priority?: boolean;
  style?: CSSProperties;
}) {
  return (
    <figure
      className={`bg-on-deep p-2 pb-2 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.8)] ${className}`}
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
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      </div>
      {caption ? (
        <figcaption className="px-1 pt-2 pb-1 text-center text-[0.8rem] font-semibold tracking-wide text-deep">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
