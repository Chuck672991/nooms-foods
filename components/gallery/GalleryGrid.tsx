import Image from "next/image";
import type { GalleryItem } from "@/restaurants/types";
import { stagger } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/**
 * CSS multi-column masonry of real photos at their natural aspect ratios (no
 * forced crop, so rows stagger). Hover (or keyboard focus within): the image
 * zooms 1.06× over 1.2s, a bottom scrim fades in and the caption slides up 6px
 * and fades in, all together. Touch screens have no hover, so captions show
 * there. No lightbox, matching the reference. Columns are capped at 3 because
 * supplied photos can be small; with larger originals raise `max-w`.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <ul className="masonry mx-auto max-w-5xl">
      {items.map((item, i) => (
        <Reveal as="li" key={item.caption} delay={stagger(i % 3)} className="masonry__cell">
          <figure className="masonry__item">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes="(min-width: 1024px) 330px, 46vw"
              className={`h-auto w-full ${item.image.fit === "contain" ? "bg-white p-3" : ""}`}
            />
            <figcaption>{item.caption}</figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
