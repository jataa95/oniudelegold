import type { StaticImageData } from "next/image";
import fathersArms from "@/assets/works/fathers-arms.jpg";
import keeper from "@/assets/works/keeper.jpg";
import theCall from "@/assets/works/the-call.jpg";
import gentlemen from "@/assets/works/the-gentlemen-detail.jpg";
import studio from "@/assets/works/studio-artist.jpg";

export const artist = {
  name: "Oniudele Gold",
  handle: "oniudelegold",
  instagram: "https://www.instagram.com/oniudelegold/",
  city: "Lagos, Nigeria",
};

export type Work = {
  slug: string;
  /** Working titles — replace with the artist's own titles. */
  title: string;
  year: string;
  note: string;
  image: StaticImageData;
  accent: string;
};

export const works: Work[] = [
  {
    slug: "fathers-arms",
    title: "In Father's Arms",
    year: "2026",
    note: "A father holds his daughters close: a red balloon, a gold bear, a butterfly passing through.",
    image: fathersArms,
    accent: "#c9a24c",
  },
  {
    slug: "keeper",
    title: "The Keeper",
    year: "2026",
    note: "Red silk, pearls and a lizard held like an heirloom against a field of lime damask.",
    image: keeper,
    accent: "#c9a24c",
  },
  {
    slug: "the-call",
    title: "The Call",
    year: "2026",
    note: "A ruffed collar, a haloed dove and an old rotary telephone waiting to ring.",
    image: theCall,
    accent: "#c9a24c",
  },
  {
    slug: "the-gentlemen",
    title: "The Gentlemen",
    year: "2026",
    note: "Twin dandies in turquoise coats and lace jabots, their heads crowned in Ankara.",
    image: gentlemen,
    accent: "#c9a24c",
  },
];

export const studioImage = studio;

export type Motif = {
  name: string;
  line: string;
  body: string;
  image: StaticImageData;
  /** focal point of the crop, in % of the image */
  x: number;
  y: number;
  zoom: number;
};

export const motifs: Motif[] = [
  {
    name: "The Veil",
    line: "A face withheld is a face protected.",
    body: "Wrapped, twisted and knotted cloth stands in for the face. The sitter keeps their identity; the fabric speaks for them in pattern and colour.",
    image: theCall,
    x: 48,
    y: 14,
    zoom: 2.1,
  },
  {
    name: "The Damask",
    line: "Old-world walls, painted loud.",
    body: "The patterned wallpapers of formal portraiture, turned up to full saturation: lime, saffron, mint, until the room itself becomes a character.",
    image: keeper,
    x: 82,
    y: 55,
    zoom: 1.9,
  },
  {
    name: "The Halo",
    line: "Small things, made holy.",
    body: "A thin ring floats above a dove, a lizard, a butterfly. The quiet companions in each picture are given the light usually saved for saints.",
    image: theCall,
    x: 40,
    y: 76,
    zoom: 2.6,
  },
  {
    name: "The Familiar",
    line: "Every sitter keeps company.",
    body: "Doves, lizards, butterflies, teddy bears. The creature or keepsake in the lap tells you who the veiled figure is when the face will not.",
    image: keeper,
    x: 44,
    y: 70,
    zoom: 2,
  },
  {
    name: "The Lace",
    line: "Dressed for a portrait centuries apart.",
    body: "Ruffs, jabots and buttoned silks borrowed from European court painting, worn here by Black bodies on their own terms.",
    image: gentlemen,
    x: 30,
    y: 52,
    zoom: 2.4,
  },
  {
    name: "The Telephone",
    line: "Someone is about to call.",
    body: "A rotary phone on a carved side table: a relic of waiting, of news from far away, of a line that connects home to elsewhere.",
    image: theCall,
    x: 14,
    y: 58,
    zoom: 2.6,
  },
];

export const processSteps = [
  { n: "01", t: "Line", d: "The figure is drawn straight onto raw canvas, life-size, by hand." },
  { n: "02", t: "Ground", d: "Flat fields of colour go down first: the yellow room, the lime wall." },
  { n: "03", t: "Figure", d: "Cloth, skin and silk are built up in layers until they catch the light." },
  { n: "04", t: "Veil", d: "Last comes the wrap: the fold, the twist, the pattern that hides the face." },
  { n: "05", t: "Home", d: "Wrapped, driven across Lagos and hung on a collector's wall." },
];
