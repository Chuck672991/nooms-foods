import Image from "next/image";
import type { GalleryItem } from "@/restaurants/types";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Masonry of real photos at their natural aspect ratios, with the caption
 * always visible bottom-left (no hover-only reveal, no lightbox: matching the
 * reference). Columns are capped at 3 because supplied photos can be small;
 * with larger originals raise `max-w` / go to 2 columns.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <ul className="mx-auto max-w-5xl columns-2 gap-4 sm:gap-5 lg:columns-3">
      {items.map((item, i) => (
        <Reveal as="li" key={item.caption} delay={(i % 3) * 80} className="mb-4 break-inside-avoid sm:mb-5">
          <figure className="zoom-img group relative overflow-hidden rounded-card border border-foreground/10 bg-surface-raised">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes="(min-width: 1024px) 330px, 46vw"
              className={`h-auto w-full ${item.image.fit === "contain" ? "bg-white p-3" : ""}`}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pt-10 pb-3.5 text-[0.82rem] font-semibold tracking-wide text-on-deep">
              {item.caption}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
