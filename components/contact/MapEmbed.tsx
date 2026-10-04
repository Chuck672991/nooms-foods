import { ExternalLink } from "@/components/ui/Icons";

/**
 * Google Maps embed (key-free). Left in Google's light theme like the
 * reference; the "Open in Maps" pill overlay gives a direct, labelled exit.
 */
export function MapEmbed({
  title,
  embedSrc,
  openHref,
}: {
  title: string;
  embedSrc: string;
  openHref: string;
}) {
  return (
    <div className="relative h-full min-h-[22rem] overflow-hidden rounded-card border border-foreground/15 bg-surface-raised lg:min-h-0">
      <iframe
        title={title}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
      <a
        href={openHref}
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
