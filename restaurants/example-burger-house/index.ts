import type { RestaurantConfig } from "../types";
import { actions, contact, footer, identity, seo, social, theme } from "./brand";
import { contactPage } from "./contact-page";
import { gallery } from "./gallery";
import { home } from "./home";
import { menu } from "./menu";
import { story } from "./story";

/**
 * Example Burger House: a fictional second restaurant that proves the
 * template. It is also the STARTER for a real new restaurant:
 *
 *   npm run new-restaurant -- <slug> "<Restaurant Name>"
 *
 * which copies this folder (and its placeholder assets), renames everything and
 * points /restaurants/active.ts at the copy. Then replace the content, theme and
 * images. (`journal` is omitted on purpose: leave it out and the Journal
 * disappears from nav, routes and sitemap.)
 */
export const exampleBurgerHouse: RestaurantConfig = {
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
