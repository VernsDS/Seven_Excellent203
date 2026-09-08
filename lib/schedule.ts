// Jadwal mingguan resmi kelas 7E - dipakai homepage preview & /schedule.
// Sumber: input Rafa. Kalau jadwal berubah, edit array ini saja.
export interface ScheduleEntry {
  subject: string;
  room: string;
}

export interface DaySchedule {
  day: string;
  tint: string;
  accent: string;
  entries: ScheduleEntry[];
}

export const WEEK_SCHEDULE: DaySchedule[] = [
  {
    day: "Senin",
    tint: "var(--coral-soft)",
    accent: "var(--coral-deep)",
    entries: [
      { subject: "IPS", room: "Perpus" },
      { subject: "PAI", room: "Perpus" },
      { subject: "MTK", room: "9A" },
    ],
  },
  {
    day: "Selasa",
    tint: "var(--sky-soft)",
    accent: "var(--sky-deep)",
    entries: [
      { subject: "PKN", room: "A1 (AULA 1)" },
      { subject: "IPA", room: "A1" },
      { subject: "B.INDO", room: "A1" },
    ],
  },
  {
    day: "Rabu",
    tint: "var(--sun-soft)",
    accent: "var(--sun-deep)",
    entries: [
      { subject: "Prakarya", room: "A2 (Aula 2)" },
      { subject: "IPA", room: "Perpus" },
      { subject: "PJOK", room: "Lapangan" },
    ],
  },
  {
    day: "Kamis",
    tint: "var(--sky-soft)",
    accent: "var(--sky-deep)",
    entries: [
      { subject: "Informatika", room: "SG (SerbaGuna)" },
      { subject: "B.INDO", room: "SG" },
      { subject: "MTK", room: "SG" },
    ],
  },
  {
    day: "Jumat",
    tint: "var(--coral-soft)",
    accent: "var(--coral-deep)",
    entries: [
      { subject: "B.Inggris", room: "Lab IPA" },
      { subject: "BK", room: "Lab IPA" },
    ],
  },
];
