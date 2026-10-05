import { contain, pos } from "../helpers";
import type { HomeContent } from "../types";
import { address, foodpandaUrl, tiktokUrl, whatsappUrl } from "./brand";
import { images, nihariBowl } from "./images";

/**
 * Homepage copy and imagery (brief §4, §9). Copy is the brief's own bank where it
 * gave one; descriptions only say what each photo shows. Follower counts are the
 * brief's rounded figures: refresh them before launch (the brief gives no "as of" date).
 */
export const home: HomeContent = {
  hero: {
    eyebrow: "Jumma Gujjar Nihari",
    title: "Asli Zaiqa.\nAsli *Tarka.*",
    lead: "Slow-cooked beef nihari, finished with a sizzling pour of desi ghee. Liaquatabad, Karachi.",
    backdrop: pos(images.tarkaPots, "50% 40%"),
    cards: [pos(images.marrowBowl, "50% 90%"), pos(images.gheeTubs, "50% 40%")],
    scrollCue: "See the tarka",
    buttons: ["order", { action: "menu", variant: "outline" }],
    chip: "Liaquatabad, Karachi",
  },

  intro: {
    eyebrow: "What is Jumma Gujjar?",
    title: "Named for *Friday,* the nihari day.",
    paragraphs: [
      "Jumma means Friday, the day nihari is traditionally made and shared. Gujjar is the dairy-keeping community, and that is the other half of the name: desi ghee.",
      "We simmer beef nihari slow and finish every bowl with a sizzling pour of hot desi ghee, the tarka. A dairy family's desi ghee, now in a bowl of nihari.",
    ],
    photo: pos(images.dairySign, "50% 35%"),
    sticker: images.logoMark,
    link: { label: "Read our story", href: "/story" },
  },

  dishes: {
    title: "Hot, golden, *poured.*",
    link: { label: "View the gallery", href: "/gallery" },
    items: [
      pos(images.tarkaPots, "50% 32%"),
      nihariBowl,
      images.gheeTubs,
      pos(images.marrowBowl, "50% 22%"),
      pos(images.biryaniPlate, "50% 52%"),
      pos(images.pulaoPlates, "62% 50%"),
      pos(images.biryaniThali, "30% 55%"),
      images.lassiJug,
      pos(images.lassiPour, "40% 45%"),
      pos(images.milkBottles, "40% 50%"),
      pos(images.dairySign, "50% 30%"),
      contain(images.logoMark),
    ],
  },

  ribbon: [
    "Desi Ghee Tarka",
    "Nalli Nihari",
    "Maghaz Nihari",
    "Sheermal",
    "Lassi",
    "Liaquatabad",
    "Asli Zaiqa",
  ],

  cuisine: {
    eyebrow: "The Menu",
    title: "Pick your *bowl.*",
    lead: "Nihari, biryani and pulao, lassi and fresh milk. Tap a tile to jump straight to it on the menu.",
    allTile: { eyebrow: "Everything", label: "Full menu" },
  },

  // The brief's "tarka story" beats, word for word.
  kitchen: {
    eyebrow: "The tarka story",
    title: "The *tarka* is the whole point.",
    body: "A hot pour of desi ghee over the bowl, and the whole table leans in.",
    beats: [
      "Simmered overnight until the beef shank melts.",
      "Finished at the table with hot desi ghee.",
      "Best with fresh sheermal, khameeri roti and a cold lassi.",
    ],
    backdrop: pos(images.marrowBowl, "50% 75%"),
    card: { image: pos(images.tarkaPots, "50% 30%"), caption: "Flames over the clay pots" },
  },

  featured: {
    eyebrow: "The Signatures",
    title: "What to *order* first.",
    lead: "Desi Ghee Tarka Nihari leads. Nalli and maghaz are the other two names you'll hear about.",
    cards: [
      {
        tag: "Desi ghee",
        title: "Desi Ghee Tarka Nihari",
        titleUrdu: "دیسی گھی والی نہاری",
        description: "Slow-cooked beef nihari finished with a sizzling desi ghee tarka.",
        image: pos(images.tarkaPots, "50% 30%"),
        href: "/menu#nihari",
      },
      {
        tag: "Bone marrow",
        title: "Nalli Nihari",
        titleUrdu: "نلی نہاری",
        description: "Rich nihari with succulent bone marrow.",
        image: pos(images.marrowBowl, "50% 35%"),
        href: "/menu#nihari",
      },
      {
        tag: "Brain",
        title: "Maghaz Nihari",
        titleUrdu: "مغز نہاری",
        description: "Nihari enriched with delicate brain.",
        image: nihariBowl,
        href: "/menu#nihari",
      },
    ],
  },

  // Verified facts only: five nihari items on the menu, one signature, and the
  // brief's rounded follower counts. [CONFIRM] refresh the counts before launch.
  stats: {
    eyebrow: "In numbers",
    title: "Jumma Gujjar, *in numbers.*",
    items: [
      {
        label: "Nihari styles",
        note: "Desi ghee, nalli, maghaz, special, classic",
        value: { kind: "count", to: 5 },
      },
      {
        label: "Signature bowl",
        note: "Desi Ghee ka Tarka Nihari",
        value: { kind: "count", to: 1 },
      },
      {
        label: "On Facebook",
        note: "Page followers",
        value: { kind: "count", to: 32, suffix: "K+" },
      },
      {
        label: "On Instagram",
        note: "Followers, rounded",
        value: { kind: "count", to: 3, suffix: "K+" },
      },
    ],
  },

  place: {
    eyebrow: "Visit us",
    title: "Come hungry. Sit outside. Watch the *tarka.*",
    paragraphs: [
      "Pull up a seat inside or outside. We have dine-in and outdoor seating, and the tarka is poured at the table where you can see it.",
      `We're in ${address.area}, Karachi. Message us on WhatsApp before a special trip for today's timings.`,
    ],
    photos: [
      { image: pos(images.dairySign, "50% 35%"), caption: "Jumma Gujjar Dairy, after dark" },
      { image: pos(images.tarkaPots, "50% 22%"), caption: "The tarka, in the flame" },
    ],
    button: "visit",
  },

  follow: {
    eyebrow: "Stay in the loop",
    title: "Follow the *tarka.*",
    lead: "Fresh videos and what's on the pot. Find us on Facebook, Instagram and TikTok.",
    backdrop: pos(images.marrowBowl, "50% 70%"),
  },

  split: {
    eyebrow: "Order",
    title: "Two ways to get *your bowl.*",
    cards: [
      {
        eyebrow: "Fastest",
        title: "Order on *WhatsApp*",
        copy: "Tap to open WhatsApp with your order message ready, then tell us what you'd like.",
        href: whatsappUrl,
        external: true,
        actionLabel: "Open WhatsApp",
        icon: "whatsapp",
      },
      {
        eyebrow: "Delivery",
        title: "Order on *Foodpanda*",
        copy: "Prefer an app? Find Jumma Gujjar Nihari on Foodpanda.",
        href: foodpandaUrl,
        external: true,
        actionLabel: "Open Foodpanda",
        icon: "bag",
      },
    ],
  },

  /**
   * The promo reels. Clips are web-sized copies of the owner's TikToks in
   * public/restaurants/jumma-gujjar/videos (originals untouched). Credit is
   * burned into every clip by TikTok and repeated under each reel.
   * [CONFIRM] that @jummagujjar416 is the official account; [CONFIRM] permission
   * from @sultanleonet to show their clip, or remove it.
   */
  reels: {
    eyebrow: "On camera",
    title: "Watch the *tarka.*",
    lead: "Short clips from the pot, the dairy and the table. Tap a reel to bring it forward, then turn the sound on.",
    marquee: ["Watch the tarka", "Asli zaiqa", "Desi ghee", "Nihari"],
    soundHint: "Watch with sound",
    items: [
      {
        id: "dairy",
        kicker: "The dairy",
        title: "Jumma Gujjar Dairy",
        caption: "Lassi, fresh milk and desi ghee, sold under the same name.",
        video: { src: "/restaurants/jumma-gujjar/optimized/reel-dairy-promo.mp4", poster: images.posterDairy },
        duration: "0:53",
        credit: { label: "@jummagujjar416 on TikTok", href: tiktokUrl },
      },
      {
        id: "tarka",
        kicker: "The tarka",
        title: "Nihari off the flame",
        caption: "Roaring flames, steaming bowls and Special Nihari on a busy night.",
        video: { src: "/restaurants/jumma-gujjar/optimized/reel-tarka.mp4", poster: images.posterTarka },
        duration: "0:47",
        credit: { label: "Video by @sultanleonet on TikTok", href: "https://www.tiktok.com/@sultanleonet" },
      },
      {
        id: "table",
        kicker: "At the table",
        title: "Sit down, dig in",
        caption: "Bowls of nihari carried out to the outdoor tables.",
        video: { src: "/restaurants/jumma-gujjar/optimized/reel-serving.mp4", poster: images.posterServing },
        duration: "0:32",
        credit: { label: "@jummagujjar416 on TikTok", href: tiktokUrl },
      },
    ],
    youtube: {
      id: "tTw8k8Ld-7U",
      eyebrow: "As seen on YouTube",
      title: "Exploring hidden food points in Karachi",
      blurb:
        "Karachi food creator Saqib Mobeen's tour of hidden food points, including Jumma Gujjar Nihari in Liaquatabad. Tap play to watch it here.",
      credit: { label: "Video by Saqib Mobeen on YouTube", href: "https://www.youtube.com/@SaqibMobeen" },
    },
  },
};

