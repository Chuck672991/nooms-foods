import { SITE } from "@/lib/site";
import { ExternalLink } from "@/components/ui/Icons";

/**
 * Google Maps embed (key-free). Left in Google's light theme like the
 * reference; the "Open in Maps" pill overlay gives a direct, labelled exit.
 */
export function MapEmbed() {
  return (
    <div className="relative h-full min-h-[22rem] overflow-hidden rounded-card border border-cream/15 bg-ink-700 lg:min-h-0">
      <iframe
        title="Map showing Nooms Foods on Shahrah-e-Faisal, IBEX, Karachi"
        src={SITE.mapEmbedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
      <a
        href={SITE.mapOpenHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-sm absolute top-4 right-4 shadow-lg"
      >
        Open in Maps
        <ExternalLink className="btn-icon btn-icon-ext" width={14} height={14} />
        <span className="sr-only">, opens Google Maps in a new tab</span>
      </a>
    </div>
  );
}
