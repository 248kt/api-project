"use client";

import Link from "next/link";
import { Star, Copy, Check, GitCompareArrows, Code2 } from "lucide-react";
import { useState } from "react";
import type { Api } from "@/data/apis";
import { NEW_API_SLUGS } from "@/data/newApis";
import { useToast } from "./ToastProvider";

const AUTH_LABELS: Record<string, string> = {
  none:   "No Auth",
  apiKey: "API Key",
  bearer: "Bearer",
  oauth2: "OAuth 2.0",
};

interface Props {
  api: Api;
  isFavorite?: boolean;
  onToggleFavorite?: (slug: string) => void;
  isComparing?: boolean;
  onToggleCompare?: (slug: string) => void;
  onTagClick?: (tag: string) => void;
}

export function ApiCard({
  api,
  isFavorite = false,
  onToggleFavorite,
  isComparing = false,
  onToggleCompare,
  onTagClick,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [snippetCopied, setSnippetCopied] = useState(false);
  const { toast } = useToast();
  const isNew = NEW_API_SLUGS.has(api.slug);

  function copyBaseUrl(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(api.baseUrl).then(() => {
      setCopied(true);
      toast("Base URL copied");
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function copySnippet(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const endpoint = api.endpoints[0];
    if (!endpoint) return;
    const snippet = `const res = await fetch("${api.baseUrl}${endpoint.path}");\nconst data = await res.json();\nconsole.log(data);`;
    navigator.clipboard.writeText(snippet).then(() => {
      setSnippetCopied(true);
      toast("Snippet copied");
      setTimeout(() => setSnippetCopied(false), 1500);
    });
  }

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!onToggleFavorite) return;
    onToggleFavorite(api.slug);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites");
  }

  function handleCompare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!onToggleCompare) return;
    onToggleCompare(api.slug);
    toast(isComparing ? "Removed from compare" : "Added to compare");
  }

  return (
    <div className="relative group h-full">
      <Link
        href={`/apis/${api.slug}`}
        className="block rounded-xl border border-base-300 bg-base-100 hover:border-base-content/30 hover:bg-base-200 transition-all duration-150 p-5 h-full"
      >
        <div className="flex flex-col h-full gap-3">
          {/* Top row: name + optional New badge */}
          <div className="flex items-center gap-2 pr-24">
            <h3 className="font-semibold text-base leading-snug group-hover:text-base-content transition-colors">
              {api.name}
            </h3>
            {isNew && (
              <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 leading-none">
                New
              </span>
            )}
          </div>

          {/* Tagline */}
          <p className="text-sm text-base-content/60 leading-relaxed line-clamp-2 flex-1">
            {api.tagline}
          </p>

          {/* Auth badge + free tier + tags */}
          <div className="flex flex-wrap gap-1.5">
            <span className="badge badge-sm shrink-0 font-normal border border-base-300 bg-transparent text-base-content/60">
              {AUTH_LABELS[api.authType]}
            </span>
            {api.freeTier && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium">
                Free tier
              </span>
            )}
            {api.tags.slice(0, 3).map((tag) =>
              onTagClick ? (
                <button
                  key={tag}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick(tag); }}
                  className="text-xs px-2 py-0.5 rounded-full bg-base-300 text-base-content/70 hover:bg-base-content/20 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ) : (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-base-300 text-base-content/70">
                  {tag}
                </span>
              )
            )}
            {api.tags.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-base-300 text-base-content/50">
                +{api.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Overlay actions — appear on hover */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        {/* Compare toggle */}
        {onToggleCompare && (
          <button
            onClick={handleCompare}
            aria-label={isComparing ? "Remove from compare" : "Add to compare"}
            title={isComparing ? "Remove from compare" : "Compare"}
            className={`p-1 rounded transition-all duration-150 ${
              isComparing
                ? "text-primary opacity-100"
                : "text-base-content/20 opacity-0 group-hover:opacity-100 hover:!text-primary"
            }`}
          >
            <GitCompareArrows size={13} strokeWidth={isComparing ? 2 : 1.5} />
          </button>
        )}

        {/* Copy snippet */}
        {api.endpoints.length > 0 && (
          <button
            onClick={copySnippet}
            aria-label="Copy fetch snippet"
            title="Copy fetch snippet"
            className="p-1 rounded transition-all duration-150 text-base-content/20 opacity-0 group-hover:opacity-100 hover:!text-base-content/60"
          >
            {snippetCopied ? <Check size={13} className="text-emerald-500" /> : <Code2 size={13} />}
          </button>
        )}

        {/* Copy base URL */}
        <button
          onClick={copyBaseUrl}
          aria-label="Copy base URL"
          title="Copy base URL"
          className="p-1 rounded transition-all duration-150 text-base-content/20 opacity-0 group-hover:opacity-100 hover:!text-base-content/60"
        >
          {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
        </button>

        {/* Favorite */}
        {onToggleFavorite && (
          <button
            onClick={handleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            title={isFavorite ? "Unfavorite" : "Favorite"}
            className={`p-1 rounded transition-all duration-150 ${
              isFavorite
                ? "text-amber-400 opacity-100"
                : "text-base-content/20 opacity-0 group-hover:opacity-100 hover:!text-amber-400"
            }`}
          >
            <Star size={13} fill={isFavorite ? "currentColor" : "none"} strokeWidth={isFavorite ? 0 : 1.5} />
          </button>
        )}
      </div>
    </div>
  );
}
