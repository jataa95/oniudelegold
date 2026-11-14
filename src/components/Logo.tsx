"use client";

import { useEffect, useRef } from "react";

const LAYERS = 14;

/**
 * 3D "oniudelegold" wordmark built as a real solid: a front face, a stack of
 * slices for the sides and a back face.
 *
 * Motion is deliberately quiet. Scrolling makes it lean a few degrees in the
 * direction of travel and lets a band of light glide across the gold; when
 * the page stops it eases back to rest. The pointer adds a gentle tilt.
 */
export default function Logo({ size = "md" }: { size?: "md" | "xl" }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const k = size === "xl" ? 0.4 : 1;
    let raf = 0;
    let px = 0.3, py = 0.3; // pointer target
    let x = px, y = py; // pointer smoothed
    let leanT = 0, lean = 0, leanV = 0; // scroll lean (deg)
    let sheenT = 0, sheen = 0; // light position (%)
    let lastY = window.scrollY;
    let idle: ReturnType<typeof setTimeout> | undefined;

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const d = window.scrollY - lastY;
      lastY = window.scrollY;
      if (!d) return;
      leanT = Math.max(-9, Math.min(9, d * 0.35)) * k;
      sheenT += d * 0.06;
      clearTimeout(idle);
      idle = setTimeout(() => {
        leanT = 0;
        wake();
      }, 90);
      wake();
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      py = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      wake();
    };

    const tick = () => {
      // soft, well-damped spring: no overshoot, slow settle
      leanV += (leanT - lean) * 0.06;
      leanV *= 0.72;
      lean += leanV;
      sheen += (sheenT - sheen) * 0.06;
      x += (px - x) * 0.08;
      y += (py - y) * 0.08;

      el.style.setProperty("--rx", `${(-y * 10 * k - 6 + lean).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 14 * k + 10 - lean * 0.5).toFixed(2)}deg`);
      el.style.setProperty("--spin", "0deg");
      el.style.setProperty("--sheen", `${(((sheen + x * 20) % 300) + 300) % 300 / 1.5}%`);

      const moving =
        Math.abs(leanT - lean) > 0.02 ||
        Math.abs(leanV) > 0.02 ||
        Math.abs(sheenT - sheen) > 0.1 ||
        Math.abs(px - x) + Math.abs(py - y) > 0.002;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove);
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
