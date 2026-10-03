import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ExternalLink } from "./Icons";

type PillButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "md" | "sm";
  /** Opens in a new tab and appends the external-link indicator. */
  external?: boolean;
  /** Show a trailing arrow (ignored when `external`). */
  arrow?: boolean;
  /** Where an external link goes, announced to screen readers. */
  destination?: string;
  className?: string;
};

/**
 * Shared CTA. Internal paths use next/link; tel:/mailto: and external URLs
 * use a plain anchor. External links announce that they open a new tab.
 */
export function PillButton({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  arrow = false,
  destination,
  className = "",
}: PillButtonProps) {
  const classes = [
    "btn",
    variant === "primary" ? "btn-primary" : "btn-outline",
    size === "sm" ? "btn-sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {external ? (
        <>
          <ExternalLink className="btn-icon btn-icon-ext" width={14} height={14} />
          <span className="sr-only">
            {destination ? `, opens ${destination} in a new tab` : ", opens in a new tab"}
          </span>
        </>
      ) : arrow ? (
        <ArrowRight className="btn-icon" width={15} height={15} />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
