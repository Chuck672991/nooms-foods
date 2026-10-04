import { contain, pos } from "../helpers";
import type { GalleryContent } from "../types";
import { images } from "./images";

// Captions describe what each photo shows; nothing more.
export const gallery: GalleryContent = {
  hero: {
    eyebrow: "A look around",
    title: "Gallery",
    lead: "Signs, plates and counters. A few snapshots from Nooms Foods.",
    backdrop: pos(images.loadedTrayForks, "50% 55%"),
    card: { image: images.cheesyPlate, caption: "Golden, bubbling cheese", aspect: "square" },
  },
  items: [
    { image: images.storefrontNight, caption: "The sign after dark" },
    { image: images.burger, caption: "Wrapped and ready to go" },
    { image: images.loadedTrayBeef, caption: "Loaded and cheesy" },
    { image: contain(images.logoBadge), caption: "Shawarma on fire" },
    { image: images.storefrontDay, caption: "By day, on Shahrah-e-Faisal" },
    { image: images.loadedTrayForks, caption: "Forks in the tray" },
    { image: images.dealsBoard, caption: "The deals board" },
    { image: images.cheesyPlate, caption: "Golden, bubbling cheese" },
    { image: images.menuBoard, caption: "The menu board" },
  ],
  followSuffix: "for the latest from the counter.",
  cta: {
    eyebrow: "Come and see",
    title: "Better in *person.*",
    body: "Photos only get you so far. Come and taste it.",
    image: pos(images.storefrontNight, "50% 30%"),
    buttons: ["visit", "order"],
  },
};
