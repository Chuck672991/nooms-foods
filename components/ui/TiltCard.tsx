"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Card with a mouse-follow 3D tilt: the cursor's position inside the card maps
 * to ±7° of rotateY / rotateX (inverted on X so the top edge leans toward the
 * cursor) under `perspective(900px)`, plus a 6px lift. Leaving clears the
 * inline transform; the CSS `transition: transform .4s` does the settle.
 * Disabled on touch/coarse pointers and under reduced motion.
 */
export function TiltCard({
  children,
  className = "",
  href,
  external = false,
}: {
  children: ReactNode;
  className?: string;
  /** Renders the card as a link when provided. */
  href?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let rect: DOMRect | null = null;
    const enter = () => {
      rect = card.getBoundingClientRect();
    };
    const move = (e: MouseEvent) => {
      rect ??= card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${(px * 7).toFixed(2)}deg) rotateX(${(-py * 7).toFixed(2)}deg) translateY(-6px)`;
    };
    const leave = () => {
      card.style.transform = "";
      rect = null;
    };

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mousemove", move);
      card.removeEventListener("mouseleave", leave);
    };
  }, []);

  const setRef = (el: HTMLElement | null) => {
    ref.current = el;
  };

  return href ? (
    <a
      ref={setRef}
      href={href}
      data-tilt
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ) : (
    <div ref={setRef} data-tilt className={className}>
      {children}
    </div>
  );
}
