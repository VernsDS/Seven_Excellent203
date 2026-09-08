"use client";

import { useState } from "react";
import BlurText from "@/components/ui/BlurText";
import BorderGlow from "@/components/ui/BorderGlow";
import ShinyText from "@/components/ui/ShinyText";

type Status = "idle" | "sending" | "sent" | "error";

export default function SaranSection() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const remaining = 1500 - message.length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/saran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setError(data.error ?? "Gagal mengirim.");
        setStatus("error");
        return;
      }
      setMessage("");
      setStatus("sent");
    } catch {
      setError("Koneksi bermasalah. Coba lagi.");
      setStatus("error");
    }
  }

  return (
    <section
      id="saran"
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-20"
    >
      <p className="eyebrow-chip mb-4">Kotak Saran</p>
      <h2 className="font-display text-6xl font-bold tracking-tight md:text-8xl">
        Kata 7E.
      </h2>
      <div className="mt-6 max-w-xl text-lg text-muted-foreground">
        <BlurText
          text="Punya ide, kritik, atau mau kasih tahu sesuatu ke kelas? Tulis di sini. Semua saran masuk langsung ke forum kelas."
          animateBy="words"
          direction="top"
          delay={40}
        />
      </div>

      {status === "sent" ? (
        <div className="mt-12 rounded-2xl border border-accent bg-accent/10 p-8 text-center">
          <p className="font-display text-2xl font-bold text-accent-strong">
            Terkirim!
          </p>
          <p className="mt-2 text-muted-foreground">
            Terima kasih, sarannya sudah masuk ke forum kelas.
          </p>
          <button
            type="button"
            className="btn-ghost mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:border-accent"
            onClick={() => setStatus("idle")}
          >
            Kirim lagi
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">
              Saran / kritik / ide
            </span>
            <textarea
              required
              minLength={3}
              maxLength={1500}
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis saranmu di sini..."
              className="w-full resize-y rounded-2xl border border-border bg-surface p-5 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            />
            <span
              className={`text-xs ${remaining < 100 ? "text-accent-strong" : "text-muted-foreground"}`}
            >
              {remaining} karakter tersisa
            </span>
          </label>

          {status === "error" && error && (
            <p role="alert" className="text-sm font-semibold text-accent-strong">
              {error}
            </p>
          )}

          <BorderGlow
            backgroundColor="#0A0A0A"
            glowColor="48 100 60"
            colors={["#FFD400", "#FFEA70", "#E6BF00"]}
            borderRadius={999}
            animated={false}
            className="self-start"
          >
            <button
              type="submit"
              disabled={status === "sending" || message.trim().length < 3}
              className="block rounded-full px-8 py-3.5 text-sm font-bold text-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? (
                "Mengirim..."
              ) : (
                <ShinyText text="Kirim Saran" speed={3} />
              )}
            </button>
          </BorderGlow>
        </form>
      )}
    </section>
  );
}
