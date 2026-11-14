"use client";

import { useEffect, useRef, useState } from "react";
import { artist } from "@/lib/content";
import Logo from "./Logo";

const links = [
  { href: "#top", label: "Home", n: "00" },
  { href: "#works", label: "The Sitters", n: "02" },
  { href: "#process", label: "Process", n: "03" },
  { href: "#motifs", label: "Motifs", n: "04" },
  { href: "#studio", label: "Studio", n: "05" },
  { href: "#enquire", label: "Enquire", n: "06" },
];

/** Logo + hamburger. Reads the data-theme of whatever sits under it and restyles to match. */
export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let raf = 0;
    const sample = () => {
      raf = 0;
      const y = header.offsetHeight / 2;
      const hit = document.elementsFromPoint(window.innerWidth * 0.15, y).find((n) => !header.contains(n));
      header.dataset.ground = hit?.closest<HTMLElement>("[data-theme]")?.dataset.theme ?? "dark";
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

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="header" ref={ref} data-open={open}>
      <a href="#top" className="wordmark" aria-label={`${artist.name}, home`} onClick={() => setOpen(false)}>
        <Logo />
      </a>
      <button
        className="burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="burger__label" aria-hidden>
          <span>Menu</span>
          <span>Close</span>
        </span>
        <span className="burger__icon" aria-hidden>
          <i />
          <i />
        </span>
      </button>

      <nav id="site-menu" className="menu" aria-hidden={!open} inert={!open}>
        <ul>
          {links.map((l, i) => (
            <li key={l.href} style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="menu__n">{l.n}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <span>Veiled portraits in damask rooms. Painted by hand in {artist.city}.</span>
          <a href={artist.instagram} target="_blank" rel="noreferrer">
            @{artist.handle}
          </a>
        </div>
      </nav>
    </header>
  );
}
