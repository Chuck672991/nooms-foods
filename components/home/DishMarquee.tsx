import Image from "next/image";
import Link from "next/link";
import type { HomeContent, Img } from "@/restaurants/types";
import { container } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icons";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";

function Circle({ image, hidden }: { image: Img; hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="mr-7 h-44 w-44 shrink-0 overflow-hidden rounded-full border border-foreground/15 bg-surface-raised sm:h-52 sm:w-52"
    >
      <Image
        src={image.src}
        alt={hidden ? "" : image.alt}
        width={image.width}
        height={image.height}
        sizes="208px"
        className={`h-full w-full ${image.fit === "contain" ? "bg-white object-contain p-2" : "object-cover"}`}
        style={image.position ? { objectPosition: image.position } : undefined}
      />
    </div>
  );
}

/** Circular plate photos scrolling in a continuous loop. */
export function DishMarquee({ content }: { content: HomeContent["dishes"] }) {
  return (
    <section className="overflow-hidden pt-8 pb-24 sm:pb-32">
      <div className={`${container} mb-14 flex flex-wrap items-end justify-between gap-6`}>
        <Reveal>
          <h2 className="display h-section max-w-2xl text-balance">
            <RichText text={content.title} />
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <Link
            href={content.link.href}
            className="group inline-flex items-center gap-3 text-[0.78rem] font-bold tracking-[0.16em] text-accent uppercase"
          >
            {content.link.label}
            <ArrowRight
              width={16}
              height={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>

      <Marquee duration={60}>
        {content.items.map((image) => (
          <Circle key={image.src + (image.position ?? "")} image={image} />
        ))}
        {content.items.map((image) => (
          <Circle key={`${image.src}${image.position ?? ""}-b`} image={image} hidden />
        ))}
      </Marquee>
    </section>
  );
}
