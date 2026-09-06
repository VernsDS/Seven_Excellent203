import Link from "next/link";
import {
  Users,
  School,
  UserCheck,
  Crown,
  GraduationCap,
} from "lucide-react";
import { CLASS_INFO, STUDENTS } from "@/lib/students";
import { president } from "@/lib/students";
import { CONTACT_RAFA, waLink } from "@/lib/contact";

export function GalleryPreview() {
  const frames = [
    { label: "Rapat kelas", ratio: "aspect-[4/3]" },
    { label: "Foto bersama", ratio: "aspect-[3/4] md:mt-10" },
    { label: "Belajar kelompok", ratio: "aspect-square" },
    { label: "Pekan olahraga", ratio: "aspect-[4/3] md:mt-16" },
    { label: "Praktikum", ratio: "aspect-[3/4]" },
    { label: "Jam istirahat", ratio: "aspect-square md:-mt-8" },
  ];

  return (
    <section className="home-section home-section--sun" aria-label="Gallery preview">
      <div className="container-page">
        <div className="section-head">
          <h2 className="display section-title">Kenangan yang menunggu.</h2>
          <p className="section-sub">
            Galeri 7E dibuka hanya dengan foto kelas yang sah, bukan foto
            stok, bukan ingatan palsu. Setiap bingkai menunggu giliran aslinya.
          </p>
          <Link href="/gallery" className="section-link">
            Lihat galeri →
          </Link>
        </div>
        <div className="gallery-preview">
          {frames.map((f) => (
            <figure
              key={f.label}
              className={`gallery-frame card ${f.ratio}`}
            >
              <figcaption>{f.label}</figcaption>
              <span className="gallery-frame-tag" aria-hidden="true">
                Asset pending
              </span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const DAYS = [
  { name: "Senin", tint: "var(--coral-soft)", accent: "var(--coral-deep)" },
  { name: "Selasa", tint: "var(--sky-soft)", accent: "var(--sky-deep)" },
  { name: "Rabu", tint: "var(--sun-soft)", accent: "#8a6d00" },
  { name: "Kamis", tint: "var(--sky-soft)", accent: "var(--sky-deep)" },
  { name: "Jumat", tint: "var(--coral-soft)", accent: "var(--coral-deep)" },
] as const;

export function SchedulePreview() {
  return (
    <section className="home-section" aria-label="Schedule preview">
      <div className="container-page">
        <div className="section-head">
          <h2 className="display section-title">Minggu 7E, jam demi jam.</h2>
          <p className="section-sub">
            Jadwal lengkap tampil hanya setelah data asli dirilis. Sesuai
            aturan kelas, tidak ada yang ditampilkan setengah jadi.
          </p>
          <Link href="/schedule" className="section-link">
            Halaman jadwal →
          </Link>
        </div>
        <div className="schedule-preview">
          {DAYS.map((d) => (
            <div
              key={d.name}
              className="schedule-day card"
              style={{ background: d.tint }}
            >
              <span className="schedule-day-name" style={{ color: d.accent }}>
                {d.name}
              </span>
              <span className="schedule-day-mark" aria-hidden="true">
                —
              </span>
              <span className="schedule-day-note">Menunggu jadwal</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutPreview() {
  const pres = president();

  const stats = [
    { icon: Users, label: "Jumlah murid", value: String(STUDENTS.length), tint: "var(--coral-soft)", fg: "var(--coral-deep)" },
    { icon: Crown, label: "Ketua kelas", value: pres.name, tint: "var(--sun-soft)", fg: "#8a6d00" },
    { icon: GraduationCap, label: "Wali kelas", value: CLASS_INFO.teacher, tint: "var(--sky-soft)", fg: "var(--sky-deep)" },
    { icon: School, label: "Sekolah", value: CLASS_INFO.school, tint: "var(--coral-soft)", fg: "var(--coral-deep)" },
  ];

  return (
    <section className="home-section home-section--sky" aria-label="About preview">
      <div className="container-page">
        <div className="section-head">
          <h2 className="display section-title">
            Nama itu standar, bukan hiasan.
          </h2>
          <p className="section-sub">
            Seven Excellent adalah kelas 7E di {CLASS_INFO.school}. Nama kelas
            kami pegang sebagai standar kerja: apa pun yang keluar dari 7E,
            keluar dengan identitas itu.
          </p>
          <Link href="/about" className="section-link">
            Tentang 7E →
          </Link>
        </div>
        <div className="about-stats">
          {stats.map((s) => (
            <div key={s.label} className="stat-card card">
              <span
                className="stat-icon"
                style={{ background: s.tint, color: s.fg }}
              >
                <s.icon size={20} strokeWidth={2} />
              </span>
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
            </div>
          ))}
        </div>
        <p className="about-footnote">
          <UserCheck size={16} aria-hidden="true" /> Dikelola bersama oleh
          seluruh murid 7E. Ada foto untuk ditambahkan?{" "}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="stream-note-link"
          >
            {CONTACT_RAFA.label}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta" aria-label="Final call to action">
      <div className="container-page final-cta-inner">
        <p className="final-cta-count display">
          {STUDENTS.length.toString().padStart(2, "0")}
        </p>
        <h2 className="display final-cta-title">
          Satu kelas. Tiga puluh enam nama. Satu arsip.
        </h2>
        <div className="hero-cta">
          <Link href="/students" className="btn btn-primary">
            Buka arsip kelas
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            {CONTACT_RAFA.label}
          </a>
        </div>
      </div>
    </section>
  );
}
