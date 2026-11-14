"use client";

import { useEffect, useRef } from "react";

/**
 * 3D "oniudelegold" wordmark: a metallic face over a stacked extrusion.
 * The extrusion leans away from the pointer, so the letters seem to turn
 * toward it. Colours come from the header's theme (dark or light ground).
 */
export default function Logo({ size = "md" }: { size?: "md" | "xl" }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0.3;
    let ty = 0.3;
    let x = tx;
    let y = ty;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.setProperty("--rx", `${-y * 14}deg`);
      el.style.setProperty("--ry", `${x * 18}deg`);
      el.style.setProperty("--dx", `${-x}`);
      el.style.setProperty("--dy", `${-y}`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <span className={`logo3d logo3d--${size}`} ref={ref} aria-hidden>
      <span className="logo3d__body">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="logo3d__layer" style={{ "--i": i + 1 } as React.CSSProperties}>
            oniudele<b>gold</b>
          </span>
        ))}
        <span className="logo3d__face">
          oniudele<b>gold</b>
        </span>
      </span>
    </span>
  );
}
