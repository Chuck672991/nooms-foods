import type { HomeContent } from "@/restaurants/types";
import { container, sectionY } from "@/lib/utils";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Bordered stat card (2×2 on phones, 4 across on desktop). Numeric values
 * count up when scrolled into view; text values render as-is. Only put
 * verified figures in the config.
 */
export function StatBand({ content }: { content: HomeContent["stats"] }) {
  return (
    <section className={`${sectionY} section-tint cv-section`}>
      <div className={container}>
        <Reveal>
          <SectionHeading align="center" eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        <Reveal delay={120}>
          <dl className="mx-auto mt-16 grid max-w-6xl grid-cols-2 overflow-hidden rounded-card border border-foreground/15 bg-background lg:grid-cols-4">
            {content.items.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-14 ${
                  i % 2 === 1 ? "border-l border-foreground/15" : ""
                } ${i > 0 ? "lg:border-l lg:border-foreground/15" : ""} ${
                  i > 1 ? "border-t border-foreground/15 lg:border-t-0" : ""
                }`}
              >
                {/* DOM order is label → value → note; `order` sets the visual stack. */}
                <dt className="order-2 mt-5 text-[0.72rem] font-bold tracking-[0.18em] text-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="display order-1 text-[clamp(2.6rem,5.5vw,4.75rem)] leading-none font-[560] tracking-tight text-accent tabular-nums">
                  {stat.value.kind === "count" ? (
                    <CountUp
                      to={stat.value.to}
                      prefix={stat.value.prefix}
                      suffix={stat.value.suffix}
                      delay={i * 150}
                    />
                  ) : (
                    stat.value.text
                  )}
                </dd>
                {stat.note ? <dd className="order-3 mt-1.5 text-sm text-foreground/60">{stat.note}</dd> : null}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
