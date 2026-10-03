import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import { container, sectionY } from "@/lib/utils";
import { Clock, MapPin, Phone } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "The Room": the space, plus a proof strip. Qissa's strip shows a Google
 * rating; ours shows verified where/when/how facts instead.
 */
export function TheRoom() {
  return (
    <section className={`${sectionY} dots relative overflow-hidden`}>
      <div className={`${container} grid items-center gap-20 lg:grid-cols-[1fr_1fr] lg:gap-24`}>
        <Reveal>
          <Eyebrow className="mb-6">The place</Eyebrow>
          <h2 className="display h-section max-w-xl text-balance">
            Look for the <em>glow.</em>
          </h2>
          <div className="lead mt-8 max-w-xl space-y-5 text-pretty">
            <p>
              You&apos;ll spot us by the sign: black and glowing, a pair of yellow eyes, a tongue
              sticking out. Underneath, a counter with the kitchen in plain view.
            </p>
            <p>
              Pull up a seat or take it to go. We&apos;re on Shahrah-e-Faisal in IBEX, Karachi,
              and it&apos;s easy to find once you know what to look for.
            </p>
          </div>
          <div className="mt-10">
            <PillButton href={SITE.directionsHref} external destination="Google Maps directions">
              Get directions
            </PillButton>
          </div>
        </Reveal>

        <div className="relative mx-auto grid w-full max-w-lg grid-cols-2 items-start gap-5 sm:gap-8">
          <Reveal variant="image" className="mt-0">
            <PhotoCard
              image={IMG.storefrontNight}
              sizes="(min-width: 640px) 240px, 45vw"
              rotate={-3}
              imageClassName="aspect-[3/4]"
              caption="The sign after dark"
            />
          </Reveal>
          <Reveal variant="image" delay={150} className="mt-14">
            <PhotoCard
              image={IMG.storefrontDay}
              sizes="(min-width: 640px) 240px, 45vw"
              rotate={3}
              imageClassName="aspect-[3/4]"
              position="50% 30%"
              caption="By day"
            />
          </Reveal>
        </div>
      </div>

      <Reveal delay={100} className={`${container} mt-24`}>
        <div className="grid divide-y divide-cream/15 overflow-hidden rounded-card border border-cream/15 bg-ink-800 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex items-start gap-4 p-7 sm:p-9">
            <MapPin className="mt-1 shrink-0 text-yellow" />
            <div>
              <p className="eyebrow mb-3">Find us</p>
              <p className="text-[0.95rem] leading-relaxed text-cream/85">
                {SITE.address.area}
                <br />
                Shahrah-e-Faisal, P.E.C.H.S. Block 2
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-7 sm:p-9">
            <Clock className="mt-1 shrink-0 text-yellow" />
            <div>
              <p className="eyebrow mb-3">Hours</p>
              <p className="text-[0.95rem] leading-relaxed text-cream/85">
                Evenings, {SITE.hours.summary}
                <br />
                <span className="text-cream/55">{SITE.hours.note}</span>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-7 sm:p-9">
            <Phone className="mt-1 shrink-0 text-yellow" />
            <div>
              <p className="eyebrow mb-3">Call</p>
              <p className="text-[0.95rem] leading-relaxed text-cream/85">
                <a href={SITE.phone.href} className="transition-colors hover:text-yellow">
                  {SITE.phone.display}
                </a>
                <br />
                <span className="text-cream/55">Dine in · Takeaway · Home delivery</span>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
