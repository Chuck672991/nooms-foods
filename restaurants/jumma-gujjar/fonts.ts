import { Bebas_Neue, DM_Sans, Fraunces } from "next/font/google";
import localFont from "next/font/local";

/**
 * Jumma Gujjar typography (brief §3.3). next/font loaders must be called at
 * module scope with literal options. The CSS variable names are a contract
 * with the shared stylesheet.
 */

// Headings (Latin): a warm, heritage serif with real italics. Polish without luxury.
// Weight axis only: the SOFT/WONK/opsz axes would more than triple the download (263 KB vs 79 KB).
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

// Body / UI: clean and legible on a phone.
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

// Labels, badges, nav, buttons: street-signage energy. Uppercase and letter-spaced.
const label = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-label-face",
  display: "swap",
});

// Urdu name and calligraphy accents (Nastaliq needs a line-height of 2+; see `.urdu`).
// Noto Nastaliq Urdu (SIL OFL), weight 500, SUBSET to the letters the site actually uses:
// 61 KB instead of the 161 KB Arabic block. All shaping features are kept, so joins and
// marks still render; characters outside the subset fall back to the next font in the stack.
// After adding new Urdu text, regenerate (see assets-manifest.md):
//   python3 scripts/subset-font.py <NotoNastaliqUrdu-500 arabic .woff2> \
//     restaurants/jumma-gujjar/fonts/NotoNastaliqUrdu-500.subset.woff2 restaurants/jumma-gujjar
const urdu = localFont({
  src: "./fonts/NotoNastaliqUrdu-500.subset.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-urdu-face",
  display: "swap",
});

export const fonts = {
  display,
  body,
  label,
  urdu,
};
