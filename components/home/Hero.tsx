import type { ResolvedButton } from "@/lib/restaurant";
import type { HomeContent } from "@/restaurants/types";
import { container, heroDelay } from "@/lib/utils";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { Backdrop } from "@/components/ui/Backdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { RichText } from "@/components/ui/RichText";

/** Homepage hero: glowing blurred backdrop, centered wordmark, dual CTAs. */
export function Hero({
  content,
  buttons,
}: {
  content: HomeContent["hero"];
  buttons: ResolvedButton[];
}) {
  const [first, second] = content.cards;
  return (
    <section className="scope-deep dots relative isolate flex min-h-svh items-center justify-center overflow-hidden pt-28 pb-32">
      <Backdrop image={content.backdrop} blur={22} opacity={0.85} priority />
      <div className="scrim-hero absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow-primary absolute inset-0 -z-10" aria-hidden="true" />

      {/* Sharp prints flank the headline on large screens. */}
      <div
        className="hero-rise pointer-events-none absolute top-[20%] left-[2.5%] hidden w-48 lg:block xl:left-[4%] xl:w-56 min-[1700px]:left-[9%]"
        style={heroDelay(700)}
        aria-hidden="true"
      >
        <PhotoCard image={first} sizes="240px" rotate={-6} imageClassName="aspect-[4/3]" />
      </div>
      <div
        className="hero-rise pointer-events-none absolute right-[2.5%] bottom-[18%] hidden w-44 lg:block xl:right-[4%] xl:w-52 min-[1700px]:right-[9%]"
        style={heroDelay(850)}
        aria-hidden="true"
      >
        <PhotoCard image={second} sizes="224px" rotate={5} imageClassName="aspect-[4/5]" />
      </div>

      <div className={`${container} text-center`}>
        <div className="hero-rise flex justify-center" style={heroDelay(100)}>
          <Eyebrow both>{content.eyebrow}</Eyebrow>
        </div>
        <h1 className="display h-hero hero-rise mx-auto mt-7 max-w-[6em] text-balance" style={heroDelay(240)}>
          <RichText text={content.title} />
        </h1>
        <p className="lead hero-rise mx-auto mt-8 max-w-xl text-pretty" style={heroDelay(420)}>
          {content.lead}
        </p>
        <div
          className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-3"
          style={heroDelay(560)}
        >
          <ActionButtons buttons={buttons} />
        </div>

        {/* Phone-width prints (the flanking cards are desktop-only). */}
        <div
          className="hero-rise mx-auto mt-14 flex max-w-xs items-start justify-center gap-4 lg:hidden"
          style={heroDelay(700)}
          aria-hidden="true"
        >
          <PhotoCard image={first} sizes="160px" rotate={-5} className="w-40" imageClassName="aspect-[4/5]" />
          <PhotoCard
            image={second}
            sizes="160px"
            rotate={4}
            className="mt-6 w-36"
            imageClassName="aspect-[4/5]"
          />
        </div>
      </div>

      <a
        href="#intro"
        className="hero-rise absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.68rem] font-bold tracking-[0.22em] text-foreground/70 uppercase transition-colors hover:text-accent sm:flex"
        style={heroDelay(1000)}
      >
        {content.scrollCue}
        <span className="block h-12 w-px bg-current" aria-hidden="true" />
      </a>
    </section>
  );
}
