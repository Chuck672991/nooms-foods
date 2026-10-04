import { pos } from "../helpers";
import type { MenuContent } from "../types";
import { orderUrl } from "./brand";
import { images } from "./images";

export const menu: MenuContent = {
  hero: {
    eyebrow: "Dine in · Takeaway · Order online",
    title: "The Menu",
    lead: "Burgers, sides and shakes, all made to order.",
    backdrop: images.burgerDouble,
    card: { image: images.burgerClassic, caption: "The Classic" },
  },

  notice: "Allergies? [Email us](mailto:hello@exampleburgerhouse.example) before you order and we'll help.",

  navAction: { label: "Order online", href: orderUrl },

  categories: [
    {
      id: "burgers",
      label: "Burgers",
      heading: "Burgers",
      tagline: "smashed to order",
      blurb: "Every burger comes on a toasted bun with pickles and our house sauce.",
      image: images.burgerClassic,
      photos: [images.burgerClassic, images.burgerDouble],
    },
    {
      id: "sides",
      label: "Sides",
      heading: "Sides",
      tagline: "for the table",
      blurb: "Crisp, salted and made for sharing.",
      image: images.fries,
      photos: [images.fries, images.onionRings],
    },
    {
      id: "shakes",
      label: "Shakes",
      heading: "Shakes",
      tagline: "spoon required",
      blurb: "Hand-spun and thick enough to argue with a straw.",
      image: pos(images.shakeVanilla, "50% 40%"),
      photos: [images.shakeVanilla],
    },
  ],

  items: [
    {
      id: "classic",
      category: "burgers",
      name: "The Classic",
      description: "Single patty, American cheese, pickles, house sauce.",
      price: "$9",
      image: images.burgerClassic,
      featured: true,
    },
    {
      id: "double",
      category: "burgers",
      name: "The Double",
      description: "Two patties, double cheese, caramelised onions.",
      price: "$13",
      image: images.burgerDouble,
      featured: true,
      featuredTag: "Best seller",
    },
    {
      id: "crispy-chicken",
      category: "burgers",
      name: "Crispy Chicken",
      description: "Buttermilk-fried thigh, slaw, hot honey.",
      price: "$12",
      image: images.burgerChicken,
      featured: true,
    },
    {
      id: "garden",
      category: "burgers",
      name: "The Garden",
      description: "Smashed bean patty, avocado, tomato.",
      price: "$11",
      tags: ["V"],
    },
    { id: "fries", category: "sides", name: "Fries", description: "Skin-on, sea salt.", price: "$4", image: images.fries, featured: true },
    { id: "onion-rings", category: "sides", name: "Onion Rings", price: "$5" },
    { id: "slaw", category: "sides", name: "Slaw", price: "$3", tags: ["V"] },
    { id: "vanilla", category: "shakes", name: "Vanilla Bean", price: "$6", tags: ["V"] },
    { id: "chocolate", category: "shakes", name: "Chocolate", price: "$6", tags: ["V"] },
  ],

  cta: {
    eyebrow: "Hungry yet?",
    title: "Taste the *whole menu.*",
    body: "Order online for takeaway, or reserve a booth and eat in.",
    buttons: ["order", "visit"],
  },
};
