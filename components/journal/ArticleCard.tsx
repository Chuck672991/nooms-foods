import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/journal";
import { ArrowRight } from "@/components/ui/Icons";

/** Journal listing card: photo, "CATEGORY · N MIN READ", title, excerpt, link. */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group">
      <Link href={`/journal/${article.slug}`} className="block">
        <div className="zoom-img relative aspect-[16/10] overflow-hidden rounded-card border border-cream/10 bg-ink-700">
          <Image
            src={article.hero.src}
            alt={article.hero.alt}
            fill
            sizes="(min-width: 1024px) 560px, 92vw"
            className="object-cover"
            style={{ objectPosition: article.heroPosition }}
          />
        </div>
        <p className="eyebrow mt-7">
          {article.category} · {article.readMinutes} min read
        </p>
        <h2 className="display h-card mt-4 text-balance transition-colors group-hover:text-yellow sm:text-[1.9rem]">
          {article.title}
        </h2>
        <p className="mt-4 max-w-lg leading-relaxed text-cream/70 text-pretty">{article.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-3 text-[0.78rem] font-bold tracking-[0.16em] text-yellow uppercase">
          Read the story
          <ArrowRight
            width={16}
            height={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </Link>
    </article>
  );
}
