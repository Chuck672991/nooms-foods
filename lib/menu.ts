import { IMG, type Img } from "./images";

/**
 * Menu content. ONLY items confirmed on Nooms Foods' official channels
 * (Instagram story highlights, menu boards, logo/tagline) are listed.
 * No prices are published because none could be verified: add `price`
 * (and optional `description` / `tags`) to an item and it renders
 * automatically in the right-aligned price slot.
 */

export type MenuItem = {
  name: string;
  description?: string;
  /** e.g. "PKR 450". Omit until verified. */
  price?: string;
  /** Dietary pills shown beside the name. */
  tags?: ("V" | "VG")[];
};

export type MenuCategory = {
  id: string;
  /** Short label for pills and tiles. */
  label: string;
  heading: string;
  tagline: string;
  blurb: string;
  photos: Img[];
  items: MenuItem[];
};

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "shawarma",
    label: "Shawarma",
    heading: "Shawarma",
    tagline: "straight off the spit",
    blurb: "The reason there's a flame on our logo.",
    photos: [IMG.logoBadge],
    items: [
      {
        name: "Shawarma",
        description: "The star of our logo and our tagline: shawarma on fire.",
      },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    heading: "Burgers",
    tagline: "stacked high",
    blurb:
      "Three burgers get a spot in our Instagram highlights. Here they are.",
    photos: [IMG.burger],
    items: [
      { name: "Beef Burger" },
      { name: "Mega Zinger" },
      { name: "Doppler Burger" },
    ],
  },
  {
    id: "loaded-fries",
    label: "Loaded Fries",
    heading: "Loaded Fries",
    tagline: "pile it on",
    blurb: "A regular in our Instagram highlights, and a favourite to share.",
    photos: [IMG.loadedTrayBeef, IMG.loadedTrayForks],
    items: [{ name: "Loaded Fries" }],
  },
  {
    id: "pasta",
    label: "Pasta",
    heading: "Pasta",
    tagline: "twirl and dig in",
    blurb: "Pasta sits on our menu board and in our Instagram highlights.",
    photos: [IMG.menuBoard],
    items: [{ name: "Pasta" }],
  },
  {
    id: "deals",
    label: "Deals",
    heading: "Deals",
    tagline: "pick a number",
    blurb:
      "Numbered deals are posted on our deals board, Deal 1 through Deal 8.",
    photos: [IMG.dealsBoard],
    items: [
      {
        name: "Deals 1–8",
        description: "Call for today's lineup and prices.",
      },
    ],
  },
];
