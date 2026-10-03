import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import { container } from "@/lib/utils";
import { ContactInfoCard } from "@/components/contact/ContactInfoCard";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Instagram, Messenger, Phone } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Visit & Contact",
  description:
    "Find Nooms Foods at IBEX on Shahrah-e-Faisal, Karachi. Call 0304 3542289, get directions, or message us on Instagram and Facebook.",
  alternates: { canonical: "/contact" },
};

type Channel = {
  href: string;
  external?: boolean;
  icon: ReactNode;
  title: string;
  copy: string;
  action: string;
};

// No contact-form backend or email address exists yet, so "Say hello" uses
// the channels the business actually runs.
const CHANNELS: Channel[] = [
  {
    href: SITE.phone.href,
    icon: <Phone />,
    title: "Call us",
    copy: "Takeaway, home delivery or a quick question.",
    action: SITE.phone.display,
  },
  {
    href: SITE.social.instagram.href,
    external: true,
    icon: <Instagram />,
    title: "Instagram",
    copy: "Send us a message or see what's cooking.",
    action: SITE.social.instagram.handle,
  },
  {
    href: SITE.social.facebook.messenger,
    external: true,
    icon: <Messenger />,
    title: "Messenger",
    copy: "Message us on our Facebook page.",
    action: "Open Messenger",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Visit & Contact" }]}
        eyebrow="Find us"
        title={
          <>
            Visit <em>Us</em>
          </>
        }
        lead={`${SITE.address.area}, on Shahrah-e-Faisal. Evenings, ${SITE.hours.summary}.`}
        backdrop={IMG.storefrontNight}
        backdropPosition="50% 28%"
        card={IMG.storefrontDay}
        cardPosition="50% 40%"
        cardCaption="Look for the sign"
      />

      <section className={`${container} py-20 sm:py-28`}>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <ContactInfoCard />
          </Reveal>
          <Reveal delay={120} className="lg:min-h-[34rem]">
            <MapEmbed />
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <PillButton href={SITE.phone.href}>Call to order</PillButton>
            <PillButton
              href={SITE.directionsHref}
              variant="outline"
              external
              destination="Google Maps directions"
            >
              Get directions
            </PillButton>
          </div>
        </Reveal>
      </section>

      <section className="bg-ink-800 py-24 sm:py-32">
        <div className={container}>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow both className="mb-6">
                Say hello
              </Eyebrow>
              <h2 className="display h-section text-balance">
                Drop us a <em>line.</em>
              </h2>
              <p className="lead mt-6 text-pretty">
                The quickest way to reach us is a call or a message. Pick whichever suits you.
              </p>
            </div>
          </Reveal>

          <ul className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
            {CHANNELS.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 90}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col gap-5 rounded-card border border-cream/15 bg-ink-900 p-7 transition-colors hover:border-yellow/60"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow text-on-yellow transition-transform group-hover:scale-110">
                    {c.icon}
                  </span>
                  <div>
                    <h3 className="display h-card">{c.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-cream/65">{c.copy}</p>
                  </div>
                  <span className="mt-auto text-[0.72rem] font-bold tracking-[0.16em] text-yellow uppercase">
                    {c.action}
                    {c.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
