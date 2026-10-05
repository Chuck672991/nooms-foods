import type { ReelsContent } from "@/restaurants/types";
import { container } from "@/lib/utils";
import { Embers } from "@/components/ui/Embers";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ExternalLink, Spark } from "@/components/ui/Icons";
import { Marquee } from "@/components/ui/Marquee";
import { ReelStage } from "@/components/ui/ReelStage";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { YouTubeFacade } from "@/components/ui/YouTubeFacade";

/** One drifting row of giant outlined words. */
function OutlineRow({ words, duration, reverse }: { words: string[]; duration: number; reverse?: boolean }) {
  return (
    <Marquee duration={duration} reverse={reverse}>
      {words.map((word) => (
        <span key={word} className="outline-word">
          {word}
          <Spark className="mx-[0.35em] inline-block h-[0.28em] w-[0.28em] align-middle" />
        </span>
      ))}
    </Marquee>
  );
}

/**
 * Promo reels: the restaurant's own short videos on a 3D coverflow stage
 * (see <ReelStage>), over an ember-lit backdrop with giant outlined words
 * drifting behind and sparks that burst when the reel changes, plus an
 * optional click-to-load YouTube feature. Entirely driven by `home.reels`.
 */
export function PromoReels({ content }: { content: ReelsContent }) {
  const { youtube } = content;
  const words = content.marquee ?? [];

  return (
    <section
      id="reels"
      aria-label={`${content.eyebrow}: promo reels`}
      className="scope-deep reels relative isolate overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div className="reels-bg absolute inset-0 -z-20" aria-hidden="true" />
      <div className="glow-secondary absolute inset-0 -z-20" aria-hidden="true" />
      <div className="glow-primary absolute inset-0 -z-20 opacity-60" aria-hidden="true" />
      <Embers contained className="-z-10" />

      {words.length ? (
        <div className="pointer-events-none absolute inset-x-0 top-[26%] -z-10 select-none" aria-hidden="true">
          <OutlineRow words={words} duration={80} />
          <div className="-mt-[0.1em]">
            <OutlineRow words={[...words].reverse()} duration={110} reverse />
          </div>
        </div>
      ) : null}

      <div className={container}>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={content.eyebrow}
            title={content.title}
            lead={content.lead}
            className="max-w-2xl"
          />
        </Reveal>

        <div className="mt-14 sm:mt-20">
          <ReelStage items={content.items} soundHint={content.soundHint ?? "Watch with sound"} />
        </div>

        {youtube ? (
          <div className="mx-auto mt-24 grid max-w-6xl items-center gap-10 sm:mt-32 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <Reveal variant="image">
              <YouTubeFacade id={youtube.id} title={youtube.title} />
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow className="mb-5">{youtube.eyebrow}</Eyebrow>
              <h3 className="display h-section text-balance">
                <RichText text={youtube.title} />
              </h3>
              {youtube.blurb ? <p className="lead mt-5 max-w-md text-pretty">{youtube.blurb}</p> : null}
              <p className="mt-6 text-[0.8rem] text-foreground/60">
                {youtube.credit.href ? (
                  <a
                    href={youtube.credit.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {youtube.credit.label}
                    <ExternalLink width={12} height={12} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  youtube.credit.label
                )}
              </p>
            </Reveal>
          </div>
        ) : null}
      </div>
    </section>
  );
}
