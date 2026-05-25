"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, ExternalLink } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

const AUTH_TYPES = [
  { value: "none",   label: "No Auth" },
  { value: "apiKey", label: "API Key" },
  { value: "bearer", label: "Bearer Token" },
  { value: "oauth2", label: "OAuth 2.0" },
];

interface FormState {
  name: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  docsUrl: string;
  baseUrl: string;
  category: string;
  authType: string;
  tags: string;
  freeTier: boolean;
  notes: string;
}

const EMPTY: FormState = {
  name: "",
  tagline: "",
  description: "",
  websiteUrl: "",
  docsUrl: "",
  baseUrl: "",
  category: "",
  authType: "",
  tags: "",
  freeTier: false,
  notes: "",
};

function buildIssueUrl(f: FormState): string {
  const title = encodeURIComponent(`Add API: ${f.name}`);
  const body = encodeURIComponent(
    [
      `## API Suggestion: ${f.name}`,
      "",
      `**Website:** ${f.websiteUrl}`,
      `**Docs:** ${f.docsUrl}`,
      `**Base URL:** ${f.baseUrl}`,
      `**Category:** ${f.category}`,
      `**Auth type:** ${f.authType}`,
      `**Free tier:** ${f.freeTier ? "Yes" : "No"}`,
      `**Tags:** ${f.tags}`,
      "",
      `### Tagline`,
      f.tagline,
      "",
      `### Description`,
      f.description,
      f.notes ? `\n### Additional notes\n${f.notes}` : "",
    ]
      .join("\n")
      .trim()
  );
  return `https://github.com/248kt/api-project/issues/new?title=${title}&body=${body}&labels=api-suggestion`;
}

export default function SubmitPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.name.trim() &&
    form.tagline.trim() &&
    form.description.trim() &&
    form.websiteUrl.trim() &&
    form.docsUrl.trim() &&
    form.baseUrl.trim() &&
    form.category &&
    form.authType;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    window.open(buildIssueUrl(form), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="text-4xl mb-6">🎉</div>
        <h2 className="text-2xl font-bold mb-3">Thanks for the suggestion!</h2>
        <p className="text-base-content/50 mb-8">
          A GitHub issue was opened with your submission. We review suggestions and add APIs regularly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary btn-sm">
            Back to APIs
          </Link>
          <button
            onClick={() => { setForm(EMPTY); setSubmitted(false); }}
            className="btn btn-ghost btn-sm border border-base-300"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-base-content/50 hover:text-base-content mb-8 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to APIs
      </Link>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Submit an API
        </h1>
        <p className="text-base-content/50 leading-relaxed">
          Know an API that should be in the library? Fill in the details below and it will open a
          GitHub issue for review.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <fieldset className="space-y-4">
          <legend className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">
            Basic info
          </legend>

          <Field label="API Name" required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Stripe"
              className={input}
              required
            />
          </Field>

          <Field label="Tagline" hint="One punchy line — shown on the card" required>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              placeholder="e.g. Payments infrastructure for the internet"
              maxLength={120}
              className={input}
              required
            />
          </Field>

          <Field label="Description" hint="1–2 sentences about what the API does" required>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe what developers can build with this API…"
              rows={3}
              className={`${input} resize-none`}
              required
            />
          </Field>
        </fieldset>

        <Divider />

        {/* URLs */}
        <fieldset className="space-y-4">
          <legend className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">
            URLs
          </legend>

          <Field label="Website URL" required>
            <input
              type="url"
              value={form.websiteUrl}
              onChange={(e) => set("websiteUrl", e.target.value)}
              placeholder="https://stripe.com"
              className={input}
              required
            />
          </Field>

          <Field label="Docs URL" required>
            <input
              type="url"
              value={form.docsUrl}
              onChange={(e) => set("docsUrl", e.target.value)}
              placeholder="https://stripe.com/docs/api"
              className={input}
              required
            />
          </Field>

          <Field label="Base URL" required>
            <input
              type="url"
              value={form.baseUrl}
              onChange={(e) => set("baseUrl", e.target.value)}
              placeholder="https://api.stripe.com/v1"
              className={input}
              required
            />
          </Field>
        </fieldset>

        <Divider />

        {/* Classification */}
        <fieldset className="space-y-4">
          <legend className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">
            Classification
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category" required>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={select}
                required
              >
                <option value="" disabled>Select…</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </Field>

            <Field label="Auth type" required>
              <select
                value={form.authType}
                onChange={(e) => set("authType", e.target.value)}
                className={select}
                required
              >
                <option value="" disabled>Select…</option>
                {AUTH_TYPES.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Tags" hint="Comma-separated — e.g. payments, webhooks, subscriptions">
            <input
              type="text"
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="payments, webhooks, subscriptions"
              className={input}
            />
          </Field>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.freeTier}
              onChange={(e) => set("freeTier", e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm text-base-content/70">This API has a free tier</span>
          </label>
        </fieldset>

        <Divider />

        {/* Optional notes */}
        <fieldset>
          <legend className="text-xs font-semibold text-base-content/40 uppercase tracking-widest mb-4">
            Anything else? <span className="normal-case font-normal">(optional)</span>
          </legend>
          <textarea
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Notable endpoints, quirks, or why this API should be included…"
            rows={3}
            className={`${input} resize-none`}
          />
        </fieldset>

        {/* Submit */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary btn-sm gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={13} />
            Open GitHub Issue
            <ExternalLink size={11} className="opacity-60" />
          </button>
          <p className="text-xs text-base-content/30">
            This will open a pre-filled issue in a new tab — no account required.
          </p>
        </div>
      </form>
    </div>
  );
}

// ── Small helpers ─────────────────────────────────────────────

const input =
  "w-full px-3.5 py-2.5 rounded-lg border border-base-300 bg-base-200 text-sm outline-none focus:border-base-content/40 focus:bg-base-100 transition-all placeholder:text-base-content/30";

const select =
  "w-full px-3.5 py-2.5 rounded-lg border border-base-300 bg-base-200 text-sm outline-none focus:border-base-content/40 focus:bg-base-100 transition-all appearance-none cursor-pointer";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-base-content/80">
        {label}
        {required && <span className="text-base-content/30 ml-1">*</span>}
        {hint && <span className="text-xs font-normal text-base-content/40 ml-2">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-base-300" />;
}
