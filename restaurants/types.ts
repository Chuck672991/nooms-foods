/**
 * THE CONTRACT: everything that makes one restaurant's website different from
 * another's. Shared components (see /components, /app) read ONLY from a
 * `RestaurantConfig`; they contain no restaurant names, colours, copy,
 * prices or asset paths.
 *
 * To launch a new restaurant: copy /restaurants/example-burger-house, fill in
 * this shape (your editor will flag anything missing), then point
 * /restaurants/active.ts at it. See /README.md.
 */

// ───────────────────────────── Primitives ─────────────────────────────

/**
 * Lightweight inline markup used by every copy field typed `Rich`:
 *   *accent*        → italic accent word in the theme's soft primary colour
 *   [label](href)   → link (http(s) opens in a new tab, "/x" is internal, tel:/mailto: work)
 *   \n              → line break on phones only (a normal space on larger screens)
 */
export type Rich = string;

/** An image plus the presentation hints that belong to *that image*. */
export type Img = {
  /** Public path, e.g. "/restaurants/nooms/food/burger.jpg". */
  src: string;
  /** Intrinsic pixel size (used to reserve space and avoid layout shift). */
  width: number;
  height: number;
  /** Meaningful description for screen readers and SEO. */
  alt: string;
  /** CSS object-position for crops, e.g. "50% 30%". Default centre. */
  position?: string;
  /** "contain" for logo artwork (shown on a light tile). Default "cover". */
  fit?: "cover" | "contain";
};

/** What a `next/font` loader returns that we rely on. */
export type FontRef = { variable: string };

// ───────────────────────────── Theme ─────────────────────────────

/**
 * Semantic colour roles. Components say "use the primary colour", never
 * "use yellow". Any CSS colour string works.
 */
export type ThemeColors = {
  /** Page background. */
  background: string;
  /** Alternate section / card surface. */
  surface: string;
  /** Image placeholders and raised chips on a surface. */
  surfaceRaised: string;
  /** Body text on `background`. */
  foreground: string;
  /** Brand accent: CTAs, labels, rules, numerals. */
  primary: string;
  /** Optional: brighter/lighter primary to use for text, icons and rules on dark photo sections when `primary` is too dim there (typical on light themes). */
  primaryOnDeep?: string;
  /** Soft tint of the primary: italic heading words, hover fills. On light themes make it DARKER than primary for contrast. */
  primarySoft: string;
  /** Optional: soft tint to use on dark photo sections when it must differ from `primarySoft` (light themes). */
  primarySoftOnDeep?: string;
  /** Text/icons placed on a `primary` fill. */
  onPrimary: string;
  /** Secondary brand colour (used sparingly for glows). */
  secondary: string;
  /** Darkest tone: header, menu overlay, footer and the scrims over photos. */
  deep: string;
  /** Light text/frames used on `deep` and over photos. */
  onDeep: string;
};

export type Theme = {
  /** Is the page background dark or light? Drives colour-scheme and hero fades. */
  mode: "dark" | "light";
  colors: ThemeColors;
  fonts: {
    /** Headings (loaded with next/font; variable name must be "--font-display-face"). */
    display: FontRef;
    /** Body, labels, buttons (variable name must be "--font-body-face"). */
    body: FontRef;
    /** Optional font-variation-settings for the display face, e.g. '"SOFT" 100'. */
    displayVariation?: string;
    /** Optional override for headings and pull-quotes inside journal articles (defaults to `displayVariation`). */
    articleVariation?: string;
  };
};

// ───────────────────────────── Actions & buttons ─────────────────────────────

/** A link rendered as a button. */
export type Action = {
  /** Short label (header pill). */
  label: string;
  /** Longer label for CTAs/banners. Falls back to `label`. */
  longLabel?: string;
  href: string;
  /** Opens in a new tab with the external-link indicator. */
  external?: boolean;
  /** Announced to screen readers for external links, e.g. "Google Maps directions". */
  destination?: string;
  /** Show a trailing arrow (internal links). */
  arrow?: boolean;
  /** Extra detail shown beside the label in the menu overlay, e.g. the phone number. */
  detail?: string;
  /** Screen-reader-only suffix for the short label, e.g. "by calling 0304 …". */
  srHint?: string;
};

export type ButtonSpec = {
  /** "order"/"visit" are the restaurant's two conversion actions; "menu" links to /menu. */
  action: "order" | "visit" | "menu" | Action;
  /** Default: the first button is primary, the rest outline. */
  variant?: "primary" | "outline";
  /** Override the action's label. */
  label?: string;
};

/** A named action, or a fully specified button. */
export type ButtonRef = "order" | "visit" | "menu" | ButtonSpec;

export type IconName =
  | "pin"
  | "phone"
  | "clock"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "youtube"
  | "x"
  | "whatsapp"
  | "messenger"
  | "mail";

// ───────────────────────────── Identity & contact ─────────────────────────────

export type SocialPlatform = "instagram" | "facebook" | "tiktok" | "youtube" | "x" | "whatsapp";

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
  /** Display text such as "@handle". Omit to show the platform name. */
  handle?: string;
};

export type ScheduleEntry = {
  /** e.g. "Mon – Thu". */
  days: string;
  /** e.g. "12 PM – 11 PM" or "Closed". */
  hours: string;
  /** Machine-readable form for structured data (optional). */
  schema?: { dayOfWeek: string[]; opens: string; closes: string };
};

export type Hours = {
  /** One-line summary, e.g. "Evenings, 5 PM till midnight". */
  headline: string;
  /** Compact form, e.g. "5 PM till midnight". */
  short: string;
  /** Extra line, e.g. "Hours can vary by day." */
  note?: string;
  /** Full weekly schedule. When present it is shown as a table instead of `headline`. */
  schedule?: ScheduleEntry[];
};

export type Address = {
  /** Neighbourhood/area label, e.g. "IBEX, Karachi". */
  area: string;
  /** Multi-line display address. */
  lines: string[];
  /** Single-line street address (structured data and footer). */
  street: string;
  /** Short two-part form for compact cards. */
  short: string;
  city: string;
  country: string;
  /** ISO 3166-1 alpha-2, e.g. "PK". */
  countryCode: string;
  /** Optional Plus Code shown on the contact card. */
  plusCode?: string;
  /** What Google Maps should search for (an address or Plus Code + city). */
  mapQuery: string;
};

export type Identity = {
  name: string;
  /** URL-safe id, matches the folder name under /restaurants and /public/restaurants. */
  slug: string;
  /** Short brand line, e.g. the hero eyebrow. */
  tagline: string;
  /** Sign-off/motto used in quotes and the footer. */
  motto?: string;
  description: string;
  /** Cuisine keywords for structured data. */
  cuisine: string[];
  /** Ways to eat, shown as chips: ["Dine in", "Takeaway"]. */
  services: string[];
  /** e.g. "Typically under PKR 1,000 per person". */
  priceNote?: string;
  logo: {
    /** Square mark for the header, menu overlay and favicon source. */
    mark: Img;
    /** Fuller logo for the footer and brand stickers. Falls back to `mark`. */
    badge?: Img;
  };
};

export type Contact = {
  phone: { display: string; e164: string; note?: string };
  email?: string;
  address: Address;
  hours: Hours;
};

// ───────────────────────────── SEO ─────────────────────────────

export type PageSeo = { title: string; description: string };

export type Seo = {
  /** Production URL. Overridable at deploy time with NEXT_PUBLIC_SITE_URL. */
  siteUrl?: string;
  /** Full title used on the homepage and as the fallback. */
  defaultTitle: string;
  /** e.g. "%s | Nooms Foods". */
  titleTemplate: string;
  description: string;
  keywords?: string[];
  locale: string;
  /** Social share image (1200×630 recommended). */
  ogImage: Img;
  /** Browser/app icons (public paths). */
  icons: { favicon: string; icon: string; apple: string };
  pages: {
    /** `title` here is the full, absolute homepage title. */
    home: PageSeo;
    menu: PageSeo;
    story: PageSeo;
    gallery: PageSeo;
    contact: PageSeo;
    /** Required when `journal` is provided. */
    journal?: PageSeo;
  };
};

// ───────────────────────────── Shared page pieces ─────────────────────────────

export type PageHeroContent = {
  eyebrow?: string;
  title: Rich;
  lead?: string;
  backdrop: Img;
  /** Optional sharp photo shown beside the title on large screens. */
  card?: { image: Img; caption?: string; aspect?: "portrait" | "square" };
};

/** Closing conversion band shown at the end of a page. */
export type PageCta = {
  eyebrow: string;
  title: Rich;
  body?: string;
  /** Falls back to the page's own hero image. */
  image?: Img;
  buttons: ButtonRef[];
};

// ───────────────────────────── Home ─────────────────────────────

export type Stat = {
  label: string;
  note?: string;
  value: { kind: "count"; to: number; prefix?: string; suffix?: string } | { kind: "text"; text: string };
};

export type FeaturedCard = {
  /** Small pill over the photo, e.g. "BURGERS". */
  tag: string;
  title: string;
  description: string;
  image: Img;
};

export type SplitCard = {
  eyebrow: string;
  title: Rich;
  copy: string;
  href: string;
  external?: boolean;
  actionLabel: string;
  icon: IconName;
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: Rich;
    lead: string;
    backdrop: Img;
    /** Two sharp prints flanking the headline. */
    cards: [Img, Img];
    scrollCue: string;
    buttons: ButtonRef[];
  };
  intro: {
    eyebrow: string;
    title: Rich;
    paragraphs: Rich[];
    photo: Img;
    /** Logo sticker overlapping the photo. */
    sticker?: Img;
    link: { label: string; href: string };
  };
  dishes: {
    title: Rich;
    link: { label: string; href: string };
    /** Circular photos scrolling in a loop. */
    items: Img[];
  };
  /** Words in the scrolling ribbon. */
  ribbon: string[];
  cuisine: {
    eyebrow: string;
    title: Rich;
    lead: string;
    /** The last tile, linking to the full menu. */
    allTile: { eyebrow: string; label: string };
  };
  kitchen: {
    eyebrow: string;
    title: Rich;
    body: string;
    backdrop: Img;
    card: { image: Img; caption?: string };
  };
  featured: {
    eyebrow: string;
    title: Rich;
    lead: string;
    /**
     * Editorial cards. When omitted, cards are built from menu items that
     * have `featured: true` and an `image`.
     */
    cards?: FeaturedCard[];
  };
  stats: { eyebrow: string; title: Rich; items: Stat[] };
  place: {
    eyebrow: string;
    title: Rich;
    paragraphs: string[];
    /** Two stacked, captioned photos. */
    photos: [{ image: Img; caption: string }, { image: Img; caption: string }];
    button: ButtonRef;
  };
  follow: { eyebrow: string; title: Rich; lead: string; backdrop: Img };
  split: { eyebrow: string; title: Rich; cards: [SplitCard, SplitCard] };
};

// ───────────────────────────── Menu ─────────────────────────────

export type MenuCategory = {
  id: string;
  /** Short label for pills and tiles. */
  label: string;
  heading: string;
  /** Italic line beside the heading. */
  tagline: string;
  blurb: string;
  /** Tile image on the homepage grid. */
  image: Img;
  /** Photo prints beside the category on the menu page (1 or 2). */
  photos: Img[];
};

export type MenuItem = {
  id: string;
  /** `MenuCategory.id` this item belongs to. */
  category: string;
  name: string;
  description?: string;
  /** Preformatted, e.g. "PKR 450". Omit until verified. */
  price?: string;
  /** Dietary pills. */
  tags?: ("V" | "VG")[];
  image?: Img;
  /** Eligible for the homepage featured grid (when `home.featured.cards` is omitted). */
  featured?: boolean;
  /** Pill text for the featured card; defaults to the category label. */
  featuredTag?: string;
};

export type MenuContent = {
  hero: PageHeroContent;
  /** Notice under the category pills (Rich: may contain links). */
  notice?: Rich;
  /** Extra pill after the categories, e.g. "Call for prices". */
  navAction?: { label: string; href: string; icon?: "phone" };
  categories: MenuCategory[];
  items: MenuItem[];
  cta: PageCta;
};

// ───────────────────────────── Story, gallery, journal, contact ─────────────────────────────

export type StoryMedia =
  | { kind: "circle"; image: Img }
  | { kind: "duo"; images: [Img, Img] }
  | { kind: "print"; image: Img; aspect?: "portrait" | "tall" | "square" };

export type StorySection = {
  eyebrow: string;
  title: Rich;
  paragraphs: Rich[];
  media: StoryMedia;
};

export type StoryContent = {
  hero: PageHeroContent;
  /** Alternates image-left / image-right automatically. */
  sections: StorySection[];
  /** Phrases for the scrolling ribbon. */
  ribbon: string[];
  cta: PageCta;
};

export type GalleryItem = { image: Img; caption: string };

export type GalleryContent = {
  hero: PageHeroContent;
  items: GalleryItem[];
  /** Completes "Follow @handle …". */
  followSuffix: string;
  cta: PageCta;
};

export type ArticleBlock =
  | { type: "p"; text: Rich }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  category: string;
  readMinutes: number;
  author: string;
  excerpt: string;
  metaDescription: string;
  hero: Img;
  body: ArticleBlock[];
  signOff: string;
};

export type JournalContent = {
  hero: PageHeroContent;
  articles: Article[];
  /** Heading above the other articles on an article page. */
  moreHeading: Rich;
  cta: PageCta;
  /** Closing band on article pages (its image defaults to the article's hero). */
  articleCta: PageCta;
};

export type ContactChannel = {
  icon: IconName;
  title: string;
  copy: string;
  href: string;
  external?: boolean;
  actionLabel: string;
};

export type ContactPageContent = {
  hero: PageHeroContent;
  channels: { eyebrow: string; title: Rich; lead: string; items: ContactChannel[] };
};

// ───────────────────────────── Footer ─────────────────────────────

export type FooterContent = {
  headline: Rich;
  blurb: string;
};

// ───────────────────────────── The whole restaurant ─────────────────────────────

export type RestaurantConfig = {
  identity: Identity;
  contact: Contact;
  social: SocialLink[];
  theme: Theme;
  /** The two conversion actions every page offers. */
  actions: { order: Action; visit: Action };
  seo: Seo;
  footer: FooterContent;
  home: HomeContent;
  menu: MenuContent;
  story: StoryContent;
  gallery: GalleryContent;
  contactPage: ContactPageContent;
  /** Omit to hide the Journal (nav link, routes and sitemap entries disappear). */
  journal?: JournalContent;
};
