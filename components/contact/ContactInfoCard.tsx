import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { Clock, Facebook, Instagram, MapPin, Phone } from "@/components/ui/Icons";

function Row({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-5 py-6 first:pt-0 last:pb-0">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 text-yellow">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="eyebrow mb-2">{label}</p>
        <div className="text-[0.98rem] leading-relaxed text-cream/85">{children}</div>
      </div>
    </div>
  );
}

const link = "transition-colors hover:text-yellow";

/** Dark bordered card: icon + label + value rows with thin dividers. */
export function ContactInfoCard() {
  return (
    <div className="divide-y divide-cream/12 rounded-card border border-cream/15 bg-ink-800 p-7 sm:p-10">
      <Row icon={<MapPin />} label="Address">
        <a href={SITE.mapOpenHref} target="_blank" rel="noopener noreferrer" className={link}>
          {SITE.address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="sr-only">(opens Google Maps in a new tab)</span>
        </a>
        <p className="mt-2 text-sm text-cream/55">
          {SITE.address.area} · Plus Code {SITE.address.plusCode}
        </p>
      </Row>
      <Row icon={<Phone />} label="Phone">
        <a href={SITE.phone.href} className={link}>
          {SITE.phone.display}
        </a>
        <p className="mt-1 text-sm text-cream/55">For takeaway, home delivery and questions</p>
      </Row>
      <Row icon={<Clock />} label="Hours">
        <p>Evenings, {SITE.hours.summary}</p>
        <p className="mt-1 text-sm text-cream/55">{SITE.hours.note}</p>
      </Row>
      <Row icon={<Instagram />} label="Follow">
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={SITE.social.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 ${link}`}
          >
            <Instagram width={16} height={16} />
            {SITE.social.instagram.handle}
            <span className="sr-only">on Instagram (opens in a new tab)</span>
          </a>
          <a
            href={SITE.social.facebook.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 ${link}`}
          >
            <Facebook width={16} height={16} />
            Facebook
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      </Row>
    </div>
  );
}
