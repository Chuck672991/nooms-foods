import { pos } from "../helpers";
import type { StoryContent } from "../types";
import { address, hours } from "./brand";
import { images } from "./images";

export const story: StoryContent = {
  hero: {
    eyebrow: "The name",
    title: "Our *Story*",
    lead: "Shawarma on fire, burgers stacked high and a sign you can't miss. Here's what Nooms Foods is about.",
    backdrop: pos(images.storefrontDay, "50% 35%"),
    card: { image: images.logoBadge, caption: "Shawarma on fire", aspect: "square" },
  },

  sections: [
    {
      eyebrow: "The name",
      title: "Say it. *Nooms.*",
      paragraphs: [
        "Nooms is the sound of a very satisfied mouth. We'll leave the official meaning to you, but the logo gives the game away: a pair of yellow eyes, a tongue out, and nothing on its mind but food.",
        "The other logo, the one with the flame, says it plainer still: *shawarma on fire.*",
      ],
      media: { kind: "circle", image: images.logoBadge },
    },
    {
      eyebrow: "The food",
      title: "Shawarma, burgers and *everything loaded.*",
      paragraphs: [
        "The menu is built around the things you crave in the evening: shawarma, burgers with a proper patty, fries buried under cheese, and pasta for when you want something different.",
        "[See what's on the menu](/menu), or call us for today's deals.",
      ],
      media: {
        kind: "duo",
        images: [pos(images.burger, "42% 50%"), pos(images.loadedTrayBeef, "50% 40%")],
      },
    },
    {
      eyebrow: "The craft",
      title: "Made in plain *view.*",
      paragraphs: [
        "Our counter opens onto the street, so you can see the team at work. There's no hiding place for a lazy plate, and that suits us fine.",
        "Walk up, watch, and order with your eyes.",
      ],
      media: { kind: "print", image: pos(images.storefrontDay, "50% 45%"), aspect: "portrait" },
    },
    {
      eyebrow: "The room",
      title: "A sign you can't *miss.*",
      paragraphs: [
        "Black front, glowing sign, yellow eyes. Inside it's casual: come as you are, sit down and dig in. Dine in, take it away, or have it brought home.",
        `We're on Shahrah-e-Faisal in ${address.area}, open ${hours.short}.`,
      ],
      media: { kind: "print", image: pos(images.storefrontNight, "50% 40%"), aspect: "tall" },
    },
  ],

  ribbon: [
    "Nooms is a place for shawarma",
    "for burgers",
    "for loaded fries",
    "for pasta",
    "for friends",
    "for late-evening hunger",
  ],

  cta: {
    eyebrow: "Let the story begin",
    title: "Join us on *Shahrah-e-Faisal.*",
    body: `${address.area} · ${hours.short}`,
    image: pos(images.storefrontNight, "50% 30%"),
    buttons: ["visit", "menu"],
  },
};
