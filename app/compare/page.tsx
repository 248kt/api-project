"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe, X, Check, Minus } from "lucide-react";
import { getApiBySlug } from "@/data/apis";
import { CATEGORIES } from "@/data/categories";
import type { Api } from "@/data/apis";

function CompareTable({ apis }: { apis: Api[] }) {
  const router = useRouter();

  const rows: { label: string; render: (a: Api) => React.ReactNode }[] = [
    {
      label: "Category",
      render: (a) => {
        const cat = CATEGORIES.find((c) => c.slug === a.category);
        return cat?.label ?? a.category;
      },
    },
    {
      label: "Auth",
      render: (a) => {
        const labels: Record<string, string> = { none: "No Auth", apiKey: "API Key", bearer: "Bearer", oauth2: "OAuth 2.0" };
        return labels[a.authType];
      },
    },
    {
      label: "Free tier",
      render: (a) =>
        a.freeTier ? (
          <span className="inline-flex items-center gap-1 text-emerald-500"><Check size={13} /> Yes</span>
        ) : (
          <span className="inline-flex items-center gap-1 text-base-content/30"><Minus size={13} /> No</span>
        ),
    },
    {
      label: "Base URL",
      render: (a) => (
        <code className="text-xs bg-base-300 px-2 py-0.5 rounded break-all">{a.baseUrl}</code>
      ),
    },
    {
      label: "Endpoints",
      render: (a) => `${a.endpoints.length} example${a.endpoints.length !== 1 ? "s" : ""}`,
    },
    {
      label: "Tags",
      render: (a) => (
        <div className="flex flex-wrap gap-1">
          {a.tags.slice(0, 4).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-base-300 text-base-content/70">{t}</span>
          ))}
        </div>
      ),
    },
    {
      label: "Links",
      render: (a) => (
        <div className="flex flex-col gap-1.5">
          <a href={a.docsUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            <ExternalLink size={10} /> Docs
          </a>
          <a href={a.websiteUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-base-content/50 hover:text-base-content">
            <Globe size={10} /> Website
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-base-300">
            <th className="text-left py-3 pr-6 text-xs font-medium text-base-content/40 uppercase tracking-widest w-32">
              API
            </th>
            {apis.map((a) => (
              <th key={a.slug} className="text-left py-3 px-4 min-w-[200px]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/apis/${a.slug}`} className="font-semibold hover:underline underline-offset-2">
                      {a.name}
                    </Link>
                    <p className="text-xs font-normal text-base-content/50 mt-0.5 line-clamp-1">{a.tagline}</p>
                  </div>
                  <button
                    onClick={() => {
                      const remaining = apis.filter((x) => x.slug !== a.slug).map((x) => x.slug);
                      if (remaining.length === 0) router.push("/");
                      else router.push(`/compare?apis=${remaining.join(",")}`);
                    }}
                    className="text-base-content/20 hover:text-base-content/60 shrink-0 mt-0.5"
                  >
                    <X size={13} />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, render }) => (
            <tr key={label} className="border-b border-base-300/50 hover:bg-base-200/40">
              <td className="py-4 pr-6 text-xs font-medium text-base-content/40 uppercase tracking-widest align-top">
                {label}
              </td>
              {apis.map((a) => (
                <td key={a.slug} className="py-4 px-4 align-top text-base-content/80">
                  {render(a)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const slugs = (searchParams.get("apis") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  const apis = slugs.map(getApiBySlug).filter((a): a is Api => a !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-base-content/50 hover:text-base-content mb-8 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to APIs
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Compare APIs</h1>
        <p className="text-base-content/50">
          {apis.length > 0
            ? `Comparing ${apis.length} API${apis.length !== 1 ? "s" : ""}`
            : "Select APIs to compare by clicking the scale icon on any card"}
        </p>
      </div>

      {apis.length === 0 ? (
        <div className="text-center py-24 text-base-content/30 border border-dashed border-base-300 rounded-xl">
          <p className="text-lg mb-3">No APIs selected</p>
          <Link href="/" className="text-sm underline underline-offset-4 hover:text-base-content/60">
            Browse APIs and add them to compare
          </Link>
        </div>
      ) : apis.length === 1 ? (
        <div className="text-center py-16 text-base-content/40 border border-dashed border-base-300 rounded-xl">
          <p className="mb-2">Add at least one more API to compare</p>
          <Link href="/" className="text-sm underline underline-offset-4 hover:text-base-content/60">
            Browse APIs
          </Link>
        </div>
      ) : (
        <CompareTable apis={apis} />
      )}

      {apis.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {apis.map((a) => (
            <Link
              key={a.slug}
              href={`/apis/${a.slug}`}
              className="btn btn-ghost btn-sm border border-base-300 gap-1.5"
            >
              View {a.name} docs →
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="h-8 w-48 rounded bg-base-300 animate-pulse mb-8" />
        <div className="h-10 w-64 rounded bg-base-300 animate-pulse mb-10" />
        <div className="h-96 rounded-xl bg-base-200 animate-pulse" />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
