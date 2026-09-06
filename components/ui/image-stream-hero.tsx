import Image from "next/image";
import { waLink } from "@/lib/contact";
import { StudentAvatar } from "@/components/ui/avatar";
import type { Student } from "@/lib/students";

/**
 * Student photo stream: a continuously moving wall of 7E portraits in a
 * perspective corridor. Two mirrored rails travel in opposite directions
 * via CSS keyframes on the rail element only (transform, GPU-friendly);
 * negative delays pre-populate the stream so it is already in motion on
 * first paint. All content comes from the students prop. No photo =
 * designed archive placeholder, never a substitute face.
 */
export function ImageStreamHero({ students }: { students: Student[] }) {
  const half = Math.ceil(students.length / 2);
  const railA = students.slice(0, half);
  const railB = students.slice(half);

  return (
    <section className="stream" aria-label="Dinding potret siswa 7E">
      <div className="stream-corridor">
        <div className="stream-rail stream-rail--a">
          <div className="stream-track">
            {railA.map((s) => (
              <StreamCard key={`a-${s.id}`} student={s} />
            ))}
            <div className="stream-copy" aria-hidden="true">
              {railA.map((s) => (
                <StreamCard key={`a2-${s.id}`} student={s} />
              ))}
            </div>
          </div>
        </div>
        <div className="stream-rail stream-rail--b">
          <div className="stream-track">
            {railB.map((s) => (
              <StreamCard key={`b-${s.id}`} student={s} />
            ))}
            <div className="stream-copy" aria-hidden="true">
              {railB.map((s) => (
                <StreamCard key={`b2-${s.id}`} student={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="stream-note">
        Setiap kartu adalah satu murid 7E. Foto diambil dari arsip resmi
        kelas, dan dinding ini akan terisi seiring foto masuk. Ingin fotomu
        tampil di sini?{" "}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="stream-note-link"
        >
          Hubungi Rafa
        </a>
        .
      </p>
    </section>
  );
}

function StreamCard({ student: s }: { student: Student }) {
  return (
    <figure className="stream-card">
      <div className="stream-card-photo">
        {s.photo ? (
          <Image
            src={s.photo}
            alt={s.name}
            fill
            sizes="220px"
            draggable={false}
          />
        ) : (
          <div className="stream-placeholder" aria-hidden="true">
            <StudentAvatar
              name={s.name}
              absentNumber={s.absentNumber}
              className="stream-avatar"
            />
            <span className="stream-placeholder-kicker">
              Foto siswa/i 7E
            </span>
            <span className="stream-placeholder-label">
              Foto belum ditambahkan
            </span>
          </div>
        )}
        <span className="stream-card-shade" aria-hidden="true" />
      </div>
      <figcaption className="stream-card-caption">
        <span className="stream-card-name">{s.name}</span>
        <span className="stream-card-meta">
          Absen {String(s.absentNumber).padStart(2, "0")}
          {s.role === "Class President" ? " · Class President" : ""}
        </span>
        <span className="stream-card-brand">7E · SMPN 203</span>
      </figcaption>
    </figure>
  );
}
