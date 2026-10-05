import Image from "next/image";
import type { ResolvedButton } from "@/lib/restaurant";
import type { FeaturedCard, HomeContent } from "@/restaurants/types";
import { container, sectionY, stagger } from "@/lib/utils";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { Urdu } from "@/components/ui/Urdu";

const SPAN = {
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  12: "lg:col-span-12",
} as const;

/**
 * 12-column layout: the first two cards are large (5 + 7 columns), the rest
 * share the remaining rows in even spans of up to four per row, so 6 items
 * read as "2 large, then 4 smaller" and other counts still fill every row.
 */
function spansFor(total: number): (keyof typeof SPAN)[] {
  if (total <= 1) return [12];
  const spans: (keyof typeof SPAN)[] = [5, 7];
  let rest = total - 2;
  while (rest > 0) {
    const row = Math.min(rest, 4);
    for (let i = 0; i < row; i++) spans.push((12 / row) as keyof typeof SPAN);
    rest -= row;
  }
  return spans;
}

function FeaturedCardView({ item }: { item: FeaturedCard }) {
  const contained = item.image.fit === "contain";
  return (
    <TiltCard href={item.href} className="dish-card scope-deep h-full">
      {item.tag ? <span className="dish-card__badge">{item.tag}</span> : null}
      <div className="dish-card__img">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 100vw"
          className={contained ? "bg-white object-contain p-8 pb-32" : "object-cover"}
          style={item.image.position ? { objectPosition: item.image.position } : undefined}
        />
      </div>
      <div className="dish-card__body">
        <h3 className="display h-card text-balance">{item.title}</h3>
        {item.titleUrdu ? (
          <Urdu className="-mt-1 block text-left text-[1.1rem] leading-[1.9] text-accent">{item.titleUrdu}</Urdu>
        ) : null}
        {item.description ? (
          <p className="mt-2 mb-4 text-[0.85rem] leading-relaxed text-foreground/70 text-pretty">
            {item.description}
          </p>
        ) : null}
      </div>
    </TiltCard>
  );
}

/**
 * Featured dishes ("Signatures"): full-bleed photo cards on a 12-column grid
 * with a glass badge, bottom scrim, hover zoom and a mouse-follow 3D tilt,
 * plus a "see the menu" card and a CTA row. Cards come from the config
 * (editorial) or from menu items flagged `featured`.
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
  const spans = spansFor(cards.length + 1);

  return (
    <section className={`${sectionY} cv-section`}>
      <div className={container}>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} lead={content.lead} />
        </Reveal>

        <div className="mt-16 grid gap-[clamp(16px,2vw,26px)] sm:grid-cols-2 lg:grid-cols-12">
          {cards.map((item, i) => (
            <Reveal key={item.title} delay={stagger(i % 4)} className={`${SPAN[spans[i]]} h-full`}>
              <FeaturedCardView item={item} />
            </Reveal>
          ))}
          <Reveal
            delay={stagger(cards.length % 4)}
            // On tablet (2 columns) the CTA fills the empty cell after an odd number of
            // cards, and spans the full row after an even number.
            className={`${SPAN[spans[cards.length]]} h-full ${cards.length % 2 === 0 ? "sm:max-lg:col-span-2" : ""}`}
          >
            <TiltCard
              href="/menu"
              className="dish-card group h-full border-primary/60 bg-primary text-on-primary hover:bg-primary-soft"
            >
              <div className="flex items-end justify-between gap-6 p-6 sm:p-8">
                <span className="display text-[clamp(1.6rem,2.4vw,2.25rem)] leading-[1.05] font-[620] text-balance sm:text-3xl lg:text-[clamp(1.6rem,2.4vw,2.25rem)]">
                  See everything on the menu
                </span>
                <ArrowRight
                  width={32}
                  height={32}
                  className="shrink-0 transition-transform group-hover:translate-x-1.5"
                />
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <ActionButtons buttons={buttons} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
