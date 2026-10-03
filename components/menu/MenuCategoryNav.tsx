"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { Phone } from "@/components/ui/Icons";

type Category = { id: string; label: string };

/**
 * Sticky in-page category pills with scroll-spy. Clicking smooth-scrolls
 * (native anchor + CSS scroll-behavior/scroll-margin) and highlights the
 * pill; scrolling updates the highlight via IntersectionObserver. On phones
 * the row scrolls horizontally and keeps the active pill centred.
 */
export function MenuCategoryNav({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);
  const pillRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    // A section is "current" while it crosses a line ~30% down the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [categories]);

  // Keep the active pill visible in the horizontally scrolling mobile row.
  useEffect(() => {
    const list = listRef.current;
    const pill = pillRefs.current[active];
    if (!list || !pill || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: pill.offsetLeft - list.clientWidth / 2 + pill.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <div className="sticky top-[4.5rem] z-40 -mt-px sm:top-20">
      <div className="mx-auto max-w-page px-4 py-3 sm:px-8 lg:px-14">
        <nav
          aria-label="Menu categories"
          className="rounded-[18px] border border-cream/15 bg-ink-900/85 p-2 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:rounded-full sm:p-2.5"
        >
          <ul
            ref={listRef}
            className="flex gap-2 overflow-x-auto [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat) => {
              const isActive = cat.id === active;
              return (
                <li key={cat.id} className="shrink-0">
                  <a
                    ref={(el) => {
                      pillRefs.current[cat.id] = el;
                    }}
                    href={`#${cat.id}`}
                    onClick={() => setActive(cat.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex min-h-10 items-center rounded-full border px-4 text-[0.7rem] font-bold tracking-[0.14em] uppercase transition-colors duration-200 ${
                      isActive
                        ? "border-yellow bg-yellow text-on-yellow"
                        : "border-cream/20 text-cream hover:border-yellow hover:text-yellow"
                    }`}
                  >
                    {cat.label}
                  </a>
                </li>
              );
            })}
            <li className="shrink-0">
              <a
                href={SITE.phone.href}
                className="flex min-h-10 items-center gap-2 rounded-full border border-yellow/60 px-4 text-[0.7rem] font-bold tracking-[0.14em] text-yellow uppercase transition-colors hover:bg-yellow hover:text-on-yellow"
              >
                <Phone width={14} height={14} />
                Call for prices
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
