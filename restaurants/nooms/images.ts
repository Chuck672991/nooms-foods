import type { Img } from "../types";

/**
 * Nooms Foods image library. Files live in /public/restaurants/nooms/.
 *
 * NOTE ON RESOLUTION: the supplied photos are small listing thumbnails
 * (originals are 145–289px wide; these are 2× resampled copies, originals in
 * /assets-source/nooms/original). The template shows them as framed prints and
 * uses blurred versions only as atmospheric backdrops. Swap in full-resolution
 * photography here and every page picks it up.
 */
const BASE = "/restaurants/nooms";

const img = (path: string, width: number, height: number, alt: string): Img => ({
  src: `${BASE}/${path}`,
  width,
  height,
  alt,
});

export const images = {
  storefrontNight: img(
    "storefront/night.jpg",
    578,
    624,
    "The Nooms Foods storefront at night, with its black sign, white lettering, yellow eyes mark and a lit counter below",
  ),
  storefrontDay: img(
    "storefront/day.jpg",
    486,
    812,
    "The Nooms Foods storefront by day, with a team member standing beside the counter",
  ),
  burger: img(
    "food/burger.jpg",
    578,
    312,
    "A hand holding a paper-wrapped burger with a thick patty, melted cheese and sauce",
  ),
  loadedTrayBeef: img(
    "food/loaded-tray-beef.jpg",
    486,
    608,
    "A foil tray of seasoned meat under melted cheese, with fries on plates beside it",
  ),
  loadedTrayForks: img(
    "food/loaded-tray-forks.jpg",
    486,
    608,
    "A foil tray topped with melted cheese, olives and jalapeños, with plastic forks standing in it",
  ),
  cheesyPlate: img(
    "food/cheesy-plate.jpg",
    486,
    488,
    "A black plate of golden melted cheese with jalapeño slices and a fork resting at the edge",
  ),
  menuBoard: img(
    "boards/menu-board.jpg",
    290,
    312,
    "A photo of the printed menu board with a pasta dish and a Super Delicious burger and wrap poster",
  ),
  dealsBoard: img(
    "boards/deals-board.jpg",
    290,
    312,
    "The deals board listing Deal 1 through Deal 8 on yellow cards",
  ),
  logoBadge: img(
    "logo/badge.jpg",
    720,
    704,
    "Nooms Food logo: a shawarma turning on a skewer over flames above the words Nooms Food and Shawarma on Fire",
  ),
  logoMark: img("logo/mark.jpg", 200, 200, "Nooms Foods logo mark"),
  ogImage: img("seo/og.jpg", 1200, 630, "Nooms Food logo on a glowing blurred storefront"),
} as const satisfies Record<string, Img>;
