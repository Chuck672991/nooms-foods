import { BrandIntro } from "@/components/home/BrandIntro";
import { CuisineGrid } from "@/components/home/CuisineGrid";
import { DishMarquee } from "@/components/home/DishMarquee";
import { FeaturedItems } from "@/components/home/FeaturedItems";
import { FollowBand } from "@/components/home/FollowBand";
import { Hero } from "@/components/home/Hero";
import { KitchenMoment } from "@/components/home/KitchenMoment";
import { SplitConversion } from "@/components/home/SplitConversion";
import { StatBand } from "@/components/home/StatBand";
import { TheRoom } from "@/components/home/TheRoom";
import { KeywordRibbon } from "@/components/ui/KeywordRibbon";
import { PLATFORM_NAMES, featuredCards, resolveButtons } from "@/lib/restaurant";
import { pageMetadata } from "@/lib/seo";
import { restaurant } from "@/restaurants/active";
import type { ButtonRef } from "@/restaurants/types";

export const metadata = pageMetadata(restaurant, "home", "/");

export default function HomePage() {
  const r = restaurant;
  const { home, menu, contact, identity, social } = r;

  const featured = featuredCards(r);
  const primarySocial = social[0];
  const featuredRefs: ButtonRef[] = [
    { action: "menu", label: "Explore the full menu", variant: "primary" },
    { action: "order", variant: "outline" },
    ...(primarySocial
      ? [
          {
            action: {
              label: `See more on ${PLATFORM_NAMES[primarySocial.platform]}`,
              href: primarySocial.href,
              external: true,
              destination: PLATFORM_NAMES[primarySocial.platform],
            },
            variant: "outline" as const,
          },
        ]
      : []),
  ];

  return (
    <>
      <Hero content={home.hero} buttons={resolveButtons(home.hero.buttons, r)} />
      <BrandIntro content={home.intro} motto={identity.motto} />
      <DishMarquee content={home.dishes} />
      <KeywordRibbon items={home.ribbon} />
      <CuisineGrid content={home.cuisine} categories={menu.categories} />
      <KitchenMoment content={home.kitchen} />
      {featured.length > 0 ? (
        <FeaturedItems
          content={home.featured}
          cards={featured}
          buttons={resolveButtons(featuredRefs, r)}
        />
      ) : null}
      <StatBand content={home.stats} />
      <TheRoom
        content={home.place}
        button={resolveButtons([home.place.button], r)[0]}
        contact={contact}
        services={identity.services}
      />
      {social.length > 0 ? <FollowBand content={home.follow} social={social} /> : null}
      <SplitConversion content={home.split} />
    </>
  );
}
