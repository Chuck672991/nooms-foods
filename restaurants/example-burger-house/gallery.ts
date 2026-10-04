import type { GalleryContent } from "../types";
import { images } from "./images";

export const gallery: GalleryContent = {
  hero: {
    eyebrow: "A look around",
    title: "Gallery",
    lead: "Burgers, booths and the occasional shake.",
    backdrop: images.burgerClassic,
    card: { image: images.shakeChocolate, caption: "Chocolate shake" },
  },
  items: [
    { image: images.burgerClassic, caption: "The Classic" },
    { image: images.room1, caption: "The dining room" },
    { image: images.fries, caption: "Fries, always" },
    { image: images.shakeVanilla, caption: "Vanilla bean" },
    { image: images.burgerDouble, caption: "The Double" },
    { image: images.room2, caption: "The counter" },
  ],
  followSuffix: "for new burgers and limited shakes.",
  cta: {
    eyebrow: "Come and see",
    title: "Better in *person.*",
    body: "Photos only get you so far.",
    buttons: ["visit", "order"],
  },
};
