"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/content";
import ChapterBar from "./ChapterBar";

const reels = [
  {
    src: "/media/yellow-room-process.mp4",
    poster: "/media/yellow-room-process.jpg",
    label: "The yellow room: from first line to finished canvas",
  },
  {
    src: "/media/studio-to-collector.mp4",
    poster: "/media/studio-to-collector.jpg",
    label: "From the studio, across the bridge, onto a collector's wall",
  },
];

function Reel({ src, poster, label }: (typeof reels)[number]) {
  const v = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = v.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="reel">
      <video ref={v} src={src} poster={poster} muted={muted} loop playsInline preload="metadata" aria-label={label} />
      <button className="reel__sound" onClick={() => setMuted((m) => !m)} aria-pressed={!muted}>
        {muted ? "Sound on" : "Sound off"}
      </button>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export default function Process() {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max(1 - r.top / window.innerHeight, 0), 1);
      el.style.transform = `rotate(${(1 - p) * -6}deg) scale(${0.9 + p * 0.1})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="process" id="process">
      <div className="process__panel" ref={panel}>
        <ChapterBar label="Process" n="03" dark />
        <h2 className="display process__title">
          From line <br />
          to <em>light.</em>
        </h2>
        <p className="process__lede">
          Each canvas is drawn and painted by hand at full scale, then wrapped and carried to the
          person who will live with it.
        </p>
        <div className="process__grid">
          <ol className="steps">
            {processSteps.map((s) => (
              <li key={s.n}>
                <span>{s.n}</span>
                <strong>{s.t}</strong>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="reels">
            {reels.map((r) => (
              <Reel key={r.src} {...r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
