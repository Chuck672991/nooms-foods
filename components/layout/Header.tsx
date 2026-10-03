"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { IMG } from "@/lib/images";
import { NAV_LINKS, SITE } from "@/lib/site";
import { PillButton } from "@/components/ui/PillButton";
import { MapPin } from "@/components/ui/Icons";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${SITE.name}, home`}
      className="block shrink-0 rounded-[10px] transition-transform duration-300 hover:scale-105"
    >
      <Image
        src={IMG.mark.src}
        alt=""
        width={96}
        height={96}
        sizes="48px"
        preload
        className="h-11 w-11 rounded-[10px] sm:h-12 sm:w-12"
      />
    </Link>
  );
}

/**
 * Sticky 3-zone header (menu left · logo center · Order + Find us right) and
 * the full-screen numbered nav overlay, one shared component at every width.
 */
export function Header() {
  const pathname = usePathname();
  // The overlay is "open for" the page it was opened on, so navigating
  // closes it automatically without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const open = openFor === pathname;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpenFor(null);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpenFor(null);

  // Keep Tab inside the overlay while it is open.
  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !overlayRef.current) return;
    const items = overlayRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "border-cream/10 bg-ink-950/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-[4.5rem] max-w-page grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:h-20 sm:px-8 lg:px-14">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpenFor(pathname)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="group -ml-2 inline-flex h-11 items-center gap-3 justify-self-start rounded-full px-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase"
          >
            <span className="flex w-6 flex-col gap-[6px]" aria-hidden="true">
              <span className="block h-[1.5px] w-full bg-cream transition-all duration-300 group-hover:bg-yellow" />
              <span className="block h-[1.5px] w-4 bg-cream transition-all duration-300 group-hover:w-full group-hover:bg-yellow" />
            </span>
            <span className="max-[359px]:sr-only transition-colors group-hover:text-yellow">Menu</span>
          </button>

          <Logo />

          {/* Compact on phones (<640px): tighter pills, no external icon, so
              all three zones fit down to 360px without overflow. */}
          <div className="flex items-center gap-1.5 justify-self-end sm:gap-2.5">
            <PillButton
              href={SITE.phone.href}
              variant="outline"
              size="sm"
              className="max-sm:px-3 max-sm:text-[0.64rem] max-sm:tracking-[0.1em]"
            >
              Order<span className="sr-only"> by calling {SITE.phone.display}</span>
            </PillButton>
            <PillButton
              href={SITE.directionsHref}
              size="sm"
              external
              destination="Google Maps directions"
              className="max-sm:px-3 max-sm:text-[0.64rem] max-sm:tracking-[0.1em] max-sm:[&_.btn-icon-ext]:hidden"
            >
              Find us
            </PillButton>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={overlayRef}
        data-open={open}
        inert={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        onKeyDown={trapFocus}
        className="nav-overlay dots fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink-950"
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-page shrink-0 items-center justify-between px-4 sm:h-20 sm:px-8 lg:px-14">
          <Logo onClick={close} />
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="group inline-flex h-11 items-center gap-3 rounded-full px-3 text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors hover:text-yellow"
          >
            Close
            <span aria-hidden="true" className="text-lg leading-none">
              ✕
            </span>
          </button>
        </div>

        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-page flex-1 flex-col justify-center px-5 py-6 sm:px-8 lg:px-14"
        >
          <ol>
            {NAV_LINKS.map((link, i) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href} className="nav-rise" style={{ "--i": i } as CSSProperties}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-baseline gap-5 py-1.5 sm:gap-9"
                  >
                    <span className="w-7 text-xs font-bold tracking-[0.14em] text-yellow tabular-nums">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span
                      className={`display text-[clamp(2.3rem,7.2vw,5rem)] leading-[1.08] font-[560] tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-yellow ${
                        active ? "text-yellow" : "text-cream"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div
          className="nav-rise mx-auto flex w-full max-w-page flex-wrap items-center justify-between gap-6 px-5 pb-8 sm:px-8 lg:px-14"
          style={{ "--i": NAV_LINKS.length + 1 } as CSSProperties}
        >
          <div className="flex flex-wrap gap-3">
            <PillButton href={SITE.phone.href} variant="outline">
              Order · {SITE.phone.display}
            </PillButton>
            <PillButton href={SITE.directionsHref} external destination="Google Maps directions">
              Get directions
            </PillButton>
          </div>
          <p className="flex items-center gap-2 text-sm text-cream/60">
            <MapPin width={16} height={16} className="text-yellow" />
            {SITE.address.area} · {SITE.hours.summary}
          </p>
        </div>
      </div>
    </>
  );
}
