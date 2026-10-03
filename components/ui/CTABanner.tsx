import type { ReactNode } from "react";
import type { Img } from "@/lib/images";
import { Backdrop } from "./Backdrop";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/**
 * Closing conversion band used at the end of every page template:
 * blurred photo, dark scrim, centered eyebrow + heading + copy + 1-2 pills.
 */
export function CTABanner({
  eyebrow,
  title,
  body,
  image,
  position,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  image: Img;
  position?: string;
  /** The pill buttons. */
  children: ReactNode;
}) {
  return (
    <section className="dots relative isolate overflow-hidden py-28 sm:py-36">
      <Backdrop image={image} position={position} opacity={0.5} />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-ink-900)_0%,rgba(5,5,5,0.55)_30%,rgba(5,5,5,0.6)_70%,var(--color-ink-900)_100%)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow both className="mb-6">
            {eyebrow}
          </Eyebrow>
          <h2 className="display h-section text-balance">{title}</h2>
          {body ? <p className="lead mx-auto mt-6 max-w-xl text-pretty">{body}</p> : null}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
