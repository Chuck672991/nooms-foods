import { PLATFORM_NAMES, socialLabel } from "@/lib/restaurant";
import type { HomeContent, SocialLink } from "@/restaurants/types";
import { Backdrop } from "@/components/ui/Backdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icons";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";

/**
 * Social band. Takes the slot of Qissa's Google-reviews band: with no real
 * ratings or testimonials to quote, it points to the official channels. When
 * real reviews exist, a review carousel belongs here.
 */
export function FollowBand({
  content,
  social,
}: {
  content: HomeContent["follow"];
  social: SocialLink[];
}) {
  return (
    <section className="scope-deep dots relative isolate overflow-hidden py-28 sm:py-40">
      <Backdrop image={content.backdrop} blur={26} opacity={0.5} />
      <div className="scrim-band absolute inset-0 -z-10 [--scrim-a:50%] [--scrim-b:55%]" aria-hidden="true" />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow both className="mb-6">
            {content.eyebrow}
          </Eyebrow>
          <h2 className="display h-section text-balance">
            <RichText text={content.title} />
          </h2>
          <p className="lead mx-auto mt-6 max-w-xl text-pretty">{content.lead}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {social.map((s, i) =>
              i === 0 ? (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Icon name={s.platform} width={16} height={16} />
                  {socialLabel(s)}
                  <span className="sr-only"> on {PLATFORM_NAMES[s.platform]}, opens in a new tab</span>
                </a>
              ) : (
                <PillButton
                  key={s.platform}
                  href={s.href}
                  variant="outline"
                  external
                  destination={PLATFORM_NAMES[s.platform]}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon name={s.platform} width={16} height={16} />
                    {socialLabel(s)}
                  </span>
                </PillButton>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
