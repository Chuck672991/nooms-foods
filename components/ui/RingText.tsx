import { useId } from "react";

/**
 * Text set on a circle (SVG textPath), sized to fill it exactly. Spin it with
 * the `.ring-spin` utility. The phrase repeats with a dot between copies so a
 * short label still wraps the whole ring. Decorative: pair with a real label.
 */
export function RingText({ text, className = "" }: { text: string; className?: string }) {
  const id = `ring-${useId().replace(/:/g, "")}`;
  const unit = `${text.toUpperCase()} • `;
  const label = unit.repeat(Math.max(2, Math.ceil(34 / unit.length)));
  return (
    <svg viewBox="0 0 100 100" className={`ring-text ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <text>
        <textPath href={`#${id}`} textLength="237" lengthAdjust="spacing">
          {label}
        </textPath>
      </text>
    </svg>
  );
}
