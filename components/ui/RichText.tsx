import Link from "next/link";
import { Fragment } from "react";
import type { Rich } from "@/restaurants/types";

const TOKEN = /(\*[^*]+\*|\[[^\]]+\]\([^)]+\)|\n)/g;

const DEFAULT_LINK =
  "font-semibold text-accent underline underline-offset-4 hover:text-primary-soft";

/**
 * Renders the config's inline markup (see `Rich` in restaurants/types.ts):
 * *accent* → <em>, [label](href) → link, newline → phone-only line break.
 */
export function RichText({
  text,
  emClassName = "accent-italic",
  linkClassName = DEFAULT_LINK,
}: {
  text: Rich;
  /** Class for *accent* spans. */
  emClassName?: string;
  linkClassName?: string;
}) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (!part) return null;
        if (part === "\n") {
          return (
            <Fragment key={i}>
              <br className="sm:hidden" />{" "}
            </Fragment>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return (
            <em key={i} className={emClassName}>
              {part.slice(1, -1)}
            </em>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          if (/^https?:\/\//.test(href)) {
            return (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                {label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            );
          }
          if (href.startsWith("/") || href.startsWith("#")) {
            return (
              <Link key={i} href={href} className={linkClassName}>
                {label}
              </Link>
            );
          }
          return (
            <a key={i} href={href} className={linkClassName}>
              {label}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
