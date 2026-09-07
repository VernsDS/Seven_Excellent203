/**
 * Gallery data. Cara nambah foto kegiatan:
 * 1. Taruh file foto di public/images/gallery/ (webp/jpg, disarankan sisi
 *    panjang 1600px+, Next.js yang optimasi otomatis).
 * 2. Tambah satu entri di bawah: { title, src: "/images/gallery/nama-file.webp" }.
 *    src dikosongkan (undefined) = bingkai placeholder yang menunggu foto,
 *    jadi layout tidak pernah rusak walau fotonya belum ada.
 */
export interface GalleryItem {
  title: string;
  alt: string;
  src?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { title: "Dispenser untuk sir yo!", alt: "Foto hadiah dispenser buat Sir Yo", src: "/images/gallery/foto-hadiah-bingkisan-sir-yo.webp" },
  { title: "Rapat kelas", alt: "Foto momen rapat kelas 7E" },
  { title: "LDKS di brigif 1", alt: "LDKS Rabu 3 september 2026 7E", src: "/images/gallery/ldks-rabu-03-sept-2026-7e.webp" },
  { title: "Belajar kelompok", alt: "Foto belajar kelompok siswa 7E" },
  { title: "Pekan olahraga", alt: "Foto kelas 7E di pekan olahraga" },
  { title: "Praktikum", alt: "Foto praktikum kelas 7E" },
  { title: "Jam istirahat", alt: "Foto jam istirahat kelas 7E" },
  { title: "Outing class", alt: "Foto outing class 7E" },
  { title: "Makrab 7E", alt: "Foto malam keakraban 7E" },
  { title: "Lomba 17an", alt: "Foto lomba tujuh belasan" },
  { title: "Jalan sehat", alt: "Foto jalan sehat kelas" }
];

/**
 * Foto dulu, placeholder di belakang — dipakai home & /gallery.
 * Di dalam masing-masing kelompok, urutan data (terbaru di atas) tetap.
 */
export function galleryPhotosFirst(): GalleryItem[] {
  const photos = GALLERY_ITEMS.filter((i) => i.src);
  const pending = GALLERY_ITEMS.filter((i) => !i.src);
  return [...photos, ...pending];
}
