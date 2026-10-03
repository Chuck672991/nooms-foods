import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/journal";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/menu", "/story", "/gallery", "/journal", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const articles = ARTICLES.map((a) => ({
    url: `${SITE_URL}/journal/${a.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...pages, ...articles];
}
