"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reduceActive = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !document.documentElement.classList.contains("motion-forced");

/**
 * Class identity: GSAP scrub timeline. The logo travels from far left
 * with depth rotation as the section scrolls through the viewport; the
 * headline, subline and copy follow in staggered windows. One shared
 * scrub (1s) keeps motion smooth at any scroll speed. Reactive to
 * prefers-reduced-motion and the site's motion-forced override.
 */
export function ClassIdentity() {
  const ref = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const targets = [logoRef.current, titleRef.current, subRef.current, copyRef.current];

    let ctx: gsap.Context | undefined;
    const mq = window.matchMedia("prefers-reduced-motion: reduce");

    const build = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        if (reduceActive()) {
          gsap.set(targets, { clearProps: "all" });
          return;
        }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "center 45%",
            scrub: 1,
          },
        });
        tl.fromTo(
          logoRef.current,
          { xPercent: -85, rotateY: 45, scale: 0.72, opacity: 0 },
          { xPercent: 0, rotateY: 0, scale: 1, opacity: 1, ease: "power1.out" },
        )
          .fromTo(
            titleRef.current,
            { y: 64, opacity: 0 },
            { y: 0, opacity: 1, ease: "power1.out" },
            0.25,
          )
          .fromTo(
            subRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, ease: "power1.out" },
            0.4,
          )
          .fromTo(
            copyRef.current,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, ease: "power1.out" },
            0.55,
          );
      }, section);
    };

    build();

    const onMq = () => build();
    mq.addEventListener("change", onMq);

    return () => {
      mq?.removeEventListener("change", onMq);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={ref} className="class-identity" aria-label="Class identity">
      <div className="container-page class-identity-inner">
        <div ref={logoRef} className="class-identity-logo">
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
          <h2 ref={titleRef} className="display class-identity-title">
            Seven Excellent
          </h2>
          <p ref={subRef} className="class-identity-sub">7E · SMPN 203 Jakarta</p>
          <p ref={copyRef} className="class-identity-copy">
            36 murid, satu ruang kelas, dan satu arsip yang menjaga setiap
            jejak tahun ajaran ini, dibuat agar kenangan 7E tetap bisa
            dibuka kembali kapan saja.
          </p>
        </div>
      </div>
    </section>
  );
}
