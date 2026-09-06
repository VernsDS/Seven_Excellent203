"use client";

import Image from "next/image";
import { useScrollProgress } from "@/components/ui/scroll-reveal";

/**
 * Class identity — scroll-linked editorial composition. The logo travels
 * from far left with depth rotation as the section scrolls through the
 * viewport (--p 0→1); headline, subline and supporting copy follow with
 * staggered windows. Pure CSS consumes the progress variable.
 */
export function ClassIdentity() {
  const ref = useScrollProgress<HTMLElement>();

  return (
    <section ref={ref} className="class-identity" aria-label="Class identity">
      <div className="container-page class-identity-inner">
        <div className="class-identity-logo">
          <Image
            src="/images/branding/class-logo.jpg"
            alt="Logo kelas 7E Seven Excellent"
            width={300}
            height={300}
            sizes="(max-width: 768px) 200px, 300px"
            className="class-identity-logo-img"
          />
        </div>
        <div className="class-identity-text">
          <h2 className="display class-identity-title">
            Seven Excellent
          </h2>
          <p className="class-identity-sub">7E · SMPN 203 Jakarta</p>
          <p className="class-identity-copy">
            36 murid, satu ruang kelas, dan satu arsip yang menjaga setiap
            jejak tahun ajaran ini — dibuat agar kenangan 7E tetap bisa
            dibuka kembali kapan saja.
          </p>
        </div>
      </div>
    </section>
  );
}
