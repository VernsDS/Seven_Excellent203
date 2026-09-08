'use client'

import { useEffect, useState } from 'react';
import CubeLoader from '@/components/ui/CubeLoader';

const MIN_DISPLAY_MS = 900;
const FADE_MS = 450;
const FALLBACK_MS = 8000;

/**
 * Fullscreen loading overlay: tampil seketika, hilang HANYA setelah
 * window "load" (semua asset selesai) + minimal display time, lalu
 * fade-out dan di-unmount. Fallback 8s kalau load event macet.
 */
export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const dismiss = () => {
      if (cancelled) return;
      setHidden(true);
      timers.push(setTimeout(() => !cancelled && setUnmounted(true), FADE_MS));
    };

    const start = () => {
      const elapsed = performance.now();
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      timers.push(setTimeout(dismiss, wait));
    };

    if (document.readyState === 'complete') {
      start();
    } else {
      window.addEventListener('load', start, { once: true });
      timers.push(setTimeout(start, FALLBACK_MS)); // fallback: jangan pernah nge-lock
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  if (unmounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-[450ms] ease-out ${hidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <CubeLoader />
    </div>
  );
}
