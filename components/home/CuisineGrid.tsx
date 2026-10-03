import Image from "next/image";
import Link from "next/link";
import { MENU_CATEGORIES } from "@/lib/menu";
import { container, sectionY } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Where each tile's image sits, so the crop reads at tile size. */
const TILE_POSITION: Record<string, string> = {
  shawarma: "50% 50%",
  burgers: "50% 50%",
  "loaded-fries": "50% 45%",
  pasta: "40% 18%",
  deals: "50% 30%",
};

/** "The Cuisine": category tiles that deep-link into the matching menu section. */
export function CuisineGrid() {
  return (
    <section className={`${sectionY} bg-ink-800`}>
      <div className={container}>
        <Reveal>
          <SectionHeading
            eyebrow="The Cuisine"
            title={
              <>
                Pick your <em>craving.</em>
              </>
            }
            lead="Shawarma, burgers, loaded fries, pasta and deals. Tap a tile to jump straight to it on the menu."
          />
        </Reveal>

        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-6">
          {MENU_CATEGORIES.map((cat, i) => {
            const image = cat.photos[0];
            const isLogo = cat.id === "shawarma";
            return (
              <Reveal as="li" key={cat.id} delay={i * 70}>
                <Link href={`/menu#${cat.id}`} className="group block">
                  <div className="zoom-img relative aspect-[4/5] overflow-hidden rounded-card border border-cream/10 bg-ink-700">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 46vw"
                      className={isLogo ? "bg-white object-contain p-2" : "object-cover"}
                      style={{ objectPosition: TILE_POSITION[cat.id] }}
                    />
                  </div>
                  <p className="display mt-4 flex items-center justify-between gap-2 text-xl font-[560] transition-colors group-hover:text-yellow">
                    {cat.label}
                    <ArrowRight
                      width={16}
                      height={16}
                      className="shrink-0 text-yellow opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </p>
                </Link>
              </Reveal>
            );
          })}

          <Reveal as="li" delay={MENU_CATEGORIES.length * 70}>
            <Link
              href="/menu"
              className="group flex aspect-[4/5] flex-col items-start justify-between rounded-card border border-yellow/60 bg-yellow p-5 text-on-yellow transition-colors hover:bg-yellow-soft"
            >
              <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase">Everything</span>
              <span className="display flex w-full items-end justify-between text-2xl leading-none font-[620]">
                Full menu
                <ArrowRight
                  width={22}
                  height={22}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
