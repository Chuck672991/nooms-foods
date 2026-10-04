import Image from "next/image";
import type { StoryMedia as StoryMediaContent } from "@/restaurants/types";
import { PhotoCard } from "@/components/ui/PhotoCard";

const ASPECT = { portrait: "aspect-[3/4]", tall: "aspect-[4/5]", square: "aspect-square" } as const;

/** Media beside a story section: a round logo, a pair of prints, or one print. */
export function StoryMedia({ media, index }: { media: StoryMediaContent; index: number }) {
  if (media.kind === "circle") {
    const { image } = media;
    return (
      <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="384px"
          className="h-full w-full scale-110 object-contain"
        />
      </div>
    );
  }
  if (media.kind === "duo") {
    const [a, b] = media.images;
    return (
      <div className="grid grid-cols-2 gap-4">
        <PhotoCard image={a} sizes="200px" rotate={-3} imageClassName="aspect-[3/4]" />
        <PhotoCard image={b} sizes="200px" rotate={3} className="mt-10" imageClassName="aspect-[3/4]" />
      </div>
    );
  }
  return (
    <PhotoCard
      image={media.image}
      sizes="(min-width: 1024px) 448px, 90vw"
      rotate={index % 2 === 0 ? -2 : 2}
      imageClassName={ASPECT[media.aspect ?? "portrait"]}
      className="mx-auto max-w-sm"
    />
  );
}
