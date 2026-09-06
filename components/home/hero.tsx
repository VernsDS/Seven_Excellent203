import Image from "next/image";
import Link from "next/link";
import { CLASS_INFO } from "@/lib/students";

export function Hero() {
  return (
    <section className="hero">
      <div className="container-page hero-inner">
        <p className="hero-eyebrow rise">
          Kelas 7E — {CLASS_INFO.school}
        </p>

        <h1 className="hero-stack rise rise-1" aria-label="Seven Excellent 7E">
          <span className="hero-7e" aria-hidden="true">
            7E
          </span>
          <span className="hero-word" aria-hidden="true">
            Seven
            <br />
            Excellent
          </span>
        </h1>

        <p className="hero-copy rise rise-2">
          Arsip digital resmi kelas 7E — 36 murid, satu ruang kelas, dan
          satu tahun yang tidak mau dilupakan begitu saja.
        </p>

        <div className="hero-cta rise rise-3">
          <Link href="/students" className="btn btn-primary">
            Meet the class
          </Link>
          <Link href="/about" className="btn btn-ghost">
            Explore 7E
          </Link>
        </div>

        <div className="hero-meta rise rise-4">
          <Image
            src="/images/branding/class-logo.jpg"
            alt=""
            width={44}
            height={44}
            className="hero-logo"
            aria-hidden="true"
          />
          <span>SMPN 203 Jakarta</span>
          <span className="hero-meta-dot" aria-hidden="true" />
          <span>36 murid</span>
          <span className="hero-meta-dot" aria-hidden="true" />
          <span>Wali kelas: {CLASS_INFO.teacher}</span>
        </div>
      </div>
    </section>
  );
}
