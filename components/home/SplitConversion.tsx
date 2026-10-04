import type { HomeContent, SplitCard } from "@/restaurants/types";
import { container, sectionY } from "@/lib/utils";
import { ArrowRight, ExternalLink, Icon } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ConversionCard({ card }: { card: SplitCard }) {
  return (
    <a
      href={card.href}
      {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex h-full flex-col justify-between gap-12 rounded-card border border-foreground/15 bg-surface p-8 transition-colors hover:border-accent/60 sm:p-12"
    >
      <div>
        <Eyebrow className="mb-6">{card.eyebrow}</Eyebrow>
        <h3 className="display h-section text-balance">
          <RichText text={card.title} />
        </h3>
        <p className="lead mt-6 max-w-md text-pretty">{card.copy}</p>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-foreground/12 pt-6">
        <span className="flex items-center gap-3 text-[0.72rem] font-bold tracking-[0.16em] text-foreground/70 uppercase">
          <span className="text-accent">
            <Icon name={card.icon} width={18} height={18} />
          </span>
          {card.actionLabel}
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary transition-transform group-hover:scale-110">
          {card.external ? <ExternalLink width={18} height={18} /> : <ArrowRight width={18} height={18} />}
        </span>
      </div>
      {card.external ? <span className="sr-only">(opens in a new tab)</span> : null}
    </a>
  );
}

/**
 * Two equal conversion paths. Where a restaurant has booking/ordering
 * platforms the cards link to them; otherwise to directions and the phone.
 */
export function SplitConversion({ content }: { content: HomeContent["split"] }) {
  return (
    <section className={`${sectionY} section-tint`}>
      <div className={container}>
        <Reveal>
          <SectionHeading align="center" eyebrow={content.eyebrow} title={content.title} />
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-2">
          <Reveal>
            <ConversionCard card={content.cards[0]} />
          </Reveal>
          <Reveal delay={120}>
            <ConversionCard card={content.cards[1]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
