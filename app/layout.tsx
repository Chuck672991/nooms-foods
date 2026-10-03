import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { IMG } from "@/lib/images";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Display: a soft, warm serif with real italics (Qissa's light-serif +
// italic-accent move, re-voiced for a casual, playful brand).
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body / labels / buttons: friendly geometric sans.
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nooms Foods | Shawarma, Burgers & Loaded Fries in Karachi",
    template: "%s | Nooms Foods",
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_PK",
    title: "Nooms Foods | Shawarma, Burgers & Loaded Fries in Karachi",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nooms Foods | Shawarma on fire",
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

// Structured data limited to verified details: no ratings, hours or geo.
const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: SITE.name,
  url: SITE_URL,
  description: SITE.description,
  telephone: SITE.phone.e164,
  image: `${SITE_URL}${IMG.storefrontNight.src}`,
  logo: `${SITE_URL}${IMG.logoBadge.src}`,
  servesCuisine: ["Shawarma", "Burgers", "Fast food"],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  hasMap: SITE.mapOpenHref,
  sameAs: [SITE.social.instagram.href, SITE.social.facebook.href],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-yellow focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-on-yellow"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
