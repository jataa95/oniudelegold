import Image from "next/image";
import { artist, studioImage } from "@/lib/content";

export default function Studio() {
  return (
    <section className="studio" id="studio">
      <div className="studio__img">
        <Image
          src={studioImage}
          alt={`${artist.name} in the studio beside a canvas of two veiled gentlemen`}
          sizes="(max-width: 800px) 100vw, 60vw"
          placeholder="blur"
        />
      </div>
      <div className="studio__copy">
        <p className="eyebrow">The studio</p>
        <h2 className="display">
          Painted <em>big,</em> <br />
          by hand, <br />
          in Lagos.
        </h2>
        <p>
          {artist.name} works on unstretched canvas pinned straight to the studio wall, often taller
          than the painter. Paint-spattered jeans, masking tape, a wall of plywood scrawled with
          notes. The finished pictures are anything but rough: every fold of silk and every curl of
          damask is laid down by hand.
        </p>
        <p>Studio visits, commissions and acquisitions by appointment.</p>
      </div>
    </section>
  );
}
