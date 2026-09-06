"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-linked progress as a CSS custom property (--p: 0→1) on the
 * returned element. Driven by an rAF loop that only runs while the
 * section is near the viewport (IntersectionObserver toggles it), so
 * there is no scroll listener and no React re-render per frame.
 *
 * CSS consumes --p with calc()/clamp() to build scroll choreography.
 * With prefers-reduced-motion, --p is pinned to 1 (final state, static).
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let raf = 0;
    let active = false;

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = r.height + vh * 0.25;
      const p = Math.min(1, Math.max(0, (vh - r.top) / span));
      el.style.setProperty("--p", p.toFixed(4));
    };

    const loop = () => {
      if (!active) return;
      update();
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) {
          update();
          raf = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "25% 0px" },
    );

    io.observe(el);
    update();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

export const revealIn = (start: number, span = 0.4) =>
  `clamp(0, calc((var(--p) - ${start}) / ${span}), 1)`;
