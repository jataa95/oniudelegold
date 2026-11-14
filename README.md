# Oniudele Gold — Artistic Expressions

Portfolio site for the painter **Oniudele Gold** ([@oniudelegold](https://www.instagram.com/oniudelegold/)).

Built with Next.js (App Router). One scroll-driven page in chapters:

1. **Hero:** floating 3D ring of works and details
2. **The Veil:** artist statement with scroll-lit text
3. **Works:** horizontal pinned gallery with full-size lightbox
4. **Process:** tilted paper panel with studio/process reels
5. **Motifs:** interactive close-ups of recurring symbols
6. **Studio:** about the artist, then the enquiry footer

## Editing content

All copy, work titles and motif crops live in `src/lib/content.ts`.
Artwork images are in `src/assets/works/`, videos and posters in `public/media/`.

Work titles in `content.ts` are placeholders: replace them with the artist's own.

## Develop

```bash
npm install
npm run dev
```
