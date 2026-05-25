"use client";

import Link from "next/link";
import { Star, Copy, Check, GitCompareArrows } from "lucide-react";
import { useState } from "react";
import type { Api } from "@/data/apis";

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

  function copyBaseUrl(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(api.baseUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="relative group h-full">
      <Link
        href={`/apis/${api.slug}`}
        className="block rounded-xl border border-base-300 bg-base-100 hover:border-base-content/30 hover:bg-base-200 transition-all duration-150 p-5 h-full"
      >
        <div className="flex flex-col h-full gap-3">
          {/* Top row: name + auth badge — leave room for star */}
          <div className="flex items-start justify-between gap-2 pr-5">
            <h3 className="font-semibold text-base leading-snug group-hover:text-base-content transition-colors">
              {api.name}
            </h3>
            <span className="badge badge-sm shrink-0 font-normal border border-base-300 bg-transparent text-base-content/60">
              {AUTH_LABELS[api.authType]}
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-base-content/60 leading-relaxed line-clamp-2 flex-1">
            {api.tagline}
          </p>

          {/* Tags + free tier badge */}
          <div className="flex flex-wrap gap-1.5">
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
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleCompare(api.slug); }}
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
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(api.slug); }}
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
