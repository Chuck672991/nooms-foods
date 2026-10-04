import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ctaProps, socialLabel, PLATFORM_NAMES } from "@/lib/restaurant";
import { pageMetadata } from "@/lib/seo";
import { container } from "@/lib/utils";
import { restaurant } from "@/restaurants/active";

export const metadata = pageMetadata(restaurant, "gallery", "/gallery");

export default function GalleryPage() {
  const { gallery, social } = restaurant;
  const follow = social[0];

  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]} hero={gallery.hero} />

      <section className={`${container} pt-20 pb-16 sm:pt-28`}>
        <GalleryGrid items={gallery.items} />
        {follow ? (
          <Reveal>
            <p className="mx-auto mt-16 max-w-xl text-center text-lg text-foreground/75">
              Follow{" "}
              <a
                href={follow.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline underline-offset-4 hover:text-primary-soft"
              >
                {socialLabel(follow)}
                <span className="sr-only"> on {PLATFORM_NAMES[follow.platform]} (opens in a new tab)</span>
              </a>{" "}
              {gallery.followSuffix}
            </p>
          </Reveal>
        ) : null}
      </section>

      <CTABanner {...ctaProps(gallery.cta, gallery.hero.backdrop, restaurant)} />
    </>
  );
}
