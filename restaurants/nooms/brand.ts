import { directionsAction, mapLinks, phoneAction } from "../helpers";
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
 * Nooms Foods: identity, contact, social, theme and SEO.
 * Verified facts only (owner brief + official Instagram/Facebook).
 * Other Nooms files import these constants so each fact is written once.
 */

export const phone = {
  display: "0304 3542289",
  e164: "+923043542289",
  note: "For takeaway, home delivery and questions",
};

export const address: Address = {
  area: "IBEX, Karachi",
  plusCode: "V353+PFW",
  lines: [
    "V353+PFW, Shahrah-e-Faisal",
    "P.E.C.H.S. Block 2, Block A",
    "Sindhi Muslim Cooperative Housing Society (SMCHS)",
    "Karachi, Pakistan",
  ],
  street:
    "V353+PFW, Shahrah-e-Faisal, P.E.C.H.S. Block 2, Block A, Sindhi Muslim Cooperative Housing Society (SMCHS)",
  short: "Shahrah-e-Faisal, P.E.C.H.S. Block 2",
  city: "Karachi",
  country: "Pakistan",
  countryCode: "PK",
  // Plus Code + city is the format Google Maps resolves reliably.
  mapQuery: "V353+PFW Karachi, Pakistan",
};

export const maps = mapLinks(address.mapQuery);

/** From the official Instagram bio. Daily hours vary, so no weekly table. */
export const hours: Hours = {
  headline: "Evenings, 5 PM till midnight",
  short: "5 PM till midnight",
  note: "Hours can vary by day. Call to confirm before a special trip.",
};

export const motto = "Our taste is all it takes";

export const instagramUrl = "https://www.instagram.com/nooomsfood/";
export const facebookUrl = "https://www.facebook.com/noomshawarmahouse/";
export const messengerUrl = "https://m.me/noomshawarmahouse";

export const social: SocialLink[] = [
  { platform: "instagram", href: instagramUrl, handle: "@nooomsfood" },
  { platform: "facebook", href: facebookUrl },
];

export const actions = {
  // No ordering platform exists yet: "Order" is a phone call.
  order: phoneAction(phone),
  // No reservation platform exists yet: "Visit" is Google Maps directions.
  visit: directionsAction(maps.directions),
};

export const identity: Identity = {
  name: "Nooms Foods",
  slug: "nooms",
  tagline: "Shawarma on fire",
  motto,
  description:
    "Nooms Foods serves shawarma, burgers, loaded fries and pasta on Shahrah-e-Faisal in IBEX, Karachi. Dine in, takeaway or home delivery.",
  cuisine: ["Shawarma", "Burgers", "Fast food"],
  services: ["Dine in", "Takeaway", "Home delivery"],
  // Indicative figure from the owner's listing information.
  priceNote: "Typically under PKR 1,000 per person",
  logo: { mark: images.logoMark, badge: images.logoBadge },
};

export const contact: Contact = { phone, address, hours };

/**
 * Palette sampled from the brand's own assets: black signage, white lettering,
 * the sign's yellow and the logo's flame orange.
 */
export const theme: Theme = {
  mode: "dark",
  colors: {
    background: "#0b0b0a",
    surface: "#131210",
    surfaceRaised: "#1c1a16",
    foreground: "#faf3e3",
    primary: "#ffc91f",
    primarySoft: "#ffe48a",
    onPrimary: "#171100",
    secondary: "#f2661c",
    deep: "#050505",
    onDeep: "#faf3e3",
  },
  fonts: {
    display: fonts.display,
    body: fonts.body,
    displayVariation: fonts.displayVariation,
    articleVariation: fonts.articleVariation,
  },
};

export const footer: FooterContent = {
  headline: "Shawarma on *fire.*",
  blurb: `${motto}. Shawarma, burgers, loaded fries and pasta in IBEX, Karachi.`,
};

export const seo: Seo = {
  // siteUrl: set when the domain is known (or use NEXT_PUBLIC_SITE_URL).
  defaultTitle: "Nooms Foods | Shawarma, Burgers & Loaded Fries in Karachi",
  titleTemplate: "%s | Nooms Foods",
  description: identity.description,
  keywords: [
    "Nooms Foods",
    "shawarma Karachi",
    "burgers Karachi",
    "loaded fries Karachi",
    "Shahrah-e-Faisal restaurant",
    "IBEX Karachi food",
  ],
  locale: "en_PK",
  ogImage: images.ogImage,
  icons: {
    favicon: "/restaurants/nooms/seo/favicon.ico",
    icon: "/restaurants/nooms/seo/icon.png",
    apple: "/restaurants/nooms/seo/apple-icon.png",
  },
  pages: {
    home: {
      title: "Nooms Foods | Shawarma, Burgers & Loaded Fries in Karachi",
      description:
        "Nooms Foods serves shawarma, burgers, loaded fries and pasta on Shahrah-e-Faisal in IBEX, Karachi. Dine in, takeaway or home delivery. Call 0304 3542289.",
    },
    menu: {
      title: "The Menu",
      description:
        "Shawarma, burgers, loaded fries, pasta and deals at Nooms Foods on Shahrah-e-Faisal, Karachi. Call 0304 3542289 for today's prices.",
    },
    story: {
      title: "Our Story",
      description:
        "The story behind Nooms Foods, a shawarma-and-burgers spot with a glowing sign on Shahrah-e-Faisal in IBEX, Karachi.",
    },
    gallery: {
      title: "Gallery",
      description:
        "Photos from Nooms Foods in IBEX, Karachi: the glowing sign, burgers, loaded fries and cheesy plates.",
    },
    journal: {
      title: "Journal",
      description:
        "Notes and guides from Nooms Foods in Karachi: how to find us on Shahrah-e-Faisal and how to dine in, take away or get delivery.",
    },
    contact: {
      title: "Visit & Contact",
      description:
        "Find Nooms Foods at IBEX on Shahrah-e-Faisal, Karachi. Call 0304 3542289, get directions, or message us on Instagram and Facebook.",
    },
  },
};
