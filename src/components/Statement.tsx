"use client";

import { useEffect, useRef } from "react";

const text =
  "Every portrait begins with a person and ends with a secret. The face is wrapped in cloth, the room is papered in damask, and what is left to read is everything else: the hands, the posture, the creature held close, the colour of the silk.";

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>(".w"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.2), 0), 1);
      const lit = p * words.length;
      words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="statement">
      <p className="eyebrow">The veil</p>
      <div className="statement__text" ref={ref}>
        {text.split(" ").map((w, i) => (
          <span key={i} className="w">
            {w}{" "}
          </span>
        ))}
      </div>
      <div className="statement__cols">
        <p>
          The figures in these paintings are dressed for a sitting from another century: ruffs,
          jabots, buttoned silk gowns, tailcoats. They pose the way aristocrats once posed for court
          painters. But their heads are crowned and covered in gele, aso-oke and Ankara, tied the
          way it is tied at a Lagos owambe.
        </p>
        <p>
          Hiding the face does not erase the sitter. It moves the portrait somewhere else, into the
          gesture of a gloved hand, a father&apos;s arm around two daughters, a dove resting on a
          wrist. You stop asking who they are and start noticing how they are.
        </p>
      </div>
    </section>
  );
}
