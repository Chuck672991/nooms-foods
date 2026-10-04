import { Inter, Playfair_Display } from "next/font/google";

/**
 * Typography for this restaurant. next/font loaders must be called at module
 * scope with literal options; the CSS variable names are a contract with the
 * shared stylesheet ("--font-display-face" / "--font-body-face").
 */
const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

export const fonts = { display, body };
