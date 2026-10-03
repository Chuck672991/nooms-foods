import type { ReactNode } from "react";
import { container, sectionY } from "@/lib/utils";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Every figure here is a verified fact (services listed on the official
 * Instagram, the owner's indicative price range, the opening time in the
 * Instagram bio). No ratings, review counts or dish counts are shown: none
 * could be verified.
 */
const STATS: { value: ReactNode; label: string; note: string }[] = [
  { value: <CountUp to={3} />, label: "Ways to eat", note: "Dine in, takeaway, home" },
  {
    value: <CountUp to={1000} prefix="≤ " delay={150} />,
    label: "PKR per person",
    note: "Typical spend",
  },
  { value: <CountUp to={5} suffix=" PM" delay={300} />, label: "Doors open", note: "Till midnight" },
  { value: "∞", label: "Napkins", note: "Strongly recommended" },
];

export function StatBand() {
  return (
    <section className={`${sectionY} bg-ink-800`}>
      <div className={container}>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="The numbers"
            title={
              <>
                Nooms, <em>by the numbers.</em>
              </>
            }
          />
        </Reveal>

        <Reveal delay={120}>
          <dl className="mx-auto mt-16 grid max-w-6xl grid-cols-2 overflow-hidden rounded-card border border-cream/15 bg-ink-900 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-14 ${
                  i % 2 === 1 ? "border-l border-cream/15" : ""
                } ${i > 0 ? "lg:border-l lg:border-cream/15" : ""} ${
                  i > 1 ? "border-t border-cream/15 lg:border-t-0" : ""
                }`}
              >
                {/* DOM order is label → value → note; `order` sets the visual stack. */}
                <dt className="order-2 mt-5 text-[0.72rem] font-bold tracking-[0.18em] text-cream uppercase">
                  {stat.label}
                </dt>
                <dd className="display order-1 text-[clamp(2.6rem,5.5vw,4.75rem)] leading-none font-[560] tracking-tight text-yellow tabular-nums">
                  {stat.value}
                </dd>
                <dd className="order-3 mt-1.5 text-sm text-cream/60">{stat.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
