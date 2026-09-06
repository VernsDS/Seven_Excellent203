import type { Metadata } from "next";
import {
  Users,
  School,
  Crown,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { CLASS_INFO, president, STUDENTS } from "@/lib/students";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tentang Kelas 7E Seven Excellent, SMPN 203 Jakarta: 36 murid, satu arsip.",
};

export default function AboutPage() {
  const pres = president();

  const stats = [
    { icon: Users, label: "Jumlah murid", value: String(STUDENTS.length), tint: "var(--coral-soft)", fg: "var(--coral-deep)" },
    { icon: Crown, label: "Ketua kelas", value: pres.name, tint: "var(--sun-soft)", fg: "#8a6d00" },
    { icon: GraduationCap, label: "Wali kelas", value: CLASS_INFO.teacher, tint: "var(--sky-soft)", fg: "var(--sky-deep)" },
    { icon: School, label: "Sekolah", value: CLASS_INFO.school, tint: "var(--coral-soft)", fg: "var(--coral-deep)" },
    { icon: BookOpen, label: "Kelas", value: "7E - Seven Excellent", tint: "var(--sky-soft)", fg: "var(--sky-deep)" },
  ];

  return (
    <div className="container-page py-16">
      <p className="eyebrow-chip">About</p>
      <h1 className="display mt-3 max-w-3xl text-4xl text-balance-h md:text-5xl">
        Nama itu standar, bukan hiasan.
      </h1>

      <div className="mt-10 max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
        <p>
          Seven Excellent adalah kelas 7E di {CLASS_INFO.school}. Tiga puluh
          enam murid dengan nomor absen 01 sampai 36, dipandu wali kelas{" "}
          {CLASS_INFO.teacher}.
        </p>
        <p>
          Nama kelas kami pegang sebagai standar kerja: apa pun yang keluar
          dari 7E, keluar dengan identitas itu. Website ini adalah arsip
          digital kelas, dirawat bersama-sama, dibuka kapan saja.
        </p>
        <p>
          Roster di halaman Students itu lengkap dan resmi. Foto siswa
          ditambahkan satu per satu setelah asetnya beres, bukan asal tempel.
        </p>
      </div>

      <div className="about-stats mt-12">
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
    </div>
  );
}
