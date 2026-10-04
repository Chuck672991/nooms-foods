import { contain, pos } from "../helpers";
import type { HomeContent } from "../types";
import { address, hours, identity, maps, phone } from "./brand";
import { images } from "./images";

/**
 * Homepage copy and imagery. Descriptions only say what each photo shows:
 * no ingredient, recipe or "best seller" claims. No ratings, review counts
 * or dish counts are shown because none could be verified.
 */
export const home: HomeContent = {
  hero: {
    eyebrow: identity.tagline,
    title: "Nooms\n*Foods*",
    lead: "Shawarma, burgers and loaded fries on Shahrah-e-Faisal, Karachi. Dine in, takeaway or home delivery.",
    backdrop: pos(images.storefrontNight, "50% 28%"),
    cards: [pos(images.burger, "50% 50%"), images.loadedTrayBeef],
    scrollCue: "See what's cooking",
    buttons: [
      { action: { label: "View menu", href: "/menu", arrow: true }, variant: "outline" },
      { action: "visit", variant: "primary" },
    ],
  },

  intro: {
    eyebrow: "What is Nooms?",
    title: "Say it out loud. *Nooms.* Already hungry.",
    paragraphs: [
      "Nooms Foods is a shawarma-and-burgers spot on Shahrah-e-Faisal in IBEX, Karachi. The sign is black, glowing, with a pair of yellow eyes and a very cheeky tongue, which tells you most of what you need to know.",
      "We cook shawarma, stack burgers, load fries and plate up pasta. Sit down, take it to go, or have it come to you.",
    ],
    photo: pos(images.storefrontDay, "50% 40%"),
    sticker: images.logoBadge,
    link: { label: "Read our story", href: "/story" },
  },

  dishes: {
    title: "Piled high, served *hot.*",
    link: { label: "View the full gallery", href: "/gallery" },
    items: [
      images.burger,
      pos(images.loadedTrayBeef, "50% 40%"),
      contain(images.logoBadge),
      pos(images.loadedTrayForks, "50% 60%"),
      images.cheesyPlate,
      pos(images.storefrontNight, "50% 22%"),
    ],
  },

  ribbon: [
    "Shawarma",
    "Burgers",
    "Loaded Fries",
    "Pasta",
    "Dine in",
    "Takeaway",
    "Home delivery",
    "Shawarma on fire",
  ],

  cuisine: {
    eyebrow: "The Cuisine",
    title: "Pick your *craving.*",
    lead: "Shawarma, burgers, loaded fries, pasta and deals. Tap a tile to jump straight to it on the menu.",
    allTile: { eyebrow: "Everything", label: "Full menu" },
  },

  kitchen: {
    eyebrow: "From our kitchen",
    title: "Shawarma on *fire,* burgers stacked high.",
    body: "Grill, spit, fryer and a lot of melted cheese. The good stuff, plated up and sent out hot.",
    backdrop: pos(images.burger, "50% 45%"),
    card: { image: images.burger, caption: "Hot, wrapped and ready to go" },
  },

  featured: {
    eyebrow: "The Signatures",
    title: "Plates that *speak for themselves.*",
    lead: "A look at what comes out of our kitchen. Call or drop by to ask what's on today.",
    // Editorial cards (tags are category labels, not endorsements).
    cards: [
      {
        tag: "Burgers",
        title: "Burgers, stacked high",
        description: "Thick patties, melted cheese and sauce, wrapped up and ready to go.",
        image: pos(images.burger, "42% 50%"),
      },
      {
        tag: "Loaded",
        title: "Loaded and cheesy",
        description: "A foil tray of meat under melted cheese, with fries on the side.",
        image: pos(images.loadedTrayBeef, "50% 40%"),
      },
      {
        tag: "To share",
        title: "Forks in the tray",
        description: "Cheese, olives and jalapeños. Bring friends and bring forks.",
        image: pos(images.loadedTrayForks, "50% 55%"),
      },
      {
        tag: "Melted",
        title: "Golden, bubbling cheese",
        description: "A black plate, a fork and a lot of melted cheese with jalapeño slices.",
        image: images.cheesyPlate,
      },
      {
        tag: "Shawarma",
        title: "Shawarma on fire",
        description: "The star of our logo and our tagline. Ask for it at the counter.",
        image: contain(images.logoBadge),
      },
    ],
  },

  // Every figure is a verified fact: services listed on the official
  // Instagram, the owner's indicative price range, the opening time in the bio.
  stats: {
    eyebrow: "The numbers",
    title: "Nooms, *by the numbers.*",
    items: [
      {
        label: "Ways to eat",
        note: "Dine in, takeaway, home",
        value: { kind: "count", to: 3 },
      },
      {
        label: "PKR per person",
        note: "Typical spend",
        value: { kind: "count", to: 1000, prefix: "≤ " },
      },
      {
        label: "Doors open",
        note: "Till midnight",
        value: { kind: "count", to: 5, suffix: " PM" },
      },
      { label: "Napkins", note: "Strongly recommended", value: { kind: "text", text: "∞" } },
    ],
  },

  place: {
    eyebrow: "The place",
    title: "Look for the *glow.*",
    paragraphs: [
      "You'll spot us by the sign: black and glowing, a pair of yellow eyes, a tongue sticking out. Underneath, a counter with the kitchen in plain view.",
      "Pull up a seat or take it to go. We're on Shahrah-e-Faisal in IBEX, Karachi, and it's easy to find once you know what to look for.",
    ],
    photos: [
      { image: images.storefrontNight, caption: "The sign after dark" },
      { image: pos(images.storefrontDay, "50% 30%"), caption: "By day" },
    ],
    button: "visit",
  },

  // Takes the slot of Qissa's Google-reviews band. No ratings or testimonials
  // exist to quote yet, so this points to the official channels instead.
  follow: {
    eyebrow: "Stay in the loop",
    title: "Follow the *fire.*",
    lead: "Hot plates, new drops and what's happening at the counter. Find us on Instagram and Facebook.",
    backdrop: pos(images.loadedTrayForks, "50% 55%"),
  },

  // Qissa's cards deep-link into booking/ordering platforms. Nooms has none,
  // so the cards go to the two verified channels: directions and phone.
  split: {
    eyebrow: "Your table awaits",
    title: "Two ways to *taste Nooms.*",
    cards: [
      {
        eyebrow: "Dine in",
        title: "Come to the counter",
        copy: `Find us on Shahrah-e-Faisal in ${address.area} and eat in. We're open ${hours.short}, though hours can vary by day.`,
        href: maps.directions,
        external: true,
        actionLabel: "Opens Google Maps",
        icon: "pin",
      },
      {
        eyebrow: "Takeaway & home delivery",
        title: "Order by phone",
        copy: `Call ${phone.display} for takeaway or home delivery. Ask about delivery areas and timing when you call.`,
        href: `tel:${phone.e164}`,
        actionLabel: `Call ${phone.display}`,
        icon: "phone",
      },
    ],
  },
};
