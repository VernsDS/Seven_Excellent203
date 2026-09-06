import type { Metadata } from "next";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Galeri kegiatan Kelas 7E Seven Excellent, SMPN 203 Jakarta. Foto asli, sah, dan berizinkan saja.",
};

/**
 * Grid galeri dari lib/gallery.ts. Entri tanpa src = bingkai placeholder
 * yang menjaga layout tetap rapi sampai fotonya diunggah.
 */
export default function GalleryPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow-chip">Gallery</p>
      <h1 className="display mt-3 text-4xl text-balance-h md:text-5xl">
        Kenangan 7E, satu per satu.
      </h1>
      <p className="mt-4 max-w-lg section-sub">
        Semua foto di sini adalah dokumentasi asli kelas. Foto masuk seiring
        diunggah — tanpa bingkai kosong yang dibiarkan rusak.
      </p>

      <div className="gallery-preview mt-12">
        {GALLERY_ITEMS.map((item) => (
          <figure
            key={item.title}
            className={`gallery-frame card ${item.src ? "has-photo" : "is-pending"}`}
          >
            {item.src ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="gallery-frame-photo"
              />
            ) : (
              <>
                <figcaption>{item.title}</figcaption>
                <span className="gallery-frame-tag" aria-hidden="true">
                  Menunggu foto
                </span>
              </>
            )}
            {item.src && (
              <figcaption className="gallery-frame-caption">
                {item.title}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
