import { Figtree, Fraunces } from "next/font/google";

/**
 * Nooms typography. next/font loaders must be called at module scope with
 * literal options, so each restaurant keeps its own font file. The CSS
 * variable names are a contract with the shared stylesheet.
 */

// Display: a soft, warm serif with real italics (Qissa's light-serif +
// italic-accent move, re-voiced for a casual, playful brand).
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display-face",
  display: "swap",
});

// Body / labels / buttons: friendly geometric sans.
const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

export const fonts = {
  display,
  body,
  /** Fraunces' softness/wonk axes. */
  displayVariation: '"SOFT" 100, "WONK" 0',
  /** Article headings/quotes keep Fraunces' automatic "wonky" forms at large sizes. */
  articleVariation: '"SOFT" 100',
};
