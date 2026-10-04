import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { ctaProps } from "@/lib/restaurant";
import { container } from "@/lib/utils";
import { restaurant } from "@/restaurants/active";

const articles = restaurant.journal?.articles ?? [];
const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.metaDescription,
      images: [{ url: article.hero.src, width: article.hero.width, height: article.hero.height }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  const { journal } = restaurant;
  if (!article || !journal) notFound();

  const more = articles.filter((a) => a.slug !== article.slug);

  return (
    <>
      {/* Title sits on the hero photo, as on the reference article template. */}
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: article.category },
        ]}
        hero={{ title: article.title, backdrop: article.hero }}
      />

      <article className="px-5 pt-14 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow flex-wrap gap-y-2">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.author}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readMinutes} min read</span>
          </p>

          <div className="prose-article mt-4">
            {article.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "quote") return <blockquote key={i}>{block.text}</blockquote>;
              return (
                <p key={i}>
                  <RichText text={block.text} />
                </p>
              );
            })}
          </div>

          <p className="display mt-14 text-xl text-foreground/70 italic">{article.signOff}</p>
        </div>
      </article>

      {more.length > 0 ? (
        <section className="border-t border-foreground/10 bg-surface py-20 sm:py-24">
          <div className={container}>
            <Reveal>
              <h2 className="display h-section">
                <RichText text={journal.moreHeading} />
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-x-12 gap-y-16 md:grid-cols-2">
              {more.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* The reference article ends without a CTA; every other page type has
          one, so this is a deliberate improvement. */}
      <CTABanner {...ctaProps(journal.articleCta, article.hero, restaurant)} />
    </>
  );
}
