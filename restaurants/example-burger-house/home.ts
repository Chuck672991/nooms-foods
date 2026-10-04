import { pos } from "../helpers";
import type { HomeContent } from "../types";
import { bookUrl, orderUrl, address, hours } from "./brand";
import { images } from "./images";

export const home: HomeContent = {
  hero: {
    eyebrow: "Smashed daily",
    title: "Example\n*Burger House*",
    lead: "Smashed burgers, golden fries and thick shakes in downtown Springfield.",
    backdrop: images.hero,
    cards: [images.heroWide, images.heroTall],
    scrollCue: "Meet the menu",
    buttons: [{ action: "menu", variant: "outline" }, { action: "visit", variant: "primary" }],
  },

  intro: {
    eyebrow: "Who we are",
    title: "Burgers, *done properly.*",
    paragraphs: [
      "Example Burger House is a neighbourhood burger joint with a very hot griddle and very little patience for soggy buns.",
      "Come in for a booth and a shake, grab a bag to go, or order online and we'll have it ready when you arrive.",
    ],
    photo: images.room1,
    sticker: images.logoBadge,
    link: { label: "Our story", href: "/story" },
  },

  dishes: {
    title: "Stacked and *sizzling.*",
    link: { label: "See the gallery", href: "/gallery" },
    items: [
      images.burgerClassic,
      images.fries,
      images.burgerDouble,
      images.shakeChocolate,
      images.burgerChicken,
      images.onionRings,
    ],
  },

  ribbon: ["Burgers", "Fries", "Shakes", "Dine in", "Takeaway", "Order online"],

  cuisine: {
    eyebrow: "The Menu",
    title: "Pick your *stack.*",
    lead: "Burgers, sides and shakes. Tap a tile to jump straight to it.",
    allTile: { eyebrow: "Everything", label: "Full menu" },
  },

  kitchen: {
    eyebrow: "From the grill",
    title: "Smashed, seared, *served.*",
    body: "Fresh patties, a screaming-hot griddle and a toasted bun. That's the whole trick.",
    backdrop: images.burgerDouble,
    card: { image: images.burgerClassic, caption: "Straight off the griddle" },
  },

  // No `cards`: the featured grid is built from menu items flagged `featured`.
  featured: {
    eyebrow: "House favourites",
    title: "The ones people *come back for.*",
    lead: "Four plates that keep the griddle busy.",
  },

  stats: {
    eyebrow: "By the numbers",
    title: "Burger House, *in numbers.*",
    items: [
      { label: "Days a week", note: "We're open daily", value: { kind: "count", to: 7 } },
      { label: "Burgers", note: "On the menu", value: { kind: "count", to: 6 } },
      { label: "Shake flavours", note: "Thick enough for a spoon", value: { kind: "count", to: 4 } },
      { label: "Pickles", note: "Always extra", value: { kind: "text", text: "∞" } },
    ],
  },

  place: {
    eyebrow: "The room",
    title: "Come *hungry.*",
    paragraphs: [
      "Red booths, a long counter and an open griddle. Sit where you can watch the action.",
      `Find us at ${address.short} in ${address.area}. Open ${hours.short}.`,
    ],
    photos: [
      { image: images.room1, caption: "The dining room" },
      { image: pos(images.room2, "50% 40%"), caption: "The counter" },
    ],
    button: "visit",
  },

  follow: {
    eyebrow: "Follow along",
    title: "Seen on *social.*",
    lead: "New burgers, limited shakes and the occasional griddle video.",
    backdrop: images.burgerClassic,
  },

  split: {
    eyebrow: "Your table awaits",
    title: "Two ways to *eat with us.*",
    cards: [
      {
        eyebrow: "Dine in",
        title: "Book a booth",
        copy: "Reserve a table online and we'll have it ready when you walk in.",
        href: bookUrl,
        external: true,
        actionLabel: "Reserve a table",
        icon: "pin",
      },
      {
        eyebrow: "Takeaway",
        title: "Order online",
        copy: "Pick your burgers, choose a time, and collect at the counter.",
        href: orderUrl,
        external: true,
        actionLabel: "Order online",
        icon: "phone",
      },
    ],
  },
};
