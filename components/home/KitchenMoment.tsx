import type { HomeContent } from "@/restaurants/types";
import { container, stagger } from "@/lib/utils";
import { Backdrop } from "@/components/ui/Backdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";

/** Immersive full-bleed food moment ("From our kitchen"). */
export function KitchenMoment({ content }: { content: HomeContent["kitchen"] }) {
  return (
    <section className="scope-deep relative isolate overflow-hidden py-28 sm:py-36 lg:min-h-[92svh] lg:py-44">
      <Backdrop image={content.backdrop} blur={22} opacity={0.7} />
      <div className="scrim-side absolute inset-0 -z-10" aria-hidden="true" />
      {/* The secondary brand colour, used once as a low glow. */}
      <div className="glow-secondary absolute inset-0 -z-10" aria-hidden="true" />
      <div className={`${container} grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]`}>
        <Reveal>
          <Eyebrow className="mb-6">{content.eyebrow}</Eyebrow>
          <h2 className="display h-section max-w-2xl text-balance">
            <RichText text={content.title} />
          </h2>
          <p className="lead mt-8 max-w-lg text-pretty">{content.body}</p>
          {content.beats?.length ? (
            <ol className="mt-10 max-w-lg space-y-6">
              {content.beats.map((beat, i) => (
                <Reveal as="li" key={beat} delay={stagger(i)} className="flex items-baseline gap-5">
                  <span className="display w-10 shrink-0 text-3xl leading-none text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.05rem] leading-relaxed text-foreground/85 text-pretty">{beat}</span>
                </Reveal>
              ))}
            </ol>
          ) : null}
        </Reveal>

        <Reveal variant="image" delay={150} className="mx-auto w-full max-w-md lg:ml-auto">
          <PhotoCard
            image={content.card.image}
            sizes="(min-width: 1024px) 448px, 90vw"
            rotate={3}
            imageClassName="aspect-[4/3]"
            caption={content.card.caption}
          />
        </Reveal>
      </div>
    </section>
  );
}
