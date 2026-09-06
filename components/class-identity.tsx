"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered class identity — logo enters from the left with a
 * slight depth rotation; text follows with a delay. Triggered once via
 * IntersectionObserver (no scroll listeners). Reduced motion: content
 * is immediately visible, no transforms.
 */
export function ClassIdentity() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`class-identity${visible ? " is-visible" : ""}`}
      aria-label="Class identity"
    >
      <div className="container-page class-identity-inner">
        <div className="class-identity-logo" aria-hidden="true">
          <Image
            src="/images/branding/class-logo.jpg"
            alt=""
            width={160}
            height={160}
            sizes="160px"
            className="class-identity-logo-img"
          />
        </div>
        <div className="class-identity-text">
          <h2 className="display">Seven Excellent</h2>
          <p className="class-identity-sub">7E · SMPN 203 Jakarta</p>
          <p className="class-identity-copy">
            36 murid dari 7E, satu ruang kelas yang menampung setiap
            kenangan SMPN 203 Jakarta — dirangkum jadi satu arsip digital
            yang tetap ada setelah tahun ajaran selesai.
          </p>
        </div>
      </div>
    </section>
  );
}
