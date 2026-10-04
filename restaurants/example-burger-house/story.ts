import { pos } from "../helpers";
import type { StoryContent } from "../types";
import { address, hours } from "./brand";
import { images } from "./images";

export const story: StoryContent = {
  hero: {
    eyebrow: "Our story",
    title: "Our *Story*",
    lead: "A hot griddle, a short menu and a lot of pickles.",
    backdrop: images.storefront,
    card: { image: images.logoBadge, caption: "Since day one", aspect: "square" },
  },
  sections: [
    {
      eyebrow: "The beginning",
      title: "One griddle, *one idea.*",
      paragraphs: [
        "We started with a single idea: a really good burger, made to order, nothing fancy.",
        "[See the menu](/menu) to find out what that turned into.",
      ],
      media: { kind: "circle", image: images.logoBadge },
    },
    {
      eyebrow: "The food",
      title: "Short menu, *big flavour.*",
      paragraphs: ["Six burgers, a few sides and thick shakes. We'd rather do a few things properly."],
      media: { kind: "duo", images: [images.burgerClassic, images.fries] },
    },
    {
      eyebrow: "The room",
      title: "Red booths and *a loud griddle.*",
      paragraphs: [
        "Come as you are, sit at the counter and watch the action.",
        `We're at ${address.short}, ${address.area}, open ${hours.short}.`,
      ],
      media: { kind: "print", image: pos(images.room1, "50% 40%"), aspect: "tall" },
    },
  ],
  ribbon: ["Burgers", "for lunch", "for dinner", "for late", "for sharing", "for you"],
  cta: {
    eyebrow: "Let the story begin",
    title: "Join us in *Springfield.*",
    body: `${address.area} · ${hours.short}`,
    buttons: ["visit", "menu"],
  },
};
