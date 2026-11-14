import ChapterBar from "@/components/ChapterBar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Motifs from "@/components/Motifs";
import Process from "@/components/Process";
import Statement from "@/components/Statement";
import Studio from "@/components/Studio";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ChapterBar label="The Veil" n="01" />
        <Statement />
        <ChapterBar label="Works" n="02" />
        <Gallery />
        <Process />
        <ChapterBar label="Motifs" n="04" />
        <Motifs />
        <ChapterBar label="Studio" n="05" />
        <Studio />
      </main>
      <Footer />
    </>
  );
}
