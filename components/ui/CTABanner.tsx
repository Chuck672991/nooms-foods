import type { ResolvedButton } from "@/lib/restaurant";
import type { Img, Rich } from "@/restaurants/types";
import { ActionButtons } from "./ActionButtons";
import { Backdrop } from "./Backdrop";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { RichText } from "./RichText";

/**
 * Closing conversion band used at the end of every page template:
 * blurred photo, scrim, centered eyebrow + heading + copy + 1-2 pills.
 */
export function CTABanner({
  eyebrow,
  title,
  body,
  image,
  buttons,
}: {
  eyebrow: string;
  title: Rich;
  body?: string;
  image: Img;
  buttons: ResolvedButton[];
}) {
  return (
    <section className="scope-deep dots relative isolate overflow-hidden py-28 sm:py-36">
      <Backdrop image={image} opacity={0.5} />
      <div className="scrim-band absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow both className="mb-6">
            {eyebrow}
          </Eyebrow>
          <h2 className="display h-section text-balance">
            <RichText text={title} />
          </h2>
          {body ? <p className="lead mx-auto mt-6 max-w-xl text-pretty">{body}</p> : null}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ActionButtons buttons={buttons} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
