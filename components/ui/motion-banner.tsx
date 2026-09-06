"use client";

import { useEffect, useState } from "react";
import { MOTION_FLAG_KEY, setMotionForced } from "@/lib/motion";

/**
 * Reduce-motion notice, per spec: appears on every full page load while
 * the OS setting is active (sessionStorage only, never localStorage).
 * "Matikan" forces full animation for this tab session; "Biarkan"
 * dismisses for the session and the site stays reduced.
 */
export function MotionBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      const override = sessionStorage.getItem(MOTION_FLAG_KEY) === "true";
      document.documentElement.classList.toggle("motion-forced", override);
      setShow(mq.matches && !override);
    };

    const raf = requestAnimationFrame(evaluate);
    mq.addEventListener("change", evaluate);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", evaluate);
    };
  }, []);

  const forceMotion = () => {
    setMotionForced(true);
    setShow(false);
    // Reload so every GSAP component rebuilds its timelines with the
    // override active from the first tick (banner flow, spec'd behavior).
    window.location.reload();
  };

  const keepStatic = () => {
    setMotionForced(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div role="status" className="motion-banner">
      <p className="motion-banner-text">
        Reduce motion kamu aktif nih, matikan untuk melihat seluruh animasi
        di website ini.
      </p>
      <div className="motion-banner-actions">
        <button
          type="button"
          className="btn btn-primary motion-banner-btn"
          onClick={forceMotion}
        >
          Matikan
        </button>
        <button
          type="button"
          className="btn btn-ghost motion-banner-btn"
          onClick={keepStatic}
        >
          Biarkan
        </button>
      </div>
    </div>
  );
}
