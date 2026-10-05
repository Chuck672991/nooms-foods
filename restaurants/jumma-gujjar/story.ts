import { pos } from "../helpers";
import type { StoryContent } from "../types";
import { address, hours } from "./brand";
import { images } from "./images";

/**
 * Story (brief §1 + §9). Safe wording only: no founding year (1947 / 1996 / "4–5 years"
 * conflict, so none is printed) and no "from our own dairy farm" until the owner confirms.
 * "Simmered overnight" is the brief's own copy-bank line (reported by vloggers).
 */
export const story: StoryContent = {
  hero: {
    eyebrow: "Friday's dish",
    title: "Our *Story*",
    lead: "A dairy family's desi ghee, now in a bowl of nihari.",
    backdrop: pos(images.tarkaPots, "50% 40%"),
    card: { image: images.logoMark, caption: "Asli zaiqa, asli tarka", aspect: "square" },
  },

  sections: [
    {
      eyebrow: "The name",
      title: "Named for *Friday.*",
      paragraphs: [
        "Jumma means Friday, the day nihari is traditionally cooked and shared. Gujjar is the dairy-keeping community, which brings us to the other half of the name: desi ghee.",
        "So the name says it twice: a Friday dish, from a dairy family.",
      ],
      media: { kind: "circle", image: images.logoMark },
    },
    {
      eyebrow: "The pot",
      title: "Simmered *overnight.*",
      paragraphs: [
        "Simmered overnight until the beef shank melts. That is the whole method: a low fire, patience and a thick, savoury gravy.",
        "[See the nihari on the menu](/menu#nihari), from the classic bowl to Nalli and Maghaz.",
      ],
      media: { kind: "print", image: pos(images.marrowBowl, "50% 55%"), aspect: "portrait" },
    },
    {
      eyebrow: "The tarka",
      title: "Poured *hot.*",
      paragraphs: [
        "Finished at the table with hot desi ghee. The sizzle is the signal, and the smell does the rest.",
        "It's our signature: Desi Ghee ka Tarka Nihari.",
      ],
      media: { kind: "print", image: pos(images.tarkaPots, "50% 30%"), aspect: "tall" },
    },
    {
      eyebrow: "The dairy",
      title: "Desi ghee, *by the tub.*",
      paragraphs: [
        "Jumma Gujjar Dairy carries the same name, and its lassi and desi ghee are sold under it. You can see both in our reels.",
        `Best with fresh sheermal, khameeri roti and a cold lassi. Dine-in and outdoor seating in ${address.area}.`,
      ],
      media: { kind: "duo", images: [images.gheeTubs, images.lassiJug] },
    },
  ],

  ribbon: [
    "Simmered overnight",
    "Finished with desi ghee",
    "Poured at the table",
    "Sheermal, roti & lassi",
    "Liaquatabad, Karachi",
  ],

  cta: {
    eyebrow: "Join us",
    title: "Taste the *tarka.*",
    body: `${address.area} · ${hours.short}`,
    image: pos(images.tarkaPots, "50% 35%"),
    buttons: ["order", "visit"],
  },
};
