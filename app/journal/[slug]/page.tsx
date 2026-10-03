import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/lib/journal";
import { SITE } from "@/lib/site";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { container } from "@/lib/utils";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
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
  if (!article) notFound();

  const more = ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <>
      {/* Title sits on the hero photo, as on the reference article template. */}
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: article.category },
        ]}
        title={article.title}
        backdrop={article.hero}
        backdropPosition={article.heroPosition}
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

          <div className="prose-nooms mt-4">
            {article.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "quote") return <blockquote key={i}>{block.text}</blockquote>;
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          <p className="display mt-14 text-xl text-cream/70 italic">{article.signOff}</p>
        </div>
      </article>

      {more.length > 0 ? (
        <section className="border-t border-cream/10 bg-ink-800 py-20 sm:py-24">
          <div className={container}>
            <Reveal>
              <h2 className="display h-section">
                More from the <em>journal.</em>
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
      <CTABanner
        eyebrow="Hungry yet?"
        title={
          <>
            Come and <em>taste it.</em>
          </>
        }
        body={`${SITE.address.area} · ${SITE.hours.summary}`}
        image={article.hero}
        position={article.heroPosition}
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
