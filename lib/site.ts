/**
 * Single source of truth for verified Nooms Foods business details.
 * Everything here comes from the owner-supplied brief or the official
 * Instagram / Facebook profiles. Do not add unverified claims here.
 */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** Set NEXT_PUBLIC_SITE_URL in production so canonicals and sitemap are correct. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

// Plus Code + city is the format Google Maps resolves reliably.
const MAP_QUERY = "V353+PFW Karachi, Pakistan";

export const SITE = {
  name: "Nooms Foods",
  tagline: "Shawarma on fire",
  signTagline: "Our taste is all it takes",
  description:
    "Nooms Foods serves shawarma, burgers, loaded fries and pasta on Shahrah-e-Faisal in IBEX, Karachi. Dine in, takeaway or home delivery.",
  phone: {
    display: "0304 3542289",
    e164: "+923043542289",
    href: "tel:+923043542289",
  },
  address: {
    area: "IBEX, Karachi",
    plusCode: "V353+PFW",
    lines: [
      "V353+PFW, Shahrah-e-Faisal",
      "P.E.C.H.S. Block 2, Block A",
      "Sindhi Muslim Cooperative Housing Society (SMCHS)",
      "Karachi, Pakistan",
    ],
    full: "V353+PFW, Shahrah-e-Faisal, P.E.C.H.S. Block 2, Block A, Sindhi Muslim Cooperative Housing Society (SMCHS), Karachi, Pakistan",
    street:
      "V353+PFW, Shahrah-e-Faisal, P.E.C.H.S. Block 2, Block A, Sindhi Muslim Cooperative Housing Society (SMCHS)",
  },
  directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`,
  mapOpenHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`,
  mapEmbedSrc: `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`,
  social: {
    instagram: {
      handle: "@nooomsfood",
      href: "https://www.instagram.com/nooomsfood/",
    },
    facebook: {
      handle: "Nooms Foods | Karachi",
      href: "https://www.facebook.com/noomshawarmahouse/",
      messenger: "https://m.me/noomshawarmahouse",
    },
  },
  /** From the official Instagram bio. Daily hours vary, so no weekly table. */
  hours: {
    summary: "5 PM till midnight",
    note: "Hours can vary by day. Call to confirm before a special trip.",
  },
  services: ["Dine in", "Takeaway", "Home delivery"],
  /** Indicative per-person spend from the owner's listing information. */
  priceNote: "Typically under PKR 1,000 per person",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/story" },
  { label: "The Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Journal", href: "/journal" },
  { label: "Visit & Contact", href: "/contact" },
] as const;
