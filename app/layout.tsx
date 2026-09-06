import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
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

import { CLASS_INFO } from "@/lib/students";

export const metadata: Metadata = {
  metadataBase: new URL(CLASS_INFO.domain),
  title: {
    default: "Seven Excellent — Kelas 7E SMPN 203 Jakarta",
    template: "%s — Seven Excellent",
  },
  description:
    "Official website of Class 7E / Seven Excellent, SMPN 203 Jakarta. 36 students, one class, one archive.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    siteName: "Seven Excellent",
    title: "Seven Excellent — Kelas 7E SMPN 203 Jakarta",
    description:
      "Official website of Class 7E / Seven Excellent, SMPN 203 Jakarta.",
    url: CLASS_INFO.domain,
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven Excellent — Kelas 7E SMPN 203 Jakarta",
    description:
      "Official website of Class 7E / Seven Excellent, SMPN 203 Jakarta.",
  },
};

const NAV = [
  { href: "/students", label: "Students" },
  { href: "/gallery", label: "Gallery" },
  { href: "/schedule", label: "Schedule" },
  { href: "/about", label: "About" },
] as const;

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="display text-lg text-accent">7E</span>
          <span className="text-sm font-semibold tracking-wide">
            Seven Excellent
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

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
        <p>Homeroom Teacher: {CLASS_INFO.teacher}</p>
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
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
