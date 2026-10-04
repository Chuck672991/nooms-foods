import { MenuCategoryNav } from "@/components/menu/MenuCategoryNav";
import { MenuSection } from "@/components/menu/MenuSection";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { ctaProps } from "@/lib/restaurant";
import { pageMetadata } from "@/lib/seo";
import { container } from "@/lib/utils";
import { restaurant } from "@/restaurants/active";

export const metadata = pageMetadata(restaurant, "menu", "/menu");

export default function MenuPage() {
  const { menu } = restaurant;
  const pills = menu.categories.map(({ id, label }) => ({ id, label }));

  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "The Menu" }]} hero={menu.hero} />

      <MenuCategoryNav categories={pills} action={menu.navAction} />

      {menu.notice ? (
        <div className={`${container} pt-10`}>
          <Reveal>
            <p className="mx-auto max-w-3xl rounded-card border border-foreground/15 bg-surface px-6 py-5 text-center text-[0.95rem] leading-relaxed text-foreground/75">
              <RichText
                text={menu.notice}
                linkClassName="font-semibold text-accent underline-offset-4 hover:underline"
              />
            </p>
          </Reveal>
        </div>
      ) : null}

      <div>
        {menu.categories.map((category, i) => (
          <MenuSection
            key={category.id}
            category={category}
            items={menu.items.filter((item) => item.category === category.id)}
            index={i}
          />
        ))}
      </div>

      <CTABanner {...ctaProps(menu.cta, menu.hero.backdrop, restaurant)} />
    </>
  );
}
