import { directionsAction, mapLinks, whatsappAction } from "../helpers";
import type {
  Address,
  Contact,
  FooterContent,
  Hours,
  Identity,
  Seo,
  SocialLink,
  Theme,
} from "../types";
import { fonts } from "./fonts";
import { images } from "./images";

/**
 * Jumma Gujjar Nihari: identity, contact, social, theme and SEO.
 *
 * Source: JummaGujjar_DesignBrief.md. Anything marked [CONFIRM] there is either
 * left out or written so the UI stays honest until the owner answers (look for
 * "CONFIRM" comments below). Other files in this folder import these constants
 * so each fact is written once.
 */

// [CONFIRM] That this is also the WhatsApp number (it is the number on the Facebook page).
export const phone = {
  display: "0304 1300535",
  e164: "+923041300535",
  note: "Call or WhatsApp to order",
};

// [CONFIRM] Exact street address + Google Maps pin. Until then the search query is the
// name + area, which Maps resolves to the listing if one exists.
export const address: Address = {
  area: "B-1 Area, Liaquatabad",
  lines: ["B-1 Area, Liaquatabad", "Karachi, Pakistan"],
  street: "B-1 Area, Liaquatabad",
  short: "Karachi, Pakistan",
  city: "Karachi",
  country: "Pakistan",
  countryCode: "PK",
  mapQuery: "Jumma Gujjar Nihari, B-1 Area, Liaquatabad, Karachi, Pakistan",
};

export const maps = mapLinks(address.mapQuery);

// [CONFIRM] Opening hours. The Foodpanda listing says 09:00–24:00 but its address is in
// Korangi, so it is not trusted. No weekly table and no schema.org hours until confirmed.
export const hours: Hours = {
  headline: "Message or call for today's timings",
  short: "Call for timings",
  note: "Please check before a special trip.",
};

export const motto = "Asli zaiqa, asli tarka";

export const facebookUrl = "https://www.facebook.com/JummaGujjarNihari/";
export const instagramUrl = "https://www.instagram.com/jumma_gujjar_niharii/";
// [CONFIRM] TikTok handle: read off the watermark burned into the owner-supplied clips.
export const tiktokUrl = "https://www.tiktok.com/@jummagujjar416";
// [CONFIRM] Foodpanda listing: its address text says Korangi, not Liaquatabad (brief §7.1).
export const foodpandaUrl = "https://www.foodpanda.pk/restaurant/msp0/jumma-gujjar-nehari-and-sheermal-house";

export const social: SocialLink[] = [
  { platform: "facebook", href: facebookUrl, handle: "Jumma Gujjar Nihari" },
  { platform: "instagram", href: instagramUrl, handle: "@jumma_gujjar_niharii" },
  { platform: "tiktok", href: tiktokUrl, handle: "@jummagujjar416" },
];

const orderMessage = "Assalam o Alaikum, I'd like to order: ";
export const whatsappUrl = whatsappAction(phone, orderMessage).href;

export const actions = {
  // The brief's primary conversion: a gold "Order on WhatsApp" button on every page.
  order: whatsappAction(phone, orderMessage),
  visit: directionsAction(maps.directions),
  primary: "order" as const,
};

export const identity: Identity = {
  name: "Jumma Gujjar Nihari",
  nameUrdu: "جمعہ گجر نہاری",
  slug: "jumma-gujjar",
  tagline: "Asli zaiqa, asli tarka",
  motto,
  description:
    "Slow-cooked beef nihari finished with a sizzling desi ghee tarka. Nalli and maghaz nihari, fresh sheermal and lassi in Liaquatabad, Karachi.",
  cuisine: ["Pakistani", "Nihari"],
  services: ["Dine in", "Outdoor seating", "WhatsApp orders", "Foodpanda"],
  // Foodpanda prices are delivery prices; dine-in may differ.
  priceNote: "Menu prices are indicative and may differ for dine-in",
  logo: { mark: images.logoMark, badge: images.logoMark },
};

export const contact: Contact = { phone, address, hours };

/**
 * Palette (brief §3.2). The brief proposed #F5A623 gold and #C8281E red as
 * placeholders; the real values below were SAMPLED from the supplied logo
 * (logo/image.png): its yellow field is #FFCA08 and its calligraphy red is
 * #EA1A23. The red is deepened slightly (#D61A21) for fills so cream text on
 * it clears 4.5:1. The ember neutrals are the brief's own.
 */
export const theme: Theme = {
  mode: "dark",
  // Slow rising sparks instead of the default starfield: this is a fire-and-ghee brand.
  ambient: "embers",
  colors: {
    background: "#14100e",
    surface: "#1e1815",
    surfaceRaised: "#2a211c",
    foreground: "#fff3dc",
    primary: "#ffca08",
    primarySoft: "#ffe270",
    onPrimary: "#14100e",
    secondary: "#d61a21",
    deep: "#0b0807",
    onDeep: "#fff3dc",
  },
  fonts: {
    display: fonts.display,
    body: fonts.body,
    label: fonts.label,
    urdu: fonts.urdu,
  },
};

export const footer: FooterContent = {
  headline: "Asli zaiqa. Asli *tarka.*",
  blurb: "A dairy family's desi ghee, now in a bowl of nihari. B-1 Area, Liaquatabad, Karachi.",
};

export const seo: Seo = {
  // siteUrl: set when the domain is known (or use NEXT_PUBLIC_SITE_URL).
  defaultTitle: "Jumma Gujjar Nihari | Desi Ghee Tarka Nihari in Liaquatabad, Karachi",
  titleTemplate: "%s | Jumma Gujjar Nihari",
  description: identity.description,
  keywords: [
    "Jumma Gujjar Nihari",
    "desi ghee tarka nihari",
    "nihari Karachi",
    "nalli nihari",
    "maghaz nihari",
    "sheermal Karachi",
    "Liaquatabad food",
    "جمعہ گجر نہاری",
  ],
  locale: "en_PK",
  ogImage: images.ogImage,
  icons: {
    favicon: "/restaurants/jumma-gujjar/seo/favicon.ico",
    icon: "/restaurants/jumma-gujjar/seo/icon.png",
    apple: "/restaurants/jumma-gujjar/seo/apple-icon.png",
  },
  pages: {
    home: {
      title: "Jumma Gujjar Nihari | Desi Ghee Tarka Nihari in Liaquatabad, Karachi",
      description:
        "Slow-cooked beef nihari finished with a sizzling desi ghee tarka. Nalli and maghaz nihari, fresh sheermal and lassi. Liaquatabad, Karachi.",
    },
    menu: {
      title: "The Menu",
      description:
        "Desi ghee tarka nihari, nalli and maghaz nihari, sheermal, roti, curries, daal and lassi at Jumma Gujjar Nihari, Liaquatabad, Karachi.",
    },
    story: {
      title: "Our Story",
      description:
        "Jumma means Friday, Gujjar means dairy. The story of Jumma Gujjar Nihari: slow-cooked overnight, finished at the table with hot desi ghee.",
    },
    gallery: {
      title: "Gallery",
      description:
        "Flames, nihari bowls, tubs of desi ghee and lassi: photos from Jumma Gujjar Nihari in Liaquatabad, Karachi.",
    },
    contact: {
      title: "Visit & Order",
      description:
        "Find Jumma Gujjar Nihari in B-1 Area, Liaquatabad, Karachi. Order on WhatsApp or Foodpanda, call 0304 1300535, or get directions.",
    },
  },
};
