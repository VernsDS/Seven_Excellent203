import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Class memories of 7E Seven Excellent — real, authorized photographs only.",
};

/**
 * Intentional placeholders — per docs/PRD.md and README.md:
 * no fake memories, no random stock people. Real photographs are
 * added only when authorized assets land in public/images/gallery/.
 */
export default function GalleryPage() {
  const frames = [
    { label: "First assembly", ratio: "aspect-[4/3]" },
    { label: "Class photo", ratio: "aspect-[3/4]" },
    { label: "Study together", ratio: "aspect-square" },
    { label: "Sports week", ratio: "aspect-[4/3]" },
    { label: "Art project", ratio: "aspect-[3/4]" },
    { label: "Break time", ratio: "aspect-square" },
  ];

  return (
    <div className="container-page py-16">
      <p className="eyebrow">Gallery</p>
      <h1 className="display mt-3 text-4xl text-balance-h md:text-5xl">
        Memory, waiting for its photographs.
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        The gallery opens with authorized class photographs only. Until then,
        each frame holds its place — intentionally, not decoratively.
      </p>

      <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {frames.map((f) => (
          <figure
            key={f.label}
            className={`grid ${f.ratio} place-items-center break-inside-avoid border border-line bg-surface`}
          >
            <figcaption className="px-6 text-center">
              <span className="display text-muted">{f.label}</span>
              <p className="eyebrow mt-2">Asset pending</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
