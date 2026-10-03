import type { MenuCategory } from "@/lib/menu";
import { container } from "@/lib/utils";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * One menu category: photo prints + heading with divider rule and italic
 * tagline + two-column item list. Qissa shows a photo banner above the
 * heading; our photos are small, so they sit beside the text as prints.
 */
export function MenuSection({ category, index }: { category: MenuCategory; index: number }) {
  const flip = index % 2 === 1;
  const [first, second] = category.photos;
  const logoPhoto = category.id === "shawarma";

  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      className="scroll-mt-44 border-t border-cream/10 py-16 first:border-t-0 sm:py-24"
    >
      <div
        className={`${container} grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}
      >
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
            imageClassName={logoPhoto ? "aspect-square" : second ? "aspect-[3/4]" : "aspect-[4/5]"}
            position={category.id === "pasta" ? "40% 18%" : undefined}
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

        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <h2 id={`${category.id}-heading`} className="display h-section">
                {category.heading}
              </h2>
              <span className="hidden h-px min-w-10 flex-1 bg-cream/20 sm:block" aria-hidden="true" />
              <p className="display text-xl text-yellow-soft italic sm:text-2xl">{category.tagline}</p>
            </div>
            <p className="lead mt-5 max-w-xl text-pretty">{category.blurb}</p>
          </Reveal>

          <ul className={`mt-10 grid gap-x-14 gap-y-8 ${category.items.length > 2 ? "sm:grid-cols-2" : "max-w-md"}`}>
            {category.items.map((item, i) => (
              <Reveal as="li" key={item.name} delay={i * 60}>
                <div className="flex items-baseline gap-3 border-b border-cream/12 pb-3">
                  <h3 className="display text-[1.35rem] leading-tight font-[560]">{item.name}</h3>
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      title={tag === "V" ? "Vegetarian" : "Vegan"}
                      className="rounded-full border border-yellow/60 px-2 py-0.5 text-[0.6rem] font-bold tracking-wider text-yellow"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.price ? (
                    <span className="ml-auto text-[0.95rem] font-semibold text-yellow tabular-nums">
                      {item.price}
                    </span>
                  ) : null}
                </div>
                {item.description ? (
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/65 text-pretty">
                    {item.description}
                  </p>
                ) : null}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
