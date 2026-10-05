import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { HomeContent, MenuCategory } from "@/restaurants/types";
import { container, sectionY, stagger } from "@/lib/utils";
import { CategoryGlyph } from "@/components/ui/CategoryGlyph";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Urdu } from "@/components/ui/Urdu";

/**
 * Category tiles that deep-link into the matching menu section. On large
 * screens they form one flex row: hovering it dims and desaturates every tile
 * while the hovered one widens (pure CSS, see `.region-row` in globals.css).
 */
export function CuisineGrid({
  content,
  categories,
}: {
  content: HomeContent["cuisine"];
  categories: MenuCategory[];
}) {
  return (
    <section className={`${sectionY} section-tint`}>
      <div className={container}>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} lead={content.lead} />
        </Reveal>

        <ul
          className="region-row mt-16"
          style={{ "--n": categories.length + 1 } as CSSProperties}
        >
          {categories.map((cat, i) => (
            <li key={cat.id} className="region">
              <Reveal delay={stagger(i)}>
                <Link href={`/menu#${cat.id}`} className="block">
                  <div className="region__img relative aspect-[4/5] overflow-hidden rounded-card border border-foreground/10 bg-surface-raised lg:aspect-auto">
                    {cat.image ? (
                      <Image
                        src={cat.image.src}
                        alt={cat.image.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 30vw, 46vw"
                        className={cat.image.fit === "contain" ? "bg-white object-contain p-2" : "object-cover"}
                        style={{ objectPosition: cat.image.position }}
                      />
                    ) : (
                      <CategoryGlyph label={cat.label} labelUrdu={cat.labelUrdu} className="absolute inset-0" />
                    )}
                  </div>
                  <p className="display mt-4 text-center text-[clamp(1.15rem,1.7vw,1.5rem)] leading-tight font-[560] text-balance">
                    {cat.label}
                  </p>
                  {cat.image && cat.labelUrdu ? (
                    <Urdu className="block text-center text-[1.05rem] leading-[1.9] text-accent">{cat.labelUrdu}</Urdu>
                  ) : null}
                </Link>
              </Reveal>
            </li>
          ))}

          <li className="region">
            <Reveal delay={stagger(categories.length)}>
              <Link
                href="/menu"
                className="region__img group flex aspect-[4/5] flex-col items-start justify-between rounded-card border border-primary/60 bg-primary p-5 text-on-primary transition-colors hover:bg-primary-soft lg:aspect-auto"
              >
                <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase">
                  {content.allTile.eyebrow}
                </span>
                <span className="display flex w-full items-end justify-between text-2xl leading-none font-[620]">
                  {content.allTile.label}
                  <ArrowRight
                    width={22}
                    height={22}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
