"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionForced, prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reduceActive = () =>
  prefersReducedMotion() && !motionForced();

interface Tag {
  text: string;
  background: string;
  color: string;
}

const TAGS: Tag[] = [
  { text: "Kelas 7E", background: "var(--coral)", color: "#201a17" },
  { text: "SMPN 203 Jakarta", background: "var(--sky)", color: "#123240" },
  { text: "36 Murid", background: "var(--sun)", color: "#6b5a10" },
  { text: "Wali Kelas: Yohanes Christian", background: "var(--linen-card)", color: "#2b2620" },
];

const HEADING = "Tiga puluh enam nama, satu arsip yang terus jalan.";

/**
 * Scroll pin reveal, photo version: the class logo starts as a small
 * circle and expands to full-bleed while the section is pinned. Word
 * reveal is done by manually wrapping words in spans (no SplitText
 * needed). Reduced motion: no pin, image fully visible.
 */
export function HeroPinReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const words = root.querySelectorAll<HTMLElement>(".reveal-word");
      const tags = root.querySelectorAll<HTMLElement>(".pin-tag");
      const imageBox = root.querySelector<HTMLElement>(".pin-image-box");
      const imageWrapper = root.querySelector<HTMLElement>(".pin-image-wrapper");

      if (reduceActive()) {
        gsap.set([words, tags], { clearProps: "all" });
        gsap.set(imageBox, { clipPath: "none" });
        return;
      }

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector(".pin-benefit"),
          start: "top 70%",
          end: "top -10%",
          scrub: 1.5,
        },
      });

      revealTl.fromTo(
        words,
        { opacity: 0, rotate: 8, yPercent: 30 },
        {
          stagger: 0.12,
          opacity: 1,
          rotate: 0,
          yPercent: 0,
          ease: "power1.inOut",
        },
      );

      tags.forEach((tag) => {
        revealTl.to(
          tag,
          {
            duration: 1,
            opacity: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out",
          },
          ">-0.4",
        );
      });

      const mm = gsap.matchMedia();
      mm.add("(max-width: 639.9px)", () => {
        gsap.set(imageBox, { clipPath: "circle(18% at 50% 50%)" });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: imageWrapper,
              start: "top top",
              end: "+=1200",
              scrub: 1.2,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            },
          })
          .fromTo(
            imageBox,
            { clipPath: "circle(18% at 50% 50%)" },
            { clipPath: "circle(150% at 50% 50%)", ease: "none" },
          );
      });

      mm.add("(min-width: 640px) and (max-width: 1023.9px)", () => {
        gsap.set(imageBox, { clipPath: "circle(12% at 50% 50%)" });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: imageWrapper,
              start: "top top",
              end: "+=1600",
              scrub: 1.3,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            },
          })
          .fromTo(
            imageBox,
            { clipPath: "circle(12% at 50% 50%)" },
            { clipPath: "circle(150% at 50% 50%)", ease: "none" },
          );
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.set(imageBox, { clipPath: "circle(8% at 50% 50%)" });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: imageWrapper,
              start: "top top",
              end: "+=2000",
              scrub: 1.5,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            },
          })
          .fromTo(
            imageBox,
            { clipPath: "circle(8% at 50% 50%)" },
            { clipPath: "circle(150% at 50% 50%)", ease: "none" },
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="pin-reveal">
      <section className="pin-top-text">
        <p className="display">Kelas 7E, kelas yang katanya rajin.</p>
      </section>

      <section className="pin-benefit">
        <div className="pin-benefit-inner">
          <p className="pin-heading display">
            {HEADING.split(" ").map((w, i) => (
              <span className="reveal-word" key={`${w}-${i}`}>
                {w}
              </span>
            ))}
          </p>

          <div className="pin-tags">
            {TAGS.map((tag) => (
              <span
                key={tag.text}
                className="pin-tag"
                style={{ background: tag.background, color: tag.color }}
              >
                {tag.text}
              </span>
            ))}
          </div>

          <p className="pin-sub">
            Semua ada di satu tempat: daftar siswa, kenangan, jadwal, dan
            cerita kelasnya. Dibuka kapan saja, siapa saja.
          </p>
        </div>

        <div className="pin-image-wrapper">
          <div className="pin-image-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/branding/class-logo.jpg"
              alt="Logo kelas 7E Seven Excellent, SMPN 203 Jakarta"
            />
          </div>
        </div>
      </section>

      <section className="pin-bottom-text">
        <p className="display">Lanjut ke arsipnya.</p>
      </section>
    </div>
  );
}
