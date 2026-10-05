import type { RestaurantConfig } from "../types";
import { actions, contact, footer, identity, seo, social, theme } from "./brand";
import { contactPage } from "./contact-page";
import { gallery } from "./gallery";
import { home } from "./home";
import { menu } from "./menu";
import { story } from "./story";

/**
 * Jumma Gujjar Nihari: the template's second live restaurant (Karachi nihari house,
 * dark ember theme, Urdu + English, WhatsApp-first ordering, a promo-reels showcase).
 *
 *   brand.ts   identity, contact, hours, social, theme, SEO, footer
 *   images.ts  every photo/logo/poster (files in /public/restaurants/jumma-gujjar)
 *   fonts.ts   next/font loaders (Fraunces, DM Sans, Bebas Neue, Noto Nastaliq Urdu)
 *   home.ts · menu.ts · story.ts · gallery.ts · contact-page.ts
 *   assets-manifest.md   inventory of every asset, its role and its provenance
 *
 * No journal: omitted on purpose, so the nav link, routes and sitemap entries vanish.
 */
export const jummaGujjar: RestaurantConfig = {
  identity,
  contact,
  social,
  theme,
  actions,
  seo,
  footer,
  home,
  menu,
  story,
  gallery,
  contactPage,
};
