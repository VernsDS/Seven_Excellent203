import Link from "next/link";
import { ClassIdentity } from "@/components/class-identity";
import { StudentCoverflow } from "@/components/ui/3-d-coverflow-carousel";
import { CLASS_INFO, president, STUDENTS } from "@/lib/students";

export default function HomePage() {
  const pres = president();

  return (
    <>
      {/* Hero — CTA above the fold */}
      <section className="container-page grid items-center gap-12 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
        <div>
          <p className="eyebrow rise">
            {CLASS_INFO.className} · {CLASS_INFO.school}
          </p>
          <h1 className="display rise rise-1 mt-4 text-5xl text-balance-h md:text-7xl">
            Seven Excellent
          </h1>
          <p className="rise rise-2 mt-6 max-w-md text-lg text-muted">
            The official home of Class 7E — 36 students, one archive, every
            memory from {CLASS_INFO.school}.
          </p>
          <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
            <Link href="/students" className="btn btn-primary">
              Meet the class
            </Link>
            <Link href="/about" className="btn btn-ghost">
              About 7E
            </Link>
          </div>
        </div>

        {/* CSS-only 3D emblem */}
        <div className="emblem-scene mx-auto hidden w-64 md:block" aria-hidden="true">
          <div className="emblem">
            <div className="emblem-face emblem-face--front"><span>7E</span></div>
            <div className="emblem-face emblem-face--back"><span>7E</span></div>
            <div className="emblem-face emblem-face--right"><span>7E</span></div>
            <div className="emblem-face emblem-face--left"><span>7E</span></div>
            <div className="emblem-face emblem-face--top" />
            <div className="emblem-face emblem-face--bottom" />
          </div>
        </div>
      </section>

      {/* Class snapshot — typographic statistics */}
      <section className="border-y border-line bg-surface">
        <div className="container-page grid grid-cols-2 gap-8 py-14 text-center md:grid-cols-4">
          <div>
            <p className="display text-4xl text-accent">36</p>
            <p className="eyebrow mt-2">Students</p>
          </div>
          <div>
            <p className="display text-4xl text-accent">7E</p>
            <p className="eyebrow mt-2">One class</p>
          </div>
          <div>
            <p className="display text-4xl text-accent">01–36</p>
            <p className="eyebrow mt-2">Absent numbers</p>
          </div>
          <div>
            <p className="display text-4xl text-accent">1</p>
            <p className="eyebrow mt-2">Shared archive</p>
          </div>
        </div>
      </section>

      {/* Leadership — asymmetric */}
      <section className="container-page py-20">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 className="display mt-3 text-3xl text-balance-h md:text-4xl">
              Led from inside the class.
            </h2>
          </div>
          <div className="border border-line bg-surface p-8">
            <p className="display text-2xl text-accent">{pres.name}</p>
            <p className="eyebrow mt-2">Class President · #{pres.absentNumber}</p>
            <p className="mt-6 text-muted">
              Homeroom Teacher:{" "}
              <span className="text-foreground">{CLASS_INFO.teacher}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Student showcase — 3D coverflow archive */}
      <ClassIdentity />
      <section className="container-page py-20">
        <div className="max-w-2xl">
          <h2 className="display text-3xl text-balance-h md:text-4xl">
            The class, face to face.
          </h2>
          <p className="mt-4 text-muted">
            Every student of 7E, one card at a time. Swipe, tap the arrows, or
            use your keyboard — then open any profile from the archive.
          </p>
        </div>
        <StudentCoverflow students={STUDENTS} />
        <div className="mt-14 text-center">
          <Link href="/students" className="btn btn-ghost">
            Open the full directory
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page py-24 text-center">
        <p className="eyebrow">Seven Excellent</p>
        <h2 className="display mx-auto mt-4 max-w-2xl text-4xl text-balance-h md:text-5xl">
          One class. Thirty-six names. One archive.
        </h2>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/students" className="btn btn-primary">
            Browse the directory
          </Link>
          <Link href="/gallery" className="btn btn-ghost">
            See the gallery
          </Link>
        </div>
      </section>
    </>
  );
}
