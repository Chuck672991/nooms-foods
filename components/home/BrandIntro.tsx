import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import { container, sectionY } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Reveal } from "@/components/ui/Reveal";

/** "What is Nooms?": image left, copy right. */
export function BrandIntro() {
  return (
    <section id="what-is-nooms" className={`${sectionY} dots relative`}>
      <div className={`${container} grid items-center gap-16 lg:grid-cols-2 lg:gap-24`}>
        <Reveal variant="image" className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <PhotoCard
            image={IMG.storefrontDay}
            sizes="(min-width: 1024px) 448px, 384px"
            rotate={-2}
            imageClassName="aspect-[3/4]"
            position="50% 40%"
          />
          {/* Official logo, used as a sticker. */}
          <div className="absolute -right-1 -bottom-8 w-32 rotate-[8deg] overflow-hidden rounded-full bg-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] sm:-right-12 sm:w-40">
            <Image
              src={IMG.logoBadge.src}
              alt={IMG.logoBadge.alt}
              width={IMG.logoBadge.width}
              height={IMG.logoBadge.height}
              sizes="160px"
              className="h-auto w-full scale-110"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow className="mb-6">What is Nooms?</Eyebrow>
            <h2 className="display h-section text-balance">
              Say it out loud. <em>Nooms.</em> Already hungry.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="lead mt-8 max-w-xl space-y-5 text-pretty">
              <p>
                Nooms Foods is a shawarma-and-burgers spot on Shahrah-e-Faisal in IBEX, Karachi. The
                sign is black, glowing, with a pair of yellow eyes and a very cheeky tongue, which
                tells you most of what you need to know.
              </p>
              <p>
                We cook shawarma, stack burgers, load fries and plate up pasta. Sit down, take it to
                go, or have it come to you.
              </p>
            </div>
            <p className="display mt-8 text-2xl text-yellow-soft italic sm:text-3xl">
              {SITE.signTagline}.
            </p>
            <Link
              href="/story"
              className="group mt-8 inline-flex items-center gap-3 text-[0.78rem] font-bold tracking-[0.16em] uppercase transition-colors hover:text-yellow"
            >
              Read our story
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
