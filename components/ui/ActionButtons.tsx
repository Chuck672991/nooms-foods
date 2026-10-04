import type { ResolvedButton } from "@/lib/restaurant";
import { PillButton } from "./PillButton";

/** Renders resolved CTA buttons (see `resolveButtons`) as pills. */
export function ActionButtons({ buttons }: { buttons: ResolvedButton[] }) {
  return (
    <>
      {buttons.map((b) => (
        <PillButton
          key={`${b.href}-${b.label}`}
          href={b.href}
          variant={b.variant}
          external={b.external}
          destination={b.destination}
          arrow={b.arrow}
        >
          {b.label}
        </PillButton>
      ))}
    </>
  );
}
