import type { Metadata } from "next";
import { IMG } from "@/lib/images";
import { MENU_CATEGORIES } from "@/lib/menu";
import { SITE } from "@/lib/site";
import { container } from "@/lib/utils";
import { MenuCategoryNav } from "@/components/menu/MenuCategoryNav";
import { MenuSection } from "@/components/menu/MenuSection";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Menu",
  description:
    "Shawarma, burgers, loaded fries, pasta and deals at Nooms Foods on Shahrah-e-Faisal, Karachi. Call 0304 3542289 for today's prices.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  const categories = MENU_CATEGORIES.map(({ id, label }) => ({ id, label }));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "The Menu" }]}
        eyebrow="Dine in · Takeaway · Home delivery"
        title="The Menu"
        lead="Shawarma, burgers, loaded fries, pasta and deals. Here's what we're cooking in IBEX, Karachi."
        backdrop={IMG.burger}
        backdropPosition="50% 45%"
        card={IMG.loadedTrayBeef}
        cardPosition="50% 40%"
        cardCaption="Loaded and cheesy"
      />

      <MenuCategoryNav categories={categories} />

      <div className={`${container} pt-10`}>
        <Reveal>
          <p className="mx-auto max-w-3xl rounded-card border border-cream/15 bg-ink-800 px-6 py-5 text-center text-[0.95rem] leading-relaxed text-cream/75">
            Prices and deals can change, so call{" "}
            <a
              href={SITE.phone.href}
              className="font-semibold text-yellow underline-offset-4 hover:underline"
            >
              {SITE.phone.display}
            </a>{" "}
            for today&apos;s lineup, or message us on{" "}
            <a
              href={SITE.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-yellow underline-offset-4 hover:underline"
            >
              Instagram<span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </Reveal>
      </div>

      <div>
        {MENU_CATEGORIES.map((category, i) => (
          <MenuSection key={category.id} category={category} index={i} />
        ))}
      </div>

      <CTABanner
        eyebrow="Hungry yet?"
        title={
          <>
            Taste the <em>whole menu.</em>
          </>
        }
        body="Call to order for takeaway or home delivery, or come and eat with us on Shahrah-e-Faisal."
        image={IMG.loadedTrayBeef}
        position="50% 40%"
      >
        <PillButton href={SITE.phone.href}>Call to order</PillButton>
        <PillButton
          href={SITE.directionsHref}
          variant="outline"
          external
          destination="Google Maps directions"
        >
          Get directions
        </PillButton>
      </CTABanner>
    </>
  );
}
