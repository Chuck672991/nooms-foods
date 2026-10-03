import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import { CTABanner } from "@/components/ui/CTABanner";
import { ImageTextSection } from "@/components/ui/ImageTextSection";
import { KeywordRibbon } from "@/components/ui/KeywordRibbon";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { PillButton } from "@/components/ui/PillButton";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Nooms Foods, a shawarma-and-burgers spot with a glowing sign on Shahrah-e-Faisal in IBEX, Karachi.",
  alternates: { canonical: "/story" },
};

const PHRASES = [
  "Nooms is a place for shawarma",
  "for burgers",
  "for loaded fries",
  "for pasta",
  "for friends",
  "for late-evening hunger",
];

export default function StoryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Story" }]}
        eyebrow="The name"
        title={
          <>
            Our <em>Story</em>
          </>
        }
        lead="Shawarma on fire, burgers stacked high and a sign you can't miss. Here's what Nooms Foods is about."
        backdrop={IMG.storefrontDay}
        backdropPosition="50% 35%"
        card={IMG.logoBadge}
        cardAspect="aspect-square"
        cardCaption="Shawarma on fire"
      />

      <ImageTextSection
        eyebrow="The name"
        title={
          <>
            Say it. <em>Nooms.</em>
          </>
        }
        media={
          <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]">
            <Image
              src={IMG.logoBadge.src}
              alt={IMG.logoBadge.alt}
              width={IMG.logoBadge.width}
              height={IMG.logoBadge.height}
              sizes="384px"
              className="h-full w-full scale-110 object-contain"
            />
          </div>
        }
      >
        <p>
          Nooms is the sound of a very satisfied mouth. We&apos;ll leave the official meaning to you,
          but the logo gives the game away: a pair of yellow eyes, a tongue out, and nothing on its
          mind but food.
        </p>
        <p>
          The other logo, the one with the flame, says it plainer still:{" "}
          <span className="text-yellow-soft italic">shawarma on fire.</span>
        </p>
      </ImageTextSection>

      <ImageTextSection
        eyebrow="The food"
        reverse
        title={
          <>
            Shawarma, burgers and <em>everything loaded.</em>
          </>
        }
        media={
          <div className="grid grid-cols-2 gap-4">
            <PhotoCard
              image={IMG.burger}
              sizes="200px"
              rotate={-3}
              imageClassName="aspect-[3/4]"
              position="42% 50%"
            />
            <PhotoCard
              image={IMG.loadedTrayBeef}
              sizes="200px"
              rotate={3}
              className="mt-10"
              imageClassName="aspect-[3/4]"
              position="50% 40%"
            />
          </div>
        }
      >
        <p>
          The menu is built around the things you crave in the evening: shawarma, burgers with a proper
          patty, fries buried under cheese, and pasta for when you want something different.
        </p>
        <p>
          <Link
            href="/menu"
            className="font-semibold text-yellow underline underline-offset-4 hover:text-yellow-soft"
          >
            See what&apos;s on the menu
          </Link>
          , or call us for today&apos;s deals.
        </p>
      </ImageTextSection>

      <ImageTextSection
        eyebrow="The craft"
        title={
          <>
            Made in plain <em>view.</em>
          </>
        }
        media={
          <PhotoCard
            image={IMG.storefrontDay}
            sizes="(min-width: 1024px) 448px, 90vw"
            rotate={-2}
            imageClassName="aspect-[3/4]"
            position="50% 45%"
            className="mx-auto max-w-sm"
          />
        }
      >
        <p>
          Our counter opens onto the street, so you can see the team at work. There&apos;s no hiding
          place for a lazy plate, and that suits us fine.
        </p>
        <p>Walk up, watch, and order with your eyes.</p>
      </ImageTextSection>

      <ImageTextSection
        eyebrow="The room"
        reverse
        title={
          <>
            A sign you can&apos;t <em>miss.</em>
          </>
        }
        media={
          <PhotoCard
            image={IMG.storefrontNight}
            sizes="(min-width: 1024px) 448px, 90vw"
            rotate={2}
            imageClassName="aspect-[4/5]"
            position="50% 40%"
            className="mx-auto max-w-sm"
          />
        }
      >
        <p>
          Black front, glowing sign, yellow eyes. Inside it&apos;s casual: come as you are, sit down
          and dig in. Dine in, take it away, or have it brought home.
        </p>
        <p>
          We&apos;re on Shahrah-e-Faisal in {SITE.address.area}, open {SITE.hours.summary}.
        </p>
      </ImageTextSection>

      <KeywordRibbon items={PHRASES} duration={48} reverse />

      <CTABanner
        eyebrow="Let the story begin"
        title={
          <>
            Join us on <em>Shahrah-e-Faisal.</em>
          </>
        }
        body={`${SITE.address.area} · ${SITE.hours.summary}`}
        image={IMG.storefrontNight}
        position="50% 30%"
      >
        <PillButton href={SITE.directionsHref} external destination="Google Maps directions">
          Get directions
        </PillButton>
        <PillButton href="/menu" variant="outline" arrow>
          View the menu
        </PillButton>
      </CTABanner>
    </>
  );
}
