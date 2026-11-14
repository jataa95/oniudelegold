import { artist } from "@/lib/content";

export default function Header() {
  return (
    <header className="header">
      <a href="#top" className="wordmark" aria-label={`${artist.name}, home`}>
        ONIUDELE<b>GOLD</b>
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
