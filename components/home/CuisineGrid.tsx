import Image from "next/image";
import Link from "next/link";
import type { HomeContent, MenuCategory } from "@/restaurants/types";
import { container, sectionY } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Category tiles that deep-link into the matching menu section. */
export function CuisineGrid({
  content,
  categories,
}: {
  content: HomeContent["cuisine"];
  categories: MenuCategory[];
}) {
  return (
    <section className={`${sectionY} bg-surface`}>
      <div className={container}>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} lead={content.lead} />
        </Reveal>

        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <Reveal as="li" key={cat.id} delay={i * 70}>
              <Link href={`/menu#${cat.id}`} className="group block">
                <div className="zoom-img relative aspect-[4/5] overflow-hidden rounded-card border border-foreground/10 bg-surface-raised">
                  <Image
                    src={cat.image.src}
                    alt={cat.image.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 46vw"
                    className={cat.image.fit === "contain" ? "bg-white object-contain p-2" : "object-cover"}
                    style={{ objectPosition: cat.image.position }}
                  />
                </div>
                <p className="display mt-4 flex items-center justify-between gap-2 text-xl font-[560] transition-colors group-hover:text-accent">
                  {cat.label}
                  <ArrowRight
                    width={16}
                    height={16}
                    className="shrink-0 text-accent opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </p>
              </Link>
            </Reveal>
          ))}

          <Reveal as="li" delay={categories.length * 70}>
            <Link
              href="/menu"
              className="group flex aspect-[4/5] flex-col items-start justify-between rounded-card border border-accent/60 bg-primary p-5 text-on-primary transition-colors hover:bg-primary-soft"
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
        </ul>
      </div>
    </section>
  );
}
