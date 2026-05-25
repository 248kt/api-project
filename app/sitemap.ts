import type { MetadataRoute } from "next";
import { APIS } from "@/data/apis";
import { CATEGORIES } from "@/data/categories";

const BASE = "https://apiyard.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const apiPages: MetadataRoute.Sitemap = APIS.map((api) => ({
    url: `${BASE}/apis/${api.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${BASE}/?category=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    { url: BASE,                  lastModified: new Date(), changeFrequency: "daily",   priority: 1   },
    { url: `${BASE}/submit`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/compare`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    ...apiPages,
    ...categoryPages,
  ];
}
