import { ClassIdentity } from "@/components/ui/class-identity";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
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
      <section className="home-section" aria-label="Dinding potret siswa">
        <div className="container-page">
          <div className="archive-intro">
            <h2 className="display section-title">Dinding potret 7E.</h2>
            <p className="archive-intro-count">
              {STUDENTS.length} murid dalam pergerakan
            </p>
          </div>
          <p className="section-sub mt-4 max-w-xl">
            Portret siswa 7E SMPN 203 Jakarta terus mengalir di koridor ini,
            dari kedalaman arsip menuju cahaya.
          </p>
        </div>
        <ImageStreamHero students={STUDENTS} />
      </section>
      <section className="home-section home-section--tight" aria-label="Arsip siswa interaktif">
        <div className="container-page">
          <div className="archive-intro">
            <h2 className="display section-title">The people of 7E.</h2>
            <p className="archive-intro-count">
              SMPN 203 Jakarta · {STUDENTS.length} murid
            </p>
          </div>
          <p className="section-sub mt-4 max-w-xl">
            36 potret, satu arsip. Geser, ketuk panah, atau pakai keyboard,
            lalu buka profil siapa pun.
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
