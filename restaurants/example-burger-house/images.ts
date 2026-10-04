import type { Img } from "../types";

/**
 * Image library. Files live in /public/restaurants/example-burger-house/.
 * These are labelled PLACEHOLDERS: replace the files (keep or update the
 * sizes) with the restaurant's real photography and logo.
 */
const BASE = "/restaurants/example-burger-house";

const img = (path: string, width: number, height: number, alt: string): Img => ({
  src: `${BASE}/${path}`,
  width,
  height,
  alt,
});

export const images = {
  hero: img("hero/hero.jpg", 1600, 1000, "Placeholder hero photo"),
  heroWide: img("hero/card-wide.jpg", 900, 600, "Placeholder landscape photo"),
  heroTall: img("hero/card-tall.jpg", 800, 1000, "Placeholder portrait photo"),
  burgerClassic: img("food/burger-classic.jpg", 800, 1000, "Placeholder photo of the classic burger"),
  burgerDouble: img("food/burger-double.jpg", 800, 1000, "Placeholder photo of the double burger"),
  burgerChicken: img("food/burger-chicken.jpg", 800, 1000, "Placeholder photo of the chicken burger"),
  fries: img("food/fries.jpg", 800, 1000, "Placeholder photo of fries"),
  onionRings: img("food/onion-rings.jpg", 800, 1000, "Placeholder photo of onion rings"),
  shakeVanilla: img("food/shake-vanilla.jpg", 800, 1000, "Placeholder photo of a vanilla shake"),
  shakeChocolate: img("food/shake-chocolate.jpg", 800, 1000, "Placeholder photo of a chocolate shake"),
  room1: img("interior/room-1.jpg", 800, 1000, "Placeholder photo of the dining room"),
  room2: img("interior/room-2.jpg", 800, 1000, "Placeholder photo of the counter"),
  storefront: img("interior/storefront.jpg", 900, 1100, "Placeholder photo of the storefront"),
  logoMark: img("logo/mark.png", 200, 200, "Example Burger House logo mark"),
  logoBadge: img("logo/badge.png", 600, 600, "Example Burger House logo"),
  ogImage: img("seo/og.jpg", 1200, 630, "Example Burger House"),
} as const satisfies Record<string, Img>;
