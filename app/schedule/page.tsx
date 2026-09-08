import type { Metadata } from "next";
import { WEEK_SCHEDULE } from "@/lib/schedule";
import TodayHighlight from "@/components/sections/TodayHighlight";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Jadwal mingguan resmi Kelas 7E Seven Excellent, SMPN 203 Jakarta.",
};

export default function SchedulePage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow-chip">Schedule</p>
      <h1 className="display mt-3 text-4xl text-balance-h md:text-5xl">
        Minggu 7E, jam demi jam.
      </h1>
      <p className="mt-4 max-w-lg section-sub">
        Jadwal mingguan resmi kelas 7E. Setiap mapel punya ruangnya sendiri:
        dari Perpus sampai Lapangan.
      </p>

      <TodayHighlight />
      <div className="schedule-preview mt-12">
        {WEEK_SCHEDULE.map((d) => (
          <div
            key={d.day}
            data-day={d.day}
            className="schedule-day card"
            style={{ background: d.tint }}
          >
            <span className="schedule-day-name" style={{ color: d.accent }}>
              {d.day}
            </span>
            <ul className="schedule-entries">
              {d.entries.map((e) => (
                <li key={e.subject} className="schedule-entry">
                  <span className="schedule-entry-subject">{e.subject}</span>
                  <span className="schedule-entry-room">{e.room}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
