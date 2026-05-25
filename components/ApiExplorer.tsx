"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, Star, GitCompareArrows } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Api } from "@/data/apis";
import type { Category } from "@/data/categories";
import { ApiCard } from "./ApiCard";
import { SkeletonGrid } from "./SkeletonCard";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useFavorites } from "@/hooks/useFavorites";

interface Props {
  apis: Api[];
  categories: Category[];
  initialQuery?: string;
  initialCategory?: string;
}

const STARRED = "starred";

const AUTH_FILTERS = [
  { value: "all",    label: "Any auth" },
  { value: "none",   label: "No Auth"  },
  { value: "apiKey", label: "API Key"  },
  { value: "bearer", label: "Bearer"   },
  { value: "oauth2", label: "OAuth"    },
];

const GRID_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0 },
};

export function ApiExplorer({ apis, categories, initialQuery = "", initialCategory = "all" }: Props) {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery]               = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeAuth, setActiveAuth]     = useState("all");
  const [compareSet, setCompareSet]     = useState<Set<string>>(new Set());
  const [mounted, setMounted]           = useState(false);

  const { favorites, toggle: toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => { setMounted(true); }, []);

  const fuse = useMemo(
    () =>
      new Fuse(apis, {
        keys: [
          { name: "name",        weight: 2   },
          { name: "tagline",     weight: 1.5 },
          { name: "description", weight: 1   },
          { name: "tags",        weight: 1.2 },
        ],
        threshold: 0.35,
        includeScore: true,
      }),
    [apis]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    apis.forEach((api) => { counts[api.category] = (counts[api.category] || 0) + 1; });
    return counts;
  }, [apis]);

  const results = useMemo(() => {
    let list = query.trim()
      ? fuse.search(query.trim()).map((r) => r.item)
      : apis;
    if (activeCategory === STARRED) {
      list = list.filter((a) => favorites.has(a.slug));
    } else if (activeCategory !== "all") {
      list = list.filter((a) => a.category === activeCategory);
    }
    if (activeAuth !== "all") {
      list = list.filter((a) => a.authType === activeAuth);
    }
    return list;
  }, [query, activeCategory, activeAuth, apis, fuse, favorites]);

  const handleTagClick = useCallback((tag: string) => {
    setQuery(tag);
    setActiveCategory("all");
    searchRef.current?.focus();
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    setCompareSet((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else if (next.size < 4) next.add(slug);
      return next;
    });
  }, []);

  useKeyboard([
    { key: "/",      handler: () => searchRef.current?.focus(), ignoreInInput: false },
    { key: "Escape", handler: () => { setQuery(""); searchRef.current?.blur(); },     ignoreInInput: true },
  ]);

  const allCategories: { slug: string; label: string; count?: number }[] = [
    { slug: "all",    label: "All",     count: apis.length },
    { slug: STARRED,  label: "Starred", count: favorites.size },
    ...categories.map((c) => ({ slug: c.slug, label: c.label, count: categoryCounts[c.slug] ?? 0 })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Hero */}
      <div className="text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-3"
        >
          Discover APIs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="text-base-content/50 text-lg"
        >
          {apis.length}+ APIs across {categories.length} categories
        </motion.p>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.12 }}
        className="relative max-w-xl mx-auto mb-6"
      >
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none" />
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search APIs… (press / to focus)"
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-base-300 bg-base-200 text-sm outline-none focus:border-base-content/40 focus:bg-base-100 transition-all placeholder:text-base-content/30"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60"
            >
              <X size={15} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Auth type filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="flex justify-center gap-1.5 flex-wrap mb-8"
      >
        {AUTH_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveAuth(value)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeAuth === value
                ? "bg-base-content text-base-100"
                : "border border-base-300 text-base-content/50 hover:text-base-content"
            }`}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* Category pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        className="relative mb-8"
      >
        <div className="absolute left-0 top-0 bottom-2 w-6 bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-2 w-6 bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar px-1">
          {allCategories.map(({ slug, label, count }) => (
            <button
              key={slug}
              onClick={() => setActiveCategory(slug)}
              className="relative shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium focus:outline-none"
            >
              {activeCategory === slug && (
                <motion.span
                  layoutId="active-category-pill"
                  className="absolute inset-0 bg-base-content rounded-full"
                  transition={{ type: "spring", stiffness: 480, damping: 38 }}
                />
              )}
              {activeCategory !== slug && (
                <span className="absolute inset-0 rounded-full border border-base-300" />
              )}
              <span className={`relative z-10 flex items-center gap-1.5 transition-colors duration-150 ${
                activeCategory === slug ? "text-base-100" : "text-base-content/60 hover:text-base-content"
              }`}>
                {slug === STARRED && <Star size={11} className="shrink-0" fill={activeCategory === slug ? "currentColor" : "none"} />}
                {label}
                {count !== undefined && count > 0 && (
                  <span className={`text-xs tabular-nums ${activeCategory === slug ? "opacity-70" : "opacity-50"}`}>{count}</span>
                )}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results count */}
      <AnimatePresence mode="wait">
        {(query || activeAuth !== "all") && (
          <motion.p
            key="results-count"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-sm text-base-content/40 mb-5"
          >
            {results.length === 0
              ? "No results"
              : `${results.length} result${results.length === 1 ? "" : "s"}${query ? ` for "${query}"` : ""}${activeAuth !== "all" ? ` · ${AUTH_FILTERS.find(f => f.value === activeAuth)?.label}` : ""}`}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Grid */}
      {!mounted ? (
        <SkeletonGrid count={9} />
      ) : (
        <AnimatePresence mode="wait">
          {results.length > 0 ? (
            <motion.div
              key={`${activeCategory}::${query}::${activeAuth}`}
              variants={GRID_VARIANTS}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {results.map((api) => (
                <motion.div key={api.slug} variants={CARD_VARIANTS}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.975, transition: { duration: 0.1 } }}
                >
                  <ApiCard
                    api={api}
                    isFavorite={isFavorite(api.slug)}
                    onToggleFavorite={toggleFavorite}
                    isComparing={compareSet.has(api.slug)}
                    onToggleCompare={toggleCompare}
                    onTagClick={handleTagClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 text-base-content/30"
            >
              {activeCategory === STARRED && favorites.size === 0 ? (
                <>
                  <Star size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-lg">No starred APIs yet</p>
                  <p className="text-sm mt-1">Hover any card and click the star to save it here</p>
                </>
              ) : (
                <>
                  <p className="text-lg">No APIs found</p>
                  <button
                    onClick={() => { setQuery(""); setActiveCategory("all"); setActiveAuth("all"); }}
                    className="mt-3 text-sm underline underline-offset-4 hover:text-base-content/60 transition-colors"
                  >
                    Clear filters
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Compare sticky bar */}
      <AnimatePresence>
        {compareSet.size >= 1 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-3 bg-base-content text-base-100 rounded-2xl shadow-2xl px-5 py-3">
              <GitCompareArrows size={15} className="opacity-70 shrink-0" />
              <span className="text-sm font-medium">
                {compareSet.size} API{compareSet.size !== 1 ? "s" : ""} selected
              </span>
              <button
                onClick={() => setCompareSet(new Set())}
                className="text-base-100/50 hover:text-base-100 transition-colors"
                aria-label="Clear compare"
              >
                <X size={14} />
              </button>
              <button
                onClick={() => router.push(`/compare?apis=${[...compareSet].join(",")}`)}
                disabled={compareSet.size < 2}
                className="btn btn-sm bg-base-100 text-base-content hover:bg-base-200 border-0 gap-1.5 disabled:opacity-40 ml-1"
              >
                Compare
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
