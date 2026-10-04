import type { ReactNode } from "react";
import type { Rich } from "@/restaurants/types";
import { Eyebrow } from "./Eyebrow";
import { RichText } from "./RichText";

/**
 * Eyebrow + display heading (one italic accent word via *accent*) + optional
 * lead. Defaults to <h2>; pass `as="h1"` on pages where it is the page title.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: Rich;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow ? (
        <Eyebrow both={centered} className="mb-6">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag className="display h-section text-balance">
        <RichText text={title} />
      </Tag>
      {lead ? <p className="lead mt-6 text-pretty">{lead}</p> : null}
    </div>
  );
}
