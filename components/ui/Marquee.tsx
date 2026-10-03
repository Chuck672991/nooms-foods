import type { CSSProperties, ReactNode } from "react";

/**
 * Infinite horizontal loop in pure CSS. Content is rendered twice; the second
 * copy is aria-hidden so assistive tech reads it once. Pauses on hover/focus
 * and is disabled under prefers-reduced-motion (see globals.css).
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
  groupClassName = "",
}: {
  children: ReactNode;
  /** Seconds per full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  groupClassName?: string;
}) {
  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-direction": reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div className={`marquee ${className}`} style={style}>
      <div className={`marquee__group ${groupClassName}`}>{children}</div>
      <div className={`marquee__group ${groupClassName}`} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
