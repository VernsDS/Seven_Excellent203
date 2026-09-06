"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { Student } from "@/lib/students";

/**
 * 3D Coverflow student showcase — 7E / Seven Excellent, SMPN 203 Jakarta.
 * Pure CSS 3D transforms (perspective + rotateY + translateZ), zero extra
 * dependencies. Card transforms are computed from two inline CSS vars
 * (--o signed offset, --d depth) so responsiveness lives entirely in CSS.
 *
 * Photos come from student data (`photo?: string`). Students without a
 * photo get an intentional placeholder — never a broken card, never a
 * stock face. Set photo to "/images/students/NN-slug.webp" when real
 * authorized assets arrive in public/images/students/.
 */
export function StudentCoverflow({ students }: { students: Student[] }) {
  const [active, setActive] = useState(0);
  const dragX = useRef<number | null>(null);
  const current = students[active];
  if (!current) throw new Error("StudentCoverflow received an empty list");

  const go = useCallback(
    (delta: number) => {
      setActive((a) => (a + delta + students.length) % students.length);
    },
    [students.length],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const delta = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  };

  return (
    <div className="coverflow">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={`Student showcase 7E — student ${active + 1} of ${students.length}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragX.current = null)}
        className="coverflow-stage"
      >
        {students.map((s, i) => {
          const o = i - active;
          const d = Math.abs(o);
          if (d > 3) return null;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${s.name}, absen ${s.absentNumber}${s.role === "Class President" ? ", Class President" : ""}`}
              aria-current={o === 0}
              className={`coverflow-card${o === 0 ? " is-active" : ""}`}
              style={{ "--o": o, "--d": d } as React.CSSProperties}
            >
              <span className="coverflow-card-photo">
                {s.photo ? (
                  <Image
                    src={s.photo}
                    alt={s.name}
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
                    draggable={false}
                  />
                ) : (
                  <span className="coverflow-placeholder" aria-hidden="true">
                    <span className="coverflow-placeholder-no">
                      {String(s.absentNumber).padStart(2, "0")}
                    </span>
                    <span className="coverflow-placeholder-label">
                      Photo coming soon
                    </span>
                  </span>
                )}
                <span className="coverflow-card-mark" aria-hidden="true">
                  7E
                </span>
              </span>
              <span className="coverflow-card-name">{s.name}</span>
              <span className="coverflow-card-meta">
                Absen {String(s.absentNumber).padStart(2, "0")}
                {s.role === "Class President" ? " · Class President" : ""}
              </span>
            </button>
          );
        })}
      </div>

      <div className="coverflow-caption" aria-live="polite">
        <div className="coverflow-caption-main">
          <p className="coverflow-caption-name">{current.name}</p>
          <p className="coverflow-caption-meta">
            Absen {String(current.absentNumber).padStart(2, "0")} ·{" "}
            {current.role}
          </p>
          {!current.photo && (
            <p className="coverflow-caption-note">
              Fotonya belum ada. Merasa ini kamu? Hubungi Rafa untuk
              menambahkan fotomu di arsip ini.
            </p>
          )}
        </div>
        <Link
          href={`/students/${current.id}`}
          className="btn btn-ghost coverflow-caption-cta"
        >
          View profile
        </Link>
      </div>

      <div className="coverflow-controls">
        <button
          type="button"
          className="coverflow-arrow"
          aria-label="Previous student"
          onClick={() => go(-1)}
        >
          ←
        </button>
        <div className="coverflow-dots" role="presentation">
          {students.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to ${s.name}, absen ${s.absentNumber}`}
              aria-current={i === active}
              className={`coverflow-dot${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="coverflow-arrow"
          aria-label="Next student"
          onClick={() => go(1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
