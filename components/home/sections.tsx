import Link from "next/link";
import { CLASS_INFO, STUDENTS } from "@/lib/students";
import { president } from "@/lib/students";

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
    <section className="home-section" aria-label="Gallery preview">
      <div className="container-page">
        <div className="section-head">
          <h2 className="display section-title">Kenangan yang menunggu.</h2>
          <p className="section-sub">
            Galeri 7E dibuka hanya dengan foto kelas yang sah — bukan foto
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
              className={`gallery-frame ${f.ratio}`}
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

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"] as const;

export function SchedulePreview() {
  return (
    <section className="home-section home-section--tight" aria-label="Schedule preview">
      <div className="container-page">
        <div className="section-head">
          <h2 className="display section-title">Minggu 7E, jam demi jam.</h2>
          <p className="section-sub">
            Jadwal lengkap tampil hanya setelah data asli dirilis — sesuai
            aturan kelas, tidak ada yang ditampilkan setengah jadi.
          </p>
          <Link href="/schedule" className="section-link">
            Halaman jadwal →
          </Link>
        </div>
        <div className="schedule-preview">
          {DAYS.map((day) => (
            <div key={day} className="schedule-day">
              <span className="schedule-day-name">{day}</span>
              <span className="schedule-day-mark" aria-hidden="true">
                —
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutPreview() {
  const pres = president();

  return (
    <section className="home-section" aria-label="About preview">
      <div className="container-page about-preview">
        <div>
          <h2 className="display section-title">
            Nama itu standar, bukan hiasan.
          </h2>
          <p className="section-sub">
            Seven Excellent adalah kelas 7E di {CLASS_INFO.school} — 36 murid
            dengan nomor absen 01 sampai 36, dipandu wali kelas{" "}
            {CLASS_INFO.teacher}. Nama kelas kami pegang sebagai standar kerja:
            apa pun yang keluar dari 7E, keluar dengan identitas itu.
          </p>
          <Link href="/about" className="section-link">
            Tentang 7E →
          </Link>
        </div>
        <dl className="about-facts">
          <div>
            <dt>Kelas</dt>
            <dd>7E — Seven Excellent</dd>
          </div>
          <div>
            <dt>Sekolah</dt>
            <dd>{CLASS_INFO.school}</dd>
          </div>
          <div>
            <dt>Jumlah murid</dt>
            <dd>36</dd>
          </div>
          <div>
            <dt>Ketua kelas</dt>
            <dd>
              {pres.name} ({pres.absentNumber})
            </dd>
          </div>
          <div>
            <dt>Wali kelas</dt>
            <dd>{CLASS_INFO.teacher}</dd>
          </div>
        </dl>
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
        </div>
      </div>
    </section>
  );
}
