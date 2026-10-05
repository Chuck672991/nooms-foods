import type { CSSProperties } from "react";

/** Inline style that staggers a `.hero-rise` entrance animation. */
export const heroDelay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

/** Page container: 1600px max, responsive gutters (matches the reference grid). */
export const container = "mx-auto w-full max-w-page px-5 sm:px-8 lg:px-14";

/** Vertical rhythm for a homepage "chapter". */
export const sectionY = "py-24 sm:py-32 lg:py-40";

/** Sibling reveal stagger: 0.08s steps capped at 4 (the spec's d1–d4). */
export const stagger = (index: number) => Math.min(index, 4) * 80;
