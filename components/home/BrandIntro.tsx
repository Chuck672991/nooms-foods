import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/restaurants/types";
import { container, sectionY } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";

/** Brand introduction ("What is …?"): image left, copy right. */
export function BrandIntro({
  content,
  motto,
}: {
  content: HomeContent["intro"];
  /** Sign-off line under the copy. */
  motto?: string;
}) {
  const { sticker } = content;
  return (
    <section id="intro" className={`${sectionY} relative`}>
      <div className={`${container} grid items-center gap-16 lg:grid-cols-2 lg:gap-24`}>
        <Reveal variant="image" className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <PhotoCard
            image={content.photo}
            sizes="(min-width: 1024px) 448px, 384px"
            rotate={-2}
            imageClassName="aspect-[3/4]"
          />
          {sticker ? (
            <div className="absolute -right-1 -bottom-8 w-32 rotate-[8deg] overflow-hidden rounded-full bg-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] sm:-right-12 sm:w-40">
              <Image
                src={sticker.src}
                alt={sticker.alt}
                width={sticker.width}
                height={sticker.height}
                sizes="160px"
                className="h-auto w-full scale-110"
              />
            </div>
          ) : null}
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow className="mb-6">{content.eyebrow}</Eyebrow>
            <h2 className="display h-section text-balance">
              <RichText text={content.title} />
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="lead mt-8 max-w-xl space-y-5 text-pretty">
              {content.paragraphs.map((p) => (
                <p key={p}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
            {motto ? (
              <p className="display mt-8 text-2xl text-primary-soft italic sm:text-3xl">{motto}.</p>
            ) : null}
            <Link
              href={content.link.href}
              className="group mt-8 inline-flex items-center gap-3 text-[0.78rem] font-bold tracking-[0.16em] uppercase transition-colors hover:text-accent"
            >
              {content.link.label}
              <ArrowRight
                width={16}
                height={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
