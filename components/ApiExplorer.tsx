"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Fuse from "fuse.js";
import { Search, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Api } from "@/data/apis";
import type { Category } from "@/data/categories";
import { ApiCard } from "./ApiCard";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useFavorites } from "@/hooks/useFavorites";

interface Props {
  apis: Api[];
  categories: Category[];
  initialQuery?: string;
  initialCategory?: string;
}

const STARRED = "starred";

const GRID_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0 },
};

export function ApiExplorer({ apis, categories, initialQuery = "", initialCategory = "all" }: Props) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const { favorites, toggle: toggleFavorite, isFavorite } = useFavorites();

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
    apis.forEach((api) => {
      counts[api.category] = (counts[api.category] || 0) + 1;
    });
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
    return list;
  }, [query, activeCategory, apis, fuse, favorites]);

  const handleCategoryClick = useCallback((slug: string) => {
    setActiveCategory(slug);
  }, []);

  useKeyboard([
    {
      key: "/",
      handler: () => searchRef.current?.focus(),
      ignoreInInput: false,
    },
    {
      key: "Escape",
      handler: () => { setQuery(""); searchRef.current?.blur(); },
      ignoreInInput: true,
    },
  ]);

  const allCategories: { slug: string; label: string; count?: number }[] = [
    { slug: "all", label: "All", count: apis.length },
    { slug: STARRED, label: "Starred", count: favorites.size },
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
        className="relative max-w-xl mx-auto mb-10"
      >
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
        />
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

      {/* Category pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        className="relative mb-8"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-2 w-6 bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-2 w-6 bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar px-1">
          {allCategories.map(({ slug, label, count }) => (
            <button
              key={slug}
              onClick={() => handleCategoryClick(slug)}
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
              <span
                className={`relative z-10 flex items-center gap-1.5 transition-colors duration-150 ${
                  activeCategory === slug
                    ? "text-base-100"
                    : "text-base-content/60 hover:text-base-content"
                }`}
              >
                {slug === STARRED && <Star size={11} className="shrink-0" fill={activeCategory === slug ? "currentColor" : "none"} />}
                {label}
                {count !== undefined && count > 0 && (
                  <span className={`text-xs tabular-nums ${activeCategory === slug ? "opacity-70" : "opacity-50"}`}>
                    {count}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results count */}
      <AnimatePresence mode="wait">
        {query && (
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
              : `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {results.length > 0 ? (
          <motion.div
            key={`${activeCategory}::${query}`}
            variants={GRID_VARIANTS}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {results.map((api) => (
              <motion.div
                key={api.slug}
                variants={CARD_VARIANTS}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.975, transition: { duration: 0.1 } }}
              >
                <ApiCard
                  api={api}
                  isFavorite={isFavorite(api.slug)}
                  onToggleFavorite={toggleFavorite}
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
                <p className="text-sm mt-1">Hover over any card and click the star to save it here</p>
              </>
            ) : (
              <>
                <p className="text-lg">No APIs found</p>
                <button
                  onClick={() => { setQuery(""); setActiveCategory("all"); }}
                  className="mt-3 text-sm underline underline-offset-4 hover:text-base-content/60 transition-colors"
                >
                  Clear filters
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
