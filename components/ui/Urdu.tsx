import type { ElementType, ReactNode } from "react";

/**
 * Urdu (or any right-to-left Nastaliq) text. Sets `lang="ur"` + `dir="rtl"` for
 * screen readers and the bidi algorithm, and the theme's Urdu face with the
 * generous line-height Nastaliq needs (see `.urdu` in globals.css).
 */
export function Urdu({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag lang="ur" dir="rtl" className={`urdu ${className}`}>
      {children}
    </Tag>
  );
}
