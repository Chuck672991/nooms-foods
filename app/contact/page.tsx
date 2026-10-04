import { ContactInfoCard } from "@/components/contact/ContactInfoCard";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { resolveButtons } from "@/lib/restaurant";
import { pageMetadata } from "@/lib/seo";
import { container } from "@/lib/utils";
import { restaurant } from "@/restaurants/active";
import { mapLinks } from "@/restaurants/helpers";

export const metadata = pageMetadata(restaurant, "contact", "/contact");

export default function ContactPage() {
  const r = restaurant;
  const { contact, social, contactPage, identity } = r;
  const maps = mapLinks(contact.address.mapQuery);
  const { channels } = contactPage;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Visit & Contact" }]}
        hero={contactPage.hero}
      />

      <section className={`${container} py-20 sm:py-28`}>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <ContactInfoCard contact={contact} social={social} mapOpenHref={maps.open} />
          </Reveal>
          <Reveal delay={120} className="lg:min-h-[34rem]">
            <MapEmbed
              title={`Map showing ${identity.name} at ${contact.address.area}`}
              embedSrc={maps.embed}
              openHref={maps.open}
            />
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <ActionButtons buttons={resolveButtons(["order", "visit"], r)} />
          </div>
        </Reveal>
      </section>

      <section className="bg-surface py-24 sm:py-32">
        <div className={container}>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow both className="mb-6">
                {channels.eyebrow}
              </Eyebrow>
              <h2 className="display h-section text-balance">
                <RichText text={channels.title} />
              </h2>
              <p className="lead mt-6 text-pretty">{channels.lead}</p>
            </div>
          </Reveal>

          <ul className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
            {channels.items.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 90}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col gap-5 rounded-card border border-foreground/15 bg-background p-7 transition-colors hover:border-accent/60"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary transition-transform group-hover:scale-110">
                    <Icon name={c.icon} />
                  </span>
                  <div>
                    <h3 className="display h-card">{c.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/65">{c.copy}</p>
                  </div>
                  <span className="mt-auto text-[0.72rem] font-bold tracking-[0.16em] text-accent uppercase [overflow-wrap:anywhere]">
                    {c.actionLabel}
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
