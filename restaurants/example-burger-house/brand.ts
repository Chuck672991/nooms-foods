import { mapLinks } from "../helpers";
import type { Action, Address, Contact, FooterContent, Hours, Identity, Seo, SocialLink, Theme } from "../types";
import { fonts } from "./fonts";
import { images } from "./images";

/**
 * DEMO restaurant used to prove the template: red/white light theme, its own
 * fonts, an ordering + booking platform instead of phone/maps, a weekly hours
 * table, email, TikTok, and no Journal. All details are fictional
 * (555-01xx numbers and example.com are reserved for exactly this).
 */

export const phone = { display: "(555) 010-0199", e164: "+15550100199", note: "Questions and large groups" };
export const email = "hello@exampleburgerhouse.example";

export const address: Address = {
  area: "Downtown Springfield",
  lines: ["123 Sample Street", "Springfield, ST 00000", "United States"],
  street: "123 Sample Street, Springfield, ST 00000",
  short: "123 Sample Street",
  city: "Springfield",
  country: "United States",
  countryCode: "US",
  mapQuery: "123 Sample Street, Springfield",
};

export const maps = mapLinks(address.mapQuery);

export const hours: Hours = {
  headline: "Open daily, 11 AM till late",
  short: "11 AM till late",
  note: "Kitchen closes 30 minutes before close.",
  schedule: [
    {
      days: "Mon – Thu",
      hours: "11 AM – 10 PM",
      schema: { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "22:00" },
    },
    {
      days: "Fri – Sat",
      hours: "11 AM – 12 AM",
      schema: { dayOfWeek: ["Friday", "Saturday"], opens: "11:00", closes: "00:00" },
    },
    { days: "Sunday", hours: "12 PM – 9 PM", schema: { dayOfWeek: ["Sunday"], opens: "12:00", closes: "21:00" } },
  ],
};

export const instagramUrl = "https://www.instagram.com/exampleburgerhouse/";
export const tiktokUrl = "https://www.tiktok.com/@exampleburgerhouse";

export const social: SocialLink[] = [
  { platform: "instagram", href: instagramUrl, handle: "@exampleburgerhouse" },
  { platform: "tiktok", href: tiktokUrl, handle: "@exampleburgerhouse" },
];

// This restaurant HAS ordering and booking platforms, so the two conversion
// actions point at them instead of the phone and Google Maps.
export const orderUrl = "https://order.example.com/example-burger-house";
export const bookUrl = "https://book.example.com/example-burger-house";

export const actions: { order: Action; visit: Action } = {
  order: {
    label: "Order",
    longLabel: "Order online",
    href: orderUrl,
    external: true,
    destination: "online ordering",
  },
  visit: {
    label: "Reserve",
    longLabel: "Reserve a table",
    href: bookUrl,
    external: true,
    destination: "table booking",
  },
};

export const identity: Identity = {
  name: "Example Burger House",
  slug: "example-burger-house",
  tagline: "Smashed daily",
  motto: "Burgers, done properly",
  description:
    "Example Burger House serves smashed burgers, fries and thick shakes in downtown Springfield. Dine in, takeaway or order online.",
  cuisine: ["Burgers", "American"],
  services: ["Dine in", "Takeaway", "Online ordering"],
  priceNote: "Most burgers $9–14",
  logo: { mark: images.logoMark, badge: images.logoBadge },
};

export const contact: Contact = { phone, email, address, hours };

/** Red & white, LIGHT page with dark photo sections. */
export const theme: Theme = {
  mode: "light",
  colors: {
    background: "#ffffff",
    surface: "#fbf1ee",
    surfaceRaised: "#f1dfd9",
    foreground: "#1d1212",
    primary: "#c8102e",
    // Labels, icons and rules on the dark photo sections need a brighter red.
    primaryOnDeep: "#ff5468",
    // On a light page the soft tint must be darker than primary to stay legible…
    primarySoft: "#a50d26",
    // …but on dark photo sections it needs to be lighter.
    primarySoftOnDeep: "#ff8c9a",
    onPrimary: "#ffffff",
    secondary: "#f2a900",
    deep: "#1a0a0c",
    onDeep: "#fff7f5",
  },
  fonts: { display: fonts.display, body: fonts.body },
};

export const footer: FooterContent = {
  headline: "Smashed daily, *served hot.*",
  blurb: "Burgers, fries and thick shakes in downtown Springfield.",
};

export const seo: Seo = {
  siteUrl: "https://example-burger-house.example",
  defaultTitle: "Example Burger House | Smashed Burgers in Springfield",
  titleTemplate: "%s | Example Burger House",
  description: identity.description,
  keywords: ["burgers Springfield", "smash burger", "milkshakes", "Example Burger House"],
  locale: "en_US",
  ogImage: images.ogImage,
  icons: {
    favicon: "/restaurants/example-burger-house/seo/favicon.ico",
    icon: "/restaurants/example-burger-house/seo/icon.png",
    apple: "/restaurants/example-burger-house/seo/apple-icon.png",
  },
  pages: {
    home: {
      title: "Example Burger House | Smashed Burgers in Springfield",
      description: "Smashed burgers, fries and thick shakes in downtown Springfield. Dine in, takeaway or order online.",
    },
    menu: { title: "The Menu", description: "Burgers, sides and shakes at Example Burger House, Springfield." },
    story: { title: "Our Story", description: "How Example Burger House started smashing burgers in Springfield." },
    gallery: { title: "Gallery", description: "Photos from Example Burger House in downtown Springfield." },
    contact: { title: "Visit & Contact", description: "Find Example Burger House at 123 Sample Street, Springfield." },
  },
};
