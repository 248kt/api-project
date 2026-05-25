"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe, X, Check, Minus, Search, Plus } from "lucide-react";
import { APIS, getApiBySlug } from "@/data/apis";
import { CATEGORIES } from "@/data/categories";
import { getApiMeta } from "@/data/apiMeta";
import type { Api } from "@/data/apis";

// ── Auth labels ────────────────────────────────────────────────
const AUTH_LABELS: Record<string, string> = {
  none: "No Auth", apiKey: "API Key", bearer: "Bearer", oauth2: "OAuth 2.0",
};

const LATENCY_LABEL: Record<string, { label: string; class: string }> = {
  low:    { label: "Low",    class: "text-emerald-500" },
  medium: { label: "Medium", class: "text-amber-500"   },
  high:   { label: "High",   class: "text-red-400"     },
};

// ── Compare table ──────────────────────────────────────────────
function CompareTable({ apis, onRemove }: { apis: Api[]; onRemove: (slug: string) => void }) {
  const rows: { label: string; group?: string; render: (a: Api) => React.ReactNode }[] = [
    // Overview
    {
      label: "Category",
      group: "Overview",
      render: (a) => CATEGORIES.find((c) => c.slug === a.category)?.label ?? a.category,
    },
    {
      label: "Auth type",
      render: (a) => AUTH_LABELS[a.authType],
    },
    {
      label: "Protocol",
      render: (a) => {
        const m = getApiMeta(a.slug);
        if (!m.protocol?.length) return <span className="text-base-content/30">—</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {m.protocol.map((p) => (
              <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-base-300 text-base-content/70">{p}</span>
            ))}
          </div>
        );
      },
    },
    {
      label: "Latency",
      render: (a) => {
        const m = getApiMeta(a.slug);
        if (!m.latency) return <span className="text-base-content/30">—</span>;
        const { label, class: cls } = LATENCY_LABEL[m.latency];
        return <span className={`font-medium ${cls}`}>{label}</span>;
      },
    },

    // Pricing
    {
      label: "Free tier",
      group: "Pricing",
      render: (a) => {
        const m = getApiMeta(a.slug);
        const free = m.pricing?.free;
        if (free) return <span className="text-emerald-500 text-sm">{free}</span>;
        return a.freeTier
          ? <span className="inline-flex items-center gap-1 text-emerald-500"><Check size={13} /> Yes</span>
          : <span className="inline-flex items-center gap-1 text-base-content/30"><Minus size={13} /> No</span>;
      },
    },
    {
      label: "Paid pricing",
      render: (a) => {
        const m = getApiMeta(a.slug);
        if (!m.pricing?.paid) return <span className="text-base-content/30">—</span>;
        return <span className="text-sm">{m.pricing.paid}</span>;
      },
    },
    {
      label: "Rate limit",
      render: (a) => {
        const m = getApiMeta(a.slug);
        if (!m.rateLimit) return <span className="text-base-content/30">—</span>;
        return <span className="text-sm">{m.rateLimit}</span>;
      },
    },

    // Developer experience
    {
      label: "Official SDKs",
      group: "Developer experience",
      render: (a) => {
        const m = getApiMeta(a.slug);
        if (!m.sdks?.length) return <span className="text-base-content/30">—</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {m.sdks.map((s) => (
              <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-base-300 text-base-content/70">{s}</span>
            ))}
          </div>
        );
      },
    },
    {
      label: "Base URL",
      render: (a) => (
        <code className="text-xs bg-base-300 px-2 py-0.5 rounded break-all">{a.baseUrl}</code>
      ),
    },
    {
      label: "Tags",
      render: (a) => (
        <div className="flex flex-wrap gap-1">
          {a.tags.slice(0, 5).map((t) => (
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
    <div className="overflow-x-auto rounded-xl border border-base-300">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-base-300">
            <th className="text-left py-3 pr-6 pl-5 text-xs font-medium text-base-content/40 uppercase tracking-widest w-32">
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
                    onClick={() => onRemove(a.slug)}
                    className="text-base-content/20 hover:text-base-content/60 shrink-0 mt-0.5 transition-colors"
                    title="Remove from compare"
                  >
                    <X size={13} />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, group, render }) => (
            <>
              {group && (
                <tr key={`group-${group}`} className="border-b border-base-300 bg-base-200/60">
                  <td colSpan={apis.length + 1} className="px-5 py-2 text-[11px] font-semibold text-base-content/40 uppercase tracking-widest">
                    {group}
                  </td>
                </tr>
              )}
              <tr key={label} className="border-b border-base-300/50 hover:bg-base-200/40">
                <td className="py-3.5 pr-6 pl-5 text-xs font-medium text-base-content/40 uppercase tracking-widest align-top whitespace-nowrap">
                  {label}
                </td>
                {apis.map((a) => (
                  <td key={a.slug} className="py-3.5 px-4 align-top text-base-content/80">
                    {render(a)}
                  </td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── API picker ─────────────────────────────────────────────────
function ApiPicker({
  selected,
  onToggle,
}: {
  selected: Set<string>;
  onToggle: (slug: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    let list = APIS;
    if (activeCategory !== "all") list = list.filter((a) => a.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [search, activeCategory]);

  const atMax = selected.size >= 4;

  return (
    <div className="border border-base-300 rounded-xl overflow-hidden">
      {/* Picker header */}
      <div className="px-4 py-3 border-b border-base-300 bg-base-200/50">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search APIs…"
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-base-300 bg-base-100 text-sm outline-none focus:border-base-content/40 transition-all placeholder:text-base-content/30"
            />
          </div>
          <span className="text-xs text-base-content/40 shrink-0 tabular-nums">
            {selected.size}/4 selected
          </span>
        </div>

        {/* Category filter */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar mt-2.5 pb-0.5">
          {[{ slug: "all", label: "All" }, ...CATEGORIES].map((c) => (
            <button
              key={c.slug}
              onClick={() => setActiveCategory(c.slug)}
              className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === c.slug
                  ? "bg-base-content text-base-100"
                  : "border border-base-300 text-base-content/50 hover:text-base-content"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* API list */}
      <div className="overflow-y-auto max-h-72">
        {filtered.length === 0 ? (
          <p className="text-sm text-base-content/30 text-center py-8">No APIs found</p>
        ) : (
          <div className="divide-y divide-base-300/50">
            {filtered.map((api) => {
              const isSelected = selected.has(api.slug);
              const isDisabled = atMax && !isSelected;
              const category = CATEGORIES.find((c) => c.slug === api.category);

              return (
                <button
                  key={api.slug}
                  onClick={() => !isDisabled && onToggle(api.slug)}
                  disabled={isDisabled}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                    isSelected
                      ? "bg-primary/8"
                      : isDisabled
                      ? "opacity-35 cursor-not-allowed"
                      : "hover:bg-base-200/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Check / plus indicator */}
                    <div className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-primary border-primary text-primary-content"
                        : "border-base-300"
                    }`}>
                      {isSelected
                        ? <Check size={11} strokeWidth={2.5} />
                        : <Plus size={10} className="text-base-content/20" />
                      }
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{api.name}</span>
                        {api.freeTier && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                            Free
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-base-content/40 truncate">{api.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-base-content/30 hidden sm:block">{category?.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-base-300 text-base-content/40">
                      {AUTH_LABELS[api.authType]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main content ───────────────────────────────────────────────
function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSlugs = (searchParams.get("apis") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  const [selected, setSelected] = useState<Set<string>>(new Set(initialSlugs));

  function toggle(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else if (next.size < 4) {
        next.add(slug);
      }
      const slugs = [...next].join(",");
      router.replace(slugs ? `/compare?apis=${slugs}` : "/compare", { scroll: false });
      return next;
    });
  }

  const apis = [...selected].map(getApiBySlug).filter((a): a is Api => a !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-base-content/50 hover:text-base-content mb-8 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to APIs
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Compare APIs</h1>
        <p className="text-base-content/50">Select up to 4 APIs to compare side-by-side.</p>
      </div>

      {/* Selected chips */}
      {selected.size > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {apis.map((a) => (
            <span
              key={a.slug}
              className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full border border-base-300 bg-base-200 text-sm font-medium"
            >
              {a.name}
              <button
                onClick={() => toggle(a.slug)}
                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-base-content/10 transition-colors"
                aria-label={`Remove ${a.name}`}
              >
                <X size={10} />
              </button>
            </span>
          ))}
          {selected.size > 0 && (
            <button
              onClick={() => {
                setSelected(new Set());
                router.replace("/compare", { scroll: false });
              }}
              className="text-xs text-base-content/40 hover:text-base-content transition-colors self-center ml-1"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Picker */}
      <div className="mb-10">
        <ApiPicker selected={selected} onToggle={toggle} />
      </div>

      {/* Compare table */}
      {apis.length >= 2 ? (
        <CompareTable apis={apis} onRemove={toggle} />
      ) : (
        <div className="text-center py-16 text-base-content/30 border border-dashed border-base-300 rounded-xl">
          {apis.length === 0
            ? <p>Select at least 2 APIs above to compare them</p>
            : <p>Select one more API to start comparing</p>
          }
        </div>
      )}

      {/* Detail links */}
      {apis.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {apis.map((a) => (
            <Link
              key={a.slug}
              href={`/apis/${a.slug}`}
              className="btn btn-ghost btn-sm border border-base-300 gap-1.5"
            >
              View {a.name} →
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
        <div className="h-10 w-64 rounded bg-base-300 animate-pulse mb-6" />
        <div className="h-72 rounded-xl bg-base-200 animate-pulse mb-10" />
        <div className="h-96 rounded-xl bg-base-200 animate-pulse" />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
