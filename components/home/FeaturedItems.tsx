import Image from "next/image";
import Link from "next/link";
import type { ResolvedButton } from "@/lib/restaurant";
import type { FeaturedCard, HomeContent } from "@/restaurants/types";
import { container, sectionY } from "@/lib/utils";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function FeaturedCardView({ item }: { item: FeaturedCard }) {
  return (
    <article className="group flex h-full gap-5 rounded-card border border-foreground/12 bg-surface p-3 transition-colors hover:border-accent/50 sm:gap-6 sm:p-4">
      <div className="zoom-img relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-[10px] bg-surface-raised sm:w-48 lg:w-52">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 640px) 208px, 144px"
          className={item.image.fit === "contain" ? "bg-white object-contain p-2" : "object-cover"}
          style={item.image.position ? { objectPosition: item.image.position } : undefined}
        />
        {item.tag ? (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-primary px-3 py-1.5 text-[0.62rem] leading-none font-bold tracking-[0.14em] text-on-primary uppercase">
            {item.tag}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col justify-center py-2 pr-2">
        <h3 className="display h-card text-balance">{item.title}</h3>
        {item.description ? (
          <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/70 text-pretty">
            {item.description}
          </p>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Featured dishes: a 2-column grid of photo cards plus a "see the menu" card
 * and a CTA row. Cards come from the config (editorial) or from menu items
 * flagged `featured`.
 */
export function FeaturedItems({
  content,
  cards,
  buttons,
}: {
  content: Pick<HomeContent["featured"], "eyebrow" | "title" | "lead">;
  cards: FeaturedCard[];
  buttons: ResolvedButton[];
}) {
  return (
    <section className={`${sectionY} dots`}>
      <div className={container}>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} lead={content.lead} />
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {cards.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 90}>
              <FeaturedCardView item={item} />
            </Reveal>
          ))}
          <Reveal delay={90}>
            <Link
              href="/menu"
              className="group flex h-full min-h-48 items-center justify-between gap-6 rounded-card border border-accent/60 bg-primary p-6 text-on-primary transition-colors hover:bg-primary-soft sm:p-8"
            >
              <span className="display text-3xl leading-[1.05] font-[620] text-balance sm:text-4xl">
                See everything on the menu
              </span>
              <ArrowRight
                width={32}
                height={32}
                className="shrink-0 transition-transform group-hover:translate-x-1.5"
              />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <ActionButtons buttons={buttons} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
