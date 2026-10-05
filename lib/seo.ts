import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import type { RestaurantConfig, Seo } from "@/restaurants/types";
import { mapLinks, siteUrl } from "./restaurant";

/**
 * Everything the document head needs, derived from the active restaurant.
 * Nothing here names a particular restaurant.
 */

export function rootMetadata(r: RestaurantConfig): Metadata {
  const { seo, identity } = r;
  const og = {
    url: seo.ogImage.src,
    width: seo.ogImage.width,
    height: seo.ogImage.height,
    alt: seo.ogImage.alt,
  };
  return {
    metadataBase: new URL(siteUrl(r)),
    title: { default: seo.defaultTitle, template: seo.titleTemplate },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: identity.name,
    icons: {
      icon: [
        { url: seo.icons.favicon, sizes: "any" },
        { url: seo.icons.icon, type: "image/png" },
      ],
      apple: seo.icons.apple,
    },
    openGraph: {
      type: "website",
      siteName: identity.name,
      locale: seo.locale,
      title: seo.defaultTitle,
      description: seo.description,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title: `${identity.name} | ${identity.tagline}`,
      description: seo.description,
      images: [og.url],
    },
  };
}

export function rootViewport(r: RestaurantConfig): Viewport {
  return { themeColor: r.theme.colors.background, colorScheme: r.theme.mode };
}

/** Title (home is absolute; others use the template), description and canonical. */
export function pageMetadata(
  r: RestaurantConfig,
  page: keyof Seo["pages"],
  path: string,
): Metadata {
  const entry = r.seo.pages[page];
  return {
    title: page === "home" ? { absolute: entry?.title ?? r.seo.defaultTitle } : entry?.title,
    description: entry?.description ?? r.seo.description,
    alternates: { canonical: path },
  };
}

/** Theme tokens → CSS custom properties on <html>. */
export function themeStyle(r: RestaurantConfig): CSSProperties {
  const { colors, fonts } = r.theme;
  const vars: Record<string, string | undefined> = {
    "--background": colors.background,
    "--surface": colors.surface,
    "--surface-raised": colors.surfaceRaised,
    "--foreground": colors.foreground,
    "--primary": colors.primary,
    "--primary-on-deep": colors.primaryOnDeep,
    "--primary-soft": colors.primarySoft,
    "--primary-soft-on-deep": colors.primarySoftOnDeep,
    "--on-primary": colors.onPrimary,
    "--secondary": colors.secondary,
    "--deep": colors.deep,
    "--on-deep": colors.onDeep,
    "--display-variation": fonts.displayVariation,
    "--article-variation": fonts.articleVariation,
  };
  return Object.fromEntries(Object.entries(vars).filter(([, v]) => v !== undefined)) as CSSProperties;
}

/** schema.org Restaurant, limited to what the config actually states. */
export function restaurantJsonLd(r: RestaurantConfig) {
  const base = siteUrl(r);
  const { identity, contact, social, seo } = r;
  const schedule = contact.hours.schedule?.filter((e) => e.schema);
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${base}/#restaurant`,
    name: identity.name,
    url: base,
    description: identity.description,
    telephone: contact.phone.e164,
    ...(contact.email ? { email: contact.email } : {}),
    image: `${base}${r.home.hero.backdrop.src}`,
    logo: `${base}${(identity.logo.badge ?? identity.logo.mark).src}`,
    servesCuisine: identity.cuisine,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressCountry: contact.address.countryCode,
    },
    hasMap: mapLinks(contact.address.mapQuery).open,
    hasMenu: `${base}/menu`,
    sameAs: social.map((s) => s.href),
    ...(schedule?.length
      ? {
          openingHoursSpecification: schedule.map((e) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: e.schema!.dayOfWeek,
            opens: e.schema!.opens,
            closes: e.schema!.closes,
          })),
        }
      : {}),
    // Intentionally absent unless supplied: aggregateRating, geo, priceRange.
    ...(seo.keywords ? { keywords: seo.keywords.join(", ") } : {}),
  };
}
