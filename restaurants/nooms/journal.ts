import { pos } from "../helpers";
import type { JournalContent } from "../types";
import { address, hours, phone } from "./brand";
import { images } from "./images";

/**
 * Journal content. These two notes are written strictly from verified
 * business facts (address, hours, services, taglines): no invented
 * anecdotes, awards or claims. Replace or extend with the team's own
 * stories as they're written.
 */
export const journal: JournalContent = {
  hero: {
    eyebrow: "Notes from the counter",
    title: "Journal",
    lead: "Guides and notes from the Nooms Foods kitchen.",
    backdrop: pos(images.burger, "50% 45%"),
    card: { image: images.storefrontNight, caption: "Look for the glow" },
  },

  articles: [
    {
      slug: "find-nooms-foods-on-shahrah-e-faisal",
      title: "How to find us on Shahrah-e-Faisal",
      category: "Visit",
      readMinutes: 2,
      author: "The Nooms Foods team",
      excerpt:
        "Look for the glowing black-and-yellow sign, the eyes, the tongue and the line underneath.",
      metaDescription:
        "How to find Nooms Foods on Shahrah-e-Faisal in IBEX, Karachi: what the sign looks like, the Plus Code, and when we're open.",
      hero: pos(images.storefrontNight, "50% 30%"),
      body: [
        {
          type: "p",
          text: `Nooms Foods is at ${address.area}, on Shahrah-e-Faisal, in P.E.C.H.S. Block 2, Block A. If you're coming for the first time, here's how to spot us.`,
        },
        { type: "h2", text: "What to look for" },
        {
          type: "p",
          text: "After dark, the sign does the work: white lettering on black, a pair of yellow eyes with a cheeky tongue, and a yellow strip underneath that reads “Our taste is all it takes.” Below it you'll see the counter and the kitchen in plain view.",
        },
        { type: "quote", text: "Our taste is all it takes." },
        { type: "h2", text: "Put us in your map" },
        {
          type: "p",
          text: `Our Plus Code is ${address.plusCode}. Tap Get Directions anywhere on this site and Google Maps opens with Nooms Foods as the destination.`,
        },
        { type: "h2", text: "When to come" },
        {
          type: "p",
          text: `Our Instagram says we're open from ${hours.short}. Hours can vary by day, so if you're making a special trip, call ${phone.display} first.`,
        },
      ],
      signOff: "See you at the counter. — The Nooms Foods team",
    },
    {
      slug: "dine-in-takeaway-or-home",
      title: "Dine in, takeaway or home: three ways to get your Nooms",
      category: "Guide",
      readMinutes: 2,
      author: "The Nooms Foods team",
      excerpt:
        "However you like to eat, there's a way to get Nooms Foods. Here's how each one works.",
      metaDescription:
        "Nooms Foods in Karachi offers dine-in, takeaway and home delivery. Here's how to get in touch for each.",
      hero: pos(images.burger, "50% 40%"),
      body: [
        {
          type: "p",
          text: "Shawarma, burgers, loaded fries, pasta: however you like to eat them, there's a way to get Nooms Foods. Our official Instagram lists three.",
        },
        { type: "h2", text: "Dine in" },
        {
          type: "p",
          text: `Come to us on Shahrah-e-Faisal and eat in. We're at ${address.area}, and Get Directions will take you straight to the door.`,
        },
        { type: "h2", text: "Takeaway" },
        {
          type: "p",
          text: `Call ${phone.display} to ask about takeaway, then swing by and collect.`,
        },
        { type: "quote", text: "Shawarma on fire." },
        { type: "h2", text: "Home delivery" },
        {
          type: "p",
          text: `Our Instagram lists home delivery. Delivery areas and timings aren't published on this site, so call ${phone.display} and ask before you order.`,
        },
      ],
      signOff: "Hungry yet? — The Nooms Foods team",
    },
  ],

  moreHeading: "More from the *journal.*",

  cta: {
    eyebrow: "Hungry for the real thing?",
    title: "Come write your own *chapter.*",
    image: pos(images.loadedTrayBeef, "50% 40%"),
    buttons: ["visit", "menu"],
  },

  // The reference article ends without a CTA; every other page type has
  // one, so this is a deliberate improvement. Image defaults to the article's.
  articleCta: {
    eyebrow: "Hungry yet?",
    title: "Come and *taste it.*",
    body: `${address.area} · ${hours.short}`,
    buttons: ["visit", "menu"],
  },
};
