import { ClassIdentity } from "@/components/ui/class-identity";
import { StudentCoverflow } from "@/components/ui/3-d-coverflow-carousel";
import { Hero } from "@/components/home/hero";
import {
  AboutPreview,
  FinalCta,
  GalleryPreview,
  SchedulePreview,
} from "@/components/home/sections";
import { STUDENTS } from "@/lib/students";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClassIdentity />
      <section className="home-section" aria-label="Student archive">
        <div className="container-page">
          <div className="archive-intro">
            <h2 className="display section-title">Orang-orang 7E.</h2>
            <p className="archive-intro-count">
              {STUDENTS.length} murid · satu arsip kelas
            </p>
          </div>
          <p className="section-sub mt-4 max-w-xl">
            36 potret dari kelas 7E SMPN 203 Jakarta. Geser, ketuk, atau
            pakai keyboard — lalu buka profil siapa pun dari arsip.
          </p>
          <StudentCoverflow students={STUDENTS} />
        </div>
      </section>
      <GalleryPreview />
      <SchedulePreview />
      <AboutPreview />
      <FinalCta />
    </>
  );
}
