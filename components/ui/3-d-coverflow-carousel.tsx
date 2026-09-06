"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { Student } from "@/lib/students";

/**
 * 3D coverflow student archive - photo-led digital yearbook. Active
 * portrait is the focal point; neighbors recede in perspective. Card
 * transforms derive from two CSS vars (--o offset, --d depth) so all
 * responsiveness lives in CSS. No photo = designed placeholder, never
 * a stock face. Photos arrive via data only.
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
        aria-label={`Arsip siswa 7E - siswa ${active + 1} dari ${students.length}`}
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
            <div
              key={s.id}
              className={`coverflow-card${o === 0 ? " is-active" : ""}`}
              style={{ "--o": o, "--d": d } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${s.name}, absen ${s.absentNumber}${s.role === "Class President" ? ", Class President" : ""}`}
                aria-current={o === 0}
                className="coverflow-card-hit"
              >
                <span className="coverflow-card-photo">
                  {s.photo ? (
                    <Image
                      src={s.photo}
                      alt={s.name}
                      fill
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
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
                  <span className="coverflow-card-shade" aria-hidden="true" />
                  <span className="coverflow-card-mark" aria-hidden="true">
                    7E
                  </span>
                </span>
              </button>
              <span className="coverflow-card-body">
                <span className="coverflow-card-name">{s.name}</span>
                <span className="coverflow-card-role">
                  {s.role === "Class President"
                    ? "Class President"
                    : "Student"}
                </span>
                <span className="coverflow-card-absen">
                  Absen {String(s.absentNumber).padStart(2, "0")}
                </span>
              </span>
              {o === 0 && (
                <Link
                  href={`/students/${s.id}`}
                  className="coverflow-card-cta"
                >
                  View profile →
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="coverflow-caption" aria-live="polite">
        <p className="coverflow-caption-count">
          {String(active + 1).padStart(2, "0")} / {students.length}
        </p>
        <p className="coverflow-caption-note">
          Belum berfoto? Hubungi Rafa untuk menambahkan fotomu di arsip ini.
        </p>
      </div>

      <div className="coverflow-controls">
        <button
          type="button"
          className="coverflow-arrow"
          aria-label="Siswa sebelumnya"
          onClick={() => go(-1)}
        >
          ←
        </button>
        <input
          type="range"
          className="coverflow-scrub"
          min={0}
          max={students.length - 1}
          value={active}
          onChange={(e) => setActive(Number(e.target.value))}
          aria-label="Pilih siswa dalam arsip"
        />
        <button
          type="button"
          className="coverflow-arrow"
          aria-label="Siswa berikutnya"
          onClick={() => go(1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
