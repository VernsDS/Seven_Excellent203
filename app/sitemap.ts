import type { MetadataRoute } from "next";
import { CLASS_INFO, STUDENTS } from "@/lib/students";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = CLASS_INFO.domain;
  const routes = ["", "/students", "/about", "/gallery", "/schedule", "/privacy", "/terms"];

  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...STUDENTS.map((s) => ({
      url: `${base}/students/${s.id}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
