import { IMG, type Img } from "./images";
import { SITE } from "./site";

/**
 * Journal content. These two notes are written strictly from verified
 * business facts (address, hours, services, taglines): no invented
 * anecdotes, awards or claims. Replace or extend with the team's own
 * stories as they're written.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  category: string;
  readMinutes: number;
  author: string;
  excerpt: string;
  metaDescription: string;
  hero: Img;
  /** CSS object-position for the hero crop. */
  heroPosition?: string;
  body: ArticleBlock[];
  signOff: string;
};

export const ARTICLES: Article[] = [
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
    hero: IMG.storefrontNight,
    heroPosition: "50% 30%",
    body: [
      {
        type: "p",
        text: `Nooms Foods is at ${SITE.address.area}, on Shahrah-e-Faisal, in P.E.C.H.S. Block 2, Block A. If you're coming for the first time, here's how to spot us.`,
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
        text: `Our Plus Code is ${SITE.address.plusCode}. Tap Get Directions anywhere on this site and Google Maps opens with Nooms Foods as the destination.`,
      },
      { type: "h2", text: "When to come" },
      {
        type: "p",
        text: `Our Instagram says we're open from ${SITE.hours.summary}. Hours can vary by day, so if you're making a special trip, call ${SITE.phone.display} first.`,
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
    hero: IMG.burger,
    heroPosition: "50% 40%",
    body: [
      {
        type: "p",
        text: "Shawarma, burgers, loaded fries, pasta: however you like to eat them, there's a way to get Nooms Foods. Our official Instagram lists three.",
      },
      { type: "h2", text: "Dine in" },
      {
        type: "p",
        text: `Come to us on Shahrah-e-Faisal and eat in. We're at ${SITE.address.area}, and Get Directions will take you straight to the door.`,
      },
      { type: "h2", text: "Takeaway" },
      {
        type: "p",
        text: `Call ${SITE.phone.display} to ask about takeaway, then swing by and collect.`,
      },
      { type: "quote", text: "Shawarma on fire." },
      { type: "h2", text: "Home delivery" },
      {
        type: "p",
        text: `Our Instagram lists home delivery. Delivery areas and timings aren't published on this site, so call ${SITE.phone.display} and ask before you order.`,
      },
    ],
    signOff: "Hungry yet? — The Nooms Foods team",
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
