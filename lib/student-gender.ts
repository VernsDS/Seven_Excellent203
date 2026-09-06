// TODO: Rafa isi manual "L" (laki-laki) atau "P" (perempuan) untuk tiap
// absen, sesuai kondisi kelas yang sebenarnya. Nilai di bawah masih data
// awal - koreksi yang salah. Kalau belum yakin, ganti jadi null dan
// placeholder foto akan pakai warna netral linen (bukan error).
export type Gender = "L" | "P" | null;

export const studentGender: Record<number, Gender> = {
  1: "L", 2: "P", 3: "P", 4: "P", 5: "P", 6: "P",
  7: "P", 8: "L", 9: "L", 10: "P", 11: "L", 12: "L",
  13: "P", 14: "P", 15: "L", 16: "P", 17: "L", 18: "P",
  19: "L", 20: "L", 21: "L", 22: "L", 23: "L", 24: "L",
  25: "L", 26: "P", 27: "L", 28: "L", 29: "L", 30: "P",
  31: "P", 32: "P", 33: "P", 34: "P", 35: "P", 36: "L",
};

export type AvatarVariant = "male" | "female" | "neutral";

export function avatarVariantFor(absentNumber: number): AvatarVariant {
  const g = studentGender[absentNumber];
  if (g === "L") return "male";
  if (g === "P") return "female";
  return "neutral";
}
