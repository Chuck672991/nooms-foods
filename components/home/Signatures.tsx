import Image from "next/image";
import Link from "next/link";
import { IMG, type Img } from "@/lib/images";
import { SITE } from "@/lib/site";
import { container, sectionY } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icons";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Signature = {
  tag: string;
  title: string;
  description: string;
  image: Img;
  position?: string;
  contain?: boolean;
};

/**
 * Descriptions only say what the photo shows: no ingredient, recipe or
 * "best seller" claims. Tags are category labels, not endorsements.
 */
const SIGNATURES: Signature[] = [
  {
    tag: "Burgers",
    title: "Burgers, stacked high",
    description: "Thick patties, melted cheese and sauce, wrapped up and ready to go.",
    image: IMG.burger,
    position: "42% 50%",
  },
  {
    tag: "Loaded",
    title: "Loaded and cheesy",
    description: "A foil tray of meat under melted cheese, with fries on the side.",
    image: IMG.loadedTrayBeef,
    position: "50% 40%",
  },
  {
    tag: "To share",
    title: "Forks in the tray",
    description: "Cheese, olives and jalapeños. Bring friends and bring forks.",
    image: IMG.loadedTrayForks,
    position: "50% 55%",
  },
  {
    tag: "Melted",
    title: "Golden, bubbling cheese",
    description: "A black plate, a fork and a lot of melted cheese with jalapeño slices.",
    image: IMG.cheesyPlate,
  },
  {
    tag: "Shawarma",
    title: "Shawarma on fire",
    description: "The star of our logo and our tagline. Ask for it at the counter.",
    image: IMG.logoBadge,
    contain: true,
  },
];

function SignatureCard({ item }: { item: Signature }) {
  return (
    <article className="group flex h-full gap-5 rounded-card border border-cream/12 bg-ink-800 p-3 transition-colors hover:border-yellow/50 sm:gap-6 sm:p-4">
      <div className="zoom-img relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-[10px] bg-ink-700 sm:w-48 lg:w-52">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 640px) 208px, 144px"
          className={item.contain ? "bg-white object-contain p-2" : "object-cover"}
          style={item.position ? { objectPosition: item.position } : undefined}
        />
        <span className="absolute top-2.5 left-2.5 rounded-full bg-yellow px-3 py-1.5 text-[0.62rem] leading-none font-bold tracking-[0.14em] text-on-yellow uppercase">
          {item.tag}
        </span>
      </div>
      <div className="flex flex-col justify-center py-2 pr-2">
        <h3 className="display h-card text-balance">{item.title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/70 text-pretty">
          {item.description}
        </p>
      </div>
    </article>
  );
}

/** "The Signatures": 2-column grid of photo cards, plus the menu CTA row. */
export function Signatures() {
  return (
    <section className={`${sectionY} dots`}>
      <div className={container}>
        <Reveal>
          <SectionHeading
            eyebrow="The Signatures"
            title={
              <>
                Plates that <em>speak for themselves.</em>
              </>
            }
            lead="A look at what comes out of our kitchen. Call or drop by to ask what's on today."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {SIGNATURES.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 90}>
              <SignatureCard item={item} />
            </Reveal>
          ))}
          <Reveal delay={90}>
            <Link
              href="/menu"
              className="group flex h-full min-h-48 items-center justify-between gap-6 rounded-card border border-yellow/60 bg-yellow p-6 text-on-yellow transition-colors hover:bg-yellow-soft sm:p-8"
            >
              <span className="display text-3xl leading-[1.05] font-[620] text-balance sm:text-4xl">
                See everything on the menu
              </span>
              <ArrowRight
                width={32}
                height={32}
                className="shrink-0 transition-transform group-hover:translate-x-1.5"
              />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <PillButton href="/menu" arrow>
              Explore the full menu
            </PillButton>
            <PillButton href={SITE.phone.href} variant="outline">
              Call to order
            </PillButton>
            <PillButton
              href={SITE.social.instagram.href}
              variant="outline"
              external
              destination="Instagram"
            >
              See more on Instagram
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
