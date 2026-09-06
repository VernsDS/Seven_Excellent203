import type { Metadata } from "next";
import { CLASS_INFO } from "@/lib/students";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Seven Excellent is - Class 7E, SMPN 203 Jakarta, 36 students led by Class President Maulana Aliffian.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">About</p>
      <h1 className="display mt-3 max-w-3xl text-4xl text-balance-h md:text-5xl">
        One class, one name, one standard.
      </h1>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <p>
            <span className="text-foreground">Seven Excellent</span> is Class 7E
            of {CLASS_INFO.school} - 36 students who share one room, one
            timetable, and one archive. The name is the standard: everything we
            put out carries the class identity with it.
          </p>
          <p>
            This website is the class&rsquo;s official digital home. It keeps
            the directory of every student by absent number, preserves class
            memories in the gallery, and publishes the weekly schedule. No
            feeds, no algorithms - just the class, archived properly.
          </p>
          <p>
            The roster is authoritative and complete: absent numbers 01 through
            36, exactly as recorded by the class. Photos are added only when
            authorized assets exist - nothing is invented.
          </p>
        </div>

        <aside className="h-fit border border-line bg-surface p-8">
          <p className="eyebrow">At a glance</p>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">Class</dt>
              <dd className="font-medium">7E - Seven Excellent</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">School</dt>
              <dd className="font-medium">{CLASS_INFO.school}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">Students</dt>
              <dd className="font-medium">36</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">Class President</dt>
              <dd className="font-medium">Maulana Aliffian (#17)</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">Homeroom Teacher</dt>
              <dd className="font-medium">{CLASS_INFO.teacher}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
