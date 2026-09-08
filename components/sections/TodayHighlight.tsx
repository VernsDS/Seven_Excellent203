"use client";

import { useEffect } from "react";
import { todayName } from "@/lib/schedule";

/**
 * Menandai kartu jadwal hari ini (zona WIB) dengan class .is-today.
 * Client-only: Date tidak boleh dihitung saat server render.
 */
export default function TodayHighlight() {
  useEffect(() => {
    const day = todayName();
    if (!day) return;
    document
      .querySelectorAll<HTMLElement>(`.schedule-day[data-day="${day}"]`)
      .forEach((el) => el.classList.add("is-today"));
  }, []);
  return null;
}
