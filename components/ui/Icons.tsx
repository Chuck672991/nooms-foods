import type { SVGProps } from "react";
import type { IconName } from "@/restaurants/types";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ExternalLink = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);

export const Facebook = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />
  </svg>
);

export const Messenger = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3Z" />
    <path d="m7.5 13.5 3-3.2 2 2 3.5-3.3" />
  </svg>
);

export const Spark = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M12 2c.6 4.6 3.4 7.4 8 8-4.6.6-7.4 3.4-8 8-.6-4.6-3.4-7.4-8-8 4.6-.6 7.4-3.4 8-8Z" />
  </svg>
);

export const TikTok = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 4c.4 2.4 2 4 4.5 4.2" />
  </svg>
);

export const YouTube = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="18" height="12" rx="4" />
    <path d="m10.5 9.5 4 2.5-4 2.5Z" />
  </svg>
);

export const XMark = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const WhatsApp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21Z" />
    <path d="M9.2 9.2c.3 2 2.5 4.2 4.5 4.5l1.2-1.2-1.7-1-.8.7c-.8-.3-1.6-1.1-1.9-1.9l.7-.8-1-1.7-1 1.4Z" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const Bag = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

const ICON_MAP: Record<IconName, (p: IconProps) => React.JSX.Element> = {
  pin: MapPin,
  phone: Phone,
  clock: Clock,
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTok,
  youtube: YouTube,
  x: XMark,
  whatsapp: WhatsApp,
  messenger: Messenger,
  mail: Mail,
  bag: Bag,
};

/** Icon by semantic name, so configs can say `icon: "phone"` without importing SVGs. */
export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const Component = ICON_MAP[name];
  return <Component {...props} />;
}
