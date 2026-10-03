import { Marquee } from "./Marquee";
import { Spark } from "./Icons";

/**
 * Full-width yellow band of brand words/phrases separated by sparks,
 * scrolling in a loop. Used on the homepage (single words) and the story
 * page (phrases).
 */
export function KeywordRibbon({
  items,
  duration = 38,
  reverse = false,
}: {
  items: readonly string[];
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden bg-[linear-gradient(90deg,#ffc91f_0%,#ffe48a_50%,#ffc91f_100%)] py-5 text-on-yellow">
      <Marquee duration={duration} reverse={reverse}>
        {items.map((item) => (
          <span
            key={item}
            className="display flex shrink-0 items-center text-xl font-[620] tracking-wide whitespace-nowrap uppercase sm:text-2xl"
          >
            {item}
            <Spark className="mx-8 h-4 w-4 opacity-80" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
