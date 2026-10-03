import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Clock, Facebook, Instagram, MapPin, Phone } from "@/components/ui/Icons";

const socialLink =
  "flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-yellow hover:bg-yellow hover:text-on-yellow";

/** Site-wide footer: brand, explore, hours, contact + follow, oversized watermark. */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-cream/10 bg-ink-950">
      <p
        aria-hidden="true"
        className="display pointer-events-none absolute inset-x-0 bottom-0 -z-10 translate-y-[14%] text-center text-[clamp(3.25rem,13.4vw,17rem)] leading-[0.8] font-black tracking-[-0.05em] [word-spacing:0.18em] whitespace-nowrap text-cream/[0.04] select-none"
      >
        NOOMS FOODS
      </p>

      <div className="mx-auto grid max-w-page gap-12 px-5 pt-20 pb-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.3fr] lg:px-14">
        <div>
          <Image
            src={IMG.logoBadge.src}
            alt={IMG.logoBadge.alt}
            width={IMG.logoBadge.width}
            height={IMG.logoBadge.height}
            sizes="128px"
            className="h-32 w-32 rounded-2xl bg-white object-contain"
          />
          <p className="display mt-6 text-2xl leading-tight font-[560]">
            Shawarma on <em>fire.</em>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/65">
            {SITE.signTagline}. Shawarma, burgers, loaded fries and pasta in IBEX, Karachi.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Ways to order">
            {SITE.services.map((s) => (
              <li
                key={s}
                className="rounded-full border border-cream/20 px-3 py-1 text-[0.68rem] font-bold tracking-[0.12em] text-cream/80 uppercase"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow mb-6">Explore</h2>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.95rem] text-cream/75 transition-colors hover:text-yellow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-6">Hours</h2>
          <p className="flex items-start gap-3 text-[0.95rem] text-cream/85">
            <Clock className="mt-0.5 shrink-0 text-yellow" />
            <span>
              Evenings, {SITE.hours.summary}
              <span className="mt-2 block text-sm text-cream/55">{SITE.hours.note}</span>
            </span>
          </p>
          <p className="mt-5 text-sm text-cream/55">{SITE.priceNote}.</p>
        </div>

        <div>
          <h2 className="eyebrow mb-6">Contact &amp; Follow</h2>
          <address className="space-y-4 text-[0.95rem] text-cream/85 not-italic">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-yellow" />
              <a
                href={SITE.mapOpenHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-yellow"
              >
                {SITE.address.street}, Karachi, Pakistan
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="shrink-0 text-yellow" />
              <a href={SITE.phone.href} className="transition-colors hover:text-yellow">
                {SITE.phone.display}
              </a>
            </p>
          </address>
          <div className="mt-6 flex gap-3">
            <a
              href={SITE.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLink}
              aria-label="Nooms Foods on Instagram (opens in a new tab)"
            >
              <Instagram />
            </a>
            <a
              href={SITE.social.facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              className={socialLink}
              aria-label="Nooms Foods on Facebook (opens in a new tab)"
            >
              <Facebook />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-cream/50 sm:px-8 lg:px-14">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Karachi, Pakistan.
          </p>
          <p>{SITE.signTagline}.</p>
        </div>
      </div>
    </footer>
  );
}
