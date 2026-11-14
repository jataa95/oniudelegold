"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { works, motifs } from "@/lib/content";

type Card = { src: (typeof works)[number]["image"]; x: number; y: number; zoom: number; alt: string };

// Full works and close-up crops, arranged around a slowly turning ring.
const cards: Card[] = [
  ...works.map((w) => ({ src: w.image, x: 50, y: 50, zoom: 1, alt: w.title })),
  ...motifs.map((m) => ({ src: m.image, x: m.x, y: m.y, zoom: m.zoom, alt: m.name })),
];

export default function Hero() {
  const ring = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let angle = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    const tick = () => {
      if (!reduce) angle += 0.06;
      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;
      const s = Math.min(window.scrollY / window.innerHeight, 1.2);
      // once the next section has fully covered the hero, stop animating it
      if (s >= 1.2 && window.scrollY > window.innerHeight * 1.3) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const c = Math.min(s, 1);
      hero.current?.style.setProperty("--cover", String(c));
      el.style.transform = `translateY(${s * -12}vh) rotateX(${-6 + ty * -10 + s * 18}deg) rotateY(${angle + tx * 30 + s * 60}deg)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={hero}>
      <p className="hero__kicker">Oniudele Gold · Artistic Expressions</p>
      <h1 className="hero__title">
        <span>Veiled,</span> <span>not hidden.</span>
      </h1>
      <div className="hero__stage" aria-hidden>
        <div className="hero__ring" ref={ring}>
          {cards.map((c, i) => {
            const a = (360 / cards.length) * i;
            const lift = ((i * 37) % 5) * 7 - 14;
            return (
              <div
                key={i}
                className="hero__card"
                style={{
                  transform: `rotateY(${a}deg) translateZ(var(--radius)) translateY(${lift}vh) rotateZ(${((i * 13) % 7) - 3}deg)`,
                }}
              >
                <Image
                  src={c.src}
                  alt=""
                  fill
                  sizes="220px"
                  placeholder="blur"
                  preload={i < 4}
                  style={{
                    objectFit: "cover",
                    objectPosition: `${c.x}% ${c.y}%`,
                    transform: `scale(${c.zoom})`,
                    transformOrigin: `${c.x}% ${c.y}%`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <p className="hero__scroll">Scroll to step inside</p>
    </section>
  );
}
