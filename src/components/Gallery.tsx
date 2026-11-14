"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { works, type Work } from "@/lib/content";

export default function Gallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Work | null>(null);

  useEffect(() => {
    const s = section.current;
    const t = track.current;
    if (!s || !t) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (window.innerWidth < 800) {
        t.style.transform = "";
        return;
      }
      const r = s.getBoundingClientRect();
      const total = s.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-r.top / total, 0), 1);
      const max = t.scrollWidth - window.innerWidth;
      t.style.transform = `translate3d(${-p * max}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      t.querySelectorAll<HTMLElement>(".work").forEach((card, i) => {
        const cr = card.getBoundingClientRect();
        const c = (cr.left + cr.width / 2) / window.innerWidth - 0.5;
        card.style.setProperty("--tilt", `${c * -10 + (i % 2 ? 2 : -2)}deg`);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const show = (w: Work) => {
    setOpen(w);
    dialog.current?.showModal();
  };

  return (
    <section className="gallery" id="works" ref={section}>
      <div className="gallery__sticky">
        <div className="gallery__head">
          <h2 className="display">
            The <em>Sitters</em>
          </h2>
          <p>Recent canvases from the studio. Select a work to see it full size.</p>
        </div>
        <div className="gallery__track" ref={track}>
          {works.map((w, i) => (
            <button
              key={w.slug}
              className="work"
              style={{ "--accent": w.accent } as React.CSSProperties}
              onClick={() => show(w)}
            >
              <span className="work__frame">
                <Image
                  src={w.image}
                  alt={`${w.title}, ${w.year}`}
                  sizes="(max-width: 800px) 90vw, 34vw"
                  placeholder="blur"
                />
              </span>
              <span className="work__meta">
                <span className="work__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="work__title">{w.title}</span>
                <span className="work__year">{w.year}</span>
              </span>
              <span className="work__note">{w.note}</span>
            </button>
          ))}
          <div className="gallery__end">
            <p className="display">
              More on the <em>easel.</em>
            </p>
          </div>
        </div>
        <div className="gallery__progress">
          <div ref={bar} />
        </div>
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        {open && (
          <figure>
            <Image src={open.image} alt={`${open.title}, ${open.year}`} sizes="90vw" placeholder="blur" />
            <figcaption>
              <span className="display">{open.title}</span>
              <span>
                {open.year} · {open.note}
              </span>
            </figcaption>
          </figure>
        )}
        <button className="lightbox__close pill" onClick={() => dialog.current?.close()}>
          Close
        </button>
      </dialog>
    </section>
  );
}
