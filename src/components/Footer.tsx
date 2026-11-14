import { artist } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer" id="enquire" data-theme="light">
      <p className="eyebrow">Collect · Commission · Visit</p>
      <h2 className="footer__title">
        Sit for <em>a portrait.</em>
      </h2>
      <p className="footer__lede">
        Original works are available directly from the studio. For acquisitions, commissioned
        portraits and studio visits, send a message.
      </p>
      <div className="footer__cta">
        <a className="pill pill--big" href={artist.instagram} target="_blank" rel="noreferrer">
          Message on Instagram
        </a>
        <a className="pill pill--ghost pill--big" href="#works">
          View the works
        </a>
      </div>
      <a href="#top" className="footer__logo" aria-label={`${artist.name}, back to top`}>
        <Logo size="xl" />
      </a>
      <div className="footer__base">
        <span>© 2026 {artist.name}</span>
        <span>{artist.city}</span>
        <a href={artist.instagram} target="_blank" rel="noreferrer">
          @{artist.handle}
        </a>
      </div>
    </footer>
  );
}
