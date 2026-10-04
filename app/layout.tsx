import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StarField } from "@/components/ui/StarField";
import { navLinks } from "@/lib/restaurant";
import { restaurantJsonLd, rootMetadata, rootViewport, themeStyle } from "@/lib/seo";
import { restaurant } from "@/restaurants/active";
import "./globals.css";

export const metadata = rootMetadata(restaurant);
export const viewport = rootViewport(restaurant);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { identity, contact, theme, actions } = restaurant;
  const links = navLinks(restaurant);

  return (
    <html
      lang="en"
      data-theme={theme.mode}
      className={`${theme.fonts.display.variable} ${theme.fonts.body.variable}`}
      style={themeStyle(restaurant)}
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-on-primary"
        >
          Skip to content
        </a>
        {/* Dark themes get the live starfield; it sits behind everything (z-0). */}
        {theme.mode === "dark" ? <StarField /> : null}
        <Header
          name={identity.name}
          logo={identity.logo.mark}
          links={links}
          order={actions.order}
          visit={actions.visit}
          locationLine={`${contact.address.area} · ${contact.hours.short}`}
        />
        <main id="main" className="relative z-[1] flex-1">
          {children}
        </main>
        <Footer restaurant={restaurant} links={links} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantJsonLd(restaurant)).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
