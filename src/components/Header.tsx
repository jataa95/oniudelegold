"use client";

import { useEffect, useRef } from "react";
import { artist } from "@/lib/content";
import Logo from "./Logo";

/** Reads the data-theme of whatever sits under the header and restyles to match. */
export default function Header() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let raf = 0;
    const sample = () => {
      raf = 0;
      const y = header.offsetHeight / 2;
      const pick = (x: number) => {
        const hit = document
          .elementsFromPoint(x, y)
          .find((n) => !header.contains(n));
        return hit?.closest<HTMLElement>("[data-theme]")?.dataset.theme ?? "dark";
      };
      header.dataset.theme = pick(window.innerWidth * 0.15);
      header.dataset.scrolled = String(window.scrollY > 40);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sample);
    };
    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="header" ref={ref} data-theme="dark">
      <a href="#top" className="wordmark" aria-label={`${artist.name}, home`}>
        <Logo />
      </a>
      <p className="header__tag">
        Veiled portraits in damask rooms. Painted by hand in {artist.city}.
      </p>
      <a className="pill" href={artist.instagram} target="_blank" rel="noreferrer">
        Enquire
      </a>
    </header>
  );
}
