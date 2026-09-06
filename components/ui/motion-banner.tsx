"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "7e-motion-choice";

/**
 * When the OS reports prefers-reduced-motion, offer an explicit choice:
 * "Matikan" forces animations on for this site only (html.motion-forced,
 * persisted); "Biarkan" keeps the static experience and never asks again.
 * The banner also dismisses itself if the OS setting is switched off.
 */
export function MotionBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "forced") {
        document.documentElement.classList.add("motion-forced");
      }
      setShow(
        mq.matches &&
          stored !== "declined" &&
          !document.documentElement.classList.contains("motion-forced"),
      );
    };

    const raf = requestAnimationFrame(evaluate);
    mq.addEventListener("change", evaluate);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", evaluate);
    };
  }, []);

  const forceMotion = () => {
    localStorage.setItem(STORAGE_KEY, "forced");
    document.documentElement.classList.add("motion-forced");
    setShow(false);
  };

  const keepStatic = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div role="status" className="motion-banner">
      <p className="motion-banner-text">
        Halo, reduce motion kamu aktif nih! Kalau kamu ingin melihat semua
        animasi website ini, nyalakan dulu ya.
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
