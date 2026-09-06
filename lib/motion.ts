/**
 * Shared motion-preference helpers. Animations run when the OS allows
 * them OR the user pressed "Matikan" in the reduce-motion notice for
 * this tab session (sessionStorage flag, checked by every GSAP
 * component and mirrored to html.motion-forced for the CSS gates).
 */
export const MOTION_FLAG_KEY = "override-reduced-motion";

export function motionForced(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(MOTION_FLAG_KEY) === "true";
}

export function setMotionForced(on: boolean): void {
  if (typeof window === "undefined") return;
  if (on) sessionStorage.setItem(MOTION_FLAG_KEY, "true");
  else sessionStorage.removeItem(MOTION_FLAG_KEY);
  document.documentElement.classList.toggle("motion-forced", on);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
