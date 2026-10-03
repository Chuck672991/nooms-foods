import type { Metadata } from "next";
import { IMG } from "@/lib/images";
import { ARTICLES } from "@/lib/journal";
import { SITE } from "@/lib/site";
import { container } from "@/lib/utils";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes and guides from Nooms Foods in Karachi: how to find us on Shahrah-e-Faisal and how to dine in, take away or get delivery.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
        eyebrow="Notes from the counter"
        title="Journal"
        lead="Guides and notes from the Nooms Foods kitchen."
        backdrop={IMG.burger}
        backdropPosition="50% 45%"
        card={IMG.storefrontNight}
        cardAspect="aspect-[4/5]"
        cardCaption="Look for the glow"
      />

      <section className={`${container} py-24 sm:py-32`}>
        {/* Grid scales to any number of articles without layout changes. */}
        <div className="grid gap-x-12 gap-y-20 md:grid-cols-2">
          {ARTICLES.map((article, i) => (
            <Reveal key={article.slug} delay={i * 100}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner
        eyebrow="Hungry for the real thing?"
        title={
          <>
            Come write your own <em>chapter.</em>
          </>
        }
        image={IMG.loadedTrayBeef}
        position="50% 40%"
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
