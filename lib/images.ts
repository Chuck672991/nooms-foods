/**
 * Asset registry. Every page pulls its imagery from here, so upgrading a
 * photo later means replacing one file/entry rather than editing sections.
 *
 * NOTE ON RESOLUTION: the supplied photos are small listing thumbnails
 * (originals are 145–289px wide; the files below are 2× resampled copies,
 * originals live in /assets-source/original). Layouts therefore show them at
 * card scale, and use heavily blurred versions only as atmospheric backdrops.
 * Swap in full-resolution photography and the layouts will take it as-is.
 */

export type Img = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const photo = (file: string, width: number, height: number, alt: string): Img => ({
  src: `/images/photos/${file}`,
  width,
  height,
  alt,
});

export const IMG = {
  storefrontNight: photo(
    "storefront-night.jpg",
    578,
    624,
    "The Nooms Foods storefront at night, with its black sign, white lettering, yellow eyes mark and a lit counter below",
  ),
  storefrontDay: photo(
    "storefront-day.jpg",
    486,
    812,
    "The Nooms Foods storefront by day, with a team member standing beside the counter",
  ),
  burger: photo(
    "burger-in-hand.jpg",
    578,
    312,
    "A hand holding a paper-wrapped burger with a thick patty, melted cheese and sauce",
  ),
  loadedTrayBeef: photo(
    "loaded-tray-beef.jpg",
    486,
    608,
    "A foil tray of seasoned meat under melted cheese, with fries on plates beside it",
  ),
  loadedTrayForks: photo(
    "loaded-tray-forks.jpg",
    486,
    608,
    "A foil tray topped with melted cheese, olives and jalapeños, with plastic forks standing in it",
  ),
  cheesyPlate: photo(
    "cheesy-plate.jpg",
    486,
    488,
    "A black plate of golden melted cheese with jalapeño slices and a fork resting at the edge",
  ),
  menuBoard: photo(
    "menu-board.jpg",
    290,
    312,
    "A photo of the printed menu board with a pasta dish and a Super Delicious burger and wrap poster",
  ),
  dealsBoard: photo(
    "deals-board.jpg",
    290,
    312,
    "The deals board listing Deal 1 through Deal 8 on yellow cards",
  ),
  logoBadge: {
    src: "/images/brand/logo-badge.jpg",
    width: 720,
    height: 704,
    alt: "Nooms Food logo: a shawarma turning on a skewer over flames above the words Nooms Food and Shawarma on Fire",
  },
  mark: {
    src: "/images/brand/mark.jpg",
    width: 200,
    height: 200,
    alt: "Nooms Foods logo mark",
  },
} as const satisfies Record<string, Img>;
