import type { ReactNode } from "react";
import { PLATFORM_NAMES, socialLabel } from "@/lib/restaurant";
import type { Contact, SocialLink } from "@/restaurants/types";
import { HoursBlock } from "@/components/ui/Hours";
import { Clock, Icon, Mail, MapPin, Phone } from "@/components/ui/Icons";

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
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-accent">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="eyebrow mb-2">{label}</p>
        <div className="text-[0.98rem] leading-relaxed text-foreground/85 [overflow-wrap:anywhere]">{children}</div>
      </div>
    </div>
  );
}

const link = "transition-colors hover:text-accent";

/** Bordered card: icon + label + value rows with thin dividers. */
export function ContactInfoCard({
  contact,
  social,
  mapOpenHref,
}: {
  contact: Contact;
  social: SocialLink[];
  mapOpenHref: string;
}) {
  const { address, phone, hours, email } = contact;
  return (
    <div className="divide-y divide-foreground/12 rounded-card border border-foreground/15 bg-surface p-7 sm:p-10">
      <Row icon={<MapPin />} label="Address">
        <a href={mapOpenHref} target="_blank" rel="noopener noreferrer" className={link}>
          {address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="sr-only">(opens Google Maps in a new tab)</span>
        </a>
        <p className="mt-2 text-sm text-foreground/55">
          {address.area}
          {address.plusCode ? ` · Plus Code ${address.plusCode}` : ""}
        </p>
      </Row>
      <Row icon={<Phone />} label="Phone">
        <a href={`tel:${phone.e164}`} className={link}>
          {phone.display}
        </a>
        {phone.note ? <p className="mt-1 text-sm text-foreground/55">{phone.note}</p> : null}
      </Row>
      {email ? (
        <Row icon={<Mail />} label="Email">
          <a href={`mailto:${email}`} className={link}>
            {email}
          </a>
        </Row>
      ) : null}
      <Row icon={<Clock />} label="Hours">
        <HoursBlock hours={hours} noteClassName="mt-1 block text-sm text-foreground/55" />
      </Row>
      {social.length ? (
        <Row icon={<Icon name={social[0].platform} />} label="Follow">
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            {social.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${link}`}
              >
                <Icon name={s.platform} width={16} height={16} />
                {socialLabel(s)}
                <span className="sr-only">
                  {s.handle ? ` on ${PLATFORM_NAMES[s.platform]}` : ""} (opens in a new tab)
                </span>
              </a>
            ))}
          </p>
        </Row>
      ) : null}
    </div>
  );
}
