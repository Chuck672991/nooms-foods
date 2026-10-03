import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { container, sectionY } from "@/lib/utils";
import { ArrowRight, ExternalLink, MapPin, Phone } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ConversionCard({
  href,
  external,
  eyebrow,
  title,
  copy,
  action,
  icon,
}: {
  href: string;
  external?: boolean;
  eyebrow: string;
  title: string;
  copy: string;
  action: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex h-full flex-col justify-between gap-12 rounded-card border border-cream/15 bg-ink-800 p-8 transition-colors hover:border-yellow/60 sm:p-12"
    >
      <div>
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <h3 className="display h-section text-balance">{title}</h3>
        <p className="lead mt-6 max-w-md text-pretty">{copy}</p>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-cream/12 pt-6">
        <span className="flex items-center gap-3 text-[0.72rem] font-bold tracking-[0.16em] text-cream/70 uppercase">
          <span className="text-yellow">{icon}</span>
          {action}
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow text-on-yellow transition-transform group-hover:scale-110">
          {external ? <ExternalLink width={18} height={18} /> : <ArrowRight width={18} height={18} />}
        </span>
      </div>
      {external ? <span className="sr-only">(opens in a new tab)</span> : null}
    </a>
  );
}

/**
 * "Your Table Awaits": two equal paths. Qissa's cards deep-link into
 * third-party booking/ordering platforms. Nooms has none, so the cards go to
 * the two verified channels: directions (dine in) and phone (takeaway/home).
 */
export function SplitConversion() {
  return (
    <section className={`${sectionY} bg-ink-800`}>
      <div className={container}>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Your table awaits"
            title={
              <>
                Two ways to <em>taste Nooms.</em>
              </>
            }
          />
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-2">
          <Reveal>
            <ConversionCard
              href={SITE.directionsHref}
              external
              eyebrow="Dine in"
              title="Come to the counter"
              copy={`Find us on Shahrah-e-Faisal in ${SITE.address.area} and eat in. We're open ${SITE.hours.summary}, though hours can vary by day.`}
              action="Opens Google Maps"
              icon={<MapPin width={18} height={18} />}
            />
          </Reveal>
          <Reveal delay={120}>
            <ConversionCard
              href={SITE.phone.href}
              eyebrow="Takeaway & home delivery"
              title="Order by phone"
              copy={`Call ${SITE.phone.display} for takeaway or home delivery. Ask about delivery areas and timing when you call.`}
              action={`Call ${SITE.phone.display}`}
              icon={<Phone width={18} height={18} />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
