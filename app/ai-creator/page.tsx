import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, Sparkles, Wand2, Code2, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "AI API Creator — Coming Soon · apilib",
  description: "Generate production-ready API integrations with AI. Coming soon to apilib.",
};

const FEATURES = [
  {
    icon: Wand2,
    title: "Natural Language Input",
    description: "Describe what you want to build in plain English and get a complete API integration.",
  },
  {
    icon: Code2,
    title: "Multi-Language Output",
    description: "Generates clean code in JavaScript, Python, Go, Ruby, PHP, and more.",
  },
  {
    icon: Zap,
    title: "Smart Auth Handling",
    description: "Automatically configures OAuth, API keys, and Bearer tokens based on the target API.",
  },
  {
    icon: Sparkles,
    title: "Instant Preview",
    description: "See live request/response previews before copying code to your project.",
  },
];

export default function AiCreatorPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-base-content/50 hover:text-base-content mb-12 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to APIs
      </Link>

      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-base-300 bg-base-200 mb-6">
          <Lock size={24} className="text-base-content/40" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-base-300 text-xs font-medium text-base-content/50 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Coming Soon
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          AI API Creator
        </h1>

        <p className="text-base-content/50 text-lg leading-relaxed max-w-xl mx-auto">
          Describe an integration in plain English. Get production-ready API code in seconds —
          authenticated, error-handled, and ready to ship.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-base-300 bg-base-100 p-5 space-y-2.5"
          >
            <div className="w-8 h-8 rounded-lg border border-base-300 flex items-center justify-center">
              <Icon size={15} className="text-base-content/60" />
            </div>
            <p className="font-medium text-sm">{title}</p>
            <p className="text-sm text-base-content/50 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      {/* Disabled CTA */}
      <div className="text-center border border-base-300 rounded-xl p-8 bg-base-200">
        <p className="text-sm text-base-content/50 mb-4">
          This feature is in development and will be available soon.
        </p>
        <button
          disabled
          className="btn btn-primary btn-sm opacity-40 cursor-not-allowed"
        >
          Get Early Access
        </button>
        <p className="text-xs text-base-content/30 mt-3">Sign-ups not yet open</p>
      </div>
    </div>
  );
}
