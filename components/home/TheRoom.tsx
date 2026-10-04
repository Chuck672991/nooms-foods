import type { ResolvedButton } from "@/lib/restaurant";
import type { Contact, HomeContent } from "@/restaurants/types";
import { container, sectionY } from "@/lib/utils";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { HoursBlock } from "@/components/ui/Hours";
import { Clock, MapPin, Phone } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";

/**
 * The space: copy + two captioned prints, plus a proof strip of verified
 * where / when / how-to-reach facts (Qissa's strip shows a Google rating).
 */
export function TheRoom({
  content,
  button,
  contact,
  services,
}: {
  content: HomeContent["place"];
  button: ResolvedButton;
  contact: Contact;
  services: string[];
}) {
  const [a, b] = content.photos;
  return (
    <section className={`${sectionY} dots relative overflow-hidden`}>
      <div className={`${container} grid items-center gap-20 lg:grid-cols-[1fr_1fr] lg:gap-24`}>
        <Reveal>
          <Eyebrow className="mb-6">{content.eyebrow}</Eyebrow>
          <h2 className="display h-section max-w-xl text-balance">
            <RichText text={content.title} />
          </h2>
          <div className="lead mt-8 max-w-xl space-y-5 text-pretty">
            {content.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10">
            <ActionButtons buttons={[button]} />
          </div>
        </Reveal>

        <div className="relative mx-auto grid w-full max-w-lg grid-cols-2 items-start gap-5 sm:gap-8">
          <Reveal variant="image" className="mt-0">
            <PhotoCard
              image={a.image}
              sizes="(min-width: 640px) 240px, 45vw"
              rotate={-3}
              imageClassName="aspect-[3/4]"
              caption={a.caption}
            />
          </Reveal>
          <Reveal variant="image" delay={150} className="mt-14">
            <PhotoCard
              image={b.image}
              sizes="(min-width: 640px) 240px, 45vw"
              rotate={3}
              imageClassName="aspect-[3/4]"
              caption={b.caption}
            />
          </Reveal>
        </div>
      </div>

      <Reveal delay={100} className={`${container} mt-24`}>
        <div className="grid divide-y divide-foreground/15 overflow-hidden rounded-card border border-foreground/15 bg-surface md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex items-start gap-4 p-7 sm:p-9">
            <MapPin className="mt-1 shrink-0 text-accent" />
            <div>
              <p className="eyebrow mb-3">Find us</p>
              <p className="text-[0.95rem] leading-relaxed text-foreground/85">
                {contact.address.area}
                <br />
                {contact.address.short}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-7 sm:p-9">
            <Clock className="mt-1 shrink-0 text-accent" />
            <div>
              <p className="eyebrow mb-3">Hours</p>
              <div className="text-[0.95rem] leading-relaxed text-foreground/85">
                <HoursBlock hours={contact.hours} noteClassName="block text-foreground/55" />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-7 sm:p-9">
            <Phone className="mt-1 shrink-0 text-accent" />
            <div>
              <p className="eyebrow mb-3">Call</p>
              <p className="text-[0.95rem] leading-relaxed text-foreground/85">
                <a href={`tel:${contact.phone.e164}`} className="transition-colors hover:text-accent">
                  {contact.phone.display}
                </a>
                <br />
                <span className="text-foreground/55">{services.join(" · ")}</span>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
