import type { ReactNode } from "react";
import type { Img } from "@/lib/images";
import { heroDelay } from "@/lib/utils";
import { Backdrop } from "./Backdrop";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { Eyebrow } from "./Eyebrow";
import { PhotoCard } from "./PhotoCard";

/**
 * Interior-page hero: blurred photo backdrop + scrim, breadcrumb, eyebrow,
 * H1 and lead, with an optional sharp photo card on large screens.
 * Children render beneath the lead (e.g. article metadata).
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  backdrop,
  backdropPosition,
  card,
  cardPosition,
  cardCaption,
  cardAspect = "aspect-[4/5]",
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  backdrop: Img;
  backdropPosition?: string;
  card?: Img;
  cardPosition?: string;
  cardCaption?: string;
  /** Tailwind aspect class for the card photo. */
  cardAspect?: string;
  children?: ReactNode;
}) {
  return (
    <section className="dots relative isolate flex min-h-[68svh] items-end overflow-hidden pt-36 pb-16 sm:pb-20 lg:min-h-[72svh]">
      <Backdrop image={backdrop} position={backdropPosition} blur={22} opacity={0.8} priority />
      <div className="scrim-hero absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-page items-end gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-14">
        <div className="max-w-4xl">
          <div className="hero-rise" style={heroDelay(80)}>
            <Breadcrumb items={crumbs} />
          </div>
          {eyebrow ? (
            <div className="hero-rise mt-8" style={heroDelay(180)}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          ) : null}
          <h1 className="display h-page hero-rise mt-5 text-balance" style={heroDelay(280)}>
            {title}
          </h1>
          {lead ? (
            <p className="lead hero-rise mt-6 max-w-2xl text-pretty" style={heroDelay(400)}>
              {lead}
            </p>
          ) : null}
          {children ? (
            <div className="hero-rise mt-8" style={heroDelay(500)}>
              {children}
            </div>
          ) : null}
        </div>

        {card ? (
          <div
            className="hero-rise hidden w-[17rem] justify-self-end lg:block xl:w-[19rem]"
            style={heroDelay(560)}
          >
            <PhotoCard
              image={card}
              sizes="(min-width: 1280px) 304px, 272px"
              rotate={3}
              position={cardPosition}
              caption={cardCaption}
              imageClassName={cardAspect}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
