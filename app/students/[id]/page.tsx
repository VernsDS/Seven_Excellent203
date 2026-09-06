import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASS_INFO, getStudent, STUDENTS } from "@/lib/students";

interface StudentPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return STUDENTS.map((s) => ({ id: String(s.id) }));
}

export async function generateMetadata({
  params,
}: StudentPageProps): Promise<Metadata> {
  const { id } = await params;
  const student = getStudent(Number(id));
  if (!student) return { title: "Student not found" };
  return {
    title: `${student.name} · #${student.absentNumber}`,
    description: `Profile of ${student.name}, absent number ${student.absentNumber}, Class 7E Seven Excellent, ${CLASS_INFO.school}.`,
  };
}

export default async function StudentPage({ params }: StudentPageProps) {
  const { id } = await params;
  const student = getStudent(Number(id));
  if (!student) notFound();

  return (
    <div className="container-page py-16">
      <Link href="/students" className="text-sm text-muted hover:text-foreground">
        ← Back to directory
      </Link>

      <div className="mt-10 grid gap-10 md:grid-cols-[auto_1fr]">
        {/* Photo intentionally absent until authorized assets exist (README "Assets") */}
        <div
          className="grid aspect-square w-40 place-items-center border border-line bg-surface md:w-56"
          aria-hidden="true"
        >
          <span className="display text-5xl text-muted">
            {String(student.absentNumber).padStart(2, "0")}
          </span>
        </div>

        <div>
          {student.role === "Class President" && (
            <p className="eyebrow text-accent">Class President</p>
          )}
          <h1 className="display mt-3 text-4xl text-balance-h md:text-5xl">
            {student.name}
          </h1>
          <dl className="mt-8 max-w-md space-y-4 text-sm">
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">Absent number</dt>
              <dd className="font-medium">
                {String(student.absentNumber).padStart(2, "0")}
              </dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">Role</dt>
              <dd className="font-medium">{student.role}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">Class</dt>
              <dd className="font-medium">7E - Seven Excellent</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">School</dt>
              <dd className="font-medium">{CLASS_INFO.school}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
