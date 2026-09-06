# Prompt: Fix Bug + Curved Menu + Reduce Motion Notice + Placeholder Gender

Lanjutan dari redesign sebelumnya (Zen Linen + Motion Footer + Hero Scroll Pin). Kerjakan di branch baru dari `main` yang sudah berisi baseline redesign itu.

Keputusan yang sudah difinalkan (jangan tanya ulang ke user, langsung eksekusi):
- Data gender siswa BELUM ada. Buat struktur datanya dengan placeholder kosong, biar diisi manual nanti oleh Rafa.
- Curved Menu TIDAK menduplikasi navigasi yang sudah ada. Lihat Bagian 6 untuk arsitektur finalnya.
- Notifikasi reduce motion muncul setiap kali `prefers-reduced-motion` terdeteksi aktif di device user, pada setiap full page load (bukan tiap klik link internal).

---

## BAGIAN 1 — Fix Bug Spasi Hilang di Headline

Screenshot menunjukkan teks headline "Tigapuluhenamnama,satu arsipyangterusjalan." — spasi antar kata hilang. Ini terjadi karena kata-kata di-split jadi elemen `<span>` individual (untuk animasi reveal per kata) tapi tidak diberi jarak/margin di antaranya.

Perbaikan wajib di komponen Hero Scroll Pin Reveal (`headingText`/`topText`/`bottomText`):
- Setiap kata yang dibungkus `<span className="reveal-word">` HARUS diberi `inline-block mr-[0.25em]` (atau setara) supaya ada jarak visual antar kata setelah di-split.
- Kalau implementasi split kata dilakukan otomatis lewat fungsi JS (misal `text.split(" ").map(...)`), pastikan fungsi split-nya benar memecah berdasarkan spasi, dan tidak menghilangkan karakter spasi itu sendiri saat di-render.
- Setelah fix, cek ulang tampilan headline ini dan headline lain yang pakai teknik animasi kata serupa (termasuk di Motion Footer kalau ada elemen sejenis) — pastikan tidak ada kata yang nempel.

## BAGIAN 2 — Perdalam Warna Sedikit

Palet Zen Linen sebelumnya kurang gelap dikit. Update token di `globals.css`:

```css
--background: #EDE3D0;       /* sebelumnya #F5EFE4, sedikit lebih dalam */
--muted: #E1D4BB;             /* sebelumnya #EAE1D2 */
--muted-foreground: #5C5346;  /* sedikit digelapkan biar kontras tetap terjaga di atas --muted baru */
--border: #D3C3A4;
```

`--foreground`, `--primary`, `--secondary`, `--accent`, `--destructive` tetap sama seperti sebelumnya. Setelah diganti, cek ulang kontras teks di semua section (target WCAG AA), terutama section yang pakai `--muted` sebagai background card.

## BAGIAN 3 — Placeholder Foto: Warna Berdasarkan Gender

Saat ini placeholder "Foto belum ditambahkan" menampilkan teks besar (nomor absen/inisial) dengan warna generik. Ganti jadi:
- Kalau siswa gender laki-laki → placeholder pakai warna biru dari palet (tambahkan token baru `--male: #4A9DFF` kalau `--secondary` yang sekarang dirasa kurang biru).
- Kalau siswa gender perempuan → placeholder pakai warna pink (tambahkan token baru `--female: #FF7FA6`).
- Kalau data gender belum diisi (null/undefined) → fallback ke warna netral (`--muted`), JANGAN error atau nge-crash.

Karena data gender siswa belum ada, buat file baru `lib/student-gender.ts` (atau tambahkan field `gender` langsung ke data siswa yang sudah ada kalau strukturnya berupa array/object per siswa):

```ts
// lib/student-gender.ts
// TODO: Rafa isi manual "L" (laki-laki) atau "P" (perempuan) untuk tiap absen.
// Biarkan null kalau belum yakin - placeholder akan pakai warna netral.
export type Gender = "L" | "P" | null;

export const studentGender: Record<number, Gender> = {
  1: L, 2: P, 3: P, 4: P, 5: P, 6: P,
  7: P, 8: L, 9: L, 10: P, 11: L, 12: L,
  13: P, 14: P, 15: L, 16: P, 17: L, 18: P,
  19: L, 20: L, 21: L, 22: L, 23: L, 24: L,
  25: L, 26: P, 27: L, 28: L, 29: L, 30: P,
  31: P, 32: P, 33: P, 34: P, 35: P, 36: L,
};
```

Lalu komponen placeholder foto membaca `studentGender[absen]` untuk menentukan warna. Pastikan opencode kasih tau Rafa di akhir bahwa file ini perlu diisi manual (ganti `null` jadi `"L"` atau `"P"` per nomor absen) supaya warnanya keluar sesuai gender.

## BAGIAN 4 — Notifikasi Reduce Motion

Tambahkan banner notifikasi yang muncul kalau `window.matchMedia('(prefers-reduced-motion: reduce)').matches` bernilai true saat halaman pertama kali dimuat (root layout, cek sekali di client-side).

Spesifikasi:
- Posisi: banner non-blocking, misal fixed di atas layar (di bawah navbar) atau sebagai toast di pojok.
- Isi teks: "Reduce motion kamu aktif nih, matikan untuk melihat seluruh animasi di website ini"
- Dua tombol:
  - **"Matikan"** → set flag (misal di `sessionStorage`, key `override-reduced-motion`) jadi `true`. Semua animasi GSAP/Framer Motion di project HARUS cek flag ini juga, bukan cuma `prefers-reduced-motion` — kalau flag override aktif, jalankan animasi penuh meskipun OS user setting-nya reduce motion. Banner hilang setelah diklik.
  - **"Biarkan"** → banner hilang, tidak ada override, animasi tetap dikurangi/mati sesuai setting OS user, sesuai prinsip aksesibilitas.
- Flag override ini cukup berlaku untuk sesi itu saja (`sessionStorage`, bukan `localStorage`) — kalau user buka lagi website di kunjungan baru dan reduce motion di device-nya masih aktif, banner ini muncul lagi (sesuai permintaan).
- Styling banner ikut token warna Zen Linen (Bagian 2), jangan pakai warna default browser/alert biasa.

## BAGIAN 5 — Ganti Semua Referensi Logo Kelas

Path lokal yang dikasih (`C:\Users\Administrator\Documents\Seven_Excellent203\public\images\branding\class-logo.jpg`) itu path di komputer Windows kamu, BUKAN path yang dipakai di kode. Karena file itu ada di dalam folder `public/`, cara benar mereferensikannya di Next.js adalah:

```tsx
import Image from "next/image";

<Image src="/images/branding/class-logo.jpg" alt="Logo Kelas 7E" width={40} height={40} />
```

Cari SEMUA tempat di project yang menyebut atau menampilkan logo kelas (navbar, hero pin reveal image, favicon kalau relevan, footer giant text kalau ingin diganti jadi logo bergambar, dsb) dan pastikan semuanya mengarah ke path `/images/branding/class-logo.jpg` ini secara konsisten, bukan hardcode path Windows atau path yang salah.

## BAGIAN 6 — Integrasi Curved Menu

### Arsitektur Navigasi Final (biar tidak dobel dengan navbar yang sudah ada)

- **Desktop**: Navbar atas disederhanakan jadi: Logo + wordmark (kiri), tombol CTA "Hubungi Rafa" (tetap ada, quick access), dan ikon hamburger (kanan) yang membuka Curved Menu fullscreen. Link teks inline (Students/Gallery/Schedule/About) yang sekarang ada di navbar DIHAPUS dari navbar biasa karena akan dipindah jadi isi dari Curved Menu.
- **Mobile**: Floating bottom nav tetap ada untuk quick access (Home, Students, Gallery, Search), tapi salah satu icon-nya ("Menu"/"More") membuka Curved Menu fullscreen yang SAMA dengan yang di desktop — bukan menu terpisah lagi.
- Dengan begini cuma ada SATU "full menu" (Curved Menu) yang bisa diakses dari dua entry point (hamburger desktop, tombol Menu di floating nav mobile), tidak ada dua daftar link yang berbeda dan membingungkan.

### Kode Komponen (adaptasi dari referensi, WAJIB disesuaikan sebelum dipasang)

```tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface iNavItem {
  heading: string;
  href: string;
  subheading?: string;
}

interface iNavLinkProps extends iNavItem {
  setIsActive: (isActive: boolean) => void;
  index: number;
  isTouch: boolean;
}

interface iCurvedNavbarProps {
  setIsActive: (isActive: boolean) => void;
  navItems: iNavItem[];
  isTouch: boolean;
}

interface iHeaderProps {
  navItems?: iNavItem[];
  footer?: React.ReactNode;
}

const MENU_SLIDE_ANIMATION = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

// GANTI ke halaman nyata Seven Excellent 203
const defaultNavItems: iNavItem[] = [
  { heading: "Home", href: "/", subheading: "Beranda arsip kelas" },
  { heading: "Students", href: "/students", subheading: "36 murid kelas 7E" },
  { heading: "Gallery", href: "/gallery", subheading: "Kenangan dan kegiatan kelas" },
  { heading: "Schedule", href: "/schedule", subheading: "Jadwal pelajaran" },
  { heading: "About", href: "/about", subheading: "Tentang kelas 7E" },
];

const CustomFooter: React.FC = () => {
  return (
    <div className="flex w-full text-sm justify-between items-center text-foreground px-10 md:px-24 py-5 border-t border-border">
      <span className="text-muted-foreground text-xs uppercase tracking-widest">Kelas 7E · SMPN 203 Jakarta</span>
      <a
        href="https://wa.me/6282121979710"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
      >
        <MessageCircle size={20} />
        <span>Hubungi Rafa</span>
      </a>
    </div>
  );
};

const NavLink: React.FC<iNavLinkProps> = ({ heading, href, setIsActive, index, isTouch }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isTouch) return; // no hover di touch device
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleClick = () => setIsActive(false);

  return (
    <motion.div
      onClick={handleClick}
      initial="initial"
      whileHover={isTouch ? undefined : "whileHover"}
      animate={isTouch ? "autoPlay" : "initial"}
      className="group relative flex items-center justify-between border-b border-border py-4 transition-colors duration-500 md:py-8 uppercase"
    >
      <Link ref={ref} onMouseMove={handleMouseMove} href={href}>
        <div className="relative flex items-start">
          <span className="text-foreground transition-colors duration-500 text-4xl font-thin mr-2">{index}.</span>
          <div className="flex flex-row gap-2">
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: -16 },
                autoPlay: { x: [0, -8, 0], transition: { duration: 2.4, repeat: Infinity, repeatType: "mirror", delay: index * 0.15 } },
              }}
              transition={{ type: "spring", staggerChildren: 0.075, delayChildren: 0.25 }}
              className="relative z-10 block text-4xl font-extralight text-foreground transition-colors duration-500 md:text-4xl"
            >
              {heading.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { x: 0 },
                    whileHover: { x: 16 },
                    autoPlay: { x: [0, 6, 0], transition: { duration: 2.4, repeat: Infinity, repeatType: "mirror", delay: index * 0.15 + i * 0.03 } },
                  }}
                  transition={{ type: "spring" }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Curve: React.FC = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => setHeight(window.innerHeight), []);
  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: { d: targetPath, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
    exit: { d: initialPath, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  };

  return (
    <svg className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full" style={{ fill: "var(--background)" }}>
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
    </svg>
  );
};

const CurvedNavbar: React.FC<iCurvedNavbarProps & { footer?: React.ReactNode }> = ({ setIsActive, navItems, footer, isTouch }) => {
  return (
    <motion.div
      variants={MENU_SLIDE_ANIMATION}
      initial="initial"
      animate="enter"
      exit="exit"
      className="h-[100dvh] w-screen max-w-screen-sm fixed right-0 top-0 z-40 bg-background"
    >
      <div className="h-full pt-11 flex flex-col justify-between">
        <div className="flex flex-col text-5xl gap-3 mt-0 px-10 md:px-24">
          <div className="text-muted-foreground border-b border-border uppercase text-sm mb-0">
            <p>Navigation</p>
          </div>
          <section className="bg-transparent mt-0">
            <div className="mx-auto max-w-7xl">
              {navItems.map((item, index) => (
                <NavLink key={item.href} {...item} setIsActive={setIsActive} index={index + 1} isTouch={isTouch} />
              ))}
            </div>
          </section>
        </div>
        {footer}
      </div>
      <Curve />
    </motion.div>
  );
};

const CurvedMenu: React.FC<iHeaderProps> = ({ navItems = defaultNavItems, footer = <CustomFooter /> }) => {
  const [isActive, setIsActive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  return (
    <>
      <div
        onClick={() => setIsActive(!isActive)}
        className="fixed right-4 top-4 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-background border border-border shadow-md"
      >
        <div className="relative w-6 h-5 flex flex-col justify-between items-center">
          <span className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${isActive ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${isActive ? "opacity-0" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${isActive ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <CurvedNavbar setIsActive={setIsActive} navItems={navItems} footer={footer} isTouch={isTouch} />}
      </AnimatePresence>
    </>
  );
};

export default CurvedMenu;
```

Install dependency baru: `framer-motion` (belum ada di project ini, tambahkan). `lucide-react` sudah ada dari komponen sebelumnya.

### Wajib disesuaikan opencode saat integrasi
1. Trigger hamburger untuk `CurvedMenu` dipasang di navbar desktop (pojok kanan) DAN dipanggil ulang lewat tombol "Menu"/"More" di floating bottom nav mobile — pastikan cuma ada satu instance `isActive` state yang dipakai bersama (taruh `CurvedMenu` sekali di root layout, lalu trigger buka menu dari kedua tempat lewat context/props, bukan render dua komponen `CurvedMenu` terpisah).
2. Warna `Curve` SVG pakai `var(--background)` supaya otomatis ikut tema Zen Linen, bukan hardcode putih.
3. Auto-animate (`autoPlay` variant) di NavLink HANYA aktif kalau `isTouch` true — di desktop tetap pakai interaksi hover seperti aslinya.
4. Pastikan z-index `CurvedMenu` (z-40/z-50) tidak konflik dengan floating bottom nav dan Motion Footer yang sudah ada — Curved Menu harus di atas semuanya saat terbuka.
5. Hilangkan dependency ke gambar (`imgSrc`) yang tidak dipakai jika tidak relevan.

---

## Cara Kerja untuk opencode
1. Fix Bagian 1 (bug spasi) dan Bagian 2 (warna) dulu karena ini regresi dari kerjaan sebelumnya, paling prioritas.
2. Kerjakan Bagian 3 (placeholder gender) dan Bagian 5 (path logo) — perubahan data/asset, relatif aman.
3. Kerjakan Bagian 4 (notifikasi reduce motion).
4. Terakhir Bagian 6 (Curved Menu) karena paling kompleks dan menyentuh banyak bagian navigasi.
5. Setelah semua selesai, kasih preview tiap bagian, jangan gabung semua jadi satu commit besar tanpa checkpoint.

## Yang Tidak Boleh Berubah
- Data siswa, struktur halaman, link WhatsApp Rafa.
- Warna dan animasi yang sudah bagus dari redesign sebelumnya (Motion Footer, Hero Scroll Pin) — Bagian ini cuma FIX bug dan TAMBAH fitur baru, bukan redesign ulang dari nol.
- Bug hunt, ketemu? FIX SAAT ITU JUGA