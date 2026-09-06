"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CONTACT_RAFA, waLink } from "@/lib/contact";
import { useCurvedMenu } from "@/components/curved-menu";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { open, toggleMenu } = useCurvedMenu();

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

          <div className="site-nav-actions">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary site-nav-cta"
            >
              {CONTACT_RAFA.label}
            </a>
            <button
              type="button"
              className="site-nav-burger"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              onClick={toggleMenu}
            >
              <span className={`site-nav-burger-bar${open ? " is-open" : ""}`} />
              <span className={`site-nav-burger-bar${open ? " is-open" : ""}`} />
              <span className={`site-nav-burger-bar${open ? " is-open" : ""}`} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
