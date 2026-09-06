import { avatarVariantFor } from "@/lib/student-gender";

const AVATAR_VARIANTS: Record<
  "male" | "female" | "neutral" | "brand",
  { bg: string; fg: string }
> = {
  male: { bg: "var(--male)", fg: "#0e2a47" },
  female: { bg: "var(--female)", fg: "#471527" },
  neutral: { bg: "var(--muted-bg)", fg: "#2b2620" },
  brand: { bg: "var(--coral)", fg: "#201a17" },
};

export function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Per-student avatar: gender-tinted when known (male blue / female pink),
 * neutral linen when the gender data is still empty. Color keyed by
 * absent number stays deterministic across renders.
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
  const variant = avatarVariantFor(absentNumber);
  const c = AVATAR_VARIANTS[variant];
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
