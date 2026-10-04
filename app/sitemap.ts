import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/restaurant";
import { restaurant } from "@/restaurants/active";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl(restaurant);
  const paths = ["", "/menu", "/story", "/gallery", ...(restaurant.journal ? ["/journal"] : []), "/contact"];
  const pages = paths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const articles = (restaurant.journal?.articles ?? []).map((a) => ({
    url: `${base}/journal/${a.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...pages, ...articles];
}
