import type { Metadata } from "next";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import { container } from "@/lib/utils";
import { GalleryGrid, type GalleryItem } from "@/components/gallery/GalleryGrid";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Nooms Foods in IBEX, Karachi: the glowing sign, burgers, loaded fries and cheesy plates.",
  alternates: { canonical: "/gallery" },
};

// Captions describe what each photo shows; nothing more.
const ITEMS: GalleryItem[] = [
  { image: IMG.storefrontNight, caption: "The sign after dark" },
  { image: IMG.burger, caption: "Wrapped and ready to go" },
  { image: IMG.loadedTrayBeef, caption: "Loaded and cheesy" },
  { image: IMG.logoBadge, caption: "Shawarma on fire", contain: true },
  { image: IMG.storefrontDay, caption: "By day, on Shahrah-e-Faisal" },
  { image: IMG.loadedTrayForks, caption: "Forks in the tray" },
  { image: IMG.dealsBoard, caption: "The deals board" },
  { image: IMG.cheesyPlate, caption: "Golden, bubbling cheese" },
  { image: IMG.menuBoard, caption: "The menu board" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        eyebrow="A look around"
        title="Gallery"
        lead="Signs, plates and counters. A few snapshots from Nooms Foods."
        backdrop={IMG.loadedTrayForks}
        backdropPosition="50% 55%"
        card={IMG.cheesyPlate}
        cardCaption="Golden, bubbling cheese"
        cardAspect="aspect-square"
      />

      <section className={`${container} pt-20 pb-16 sm:pt-28`}>
        <GalleryGrid items={ITEMS} />
        <Reveal>
          <p className="mx-auto mt-16 max-w-xl text-center text-lg text-cream/75">
            Follow{" "}
            <a
              href={SITE.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-yellow underline underline-offset-4 hover:text-yellow-soft"
            >
              {SITE.social.instagram.handle}
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>{" "}
            for the latest from the counter.
          </p>
        </Reveal>
      </section>

      <CTABanner
        eyebrow="Come and see"
        title={
          <>
            Better in <em>person.</em>
          </>
        }
        body="Photos only get you so far. Come and taste it."
        image={IMG.storefrontNight}
        position="50% 30%"
      >
        <PillButton href={SITE.directionsHref} external destination="Google Maps directions">
          Get directions
        </PillButton>
        <PillButton href={SITE.phone.href} variant="outline">
          Call to order
        </PillButton>
      </CTABanner>
    </>
  );
}
