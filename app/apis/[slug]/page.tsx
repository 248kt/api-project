import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, ArrowLeft, Globe } from "lucide-react";
import { APIS, getApiBySlug } from "@/data/apis";
import { CATEGORIES } from "@/data/categories";
import { CodeBlock } from "@/components/CodeBlock";
import { AnimatedHeader, AnimatedEndpoints, AnimatedEndpoint } from "@/components/ApiDetailMotion";
import { ApiCard } from "@/components/ApiCard";
import { TryItPanel } from "@/components/TryItPanel";
import { ShareButton } from "@/components/ShareButton";
import type { Metadata } from "next";
import type { Language } from "@/lib/codeGen";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return APIS.map((api) => ({ slug: api.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const api = getApiBySlug(slug);
  if (!api) return {};
  return {
    title: `${api.name} — Devdex`,
    description: api.description,
  };
}

const AUTH_LABELS: Record<string, string> = {
  none: "No Auth",
  apiKey: "API Key",
  bearer: "Bearer Token",
  oauth2: "OAuth 2.0",
};

const METHOD_COLORS: Record<string, string> = {
  GET:    "text-emerald-400",
  POST:   "text-blue-400",
  PUT:    "text-amber-400",
  PATCH:  "text-orange-400",
  DELETE: "text-red-400",
};

export default async function ApiDetailPage({ params }: Props) {
  const { slug } = await params;
  const api = getApiBySlug(slug);

  if (!api) notFound();

  const category = CATEGORIES.find((c) => c.slug === api.category);
  const related = APIS.filter((a) => a.category === api.category && a.slug !== api.slug).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-base-content/50 hover:text-base-content mb-8 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to APIs
      </Link>

      {/* Header — animated */}
      <AnimatedHeader>
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {category && (
              <Link
                href={`/?category=${category.slug}`}
                className="badge badge-sm border border-base-300 bg-transparent text-base-content/60 hover:text-base-content transition-colors"
              >
                {category.label}
              </Link>
            )}
            <span className="badge badge-sm border border-base-300 bg-transparent text-base-content/60">
              {AUTH_LABELS[api.authType]}
            </span>
            {api.freeTier && (
              <span className="badge badge-sm border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Free tier
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {api.name}
          </h1>
          <p className="text-lg text-base-content/60 mb-6 max-w-2xl leading-relaxed">
            {api.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={api.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary gap-2"
            >
              <ExternalLink size={13} />
              Documentation
            </a>
            <a
              href={api.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-ghost border border-base-300 gap-2"
            >
              <Globe size={13} />
              Website
            </a>
            <ShareButton name={api.name} />
          </div>
        </div>

        {/* Base URL */}
        <div className="mb-8">
          <p className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-2">
            Base URL
          </p>
          <code className="text-sm font-mono bg-base-200 border border-base-300 px-3 py-1.5 rounded-lg inline-block">
            {api.baseUrl}
          </code>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {api.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-base-200 border border-base-300 text-base-content/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </AnimatedHeader>

      {/* Endpoints — staggered */}
      <AnimatedEndpoints>
        <h2 className="text-xl font-semibold mb-6">Endpoints</h2>
        <div className="space-y-10">
          {api.endpoints.map((endpoint, i) => (
            <AnimatedEndpoint key={i}>
              <div className="border border-base-300 rounded-xl overflow-hidden">
                {/* Endpoint header */}
                <div className="flex items-start gap-3 px-5 py-4 bg-base-200 border-b border-base-300">
                  <span
                    className={`font-mono font-bold text-sm shrink-0 ${METHOD_COLORS[endpoint.method] ?? "text-base-content"}`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-base-content/80 break-all">
                    {endpoint.path}
                  </code>
                </div>

                <div className="p-5 space-y-5">
                  <p className="text-sm text-base-content/70">{endpoint.description}</p>

                  <CodeBlock
                    examples={endpoint.codeExamples as Record<Language, string>}
                    title={endpoint.path}
                  />

                  <TryItPanel api={api} endpoint={endpoint} />

                  <div>
                    <p className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-2">
                      Response Preview
                    </p>
                    <div className="rounded-xl overflow-hidden border border-base-300 bg-[#1a1a1a]">
                      <pre className="p-5 text-xs font-mono text-green-400/80 overflow-x-auto leading-relaxed">
                        {endpoint.responsePreview}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedEndpoint>
          ))}
        </div>
      </AnimatedEndpoints>

      {/* Related APIs */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6">
            More in {category?.label ?? "this category"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((r) => (
              <ApiCard key={r.slug} api={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
