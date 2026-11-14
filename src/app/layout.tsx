import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Geist } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oniudele Gold — Artistic Expressions",
  description:
    "Veiled portraits in damask rooms. Paintings by Oniudele Gold, Lagos.",
  openGraph: {
    title: "Oniudele Gold — Artistic Expressions",
    description: "Veiled portraits in damask rooms. Paintings by Oniudele Gold, Lagos.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
