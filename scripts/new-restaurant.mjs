#!/usr/bin/env node
/**
 * Scaffold a new restaurant from the Example Burger House starter.
 *
 *   npm run new-restaurant -- <slug> "<Restaurant Name>"
 *
 *   npm run new-restaurant -- red-door-diner "Red Door Diner"
 *
 * Copies /restaurants/example-burger-house and /public/restaurants/example-burger-house,
 * renames slugs/paths/exports/name, and makes the new restaurant the active one by
 * rewriting /restaurants/active.ts. Then replace the placeholder content, theme and
 * images.
 */
import fs from "node:fs";
import path from "node:path";

const SRC = "example-burger-house";
const SRC_EXPORT = "exampleBurgerHouse";
const SRC_NAME = "Example Burger House";

const args = process.argv.slice(2);
const [slug, name] = args.filter((a) => !a.startsWith("--"));

const fail = (msg) => {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
};

if (!slug || !name) fail('Usage: npm run new-restaurant -- <slug> "<Restaurant Name>"');
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(`Slug must be lowercase-with-dashes, got "${slug}".`);

const root = process.cwd();
const cfgSrc = path.join(root, "restaurants", SRC);
const cfgDst = path.join(root, "restaurants", slug);
const pubSrc = path.join(root, "public", "restaurants", SRC);
const pubDst = path.join(root, "public", "restaurants", slug);
const activeFile = path.join(root, "restaurants", "active.ts");

for (const p of [cfgSrc, pubSrc, activeFile]) {
  if (!fs.existsSync(p)) fail(`Missing ${path.relative(root, p)}: run this from the project root.`);
}
for (const p of [cfgDst, pubDst]) {
  if (fs.existsSync(p)) fail(`${path.relative(root, p)} already exists.`);
}

const exportName = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const compact = slug.replace(/-/g, "");

fs.cpSync(cfgSrc, cfgDst, { recursive: true });
fs.cpSync(pubSrc, pubDst, { recursive: true });

// Rename everything that carries the starter's identity.
for (const file of fs.readdirSync(cfgDst).filter((f) => f.endsWith(".ts"))) {
  const full = path.join(cfgDst, file);
  const text = fs
    .readFileSync(full, "utf8")
    .replaceAll(`/restaurants/${SRC}`, `/restaurants/${slug}`)
    .replaceAll(SRC_EXPORT, exportName)
    .replaceAll(SRC_NAME, name)
    .replaceAll("exampleburgerhouse", compact)
    .replaceAll(SRC, slug);
  fs.writeFileSync(full, text);
}

// Make it the active restaurant (a plain import: only the active one is bundled).
fs.writeFileSync(
  activeFile,
  `import { ${exportName} } from "./${slug}";
import type { RestaurantConfig } from "./types";

/**
 * THE ONE LINE THAT SAYS WHICH RESTAURANT THIS SITE IS.
 *
 * Only /app and /lib import this. Shared components never do: they receive
 * what they render as props, so they cannot depend on a particular restaurant.
 *
 * It is a plain import (not a registry) on purpose: fonts and images are
 * resolved at build time, so only the active restaurant may enter the bundle.
 *
 * New restaurant:  npm run new-restaurant -- <slug> "<Name>"   (rewrites this file)
 * Switch manually: change the import and the assignment below.
 */
export const restaurant: RestaurantConfig = ${exportName};
`,
);

console.log(`
✓ Created "${name}" (${slug})

  config  restaurants/${slug}/
  assets  public/restaurants/${slug}/   (labelled PLACEHOLDERS: replace them)
  active  restaurants/active.ts now points at this restaurant: run \`npm run dev\`

Next, in restaurants/${slug}/:
  brand.ts       identity, address, hours, social, order/reserve actions, theme colours, SEO
  fonts.ts       typefaces (next/font)
  images.ts      point at your real images (and sizes)
  home.ts menu.ts story.ts gallery.ts contact-page.ts   copy + menu
  (add journal.ts if you want a Journal, then set \`journal\` in index.ts)

Then: npm run lint && npm run build
`);
