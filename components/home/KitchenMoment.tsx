import { IMG } from "@/lib/images";
import { container } from "@/lib/utils";
import { Backdrop } from "@/components/ui/Backdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Reveal } from "@/components/ui/Reveal";

/** "From Our Kitchen": immersive full-bleed food moment. */
export function KitchenMoment() {
  return (
    <section className="dots relative isolate overflow-hidden py-28 sm:py-36 lg:min-h-[92svh] lg:py-44">
      <Backdrop image={IMG.burger} position="50% 45%" blur={22} opacity={0.7} />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,5,5,0.85)_0%,rgba(5,5,5,0.35)_55%,rgba(5,5,5,0.6)_100%),linear-gradient(180deg,var(--color-ink-900)_0%,transparent_22%,transparent_78%,var(--color-ink-900)_100%)]"
        aria-hidden="true"
      />
      {/* Flame: the logo's orange, the one place it glows. */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_30%_105%,rgba(242,102,28,0.28),transparent_70%)]"
        aria-hidden="true"
      />
      <div className={`${container} grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]`}>
        <Reveal>
          <Eyebrow className="mb-6">From our kitchen</Eyebrow>
          <h2 className="display h-section max-w-2xl text-balance">
            Shawarma on <em>fire,</em> burgers stacked high.
          </h2>
          <p className="lead mt-8 max-w-lg text-pretty">
            Grill, spit, fryer and a lot of melted cheese. The good stuff, plated up and sent out hot.
          </p>
        </Reveal>

        <Reveal variant="image" delay={150} className="mx-auto w-full max-w-md lg:ml-auto">
          <PhotoCard
            image={IMG.burger}
            sizes="(min-width: 1024px) 448px, 90vw"
            rotate={3}
            imageClassName="aspect-[4/3]"
            caption="Hot, wrapped and ready to go"
          />
        </Reveal>
      </div>
    </section>
  );
}
