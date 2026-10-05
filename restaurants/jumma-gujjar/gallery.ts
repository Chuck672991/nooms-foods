import { pos } from "../helpers";
import type { GalleryContent } from "../types";
import { images } from "./images";

// Captions describe what each photo shows; nothing more. The two tin-pack images are
// renders supplied by the owner: [CONFIRM] the pack exists and is theirs, or remove them.
export const gallery: GalleryContent = {
  hero: {
    eyebrow: "A look around",
    title: "Gallery",
    lead: "Flames, bowls, tubs of ghee and the dairy sign. A few moments from Jumma Gujjar.",
    backdrop: pos(images.tarkaPots, "50% 38%"),
    card: { image: pos(images.marrowBowl, "50% 60%"), caption: "Nalli, up close", aspect: "square" },
  },
  items: [
    { image: images.tarkaPots, caption: "The tarka, in the flame" },
    { image: images.marrowBowl, caption: "Nalli over a bowl of nihari" },
    { image: images.dairySign, caption: "Jumma Gujjar Dairy, after dark" },
    { image: images.gheeTubs, caption: "Desi ghee, by the tub" },
    { image: images.biryaniPlate, caption: "Biryani, straight from the pot" },
    { image: images.biryaniThali, caption: "A thali with rice and bowls" },
    { image: images.pulaoPlates, caption: "Pulao and white rice" },
    { image: images.tinPack, caption: "The nihari tin pack" },
    { image: images.lassiPour, caption: "Lassi, thick and creamy" },
    { image: images.lassiJug, caption: "Lassi, poured" },
    { image: images.tinClose, caption: "The tin, up close" },
  ],
  followSuffix: "for the latest from the pot.",
  cta: {
    eyebrow: "Come and see",
    title: "Better with *the sizzle.*",
    body: "Photos only get you so far. Come and hear the tarka.",
    image: pos(images.marrowBowl, "50% 70%"),
    buttons: ["visit", "order"],
  },
};
