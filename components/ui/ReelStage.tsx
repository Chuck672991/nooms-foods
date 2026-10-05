"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import type { ReelItem } from "@/restaurants/types";
import { ArrowRight, ExternalLink } from "./Icons";
import { RingText } from "./RingText";

/** Live `matchMedia` flag without state-in-effect (server snapshot = `server`). */
function useMedia(query: string, server = false) {
  return useSyncExternalStore(
    (notify) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", notify);
      return () => m.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => server,
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

type FsVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

/**
 * The promo-reel stage: portrait clips on a 3D coverflow.
 *
 *  - The centre reel autoplays (muted, inline) while the stage is on screen; the
 *    others wait on their poster and cost nothing (`preload="none"`). A clip
 *    that ends hands over to the next one, story-style, with progress bars.
 *  - Click a side reel (or swipe, drag, ←/→) to bring it forward; the whole
 *    stage tilts up into view with scroll and "deals" its cards on first sight.
 *  - Sound is opt-in: the spinning ring button unmutes (a user gesture, so it
 *    is allowed); a fullscreen button expands the frame.
 *  - A mouse-follow tilt + glare sits on the active card; each change fires an
 *    `ember-burst` event the section's <Embers> canvas answers with sparks.
 *  - Reduced motion: no autoplay, no deal-in, no tilt; play is one tap away.
 *
 * All layout/motion lives in globals.css (`.reel-*`), driven by two custom
 * properties per card (`--o` offset from the active card, `--i` index).
 */
export function ReelStage({ items, soundHint }: { items: ReelItem[]; soundHint: string }) {
  const n = items.length;
  const reduced = useMedia("(prefers-reduced-motion: reduce)");

  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  /** null = automatic (play unless reduced motion); true/false = the viewer's choice. */
  const [pausedChoice, setPausedChoice] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  /** Posters (and video metadata) are only requested once the stage is within ~a screen of view. */
  const [near, setNear] = useState(false);
  const [dealt, setDealt] = useState<"no" | "fresh" | "done">("no");
  const paused = pausedChoice ?? reduced;

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tiltFrame = useRef(0);
  const tiltPoint = useRef<{ card: HTMLElement; x: number; y: number } | null>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const drag = useRef({ x: 0, moved: false });
  /** Set when focus was inside the stage as the reel changed (its old controls unmount). */
  const refocus = useRef(false);

  const half = Math.floor(n / 2);
  const offsetOf = (i: number) => {
    let o = i - active;
    if (o > half) o -= n;
    if (o < -half) o += n;
    return o;
  };

  const burst = useCallback(() => {
    const el = stageRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    el.dispatchEvent(
      new CustomEvent("ember-burst", {
        bubbles: true,
        detail: { x: r.left + r.width / 2, y: r.top + r.height * 0.5 },
      }),
    );
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % n) + n) % n;
      if (next === active) return;
      refocus.current = !!stageRef.current?.contains(document.activeElement);
      setActive(next);
      burst();
    },
    [active, n, burst],
  );

  // Scroll-linked entrance: the whole scene tilts up into place as the stage rises into the
  // viewport. One transform write on the track (no custom property, so no style recalc of the
  // subtree), only while the stage is near the viewport, and only when the value actually moved.
  useEffect(() => {
    const el = stageRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -150 || r.top > vh + 150) return;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
      if (Math.abs(p - last) < 0.004) return;
      last = p;
      track.style.transform = p > 0.998 ? "" : `rotateX(${((1 - p) * 11).toFixed(2)}deg) translateY(${((1 - p) * 42).toFixed(1)}px)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => () => cancelAnimationFrame(tiltFrame.current), []);

  // Only the active card renders controls, so keep keyboard focus alive across a change.
  useEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    stageRef.current?.querySelector<HTMLElement>(".reel-card[data-active] .reel-ctl")?.focus({ preventScroll: true });
  }, [active]);

  // Near the viewport? Only then request posters: they are off-screen for most of the page load.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // In view? (drives autoplay, and the first "deal" of the cards)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setDealt((d) => (d === "no" ? "fresh" : d));
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (dealt !== "fresh") return;
    const t = window.setTimeout(() => setDealt("done"), 1700);
    return () => window.clearTimeout(t);
  }, [dealt]);

  // Playback: only the active reel plays, only while on screen and not paused.
  useEffect(() => {
    const shouldPlay = inView && !paused;
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && shouldPlay) {
        v.muted = muted;
        v.play().catch((err: unknown) => {
          // Autoplay with sound can be refused: fall back to muted instead of stalling.
          if ((err as DOMException)?.name === "NotAllowedError" && !v.muted) {
            v.muted = true;
            setMuted(true);
            v.play().catch(() => {});
          }
        });
      } else {
        v.pause();
        if (i !== active && v.currentTime > 0) v.currentTime = 0;
      }
    });
  }, [active, inView, paused, muted]);

  useEffect(() => {
    const list = videos.current;
    return () => list.forEach((v) => v?.pause());
  }, []);

  // Story-style progress bar on the active segment (direct DOM writes: no re-render per frame).
  useEffect(() => {
    const bar = fills.current[active];
    const video = videos.current[active];
    if (!bar || !video) return;
    const set = () => {
      bar.style.transform = `scaleX(${video.duration ? Math.min(1, video.currentTime / video.duration) : 0})`;
    };
    set();
    let raf = 0;
    const tick = () => {
      set();
      raf = requestAnimationFrame(tick);
    };
    if (inView && !paused) raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      bar.style.transform = "";
    };
  }, [active, inView, paused]);

  const toggleSound = () => {
    setMuted((m) => !m);
    if (paused) setPausedChoice(false);
  };

  const toggleFullscreen = () => {
    const frame = frames.current[active];
    const video = videos.current[active] as FsVideo | null;
    if (!frame || !video) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    setMuted(false);
    setPausedChoice(false);
    if (frame.requestFullscreen) {
      frame.requestFullscreen().catch(() => {});
    } else {
      // iPhone Safari only fullscreens the <video> itself.
      video.webkitEnterFullscreen?.();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (n < 2) return;
    if (e.key === "ArrowRight") goTo(active + 1);
    else if (e.key === "ArrowLeft") goTo(active - 1);
    else if (e.key === "Home") goTo(0);
    else if (e.key === "End") goTo(n - 1);
    else return;
    e.preventDefault();
  };

  // Swipe / drag between reels (vertical scrolling is left to the browser: touch-action: pan-y).
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, moved: false };
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const dx = e.clientX - drag.current.x;
    if (n > 1 && Math.abs(dx) > 48) {
      drag.current.moved = true;
      goTo(active + (dx < 0 ? 1 : -1));
    }
  };
  const swallowDragClick = (e: MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  // Mouse-follow tilt + glare on the active card (fine pointers only). Pointer events only record
  // the position; one rAF per frame reads the card's box and writes ONE transform (+ the glare's
  // own two vars), so a fast mouse never causes more than a frame's worth of style work.
  const applyTilt = useCallback(() => {
    tiltFrame.current = 0;
    const p = tiltPoint.current;
    tiltPoint.current = null;
    if (!p) return;
    const tilt = p.card.querySelector<HTMLElement>(".reel-card__tilt");
    const sheen = p.card.querySelector<HTMLElement>(".reel-sheen");
    if (!tilt || !sheen) return;
    const r = p.card.getBoundingClientRect();
    const px = (p.x - r.left) / r.width;
    const py = (p.y - r.top) / r.height;
    tilt.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 14).toFixed(2)}deg) rotateY(${((px - 0.5) * 14).toFixed(2)}deg)`;
    sheen.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    sheen.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    sheen.style.opacity = "1";
  }, []);

  const onTiltEnd = (e: PointerEvent<HTMLDivElement>) => {
    tiltPoint.current = null;
    e.currentTarget.querySelector<HTMLElement>(".reel-card__tilt")?.style.removeProperty("transform");
    e.currentTarget.querySelector<HTMLElement>(".reel-sheen")?.style.removeProperty("opacity");
  };

  const onTilt = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced) return;
    // A tilting card would slide its own buttons out from under the cursor: ease flat over a control.
    if ((e.target as HTMLElement).closest("button, a")) {
      onTiltEnd(e);
      return;
    }
    tiltPoint.current = { card: e.currentTarget, x: e.clientX, y: e.clientY };
    if (!tiltFrame.current) tiltFrame.current = requestAnimationFrame(applyTilt);
  };

  const current = items[active];

  return (
    <div onKeyDown={onKeyDown}>
      <div
        ref={stageRef}
        className="reel-stage"
        data-dealt={dealt === "no" ? undefined : dealt}
        role="group"
        aria-roledescription="carousel"
        aria-label="Promo reels"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClickCapture={swallowDragClick}
      >
        <div className="reel-track" ref={trackRef}>
          {items.map((item, i) => {
            const o = offsetOf(i);
            const isActive = i === active;
            return (
              <div
                key={item.id}
                className="reel-card"
                data-active={isActive || undefined}
                style={{ "--o": o, "--d": i } as CSSProperties}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}: ${item.title}`}
                onPointerMove={isActive ? onTilt : undefined}
                onPointerLeave={isActive ? onTiltEnd : undefined}
              >
                <div className="reel-halo" aria-hidden="true" />
                <div className="reel-card__tilt">
                  <div
                    className="reel-frame"
                    ref={(el) => {
                      frames.current[i] = el;
                    }}
                  >
                    <video
                      ref={(el) => {
                        videos.current[i] = el;
                      }}
                      className="reel-video"
                      poster={near ? item.video.poster.src : undefined}
                      preload="none"
                      muted
                      playsInline
                      loop={n === 1}
                      disablePictureInPicture
                      aria-label={item.video.poster.alt}
                      onEnded={isActive && n > 1 ? () => goTo(active + 1) : undefined}
                    >
                      <source src={item.video.src} type={item.video.type ?? "video/mp4"} />
                    </video>
                    <span className="reel-sheen" aria-hidden="true" />
                    <span className="reel-index" aria-hidden="true">
                      {pad(i + 1)}
                      <i /> {pad(n)}
                    </span>
                    {item.duration ? <span className="reel-dur">{item.duration}</span> : null}

                    {isActive ? (
                      <>
                        <div className="reel-ctls">
                          <button
                            type="button"
                            className="reel-ctl"
                            onClick={() => setPausedChoice(!paused)}
                            aria-label={paused ? "Play reel" : "Pause reel"}
                          >
                            {paused ? (
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8 5.5v13l11-6.5L8 5.5Z" fill="currentColor" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />
                              </svg>
                            )}
                          </button>
                          <button
                            type="button"
                            className="reel-ctl"
                            onClick={toggleFullscreen}
                            aria-label="Fullscreen"
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="reel-sound"
                          onClick={toggleSound}
                          aria-pressed={!muted}
                          aria-label={muted ? "Turn sound on" : "Turn sound off"}
                        >
                          <RingText text={soundHint} className="ring-spin" />
                          {muted ? (
                            <svg viewBox="0 0 24 24" className="reel-sound__icon" aria-hidden="true">
                              <path
                                d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4ZM16 9.5l5 5M21 9.5l-5 5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <span className="reel-eq" aria-hidden="true">
                              <i style={{ "--k": 0 } as CSSProperties} />
                              <i style={{ "--k": 1 } as CSSProperties} />
                              <i style={{ "--k": 2 } as CSSProperties} />
                              <i style={{ "--k": 3 } as CSSProperties} />
                            </span>
                          )}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="reel-pick"
                        onClick={() => goTo(i)}
                        aria-label={`Show reel: ${item.title}`}
                        tabIndex={Math.abs(o) > 1 ? -1 : 0}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="reel-meta">
        <div key={current.id} className="reel-meta__in">
          <p className="eyebrow justify-center">
            <span className="eyebrow-rule" aria-hidden="true" />
            <span>{current.kicker}</span>
            <span className="eyebrow-rule" aria-hidden="true" />
          </p>
          <h3 className="display h-card mt-4 text-balance">{current.title}</h3>
          {current.caption ? (
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-foreground/70 text-pretty">
              {current.caption}
            </p>
          ) : null}
          {current.credit ? (
            <p className="mt-4 text-[0.78rem] text-foreground/55">
              {current.credit.href ? (
                <a
                  href={current.credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {current.credit.label}
                  <ExternalLink width={12} height={12} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                current.credit.label
              )}
            </p>
          ) : null}
        </div>
      </div>

      {n > 1 ? (
        <div className="reel-nav">
          <button
            type="button"
            className="reel-arrow"
            onClick={() => goTo(active - 1)}
            aria-label="Previous reel"
          >
            <ArrowRight width={18} height={18} className="rotate-180" />
          </button>
          <ol className="reel-segs">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show reel ${i + 1}: ${item.title}`}
                  aria-current={i === active ? "true" : undefined}
                >
                  <span
                    className="reel-seg__fill"
                    ref={(el) => {
                      fills.current[i] = el;
                    }}
                  />
                </button>
              </li>
            ))}
          </ol>
          <button type="button" className="reel-arrow" onClick={() => goTo(active + 1)} aria-label="Next reel">
            <ArrowRight width={18} height={18} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
