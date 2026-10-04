import type { RestaurantConfig } from "../types";
import { actions, contact, footer, identity, seo, social, theme } from "./brand";
import { home } from "./home";
import { contactPage } from "./contact-page";
import { gallery } from "./gallery";
import { journal } from "./journal";
import { menu } from "./menu";
import { story } from "./story";

/**
 * Nooms Foods, the first restaurant on the template.
 *
 *   brand.ts   identity, contact, hours, social, theme, SEO, footer
 *   images.ts  every photo/logo (files in /public/restaurants/nooms)
 *   fonts.ts   next/font loaders
 *   home.ts · menu.ts · story.ts · gallery.ts · journal.ts · contact-page.ts
 */
export const nooms: RestaurantConfig = {
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
  journal,
};
