"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONTACT_RAFA, waLink } from "@/lib/contact";

const LINKS = [
  { href: "/students", label: "Students" },
  { href: "/gallery", label: "Gallery" },
  { href: "/schedule", label: "Schedule" },
  { href: "/about", label: "About" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      {},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
      <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="container-page site-nav-inner">
          <Link href="/" className="site-nav-brand">
            <span className="display">7E</span>
            <span>Seven Excellent</span>
          </Link>

          <nav aria-label="Primary" className="site-nav-links">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={pathname === l.href ? "is-current" : undefined}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary site-nav-cta"
            >
              {CONTACT_RAFA.label}
            </a>
          </nav>

          <button
            type="button"
            className="site-nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Tutup" : "Menu"}
          </button>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="site-nav-mobile">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              {CONTACT_RAFA.label}
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
