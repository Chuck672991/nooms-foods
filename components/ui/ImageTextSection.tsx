import type { ReactNode } from "react";
import { container } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/**
 * Zigzag narrative block: media on one side, eyebrow + heading (one italic
 * accent word) + copy on the other. `reverse` swaps the sides.
 */
export function ImageTextSection({
  eyebrow,
  title,
  children,
  media,
  reverse = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  media: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <div className={`${container} grid items-center gap-14 lg:grid-cols-2 lg:gap-24`}>
        <Reveal variant="image" className={`mx-auto w-full max-w-md ${reverse ? "lg:order-last" : ""}`}>
          {media}
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <h2 className="display h-section max-w-xl text-balance">{title}</h2>
          <div className="lead mt-8 max-w-xl space-y-5 text-pretty">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
