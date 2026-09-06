/**
 * Centralized Contact Rafa configuration. The WhatsApp number lives here
 * and nowhere else. waLink() builds a deep link with an optional prefilled
 * message the user can edit before sending. Nothing is sent automatically.
 */
export const CONTACT_RAFA = {
  phone: "6282121979710",
  label: "Hubungi Rafa",
} as const;

const DEFAULT_MESSAGE =
  "Halo Rafa, saya murid 7E dan ingin menambahkan foto saya ke website Seven Excellent.";

export function waLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${CONTACT_RAFA.phone}?text=${encodeURIComponent(message)}`;
}
