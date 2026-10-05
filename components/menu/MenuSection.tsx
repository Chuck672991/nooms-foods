import type { MenuCategory, MenuItem } from "@/restaurants/types";
import { container, stagger } from "@/lib/utils";
import { CategoryGlyph } from "@/components/ui/CategoryGlyph";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { PriceTag } from "@/components/ui/PriceTag";
import { Reveal } from "@/components/ui/Reveal";
import { Urdu } from "@/components/ui/Urdu";

/**
 * One menu category: photo prints + heading with divider rule and italic
 * tagline + item list (two columns when there are more than two items).
 * Qissa shows a photo banner above the heading; small photos sit beside the
 * text as prints instead. A category with no photo gets a typographic plate
 * (its Urdu/English name set large) rather than stock imagery. Items may
 * carry an Urdu name and a badge; prices count up as they scroll into view.
 */
export function MenuSection({
  category,
  items,
  index,
}: {
  category: MenuCategory;
  items: MenuItem[];
  index: number;
}) {
  const flip = index % 2 === 1;
  const [first, second] = category.photos ?? [];

  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      className="scroll-mt-44 border-t border-foreground/10 py-16 first:border-t-0 sm:py-24"
    >
      <div
        // Flipped sections put the media second in the DOM order of the grid, so swap the track widths too.
        className={`${container} grid items-start gap-12 lg:gap-20 ${
          flip ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        }`}
      >
        {!first ? (
          <Reveal
            variant="image"
            className={`mx-auto w-full max-w-[17rem] ${flip ? "lg:order-last" : ""}`}
          >
            <CategoryGlyph label={category.label} labelUrdu={category.labelUrdu} className="aspect-[4/5]" />
          </Reveal>
        ) : (
          <Reveal
            variant="image"
            // Prints stay near native resolution: ~17rem for one photo, two ~12rem prints side by side.
            className={`mx-auto grid w-full gap-4 ${second ? "max-w-[26rem] grid-cols-2" : "max-w-[17rem]"} ${
              flip ? "lg:order-last" : ""
            }`}
          >
            <PhotoCard
              image={first}
              sizes="(min-width: 1024px) 220px, 45vw"
              rotate={flip ? 3 : -3}
              imageClassName={
                first.fit === "contain" ? "aspect-square" : second ? "aspect-[3/4]" : "aspect-[4/5]"
              }
            />
            {second ? (
              <PhotoCard
                image={second}
                sizes="(min-width: 1024px) 220px, 45vw"
                rotate={flip ? -2 : 3}
                className="mt-8"
                imageClassName="aspect-[3/4]"
              />
            ) : null}
          </Reveal>
        )}

        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <h2 id={`${category.id}-heading`} className="display h-section">
                {category.heading}
              </h2>
              {category.labelUrdu ? (
                <Urdu className="text-[1.6rem] leading-[1.9] text-accent sm:text-[1.9rem]">{category.labelUrdu}</Urdu>
              ) : null}
              <span className="hidden h-px min-w-10 flex-1 bg-foreground/20 sm:block" aria-hidden="true" />
              <p className="display text-xl text-primary-soft italic sm:text-2xl">{category.tagline}</p>
            </div>
            <p className="lead mt-5 max-w-xl text-pretty">{category.blurb}</p>
          </Reveal>

          {items.length ? (
            <ul className={`mt-10 grid gap-x-14 gap-y-8 ${items.length > 2 ? "sm:grid-cols-2" : "max-w-md"}`}>
              {items.map((item, i) => (
                <Reveal as="li" key={item.id} delay={stagger(i)}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-foreground/12 pb-3">
                    <h3 className="display text-[1.35rem] leading-tight font-[560]">{item.name}</h3>
                    {item.nameUrdu ? (
                      <Urdu className="text-[1.1rem] leading-[1.9] text-foreground/65">{item.nameUrdu}</Urdu>
                    ) : null}
                    {item.badge ? (
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.62rem] leading-none font-bold tracking-[0.14em] text-on-deep uppercase">
                        {item.badge}
                      </span>
                    ) : null}
                    {item.tags?.map((tag) => (
                      <span
                        key={tag}
                        title={tag === "V" ? "Vegetarian" : "Vegan"}
                        className="rounded-full border border-accent/60 px-2 py-0.5 text-[0.6rem] font-bold tracking-wider text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.price ? (
                      <span className="ml-auto text-[0.95rem] font-semibold text-accent tabular-nums">
                        <PriceTag price={item.price} />
                      </span>
                    ) : null}
                  </div>
                  {item.description ? (
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/65 text-pretty">
                      {item.description}
                    </p>
                  ) : null}
                </Reveal>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
