import { CTABanner } from "@/components/ui/CTABanner";
import { ImageTextSection } from "@/components/ui/ImageTextSection";
import { KeywordRibbon } from "@/components/ui/KeywordRibbon";
import { PageHero } from "@/components/ui/PageHero";
import { RichText } from "@/components/ui/RichText";
import { StoryMedia } from "@/components/story/StoryMedia";
import { ctaProps } from "@/lib/restaurant";
import { pageMetadata } from "@/lib/seo";
import { restaurant } from "@/restaurants/active";

export const metadata = pageMetadata(restaurant, "story", "/story");

export default function StoryPage() {
  const { story } = restaurant;

  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Our Story" }]} hero={story.hero} />

      {story.sections.map((section, i) => (
        <ImageTextSection
          key={section.eyebrow}
          eyebrow={section.eyebrow}
          title={<RichText text={section.title} />}
          reverse={i % 2 === 1}
          media={<StoryMedia media={section.media} index={i} />}
        >
          {section.paragraphs.map((p) => (
            <p key={p}>
              <RichText text={p} emClassName="text-primary-soft italic" />
            </p>
          ))}
        </ImageTextSection>
      ))}

      <KeywordRibbon items={story.ribbon} duration={48} reverse />

      <CTABanner {...ctaProps(story.cta, story.hero.backdrop, restaurant)} />
    </>
  );
}
