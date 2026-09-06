# Prompt Final: Palet "Zen Linen" + Scroll Animation + Integrasi Komponen

Gunakan skill `taste` dan `ui-ux-pro-max` sebelum mengubah kode apa pun. Kerjakan di branch baru, jangan langsung ke `main`.

---

## BAGIAN 1 — Palet Warna "Zen Linen"

Ganti seluruh warna dasar situs dari putih polos menjadi palet hangat bertema linen. Set up sebagai CSS custom properties terpusat (di `globals.css` atau file token yang dipakai project), bukan hardcode di tiap komponen.

Referensi nilai (boleh disesuaikan tone-nya sedikit asal tetap dalam keluarga warna ini):

```css
--background: #F5EFE4;       /* Zen Linen - dasar hangat, bukan putih polos */
--foreground: #2B2620;       /* teks utama, coklat-charcoal hangat, bukan hitam pekat */
--muted: #EAE1D2;            /* background sekunder/card */
--muted-foreground: #6B6152; /* teks sekunder, tetap kontras cukup di atas --muted */
--border: #DCD0BC;
--primary: #FF6B4A;          /* coral, dari palet sebelumnya */
--secondary: #3DB6F2;        /* sky blue */
--accent: #FFD447;           /* kuning */
--destructive: #E5484D;
```

Aturan wajib:
- Cek kontras teks vs background di SETIAP kombinasi (target WCAG AA, rasio minimal 4.5:1 untuk teks body). Jangan sampai teks abu-abu muda tenggelam di atas `--muted` atau `--background`.
- Section boleh selang-seling antara `--background` polos dan tint pastel dari `--primary`/`--secondary`/`--accent` (opacity rendah, 5-10%), supaya scroll terasa berirama.

## BAGIAN 2 — Perbaiki Gradient yang Terlihat "Tempelan"

Audit semua gradient/glow yang ada sekarang. Gradient yang terlihat seperti stiker nempel biasanya karena:
- Warnanya tidak senada dengan background section tempat dia berada
- Berhenti dengan hard edge, tidak fade ke transparan dengan mulus
- Ukurannya terlalu kecil/terpusat sehingga terlihat seperti bercak, bukan menyatu dengan layout

Perbaikan:
- Setiap gradient/glow harus pakai warna yang diturunkan dari `--primary`/`--secondary`/`--accent` section itu sendiri, bukan warna acak.
- Radius blur diperbesar dan opacity diturunkan supaya transisi ke background terasa menyatu, bukan berbatas tegas.
- Gradient sebaiknya "bleed" melewati batas section (posisi absolute dengan overflow terkontrol) supaya terasa jadi bagian dari layout, bukan elemen tempelan di satu titik.

## BAGIAN 3 — Standar Scroll Animation (Berlaku untuk Semua Section)

- Semua scroll animation pakai GSAP + ScrollTrigger sebagai standar di seluruh project (jangan campur beberapa library animasi berbeda di section berbeda, biar konsisten dan performanya predictable).
- WAJIB tambahkan pengecekan `prefers-reduced-motion`: kalau user mengaktifkan setting itu di device-nya, matikan atau kurangi animasi jadi minimal (fade sederhana, tanpa pin/parallax berat).
- Pakai `will-change` secukupnya di elemen yang dianimasikan, jangan berlebihan (bisa bikin lemot di HP low-end).
- Test khusus di Safari/iOS untuk fitur `backdrop-filter` dan `clip-path` — kalau tidak didukung, siapkan fallback (background solid dengan opacity, tanpa efek glass).
- Semua animasi entrance/reveal harus tetap smooth di scroll cepat (scrub value disesuaikan, jangan terlalu sensitif sampai kedip-kedip).

---

## BAGIAN 4 — Integrasi Komponen: Motion Footer

Adaptasi komponen `CinematicFooter` berikut, JANGAN dipasang mentah-mentah karena kontennya masih generic SaaS. Ambil struktur animasi & interaksinya (scroll reveal, magnetic button, glass pill), ganti semua konten dan warnanya:

```tsx
"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(circle at 50% 50%,
    color-mix(in oklch, var(--primary) 15%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 15%, transparent) 40%,
    transparent 70%);
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight), inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 0 20px 40px -10px var(--pill-shadow-hover), inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as?: React.ElementType };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;
          gsap.to(element, { x: x * 0.4, y: y * 0.4, rotationX: -y * 0.15, rotationY: x * 0.15, scale: 1.05, ease: "power2.out", duration: 0.4 });
        };
        const handleMouseLeave = () => {
          gsap.to(element, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2 });
        };
        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(giantTextRef.current, { y: "10vh", scale: 0.8, opacity: 0 }, {
        y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 },
      });
      gsap.fromTo([headingRef.current, linksRef.current], { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 40%", end: "bottom bottom", scrub: 1 },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div ref={wrapperRef} className="relative h-screen w-full" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground cinematic-footer-wrapper">
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />
          <div ref={giantTextRef} className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none">
            7E
          </div>

          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-border/50 bg-background/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
              {/* GANTI isi marquee jadi identitas kelas, ulang 2x biar loop mulus */}
              <div className="flex items-center space-x-12 px-6">
                <span>Kelas 7E</span> <span className="text-primary/60">✦</span>
                <span>SMPN 203 Jakarta</span> <span className="text-secondary/60">✦</span>
                <span>36 Murid</span> <span className="text-primary/60">✦</span>
                <span>Wali Kelas Yohanes Christian</span> <span className="text-secondary/60">✦</span>
              </div>
              <div className="flex items-center space-x-12 px-6">
                <span>Kelas 7E</span> <span className="text-primary/60">✦</span>
                <span>SMPN 203 Jakarta</span> <span className="text-secondary/60">✦</span>
                <span>36 Murid</span> <span className="text-primary/60">✦</span>
                <span>Wali Kelas Yohanes Christian</span> <span className="text-secondary/60">✦</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2 ref={headingRef} className="text-5xl md:text-8xl font-black footer-text-glow tracking-tighter mb-12 text-center">
              {/* GANTI headline sesuai tone arsip kelas, contoh: */}
              Satu kelas.<br />Satu arsip.
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-wrap justify-center gap-4 w-full">
                {/* GANTI 2 tombol app-store jadi CTA nyata situs ini */}
                <MagneticButton as="a" href="/students" className="footer-glass-pill px-10 py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group">
                  Lihat Arsip Kelas
                </MagneticButton>
                <MagneticButton as="a" href="https://wa.me/6282121979710" className="footer-glass-pill px-10 py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group">
                  Hubungi Rafa
                </MagneticButton>
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
                <MagneticButton as="a" href="/privacy" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">
                  Privacy Policy
                </MagneticButton>
                <MagneticButton as="a" href="/terms" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">
                  Terms of Service
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © 2026 Seven Excellent 7E. All rights reserved.
            </div>
            <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-border/50">
              <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-destructive">❤</span>
              <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <span className="text-foreground font-black text-xs md:text-sm tracking-normal ml-1">Rafardhan Athala</span>
            </div>
            <MagneticButton as="button" onClick={scrollToTop} className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-muted-foreground hover:text-foreground group order-3">
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
```

Install dependency: `gsap`.

Wajib disesuaikan opencode saat integrasi:
1. Component ini butuh CSS variables `--background`, `--foreground`, `--muted-foreground`, `--border`, `--primary`, `--secondary`, `--destructive` di scope global. Kalau project belum punya (belum pakai shadcn), buat sendiri di `globals.css` dengan nilai dari Bagian 1 di atas.
2. `giant-bg-text` isinya sudah diganti "7E" — pastikan ini tidak bentrok secara visual dengan warna `--foreground` di atas `--background` linen (cek kontras ghost text-nya tetap subtle, bukan mendominasi).
3. Ganti seluruh warna hardcode kalau ada sisa yang tidak lewat CSS variable.
4. Footer ini menggunakan `position: fixed` dengan trik "curtain reveal" — pastikan tidak bentrok dengan floating bottom navbar mobile yang sudah ada di project (floating nav harus tetap di atas z-index footer, atau disembunyikan otomatis saat footer muncul).

---

## BAGIAN 5 — Integrasi Komponen: Hero Scroll Pin Reveal (versi foto, bukan video)

Adaptasi komponen `HeroScrollVideoReveal` berikut. PENTING: ganti elemen `<video>` menjadi `<img>` foto kelas (pakai foto/logo kelas yang sudah ada di project), animasi clip-path circle-reveal tetap dipakai tapi untuk foto, bukan video.

```tsx
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface TagItem {
  id?: string;
  text: string;
  background: string;
  color?: string;
}

export interface HeroScrollImageRevealProps {
  topText?: React.ReactNode;
  headingText?: React.ReactNode;
  tags?: TagItem[];
  subText?: string;
  imageSrc: string;
  bottomText?: React.ReactNode;
  className?: string;
}

export const HeroScrollImageReveal: React.FC<HeroScrollImageRevealProps> = ({
  topText,
  headingText,
  tags = [],
  subText,
  imageSrc,
  bottomText,
  className = '',
}) => {
  const benefitRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const words = paraRef.current
      ? Array.from(paraRef.current.querySelectorAll('.reveal-word'))
      : [];

    if (words.length > 0) {
      gsap.set(words, { opacity: 0, rotate: 8, yPercent: 30 });
    }

    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: benefitRef.current,
        start: 'top 70%',
        end: 'top -10%',
        scrub: 1.5,
      },
    });

    if (words.length > 0) {
      revealTl.to(words, { stagger: 0.2, opacity: 1, rotate: 0, yPercent: 0, ease: 'power1.inOut' });
    }

    tagRefs.current.forEach((tagEl) => {
      if (tagEl) {
        revealTl.to(tagEl, {
          duration: 1,
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'circ.out',
        }, '>-0.4');
      }
    });

    const mm = gsap.matchMedia();

    mm.add('(max-width: 639.9px)', () => {
      gsap.set(imageBoxRef.current, { clipPath: 'circle(18% at 50% 50%)' });
      gsap.timeline({
        scrollTrigger: { trigger: imageWrapperRef.current, start: 'top top', end: '+=1200', scrub: 1.2, pin: true, pinSpacing: true, anticipatePin: 1 },
      }).fromTo(imageBoxRef.current, { clipPath: 'circle(18% at 50% 50%)' }, { clipPath: 'circle(150% at 50% 50%)', ease: 'none' });
    });

    mm.add('(min-width: 640px) and (max-width: 1023.9px)', () => {
      gsap.set(imageBoxRef.current, { clipPath: 'circle(12% at 50% 50%)' });
      gsap.timeline({
        scrollTrigger: { trigger: imageWrapperRef.current, start: 'top top', end: '+=1600', scrub: 1.3, pin: true, pinSpacing: true, anticipatePin: 1 },
      }).fromTo(imageBoxRef.current, { clipPath: 'circle(12% at 50% 50%)' }, { clipPath: 'circle(150% at 50% 50%)', ease: 'none' });
    });

    mm.add('(min-width: 1024px)', () => {
      gsap.set(imageBoxRef.current, { clipPath: 'circle(8% at 50% 50%)' });
      gsap.timeline({
        scrollTrigger: { trigger: imageWrapperRef.current, start: 'top top', end: '+=2000', scrub: 1.5, pin: true, pinSpacing: true, anticipatePin: 1 },
      }).fromTo(imageBoxRef.current, { clipPath: 'circle(8% at 50% 50%)' }, { clipPath: 'circle(150% at 50% 50%)', ease: 'none' });
    });

    return () => {
      revealTl.kill();
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className={`w-full bg-background text-foreground font-sans overflow-x-hidden ${className}`}>
      <section className="w-full min-h-[60vh] flex justify-center items-center text-center px-4 sm:px-8 py-8 text-[clamp(1.8rem,4.5vw,4.5rem)] font-bold tracking-tight leading-tight text-foreground relative z-10">
        {topText}
      </section>

      <section ref={benefitRef} className="relative w-full min-h-[100vh] md:min-h-[120vh] pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col items-center text-center relative z-10">
          <div className="w-full mb-8 sm:mb-12 md:mb-14">
            <p ref={paraRef} className="text-[clamp(2rem,5vw,5rem)] font-extrabold tracking-tight leading-tight text-foreground overflow-visible">
              {headingText}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 max-w-4xl mx-auto my-4 sm:my-6 mb-8 sm:mb-14">
            {tags.map((tag, idx) => (
              <div key={tag.id || `tag-${idx}`} ref={(el) => { tagRefs.current[idx] = el; }}
                className="px-5 sm:px-8 py-2.5 sm:py-4 rounded-full text-[clamp(0.95rem,2vw,1.8rem)] font-semibold tracking-tight opacity-0 shadow-lg will-change-[clip-path,opacity]"
                style={{ backgroundColor: tag.background, color: tag.color || '#2B2620', clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}>
                {tag.text}
              </div>
            ))}
          </div>

          {subText && <p className="text-[clamp(0.95rem,1.5vw,1.35rem)] text-muted-foreground font-normal max-w-xl mt-2 sm:mt-4 px-4">{subText}</p>}
        </div>

        <div className="relative w-full">
          <div ref={imageWrapperRef} className="w-full h-screen flex justify-center items-center relative overflow-hidden">
            <div ref={imageBoxRef} className="relative w-full h-full overflow-hidden flex justify-center items-center will-change-[clip-path]">
              <img src={imageSrc} alt="Kelas 7E" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full min-h-[60vh] flex justify-center items-center text-center px-4 sm:px-8 py-8 text-[clamp(1.8rem,4.5vw,4.5rem)] font-bold tracking-tight leading-tight text-foreground relative z-10">
        {bottomText}
      </section>
    </div>
  );
};

export default HeroScrollImageReveal;
```

Install dependency: `gsap` (sudah sama dengan Motion Footer, jangan install dua kali kalau sudah ada).

Wajib disesuaikan opencode saat integrasi:
1. `imageSrc` pakai foto/logo kelas yang sudah ada di project (`public/images/branding/class-logo.jpg` atau foto kelas lain kalau ada yang lebih representatif). JANGAN pakai stock Unsplash — ini bukan komponen generic, harus foto asli kelas.
2. Isi `topText`, `headingText`, `tags`, `subText`, `bottomText` dengan konten arsip kelas 7E, bukan template asli ("Step into mountain calm" dsb). Tags contoh: "36 Murid", "SMPN 203 Jakarta", "Wali Kelas: Yohanes Christian", "Kelas 7E" — masing-masing pakai warna dari palet Zen Linen (coral/sky blue/kuning/muted), bukan hijau-hijau tema gunung aslinya.
3. Plugin `SplitText` di kode asli dihilangkan di versi ini karena sifatnya premium plugin GSAP dan belum tentu tersedia — kalau opencode mau tetap pakai word-by-word reveal yang lebih halus, cek dulu apakah `gsap` versi yang terinstall sudah termasuk `SplitText` gratis; kalau tidak, animasi fallback ini (tanpa SplitText, animasi di level paragraf) sudah cukup.
4. Taruh section ini di homepage, setelah Hero utama dan sebelum "Dinding Foto Siswa" — bukan menggantikan hero utama (lihat alasan performa di bagian atas).
5. Hilangkan semua referensi warna hardcode dark (`#0d0f0d`, `text-white`, dsb) dari kode asli, ganti total ke `bg-background`/`text-foreground` dari token Zen Linen.

---

## Cara Kerja untuk opencode
1. Audit dulu apakah project sudah punya CSS variables ala shadcn (`--background`, dst). Kalau belum, buat di `globals.css` sesuai Bagian 1.
2. Terapkan Bagian 1 (warna) dan Bagian 2 (gradient) ke seluruh halaman yang sudah ada dulu, sebelum masuk komponen baru.
3. Integrasikan Motion Footer (Bagian 4), preview hasilnya.
4. Integrasikan Hero Scroll Pin Reveal versi foto (Bagian 5), preview hasilnya.
5. Test scroll behavior di mobile dan desktop, pastikan tidak ada jank, pastikan floating bottom nav tetap berfungsi normal berdampingan dengan footer baru.
6. Jalankan review akhir pakai `ui-ux-pro-max` untuk cek konsistensi warna, kontras, dan smoothness animasi di seluruh halaman.

## Yang Tidak Boleh Berubah
- Data siswa, struktur navbar, link WhatsApp Rafa, struktur halaman (Students, Gallery, Schedule, About).
