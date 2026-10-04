import { contain, pos } from "../helpers";
import type { MenuContent } from "../types";
import { instagramUrl, phone } from "./brand";
import { images } from "./images";

/**
 * Menu content. ONLY items confirmed on Nooms Foods' official channels
 * (Instagram story highlights, menu boards, logo/tagline) are listed.
 * No prices are published because none could be verified: add `price`
 * (and optional `description` / `tags`) to an item and it renders
 * automatically in the right-aligned price slot.
 */
export const menu: MenuContent = {
  hero: {
    eyebrow: "Dine in · Takeaway · Home delivery",
    title: "The Menu",
    lead: "Shawarma, burgers, loaded fries, pasta and deals. Here's what we're cooking in IBEX, Karachi.",
    backdrop: pos(images.burger, "50% 45%"),
    card: {
      image: pos(images.loadedTrayBeef, "50% 40%"),
      caption: "Loaded and cheesy",
    },
  },

  notice: `Prices and deals can change, so call [${phone.display}](tel:${phone.e164}) for today's lineup, or message us on [Instagram](${instagramUrl}).`,

  navAction: { label: "Call for prices", href: `tel:${phone.e164}`, icon: "phone" },

  categories: [
    {
      id: "shawarma",
      label: "Shawarma",
      heading: "Shawarma",
      tagline: "straight off the spit",
      blurb: "The reason there's a flame on our logo.",
      image: contain(pos(images.logoBadge, "50% 50%")),
      photos: [contain(images.logoBadge)],
    },
    {
      id: "burgers",
      label: "Burgers",
      heading: "Burgers",
      tagline: "stacked high",
      blurb: "Three burgers get a spot in our Instagram highlights. Here they are.",
      image: pos(images.burger, "50% 50%"),
      photos: [images.burger],
    },
    {
      id: "loaded-fries",
      label: "Loaded Fries",
      heading: "Loaded Fries",
      tagline: "pile it on",
      blurb: "A regular in our Instagram highlights, and a favourite to share.",
      image: pos(images.loadedTrayBeef, "50% 45%"),
      photos: [images.loadedTrayBeef, images.loadedTrayForks],
    },
    {
      id: "pasta",
      label: "Pasta",
      heading: "Pasta",
      tagline: "twirl and dig in",
      blurb: "Pasta sits on our menu board and in our Instagram highlights.",
      image: pos(images.menuBoard, "40% 18%"),
      photos: [pos(images.menuBoard, "40% 18%")],
    },
    {
      id: "deals",
      label: "Deals",
      heading: "Deals",
      tagline: "pick a number",
      blurb: "Numbered deals are posted on our deals board, Deal 1 through Deal 8.",
      image: pos(images.dealsBoard, "50% 30%"),
      photos: [images.dealsBoard],
    },
  ],

  items: [
    {
      id: "shawarma",
      category: "shawarma",
      name: "Shawarma",
      description: "The star of our logo and our tagline: shawarma on fire.",
    },
    { id: "beef-burger", category: "burgers", name: "Beef Burger" },
    { id: "mega-zinger", category: "burgers", name: "Mega Zinger" },
    { id: "doppler-burger", category: "burgers", name: "Doppler Burger" },
    { id: "loaded-fries", category: "loaded-fries", name: "Loaded Fries" },
    { id: "pasta", category: "pasta", name: "Pasta" },
    {
      id: "deals",
      category: "deals",
      name: "Deals 1–8",
      description: "Call for today's lineup and prices.",
    },
  ],

  cta: {
    eyebrow: "Hungry yet?",
    title: "Taste the *whole menu.*",
    body: "Call to order for takeaway or home delivery, or come and eat with us on Shahrah-e-Faisal.",
    image: pos(images.loadedTrayBeef, "50% 40%"),
    buttons: ["order", "visit"],
  },
};
