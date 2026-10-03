import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import { Instagram, Facebook } from "@/components/ui/Icons";
import { Backdrop } from "@/components/ui/Backdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Takes the slot of Qissa's Google-reviews band. No ratings or testimonials
 * exist to quote yet, so this points to the official channels instead.
 * When real reviews are supplied, a review carousel belongs here.
 */
export function FollowBand() {
  return (
    <section className="dots relative isolate overflow-hidden py-28 sm:py-40">
      <Backdrop image={IMG.loadedTrayForks} position="50% 55%" blur={26} opacity={0.5} />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-ink-900)_0%,rgba(5,5,5,0.5)_30%,rgba(5,5,5,0.55)_70%,var(--color-ink-900)_100%)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow both className="mb-6">
            Stay in the loop
          </Eyebrow>
          <h2 className="display h-section text-balance">
            Follow the <em>fire.</em>
          </h2>
          <p className="lead mx-auto mt-6 max-w-xl text-pretty">
            Hot plates, new drops and what&apos;s happening at the counter. Find us on Instagram and
            Facebook.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Instagram width={16} height={16} />
              {SITE.social.instagram.handle}
              <span className="sr-only"> on Instagram, opens in a new tab</span>
            </a>
            <PillButton
              href={SITE.social.facebook.href}
              variant="outline"
              external
              destination="Facebook"
            >
              <span className="inline-flex items-center gap-2">
                <Facebook width={16} height={16} />
                Facebook
              </span>
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
