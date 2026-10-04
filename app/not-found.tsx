import type { Metadata } from "next";
import { Backdrop } from "@/components/ui/Backdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillButton } from "@/components/ui/PillButton";
import { restaurant } from "@/restaurants/active";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="scope-deep dots relative isolate flex min-h-svh items-center justify-center overflow-hidden px-5 pt-28 pb-20 text-center">
      <Backdrop image={restaurant.home.hero.backdrop} opacity={0.5} />
      <div className="scrim-hero absolute inset-0 -z-10" aria-hidden="true" />
      <div>
        <Eyebrow both className="mb-6">
          Error 404
        </Eyebrow>
        <h1 className="display h-page text-balance">
          This plate&apos;s <em>gone cold.</em>
        </h1>
        <p className="lead mx-auto mt-6 max-w-md text-pretty">
          We couldn&apos;t find that page. Let&apos;s get you back to the good stuff.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <PillButton href="/" arrow>
            Back home
          </PillButton>
          <PillButton href="/menu" variant="outline">
            View the menu
          </PillButton>
        </div>
      </div>
    </section>
  );
}
