import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The weekly timetable of Class 7E Seven Excellent, SMPN 203 Jakarta.",
};

/**
 * No timetable data has been supplied yet - per docs/PRD.md:
 * "Only show teacher/room/time fields when real data exists."
 * Replace this placeholder once the real weekly schedule is provided.
 */
export default function SchedulePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

  return (
    <div className="container-page py-16">
      <p className="eyebrow">Schedule</p>
      <h1 className="display mt-3 text-4xl text-balance-h md:text-5xl">
        The week, hour by hour.
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        The full timetable will appear here once the class schedule is
        finalized and published. Nothing is shown until it is real.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-5">
        {days.map((day) => (
          <div
            key={day}
            className="border border-line bg-surface p-5 text-center"
          >
            <p className="eyebrow">{day}</p>
            <p className="display mt-6 text-2xl text-muted">-</p>
            <p className="mt-4 text-xs text-muted">Timetable pending</p>
          </div>
        ))}
      </div>
    </div>
  );
}
