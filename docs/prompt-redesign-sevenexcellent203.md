# Prompt Total Redesign — Seven Excellent 203 (Kelas 7E SMPN 203 Jakarta)

Gunakan skill yang sudah terpasang: `ui-ux-pro-max`, `taste`, `landing-page-generator`, `slides`, `ponytail`, `superpowers`. Terapkan `taste` dan `ui-ux-pro-max` di setiap keputusan visual, jangan cuma di akhir.

## Konteks Project
- Stack: Next.js (App Router) + TypeScript.
- Repo: struktur ada di `app/`, `components/`, `lib/`, `public/`.
- Halaman yang ada: Home, Students, Gallery, Schedule, About.
- Target user: siswa SMP kelas 7, orang tua, guru — jadi harus terasa hidup dan "anak muda", bukan formal seperti web instansi.
- Masalah saat ini: warna terlalu gelap/monoton di semua section, navbar cuma teks polos tanpa hierarki visual, tidak ada navigasi cepat di mobile.

## Arah Desain: Cerah & Playful ala Anak SMP
Bangun design token baru di `tailwind.config.ts` (atau file token yang dipakai project) dengan palet ini sebagai basis — boleh disesuaikan asal tetap dalam keluarga warna cerah:

- **Primary/Brand**: Coral/Orange hangat (`#FF6B4A` — sekitar) untuk CTA dan aksen utama
- **Secondary**: Sky blue cerah (`#3DB6F2` area) untuk elemen sekunder/link aktif
- **Tertiary/Highlight**: Kuning matahari (`#FFD447` area) untuk badge, nomor absen, elemen dekoratif kecil
- **Background terang**: Cream/off-white (`#FFF9F0` atau `#FAFAFA`) — JANGAN putih polos, kasih sedikit warm tint
- **Dark anchor**: satu warna gelap netral (navy tua atau charcoal) HANYA dipakai di navbar/footer, bukan di section konten
- **Teks**: pastikan kontras WCAG AA minimum di setiap kombinasi warna—cek pakai `ui-ux-pro-max` sebelum lanjut

Prinsip: setiap section konten bergantian antara background terang dan sedikit warna pastel dari palet di atas, supaya scroll terasa berirama, bukan monoton satu warna gelap dari atas ke bawah.

## Komponen yang Harus Dibangun/Direvisi

### 1. Navbar Desktop
- Redesign dengan logo kelas lebih besar + nama "7E Seven Excellent" jadi wordmark yang jelas.
- Link aktif dapat pill background warna brand, bukan cuma underline.
- Tambah subtle shadow/blur saat halaman di-scroll (sticky navbar dengan transisi halus).

### 2. Floating Bottom Navbar (Mobile) — BARU
- Fixed di bawah layar, `rounded-full`, `backdrop-blur`, shadow lembut.
- Isi 4–5 icon (pakai `lucide-react`): Home, Students, Gallery, Search, Menu/More.
- Item tengah/aktif dapat lingkaran warna brand (coral) yang menonjol, mirip referensi tombol WhatsApp yang sudah dilihat sebelumnya.
- Hanya tampil di breakpoint mobile (`md:hidden`), sembunyikan otomatis saat user scroll ke bawah cepat, muncul lagi saat scroll ke atas (opsional, kalau skill animasi mendukung).

### 3. Hero Section
- Ganti background gelap polos jadi kombinasi warna cerah + elemen dekoratif (blob shapes, pattern titik-titik, atau ilustrasi ringan) yang playful tapi tidak berlebihan.
- CTA button pakai warna brand dengan hover state jelas.

### 4. Dinding Foto Siswa & Carousel "The People of 7E"
- Card foto pakai border-radius besar + shadow lembut, bukan flat di atas background gelap.
- Placeholder "Foto belum ditambahkan" didesain sebagai state yang enak dilihat (ilustrasi avatar generik warna-warni per siswa, bukan kotak abu-abu polos).
- Badge nomor absen pakai warna kuning/coral sebagai aksen kecil di pojok card.

### 5. Gallery, Schedule, About
- Konsisten pakai sistem warna & komponen card yang sama dengan section lain.
- Schedule: tampilkan sebagai grid/kartu hari yang jelas, bukan teks polos "Senin -".
- About: pecah info (kelas, sekolah, jumlah murid, ketua kelas, wali kelas) jadi stat cards kecil dengan ikon, bukan list teks datar.

### 6. Footer
- Tetap boleh gelap (dark anchor), tapi kasih sedikit aksen warna brand di link/ikon sosial supaya tidak terasa terputus dari tema cerah di atasnya.

## Instruksi Eksekusi untuk opencode
1. Jalankan `taste` dan `ui-ux-pro-max` dulu untuk audit warna & komponen yang ada sebelum menulis kode apa pun.
2. Buat design token (warna, spacing, radius) di satu tempat terpusat dulu — jangan hardcode warna di tiap komponen.
3. Kerjakan **per komponen**, review hasil tiap komponen (minta screenshot/preview) sebelum lanjut ke komponen berikutnya:
   - Design tokens → Navbar desktop → Floating bottom nav → Hero → Student wall/carousel → Gallery → Schedule → About → Footer.
4. Pastikan setiap perubahan tetap responsif (mobile-first) dan tidak merusak fungsi yang sudah ada (link WhatsApp "Hubungi Rafa", data siswa, dsb).
5. Cek kontras teks-background di setiap kombinasi warna baru sebelum commit.
6. Setelah semua komponen selesai, jalankan review akhir dengan `ui-ux-pro-max` untuk konsistensi keseluruhan.

## Yang TIDAK boleh berubah
- Struktur data siswa (36 murid, nomor absen, nama, kelas presiden).
- Link WhatsApp "Hubungi Rafa".
- Struktur halaman/URL (Students, Gallery, Schedule, About).
