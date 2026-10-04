import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ctaProps } from "@/lib/restaurant";
import { pageMetadata } from "@/lib/seo";
import { container } from "@/lib/utils";
import { restaurant } from "@/restaurants/active";

export const metadata = pageMetadata(restaurant, "journal", "/journal");

export default function JournalPage() {
  const { journal } = restaurant;
  if (!journal) notFound();

  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]} hero={journal.hero} />

      <section className={`${container} py-24 sm:py-32`}>
        {/* Grid scales to any number of articles without layout changes. */}
        <div className="grid gap-x-12 gap-y-20 md:grid-cols-2">
          {journal.articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 100}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner {...ctaProps(journal.cta, journal.hero.backdrop, restaurant)} />
    </>
  );
}
