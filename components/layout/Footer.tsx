import Image from "next/image";
import Link from "next/link";
import { PLATFORM_NAMES, type NavLink } from "@/lib/restaurant";
import type { RestaurantConfig } from "@/restaurants/types";
import { HoursBlock } from "@/components/ui/Hours";
import { Icon, MapPin, Phone, Clock } from "@/components/ui/Icons";
import { RichText } from "@/components/ui/RichText";
import { Urdu } from "@/components/ui/Urdu";
import { mapLinks } from "@/restaurants/helpers";

const socialLink =
  "flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:border-accent hover:bg-primary hover:text-on-primary";

/** Site-wide footer: brand, explore, hours, contact + follow, oversized watermark. */
export function Footer({ restaurant, links }: { restaurant: RestaurantConfig; links: NavLink[] }) {
  const { identity, contact, social, footer } = restaurant;
  const logo = identity.logo.badge ?? identity.logo.mark;
  const { address, phone, hours } = contact;

  return (
    <footer className="scope-deep relative isolate overflow-hidden border-t border-foreground/10 bg-deep">
      {/* Decorative watermark: drawn from a pseudo-element so it is not text for assistive tech or contrast audits. */}
      <p
        aria-hidden="true"
        data-mark={identity.name.toUpperCase()}
        className="footer-mark display"
        // 13.4vw fits an 11-character name edge to edge; longer names shrink to fit.
        style={{ fontSize: `clamp(2rem, ${Math.min(13.4, (13.4 * 11) / identity.name.length).toFixed(2)}vw, 17rem)` }}
      />

      <div className="mx-auto grid max-w-page gap-12 px-5 pt-20 pb-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.3fr] lg:px-14">
        <div>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            sizes="128px"
            className="h-32 w-32 rounded-2xl bg-white object-contain"
          />
          {identity.nameUrdu ? (
            <Urdu className="mt-4 block text-left text-[2rem] leading-[1.9] text-accent">{identity.nameUrdu}</Urdu>
          ) : null}
          <p className="display mt-4 text-2xl leading-tight font-[560]">
            <RichText text={footer.headline} />
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/65">{footer.blurb}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Ways to order">
            {identity.services.map((s) => (
              <li
                key={s}
                className="rounded-full border border-foreground/20 px-3 py-1 text-[0.68rem] font-bold tracking-[0.12em] text-foreground/80 uppercase"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow mb-6">Explore</h2>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.95rem] text-foreground/75 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-6">Hours</h2>
          <div className="flex items-start gap-3 text-[0.95rem] text-foreground/85">
            <Clock className="mt-0.5 shrink-0 text-accent" />
            <span>
              <HoursBlock hours={hours} />
            </span>
          </div>
          {identity.priceNote ? (
            <p className="mt-5 text-sm text-foreground/55">{identity.priceNote}.</p>
          ) : null}
        </div>

        <div>
          <h2 className="eyebrow mb-6">Contact &amp; Follow</h2>
          <address className="space-y-4 text-[0.95rem] text-foreground/85 not-italic">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-accent" />
              <a
                href={mapLinks(address.mapQuery).open}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {address.street}, {address.city}, {address.country}
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="shrink-0 text-accent" />
              <a href={`tel:${phone.e164}`} className="transition-colors hover:text-accent">
                {phone.display}
              </a>
            </p>
          </address>
          <div className="mt-6 flex gap-3">
            {social.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLink}
                aria-label={`${identity.name} on ${PLATFORM_NAMES[s.platform]} (opens in a new tab)`}
              >
                <Icon name={s.platform} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-foreground/50 sm:px-8 lg:px-14">
          <p>
            © {new Date().getFullYear()} {identity.name}. {address.city}, {address.country}.
          </p>
          {identity.motto ? <p>{identity.motto}.</p> : null}
        </div>
      </div>
    </footer>
  );
}
