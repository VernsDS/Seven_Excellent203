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
            <span className="site-nav-badge display">7E</span>
            <span className="site-nav-wordmark">
              Seven <em>Excellent</em>
            </span>
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

          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary site-nav-cta site-nav-cta-mobile"
          >
            {CONTACT_RAFA.label}
          </a>
        </div>
      </header>
    </>
  );
}
