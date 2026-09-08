import { NextResponse } from "next/server";

// Discord webhook untuk kotak saran. Dipanggil dari server route agar URL
// webhook tidak pernah terekspos ke browser.
const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1546928621841813555/K2SQS6lNXsOklcq2bsavZ7TvZfQCHyLo8K-7kqFRgz_lM_2iOV8TZ0JqrNx4a4lvAZeU";

export async function POST(request: Request) {
  try {
    const { message } = (await request.json()) as { message?: string };

    const text = (message ?? "").trim();
    if (text.length < 3) {
      return NextResponse.json(
        { ok: false, error: "Saran terlalu pendek (min. 3 karakter)." },
        { status: 400 },
      );
    }
    if (text.length > 1500) {
      return NextResponse.json(
        { ok: false, error: "Saran terlalu panjang (maks. 1500 karakter)." },
        { status: 400 },
      );
    }

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Kotak Saran 7E",
        embeds: [
          {
            title: "Saran baru dari website",
            description: text.slice(0, 2000),
            color: 0xffd447,
            footer: { text: "sevenexcellent203.zone.id" },
          },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Gagal mengirim saran. Coba lagi nanti." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Permintaan tidak valid." },
      { status: 400 },
    );
  }
}
