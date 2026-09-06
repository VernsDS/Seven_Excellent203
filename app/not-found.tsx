import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-6xl text-balance-h md:text-7xl">
        Absent from the archive.
      </h1>
      <p className="mt-6 max-w-md text-muted">
        This page is not on the roster. Head back to the class record.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/students" className="btn btn-ghost">
          Open directory
        </Link>
      </div>
    </div>
  );
}
