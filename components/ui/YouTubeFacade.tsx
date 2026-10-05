"use client";

import { useState } from "react";
import { RingText } from "./RingText";

/**
 * Click-to-load YouTube embed. Until clicked it is just a poster (YouTube's
 * own thumbnail, hot-linked, never re-hosted) and a link, so the page carries
 * no third-party scripts, cookies or iframe weight. Click swaps in the
 * official privacy-enhanced player (youtube-nocookie) and starts it. Without
 * JavaScript it is a plain link to the video.
 */
export function YouTubeFacade({
  id,
  title,
  playLabel = "Play",
}: {
  id: string;
  title: string;
  playLabel?: string;
}) {
  const [on, setOn] = useState(false);
  const watch = `https://www.youtube.com/watch?v=${id}`;

  return (
    <div className="yt-frame">
      {on ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <a
          href={watch}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            setOn(true);
          }}
          className="yt-poster group"
          aria-label={`${playLabel}: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- remote poster, hot-linked on purpose */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="yt-poster__img"
          />
          <span className="yt-poster__shade" aria-hidden="true" />
          <span className="yt-play" aria-hidden="true">
            <RingText text={playLabel} className="ring-spin" />
            <svg viewBox="0 0 24 24" className="yt-play__icon">
              <path d="M8 5.5v13l11-6.5L8 5.5Z" fill="currentColor" />
            </svg>
          </span>
        </a>
      )}
    </div>
  );
}
