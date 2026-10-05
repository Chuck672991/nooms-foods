import type { Img } from "../types";

/**
 * Jumma Gujjar image library. Originals live in /public/restaurants/jumma-gujjar/
 * (food/, logo/, videos/: untouched). Everything in /optimized is derived from
 * them by a script (see assets-manifest.md for how and why):
 *
 *  - photos: 2× Lanczos resamples (the supplied photos are small) and the two
 *    tin-pack renders with the generator's corner sparkle cropped off
 *  - stills: frames from the owner's own TikTok clips, cropped above the
 *    platform's burned-in watermark
 *  - reel posters + web-sized reel videos
 *
 * NOTE ON RESOLUTION: sources are 335–717px wide, so the template shows them as
 * framed prints and blurred backdrops. Swap in full-resolution photography here
 * and every page picks it up.
 */
const BASE = "/restaurants/jumma-gujjar";

const img = (path: string, width: number, height: number, alt: string): Img => ({
  src: `${BASE}/${path}`,
  width,
  height,
  alt,
});

export const images = {
  logoMark: img(
    "logo/image.png",
    447,
    447,
    "Jumma Gujjar Nihari logo: red Urdu calligraphy on a white sticker with a steaming pan, on a yellow square",
  ),

  tarkaPots: img(
    "optimized/tarka-pots.jpg",
    670,
    1194,
    "A cook in a white cap holds a pan of blazing flame over rows of clay pots filled with red nihari",
  ),
  marrowBowl: img(
    "optimized/marrow-bowl.jpg",
    670,
    1194,
    "A hand holds a piece of bone marrow above a steel bowl of red nihari garnished with ginger and green chilli",
  ),
  tinPack: img(
    "optimized/tin-pack.jpg",
    717,
    898,
    "A Jumma Gujjar Nihari tin pack, yellow and red with a bowl of nihari on the label, on a marble counter beside ginger, lime and coriander",
  ),
  tinClose: img(
    "optimized/tin-pack-close.jpg",
    764,
    966,
    "Close view of the yellow and red Jumma Gujjar Nihari tin and its label",
  ),
  dairySign: img(
    "optimized/dairy-sign.jpg",
    576,
    696,
    "The Jumma Gujjar Dairy storefront at night: red Urdu lettering on a lit white sign with green bunting beneath it",
  ),
  gheeTubs: img(
    "optimized/ghee-tubs.jpg",
    576,
    716,
    "A hand holds up stacked tubs of golden desi ghee with Jumma Gujjar Dairy labels",
  ),
  lassiJug: img(
    "optimized/lassi-jug.jpg",
    576,
    716,
    "A steel jug being tipped over steel glasses on a dark counter at the Jumma Gujjar Dairy lassi counter",
  ),

  // Reel posters (shown before and instead of playback).
  posterTarka: img(
    "optimized/poster-tarka.jpg",
    480,
    854,
    "Flames roaring under a row of pots of nihari",
  ),
  posterDairy: img(
    "optimized/poster-dairy-promo.jpg",
    480,
    854,
    "A smiling man in a white kameez with prayer beads sits under the caption Jumma Gujjar Dairy",
  ),
  posterServing: img(
    "optimized/poster-serving.jpg",
    480,
    854,
    "A server in a red shirt carries a steel tray of bowls and plates to the tables",
  ),

  ogImage: img(
    "seo/og.jpg",
    1200,
    630,
    "Jumma Gujjar Nihari logo beside the words Asli zaiqa, asli tarka, Liaquatabad Karachi",
  ),
} as const satisfies Record<string, Img>;

/** The bowl region of the nalli photo, with its own description (it shows no hand). */
export const nihariBowl: Img = {
  ...images.marrowBowl,
  position: "50% 94%",
  alt: "A steel bowl of red nihari garnished with ginger and green chilli",
};
