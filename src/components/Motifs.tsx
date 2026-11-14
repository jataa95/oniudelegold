"use client";

import Image from "next/image";
import { useState } from "react";
import { motifs } from "@/lib/content";

export default function Motifs() {
  const [i, setI] = useState(0);
  const m = motifs[i];

  return (
    <section className="motifs" id="motifs">
      <div className="motifs__view">
        <div className="motifs__frame">
          {motifs.map((mm, k) => (
            <Image
              key={mm.name}
              src={mm.image}
              alt={k === i ? `Detail: ${mm.name}` : ""}
              fill
              sizes="(max-width: 800px) 90vw, 45vw"
              className={k === i ? "is-on" : ""}
              style={{
                objectFit: "cover",
                objectPosition: `${mm.x}% ${mm.y}%`,
                transform: `scale(${k === i ? mm.zoom : mm.zoom * 0.85})`,
                transformOrigin: `${mm.x}% ${mm.y}%`,
              }}
            />
          ))}
        </div>
        <div className="motifs__copy">
          <p className="motifs__count">
            ( <span>{i + 1}</span> )
          </p>
          <h3 className="display">{m.name}</h3>
          <p className="motifs__line">{m.line}</p>
          <p>{m.body}</p>
        </div>
      </div>
      <div className="motifs__side">
        <h2 className="display">
          Six motifs. <br />
          <em>One language.</em>
        </h2>
        <p>
          The same few symbols return from canvas to canvas. Learn them and every new painting
          reads like a letter from someone you know.
        </p>
        <div className="motifs__tabs" role="tablist">
          {motifs.map((mm, k) => (
            <button
              key={mm.name}
              role="tab"
              aria-selected={k === i}
              className={k === i ? "is-on" : ""}
              onClick={() => setI(k)}
              onMouseEnter={() => setI(k)}
            >
              {mm.name.replace("The ", "")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
