import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { CLASS_INFO } from "@/lib/students";
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
    default: "Seven Excellent — Kelas 7E SMPN 203 Jakarta",
    template: "%s — Seven Excellent",
  },
  description:
    "Arsip digital resmi Kelas 7E / Seven Excellent, SMPN 203 Jakarta. 36 murid, satu kelas, satu arsip.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    siteName: "Seven Excellent",
    title: "Seven Excellent — Kelas 7E SMPN 203 Jakarta",
    description:
      "Arsip digital resmi Kelas 7E / Seven Excellent, SMPN 203 Jakarta.",
    url: CLASS_INFO.domain,
    images: [{ url: "/images/branding/class-logo.jpg", width: 1024, height: 1012 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven Excellent — Kelas 7E SMPN 203 Jakarta",
    description:
      "Arsip digital resmi Kelas 7E / Seven Excellent, SMPN 203 Jakarta.",
    images: ["/images/branding/class-logo.jpg"],
  },
};

function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="container-page flex flex-col gap-4 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          <span className="display text-accent">7E</span> Seven Excellent ·{" "}
          {CLASS_INFO.school}
        </p>
        <nav aria-label="Footer" className="flex gap-5">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
        </nav>
        <p>Wali kelas: {CLASS_INFO.teacher}</p>
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
