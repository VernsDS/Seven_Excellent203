"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Home,
  Users,
  Images,
  Search,
  LayoutGrid,
  X,
} from "lucide-react";
import { StudentAvatar } from "@/components/ui/avatar";
import { useCurvedMenu } from "@/components/curved-menu";
import { STUDENTS } from "@/lib/students";

type Overlay = "none" | "search";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/students", label: "Siswa", icon: Users },
  { href: "/gallery", label: "Galeri", icon: Images },
] as const;



export function FloatingNav() {
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [hidden, setHidden] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const lastY = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openMenu } = useCurvedMenu();

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y > 120 && delta > 6) setHidden(true);
      else if (delta < -6 || y <= 120) setHidden(false);
      lastY.current = y;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (overlay === "search") inputRef.current?.focus();
  }, [overlay]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOverlay("none"));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const q = query.trim().toLowerCase();
  const results = q
    ? STUDENTS.filter(
        (s) => s.name.toLowerCase().includes(q) || String(s.absentNumber) === q,
      )
    : [];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        aria-label="Navigasi cepat"
        className={`floating-nav${hidden ? " is-hidden" : ""}`}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`floating-nav-item${isActive(item.href) ? " is-active" : ""}`}
          >
            <span className="floating-nav-bubble">
              <item.icon size={20} strokeWidth={2} />
            </span>
            <span className="floating-nav-label">{item.label}</span>
          </Link>
        ))}
        <button
          type="button"
          className="floating-nav-item"
          aria-label="Cari siswa"
          onClick={() => setOverlay("search")}
        >
          <span className="floating-nav-bubble">
            <Search size={20} strokeWidth={2} />
          </span>
          <span className="floating-nav-label">Cari</span>
        </button>
        <button
          type="button"
          className="floating-nav-item"
          aria-label="Buka menu lainnya"
          onClick={() => {
            setOverlay("none");
            openMenu();
          }}
        >
          <span className="floating-nav-bubble">
            <LayoutGrid size={20} strokeWidth={2} />
          </span>
          <span className="floating-nav-label">Lainnya</span>
        </button>
      </nav>

      {overlay === "search" && (
        <div className="nav-overlay" role="dialog" aria-label="Cari siswa">
          <div className="nav-overlay-card">
            <div className="nav-overlay-head">
              <h2 className="display">Cari siswa 7E</h2>
              <button
                type="button"
                className="nav-overlay-close"
                aria-label="Tutup pencarian"
                onClick={() => setOverlay("none")}
              >
                <X size={20} />
              </button>
            </div>
            <input
              ref={inputRef}
              type="search"
              className="nav-search-input"
              placeholder="Nama atau nomor absen..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setOverlay("none")}
            />
            <div className="nav-search-results">
              {q && results.length === 0 && (
                <p className="nav-search-empty">
                  Tidak ada siswa cocok dengan &ldquo;{query}&rdquo;.
                </p>
              )}
              {results.map((s) => (
                <Link
                  key={s.id}
                  href={`/students/${s.id}`}
                  className="nav-search-row"
                  onClick={() => setOverlay("none")}
                >
                  <StudentAvatar
                    name={s.name}
                    absentNumber={s.absentNumber}
                    size="2.4rem"
                  />
                  <span className="nav-search-name">{s.name}</span>
                  <span className="nav-search-absen">
                    Absen {String(s.absentNumber).padStart(2, "0")}
                  </span>
                </Link>
              ))}
              {!q && (
                <p className="nav-search-empty">
                  Ketik nama atau nomor absen, 36 siswa ada di sini.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </>
  );
}
