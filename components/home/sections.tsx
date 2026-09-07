import Link from "next/link";
import Image from "next/image";
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
import { GALLERY_ITEMS } from "@/lib/gallery";

/**
 * Homepage gallery preview reads lib/gallery.ts directly, so photos and
 * pending frames stay in sync with the /gallery page. Preview shows the
 * newest items first, capped for the landing rhythm; the link hands off
 * to the full gallery.
 */
export function GalleryPreview() {
  const preview = GALLERY_ITEMS.slice(-6).reverse();
  const total = GALLERY_ITEMS.length;

  return (
    <section className="home-section home-section--sun" aria-label="Gallery preview">
      <div className="container-page">
        <div className="section-head">
          <h2 className="display section-title">Kenangan yang menunggu.</h2>
          <p className="section-sub">
            {total === 0
              ? "Galeri 7E dibuka hanya dengan foto kelas yang sah, bukan foto stok, bukan ingatan palsu. Setiap bingkai menunggu giliran aslinya."
              : `${total} kenangan sudah masuk arsip 7E — bukan foto stok, bukan ingatan palsu. Buka galeri untuk lihat semuanya.`}
          </p>
          <Link href="/gallery" className="section-link">
            Lihat galeri →
          </Link>
        </div>
        <div className="gallery-preview">
          {preview.map((item) => (
            <figure
              key={item.title}
              className={`gallery-frame card ${item.src ? "has-photo" : "is-pending"}`}
            >
              {item.src ? (
                <>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="gallery-frame-photo"
                  />
                  <figcaption className="gallery-frame-caption">
                    {item.title}
                  </figcaption>
                </>
              ) : (
                <>
                  <figcaption>{item.title}</figcaption>
                  <span className="gallery-frame-tag" aria-hidden="true">
                    Menunggu foto
                  </span>
                </>
              )}
            </figure>
          ))}
        </div>
        {total > 6 && (
          <p className="gallery-preview-more">
            +{total - 6} kenangan lainnya di{" "}
            <Link href="/gallery">galeri lengkap</Link>.
          </p>
        )}
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
