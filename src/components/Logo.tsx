"use client";

import { useEffect, useRef } from "react";

const LAYERS = 14;

/**
 * 3D "oniudelegold" wordmark built as a real solid: a front face, a stack of
 * slices for the sides and a readable back face.
 *
 * Header size: scrolling spins it around its vertical axis on a spring. It
 * turns with the scroll's speed and direction, then glides on to the next
 * full turn and settles facing front.
 * Footer size: it makes one full turn as it rises into view.
 * The pointer adds a gentle tilt on top of both.
 */
export default function Logo({ size = "md" }: { size?: "md" | "xl" }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiltK = size === "xl" ? 0.35 : 1;
    // degrees of spin per pixel scrolled: one full turn every ~1100px
    const spinK = 0.33;

    let raf = 0;
    let px = 0.3, py = 0.3; // pointer target
    let x = px, y = py; // pointer smoothed
    let target = 0; // spin target (deg)
    let angle = 0; // spin shown (deg)
    let vel = 0;
    let dir = 1;
    let lastY = window.scrollY;
    let idle: ReturnType<typeof setTimeout> | undefined;

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (size === "xl") {
        // footer: one full turn while rising into view, landing face-on once fully visible
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const atEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
        const p = atEnd ? 1 : Math.max(0, Math.min(1, (vh - r.top) / (r.height + 40)));
        target = -360 * Math.pow(1 - p, 2);
        wake();
        return;
      }
      const d = window.scrollY - lastY;
      lastY = window.scrollY;
      if (!d) return;
      dir = Math.sign(d);
      target += Math.max(-40, Math.min(40, d * spinK));
      clearTimeout(idle);
      // when the scrolling stops, carry on to the next full turn and rest facing front
      idle = setTimeout(() => {
        target = (dir > 0 ? Math.ceil(target / 360) : Math.floor(target / 360)) * 360;
        wake();
      }, 140);
      wake();
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      py = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      wake();
    };

    const tick = () => {
      // critically-damped-ish spring for the spin: weighty start, soft landing
      vel += (target - angle) * 0.03;
      vel *= 0.7;
      angle += vel;
      x += (px - x) * 0.1;
      y += (py - y) * 0.1;

      const turn = ((angle % 360) + 360) % 360;
      el.style.setProperty("--spin", `${angle.toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 14 * tiltK - 6).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 18 * tiltK + 10).toFixed(2)}deg`);
      // light sweeps across the gold as it turns
      el.style.setProperty("--sheen", `${((turn / 360) * 200 + x * 20).toFixed(1)}%`);

      const moving =
        Math.abs(target - angle) > 0.05 || Math.abs(vel) > 0.05 || Math.abs(px - x) + Math.abs(py - y) > 0.002;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove);
    if (size === "xl") onScroll();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, [size]);

  const word = (
    <>
      oniudele<b>gold</b>
    </>
  );

  return (
    <span className={`logo3d logo3d--${size}`} ref={ref} aria-hidden>
      <span className="logo3d__body">
        <span className="logo3d__shadow">{word}</span>
        {Array.from({ length: LAYERS }, (_, i) => (
          <span key={i} className="logo3d__layer" style={{ "--i": i + 1 } as React.CSSProperties}>
            {word}
          </span>
        ))}
        <span className="logo3d__back">{word}</span>
        <span className="logo3d__face">{word}</span>
      </span>
    </span>
  );
}
