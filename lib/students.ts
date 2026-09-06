export type StudentRole = "Student" | "Class President"

export interface Student {
  id: number
  name: string
  absentNumber: number
  role: StudentRole
  photo?: string
}

/**
 * Authoritative roster - source: docs/OPENCODE-PROMPT.md section 4.
 * Never invent student details. Photos intentionally absent until
 * authorized assets are supplied (see README.md "Assets").
 */
export const STUDENTS: Student[] = [
  { id: 1, name: "Abdur Rahman Rohmi", absentNumber: 1, role: "Student" },
  { id: 2, name: "Adni Ziva Kusuma", absentNumber: 2, role: "Student" },
  { id: 3, name: "Airin Mariska Mursalim", absentNumber: 3, role: "Student" },
  { id: 4, name: "Alfira Aulia Jasmine", absentNumber: 4, role: "Student" },
  { id: 5, name: "Anindhyta Syareefa Kirani", absentNumber: 5, role: "Student" },
  { id: 6, name: "Atika Zahra Ratifa", absentNumber: 6, role: "Student" },
  { id: 7, name: "Chyntiara Kenisha Azkia", absentNumber: 7, role: "Student" },
  { id: 8, name: "Desta Ar Rofhi", absentNumber: 8, role: "Student" },
  { id: 9, name: "Fajriel Al Fathul Khair", absentNumber: 9, role: "Student" },
  { id: 10, name: "Hana Zhafira", absentNumber: 10, role: "Student" },
  { id: 11, name: "Irfa Bima Aristian", absentNumber: 11, role: "Student" },
  { id: 12, name: "Jibran Rizqi Putranda", absentNumber: 12, role: "Student" },
  { id: 13, name: "Kanaya Salsabila Zahrani", absentNumber: 13, role: "Student" },
  { id: 14, name: "Khalisya Khairani", absentNumber: 14, role: "Student" },
  { id: 15, name: "Lingga Fathan Adzuhri", absentNumber: 15, role: "Student" },
  { id: 16, name: "Lubna Nafiah Askanah", absentNumber: 16, role: "Student" },
  { id: 17, name: "Maulana Aliffian", absentNumber: 17, role: "Class President" },
  { id: 18, name: "Mawar Raniah Melano", absentNumber: 18, role: "Student" },
  { id: 19, name: "Mezha Banyu Prakoso", absentNumber: 19, role: "Student" },
  { id: 20, name: "Muhammad Abrisyam Ahlam", absentNumber: 20, role: "Student" },
  { id: 21, name: "Muhammad Faizal Putra", absentNumber: 21, role: "Student" },
  { id: 22, name: "Muhammad Kanz Pribadi", absentNumber: 22, role: "Student" },
  { id: 23, name: "Muhammad Nazril Alkahfi", absentNumber: 23, role: "Student" },
  { id: 24, name: "Muhammad Sahl Kairuzzabadi Sanusi", absentNumber: 24, role: "Student" },
  { id: 25, name: "Muhammad Salim Al-Haddad", absentNumber: 25, role: "Student" },
  { id: 26, name: "Neng Cahya", absentNumber: 26, role: "Student" },
  { id: 27, name: "Raditya Alvino Kurniawan", absentNumber: 27, role: "Student" },
  { id: 28, name: "Rafardhan Athala", absentNumber: 28, role: "Student" },
  { id: 29, name: "Sakti Anugrah Puttra Fadillah", absentNumber: 29, role: "Student" },
  { id: 30, name: "Shafiyah Adeeva Farzana", absentNumber: 30, role: "Student" },
  { id: 31, name: "Syadinda Raisa Hakim", absentNumber: 31, role: "Student" },
  { id: 32, name: "Syifa Yasmine Shidqia", absentNumber: 32, role: "Student" },
  { id: 33, name: "Talita Zahra", absentNumber: 33, role: "Student" },
  { id: 34, name: "Widya Wijayanti", absentNumber: 34, role: "Student" },
  { id: 35, name: "Zabba Intan Nuraini", absentNumber: 35, role: "Student" },
  { id: 36, name: "Zidane Mustofa Ramadhan", absentNumber: 36, role: "Student" },
]

export const CLASS_INFO = {
  className: "7E",
  classNameLong: "Seven Excellent",
  school: "SMPN 203 Jakarta",
  teacher: "Yohanes Christian",
  domain: "https://sevenexcellent203.zone.id",
} as const

export function getStudent(id: number): Student | undefined {
  return STUDENTS.find((s) => s.id === id)
}

export function president(): Student {
  const p = STUDENTS.find((s) => s.role === "Class President")
  if (!p) throw new Error("Class President missing from roster")
  return p
}
