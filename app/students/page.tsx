import type { Metadata } from "next";
import Link from "next/link";
import { president, STUDENTS } from "@/lib/students";

export const metadata: Metadata = {
  title: "Students",
  description:
    "The full directory of Class 7E / Seven Excellent — 36 students with authoritative absent numbers 01–36.",
};

export default function StudentsPage() {
  const pres = president();

  return (
    <div className="container-page py-16">
      <p className="eyebrow">Directory</p>
      <h1 className="display mt-3 text-4xl text-balance-h md:text-5xl">
        The class archive.
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        All 36 students of Seven Excellent, listed by absent number.{" "}
        <span className="text-foreground">{pres.name}</span> (#17) serves as
        Class President.
      </p>

      <div className="mt-12 border-t border-line">
        {STUDENTS.map((s) => (
          <Link
            key={s.id}
            href={`/students/${s.id}`}
            className="archive-row"
          >
            <span className="archive-no">
              {String(s.absentNumber).padStart(2, "0")}
            </span>
            <span className="font-medium">
              {s.name}
              {s.role === "Class President" && (
                <span className="ml-3 rounded-full border border-accent px-2 py-0.5 text-xs text-accent">
                  Class President
                </span>
              )}
            </span>
            <span className="text-sm text-muted">Profile →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
