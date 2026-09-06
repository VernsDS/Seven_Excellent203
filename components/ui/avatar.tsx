const AVATAR_COLORS = [
  { bg: "var(--coral)", fg: "#201a17" },
  { bg: "var(--sky)", fg: "#0f2733" },
  { bg: "var(--sun)", fg: "#332a05" },
  { bg: "var(--coral-deep)", fg: "#fff6f2" },
  { bg: "var(--sky-deep)", fg: "#f0faff" },
] as const;

export function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Deterministic per-student avatar: rotating brand colors keyed by
 * absent number, so the placeholder wall looks varied but stable
 * across renders. Used wherever a student has no photo yet.
 */
export function StudentAvatar({
  name,
  absentNumber,
  className = "",
  size = "100%",
}: {
  name: string;
  absentNumber: number;
  className?: string;
  size?: string;
}) {
  const c = AVATAR_COLORS[absentNumber % AVATAR_COLORS.length];
  return (
    <span
      className={`student-avatar ${className}`}
      style={{ background: c.bg, color: c.fg, width: size, height: size }}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  );
}
