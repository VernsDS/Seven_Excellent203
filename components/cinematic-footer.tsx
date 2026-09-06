"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionForced, prefersReducedMotion } from "@/lib/motion";
import { CONTACT_RAFA, waLink } from "@/lib/contact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reduceActive = () =>
  prefersReducedMotion() && !motionForced();

const MAGNETIC_SELECTOR = ".footer-magnetic";

function Magnetic({
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
}) {
  return (
    <a {...props} className={`footer-magnetic ${className ?? ""}`}>
      {children}
    </a>
  );
}

/**
 * Cinematic footer adapted for 7E: curtain-reveal footer with identity
 * marquee, magnetic glass pills, ghost 7E, all reading Zen Linen tokens.
 * GSAP scrub reveals; reduced motion renders everything in place.
 */
export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const magnetic = wrapper.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR);
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      if (!reduceActive()) {
        gsap.fromTo(
          giantTextRef.current,
          { y: "10vh", scale: 0.8, opacity: 0 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 40%",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );
      }

      if (
        !reduceActive() &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        magnetic.forEach((el) => {
          const move = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, {
              x: x * 0.4,
              y: y * 0.4,
              rotationX: -y * 0.15,
              rotationY: x * 0.15,
              scale: 1.05,
              ease: "power2.out",
              duration: 0.4,
            });
          };
          const leave = () => {
            gsap.to(el, {
              x: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              ease: "elastic.out(1, 0.3)",
              duration: 1.2,
            });
          };
          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          });
        });
      }
    }, wrapper);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      ref={wrapperRef}
      className="footer-curtain"
      aria-label="Footer situs kelas"
    >
      <footer className="cinematic-footer">
        <div className="footer-aurora" aria-hidden="true" />
        <div className="footer-bg-grid" aria-hidden="true" />
        <div
          ref={giantTextRef}
          className="footer-giant-bg-text"
          aria-hidden="true"
        >
          7E
        </div>

        <div className="footer-marquee-band" aria-hidden="true">
          <div className="footer-marquee">
            {[0, 1].map((dup) => (
              <div className="footer-marquee-track" key={dup} aria-hidden={dup === 1}>
                <span>Kelas 7E</span>
                <span className="footer-marquee-dot footer-marquee-dot--coral">✦</span>
                <span>SMPN 203 Jakarta</span>
                <span className="footer-marquee-dot footer-marquee-dot--sky">✦</span>
                <span>36 Murid</span>
                <span className="footer-marquee-dot footer-marquee-dot--coral">✦</span>
                <span>Wali Kelas Yohanes Christian</span>
                <span className="footer-marquee-dot footer-marquee-dot--sky">✦</span>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-center">
          <h2 ref={headingRef} className="footer-heading display">
            Satu kelas.
            <br />
            Satu arsip.
          </h2>

          <div ref={linksRef} className="footer-links">
            <div className="footer-cta-row">
              <Magnetic href="/students" className="footer-glass-pill footer-pill-lg">
                Lihat Arsip Kelas
              </Magnetic>
              <Magnetic
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill footer-pill-lg"
              >
                {CONTACT_RAFA.label}
              </Magnetic>
            </div>

            <div className="footer-legal-row">
              <Magnetic href="/privacy" className="footer-glass-pill footer-pill-sm">
                Privacy Policy
              </Magnetic>
              <Magnetic href="/terms" className="footer-glass-pill footer-pill-sm">
                Terms of Service
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="footer-base">
          <p className="footer-copy">© 2026 Seven Excellent 7E. Kelas 7E, SMPN 203 Jakarta.</p>
          <p className="footer-crafted">
            <span>Dirawat dengan</span>
            <span className="footer-heart" aria-hidden="true">♥</span>
            <span>oleh</span>
            <strong>7E</strong>
          </p>
          <button
            type="button"
            className="footer-glass-pill footer-top-btn footer-magnetic"
            aria-label="Kembali ke atas"
            onClick={scrollToTop}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
