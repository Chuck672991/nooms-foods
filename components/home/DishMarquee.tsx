import Image from "next/image";
import Link from "next/link";
import { IMG, type Img } from "@/lib/images";
import { container } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icons";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

type Dish = { image: Img; position?: string; contain?: boolean };

const DISHES: Dish[] = [
  { image: IMG.burger },
  { image: IMG.loadedTrayBeef, position: "50% 40%" },
  { image: IMG.logoBadge, contain: true },
  { image: IMG.loadedTrayForks, position: "50% 60%" },
  { image: IMG.cheesyPlate },
  { image: IMG.storefrontNight, position: "50% 22%" },
];

function Circle({ dish, hidden }: { dish: Dish; hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="mr-7 h-44 w-44 shrink-0 overflow-hidden rounded-full border border-cream/15 bg-ink-700 sm:h-52 sm:w-52"
    >
      <Image
        src={dish.image.src}
        alt={hidden ? "" : dish.image.alt}
        width={dish.image.width}
        height={dish.image.height}
        sizes="208px"
        className={`h-full w-full ${dish.contain ? "bg-white object-contain p-2" : "object-cover"}`}
        style={dish.position ? { objectPosition: dish.position } : undefined}
      />
    </div>
  );
}

/** "The Masterpieces" analogue: circular plates scrolling in a continuous loop. */
export function DishMarquee() {
  return (
    <section className="overflow-hidden pt-8 pb-24 sm:pb-32">
      <div className={`${container} mb-14 flex flex-wrap items-end justify-between gap-6`}>
        <Reveal>
          <h2 className="display h-section max-w-2xl text-balance">
            Piled high, served <em>hot.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 text-[0.78rem] font-bold tracking-[0.16em] text-yellow uppercase"
          >
            View the full gallery
            <ArrowRight
              width={16}
              height={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>

      <Marquee duration={60}>
        {DISHES.map((dish) => (
          <Circle key={dish.image.src} dish={dish} />
        ))}
        {DISHES.map((dish) => (
          <Circle key={`${dish.image.src}-b`} dish={dish} hidden />
        ))}
      </Marquee>
    </section>
  );
}
