import { mapLinks } from "@/restaurants/helpers";
import type {
  Action,
  ButtonRef,
  FeaturedCard,
  Img,
  PageCta,
  RestaurantConfig,
  SocialLink,
  SocialPlatform,
} from "@/restaurants/types";

/**
 * Rendering-time helpers shared by every restaurant. They turn a
 * `RestaurantConfig` into what components need (nav, buttons, labels, URLs)
 * and contain no restaurant-specific data.
 */

export const PLATFORM_NAMES: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
  whatsapp: "WhatsApp",
};

/** "@handle" when the config gives one, otherwise the platform name. */
export const socialLabel = (s: SocialLink) => s.handle ?? PLATFORM_NAMES[s.platform];

/** Production origin: NEXT_PUBLIC_SITE_URL override → config → Vercel → localhost. */
export function siteUrl(r: RestaurantConfig): string {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    r.seo.siteUrl ??
    (vercel ? `https://${vercel}` : "http://localhost:3000")
  ).replace(/\/$/, "");
}

export type NavLink = { label: string; href: string };

/** Site map. The Journal only exists when the restaurant provides one. */
export function navLinks(r: RestaurantConfig): NavLink[] {
  return [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/story" },
    { label: "The Menu", href: "/menu" },
    { label: "Gallery", href: "/gallery" },
    ...(r.journal ? [{ label: "Journal", href: "/journal" }] : []),
    { label: "Visit & Contact", href: "/contact" },
  ];
}

export type ResolvedButton = Action & { variant: "primary" | "outline" };

const MENU_ACTION: Action = { label: "View the menu", href: "/menu", arrow: true };

/**
 * Turns the config's button references ("order", "visit", "menu" or custom)
 * into concrete buttons. Default styling: first primary, the rest outline.
 */
export function resolveButtons(refs: ButtonRef[], r: RestaurantConfig): ResolvedButton[] {
  return refs.map((ref, i) => {
    const spec = typeof ref === "string" ? { action: ref } : ref;
    const base: Action =
      spec.action === "order"
        ? r.actions.order
        : spec.action === "visit"
          ? r.actions.visit
          : spec.action === "menu"
            ? MENU_ACTION
            : spec.action;
    return {
      ...base,
      label: spec.label ?? base.longLabel ?? base.label,
      variant: spec.variant ?? (i === 0 ? "primary" : "outline"),
    };
  });
}

/** Props for <CTABanner> from a page's `cta` config (image falls back to `fallback`). */
export function ctaProps(cta: PageCta, fallback: Img, r: RestaurantConfig) {
  return {
    eyebrow: cta.eyebrow,
    title: cta.title,
    body: cta.body,
    image: cta.image ?? fallback,
    buttons: resolveButtons(cta.buttons, r),
  };
}

/** Homepage featured cards: editorial cards if provided, else featured menu items. */
export function featuredCards(r: RestaurantConfig): FeaturedCard[] {
  if (r.home.featured.cards) return r.home.featured.cards;
  const labels = new Map(r.menu.categories.map((c) => [c.id, c.label]));
  return r.menu.items
    .filter((item): item is typeof item & { image: Img } => Boolean(item.featured && item.image))
    .map((item) => ({
      tag: item.featuredTag ?? labels.get(item.category) ?? "",
      title: item.name,
      titleUrdu: item.nameUrdu,
      description: [item.description, item.price].filter(Boolean).join(" · "),
      image: item.image,
      href: `/menu#${item.category}`,
    }));
}

export { mapLinks };
