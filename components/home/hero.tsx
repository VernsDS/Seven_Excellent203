"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionForced, prefersReducedMotion } from "@/lib/motion";
import { CLASS_INFO } from "@/lib/students";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reduceActive = () =>
  prefersReducedMotion() && !motionForced();

/**
 * Hero: bright playful editorial. GSAP scrub drives the layered exit:
 * the giant 7E and wordmark drift up at different rates while the copy
 * fades, as the next section enters. Reduced motion = fully static.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLHeadingElement>(null);
  const bigRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    let ctx: gsap.Context | undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const build = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        if (reduceActive()) {
          gsap.set([stackRef.current, bigRef.current, copyRef.current], {
            clearProps: "all",
          });
          return;
        }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom 30%",
            scrub: 1,
          },
        });
        tl.to(stackRef.current, { y: -56, ease: "none" }, 0)
          .to(bigRef.current, { y: -24, scale: 0.995, ease: "none" }, 0)
          .to(copyRef.current, { opacity: 0, ease: "none" }, 0);
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
    <section ref={ref} className="hero">
      <div className="hero-decor" aria-hidden="true">
        <span className="hero-blob hero-blob--coral" />
        <span className="hero-blob hero-blob--sky" />
        <span className="hero-blob hero-blob--sun" />
        <span className="hero-dots" />
      </div>
      <div className="container-page hero-inner">
        <p className="hero-eyebrow rise">
          Kelas 7E, {CLASS_INFO.school}
        </p>

        <h1 ref={stackRef} className="hero-stack rise rise-1" aria-label="Seven Excellent 7E">
          <span ref={bigRef} className="hero-7e" aria-hidden="true">
            7E
          </span>
          <span className="hero-word" aria-hidden="true">
            Seven
            <br />
            Excellent
          </span>
        </h1>

        <p ref={copyRef} className="hero-copy rise rise-2">
          Arsip digital resmi kelas 7E: 36 murid, satu ruang kelas, dan satu
          tahun yang tidak mau dilupakan begitu saja.
        </p>

        <div className="hero-cta rise rise-3">
          <Link href="/students" className="btn btn-primary">
            Meet the class
          </Link>
          <Link href="/about" className="btn btn-ghost">
            Explore 7E
          </Link>
        </div>

        <div className="hero-meta rise rise-4">
          <Image
            src="/images/branding/class-logo.jpg"
            alt=""
            width={44}
            height={44}
            className="hero-logo"
            aria-hidden="true"
          />
          <span>SMPN 203 Jakarta</span>
          <span className="hero-meta-dot" aria-hidden="true" />
          <span>36 murid</span>
          <span className="hero-meta-dot" aria-hidden="true" />
          <span>Wali kelas: {CLASS_INFO.teacher}</span>
        </div>
      </div>
    </section>
  );
}
