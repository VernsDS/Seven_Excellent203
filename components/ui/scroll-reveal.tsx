"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-linked progress as CSS custom properties on the returned
 * element. --p: section progress 0→1 (viewport-relative). --exit:
 * pixels scrolled since the element's top crossed the viewport top,
 * clamped to 900 — used for scroll-out effects that must behave
 * identically on every device height. An rAF loop runs only while the
 * section is near the viewport (IO-gated): no scroll listener, no
 * re-render.
 *
 * Reduced motion is REACTIVE: if the OS/browser setting is on, values
 * are pinned to their final static state; the moment the setting flips
 * off (even mid-session), the scroll engine resumes — no reload needed.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let active = false;

    const update = () => {
      if (mq.matches) {
        el.style.setProperty("--p", "1");
        el.style.setProperty("--exit", "0");
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = r.height + vh * 0.25;
      const p = Math.min(1, Math.max(0, (vh - r.top) / span));
      const exit = Math.min(900, Math.max(0, -r.top));
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--exit", exit.toFixed(1));
    };

    const loop = () => {
      if (!active) return;
      update();
      raf = requestAnimationFrame(loop);
    };

    const onMqChange = () => {
      update();
      if (!mq.matches && !active) {
        raf = requestAnimationFrame(loop);
      }
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
    mq.addEventListener("change", onMqChange);
    update();

    return () => {
      io.disconnect();
      mq.removeEventListener("change", onMqChange);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

export const revealIn = (start: number, span = 0.4) =>
  `clamp(0, calc((var(--p) - ${start}) / ${span}), 1)`;
