import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { FloatingNav } from "@/components/floating-nav";
import { MotionBanner } from "@/components/ui/motion-banner";
import { CLASS_INFO } from "@/lib/students";
import { CONTACT_RAFA, waLink } from "@/lib/contact";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(CLASS_INFO.domain),
  title: {
    default: "Seven Excellent 7E | SMPN 203 Jakarta",
    template: "%s | Seven Excellent 7E",
  },
  description:
    "Arsip digital resmi Kelas 7E / Seven Excellent, SMPN 203 Jakarta. 36 murid, satu kelas, satu arsip.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    siteName: "Seven Excellent",
    title: "Seven Excellent 7E | SMPN 203 Jakarta",
    description:
      "Arsip digital resmi Kelas 7E / Seven Excellent, SMPN 203 Jakarta.",
    url: CLASS_INFO.domain,
    images: [{ url: "/images/branding/class-logo.jpg", width: 1024, height: 1012 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven Excellent 7E | SMPN 203 Jakarta",
    description:
      "Arsip digital resmi Kelas 7E / Seven Excellent, SMPN 203 Jakarta.",
    images: ["/images/branding/class-logo.jpg"],
  },
};

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-page site-footer-inner">
        <div className="site-footer-brand">
          <span className="display site-footer-badge">7E</span>
          <div>
            <p className="site-footer-name">Seven Excellent</p>
            <p className="site-footer-school">Kelas 7E · {CLASS_INFO.school}</p>
          </div>
        </div>
        <nav aria-label="Footer" className="site-footer-nav">
          <Link href="/students">Students</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="site-footer-contact">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary site-footer-cta"
          >
            {CONTACT_RAFA.label}
          </a>
          <div className="site-footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="container-page site-footer-base">
        Wali kelas: {CLASS_INFO.teacher} · Dibangun oleh kelas 7E untuk
        arsipnya sendiri.
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{`
            .hero-stack, .hero-7e, .hero-copy { transform: none; }
            .hero-copy { opacity: 1; }
            .class-identity-logo, .class-identity-title,
            .class-identity-sub, .class-identity-copy {
              transform: none;
              opacity: 1;
            }
          `}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteNav />
        <MotionBanner />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingNav />
      </body>
    </html>
  );
}
