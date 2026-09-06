import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Jadwal mingguan Kelas 7E Seven Excellent, SMPN 203 Jakarta.",
};

/**
 * No timetable data has been supplied yet, so each day renders as a
 * titled card with an honest pending state. Replace the day arrays
 * with real subjects/times when the class publishes them.
 */
const DAYS = [
  { name: "Senin", tint: "var(--coral-soft)", accent: "var(--coral-deep)" },
  { name: "Selasa", tint: "var(--sky-soft)", accent: "var(--sky-deep)" },
  { name: "Rabu", tint: "var(--sun-soft)", accent: "#8a6d00" },
  { name: "Kamis", tint: "var(--sky-soft)", accent: "var(--sky-deep)" },
  { name: "Jumat", tint: "var(--coral-soft)", accent: "var(--coral-deep)" },
] as const;

export default function SchedulePage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow-chip">Schedule</p>
      <h1 className="display mt-3 text-4xl text-balance-h md:text-5xl">
        Minggu 7E, jam demi jam.
      </h1>
      <p className="mt-4 max-w-lg section-sub">
        Jadwal lengkap tampil hanya setelah data asli dirilis. Sesuai aturan
        kelas, tidak ada yang ditampilkan setengah jadi.
      </p>

      <div className="schedule-preview mt-12">
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
  );
}
