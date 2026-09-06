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
  { title: "Rapat kelas", alt: "Foto momen rapat kelas 7E" },
  { title: "Foto bersama", alt: "Foto bersama seluruh kelas 7E" },
  { title: "Belajar kelompok", alt: "Foto belajar kelompok siswa 7E" },
  { title: "Pekan olahraga", alt: "Foto kelas 7E di pekan olahraga" },
  { title: "Praktikum", alt: "Foto praktikum kelas 7E" },
  { title: "Jam istirahat", alt: "Foto jam istirahat kelas 7E" },
];
