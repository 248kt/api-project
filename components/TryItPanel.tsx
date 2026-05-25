"use client";

import { useState } from "react";
import { Play, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import type { Api, ApiEndpoint } from "@/data/apis";

interface Props {
  api: Api;
  endpoint: ApiEndpoint;
}

interface ProxyResponse {
  status: number;
  statusText: string;
  body: unknown;
  error?: string;
}

function buildInitialUrl(api: Api, endpoint: ApiEndpoint): string {
  const base = api.baseUrl.replace(/\{[^}]+\}/g, "YOUR_VALUE");
  const path = endpoint.path.replace(/\{[^}]+\}/g, "YOUR_VALUE");
  return base + path;
}

const AUTH_LABEL: Record<string, string> = {
  apiKey:  "API Key",
  bearer:  "Bearer Token",
  oauth2:  "Access Token",
};

export function TryItPanel({ api, endpoint }: Props) {
  const [open, setOpen]         = useState(false);
  const [url, setUrl]           = useState(() => buildInitialUrl(api, endpoint));
  const [authValue, setAuthValue] = useState("");
  const [body, setBody]         = useState(() =>
    ["POST", "PUT", "PATCH"].includes(endpoint.method) ? "{}" : ""
  );
  const [loading, setLoading]   = useState(false);
  const [response, setResponse] = useState<ProxyResponse | null>(null);

  async function send() {
    setLoading(true);
    setResponse(null);

    const headers: Record<string, string> = {};

    if (authValue.trim()) {
      if (api.authType === "apiKey" && api.authHeader) {
        headers[api.authHeader] = authValue.trim();
      } else if (api.authType === "bearer" || api.authType === "oauth2") {
        headers["Authorization"] = `Bearer ${authValue.trim()}`;
      }
    }

    if (api.extraHeaders) {
      Object.assign(headers, api.extraHeaders);
    }

    let finalUrl = url;
    if (api.authType === "apiKey" && api.authQuery && authValue.trim()) {
      const sep = finalUrl.includes("?") ? "&" : "?";
      finalUrl += `${sep}${api.authQuery}=${encodeURIComponent(authValue.trim())}`;
    }

    if (["POST", "PUT", "PATCH"].includes(endpoint.method)) {
      headers["Content-Type"] = "application/json";
    }

    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: finalUrl,
          method: endpoint.method,
          headers,
          body: ["POST", "PUT", "PATCH"].includes(endpoint.method) ? body : undefined,
        }),
      });
      const data = await res.json() as ProxyResponse;
      setResponse(data);
    } catch {
      setResponse({ status: 0, statusText: "Network error", body: null, error: "Could not reach the proxy" });
    }
    setLoading(false);
  }

  const statusColor = response
    ? response.status >= 200 && response.status < 300
      ? "text-emerald-400"
      : "text-red-400"
    : "";

  return (
    <div className="border-t border-base-300 mt-5 pt-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors"
      >
        <Play size={12} className="text-primary" />
        Try it
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {/* URL */}
          <div>
            <label className="block text-xs font-medium text-base-content/40 mb-1 uppercase tracking-wider">
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              spellCheck={false}
              className="w-full px-3 py-2 rounded-lg border border-base-300 bg-base-200 text-xs font-mono outline-none focus:border-base-content/40 transition-all"
            />
          </div>

          {/* Auth */}
          {api.authType !== "none" && (
            <div>
              <label className="block text-xs font-medium text-base-content/40 mb-1 uppercase tracking-wider">
                {api.authType === "apiKey" && api.authHeader ? api.authHeader : AUTH_LABEL[api.authType] ?? "Auth"}
              </label>
              <input
                type="password"
                value={authValue}
                onChange={(e) => setAuthValue(e.target.value)}
                placeholder="Paste your key here (never stored)"
                className="w-full px-3 py-2 rounded-lg border border-base-300 bg-base-200 text-xs font-mono outline-none focus:border-base-content/40 transition-all"
              />
            </div>
          )}

          {/* Body */}
          {["POST", "PUT", "PATCH"].includes(endpoint.method) && (
            <div>
              <label className="block text-xs font-medium text-base-content/40 mb-1 uppercase tracking-wider">
                Body (JSON)
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                spellCheck={false}
                className="w-full px-3 py-2 rounded-lg border border-base-300 bg-base-200 text-xs font-mono outline-none focus:border-base-content/40 transition-all resize-none"
              />
            </div>
          )}

          <button
            onClick={send}
            disabled={loading}
            className="btn btn-primary btn-xs gap-1.5 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={11} className="animate-spin" />
            ) : (
              <Play size={11} />
            )}
            {loading ? "Sending…" : "Send Request"}
          </button>

          {/* Response */}
          {response && (
            <div className="rounded-xl overflow-hidden border border-base-300">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-base-200 border-b border-base-300 text-xs">
                <span className={`font-mono font-bold ${statusColor}`}>
                  {response.status || "ERR"}
                </span>
                <span className="text-base-content/40">{response.statusText}</span>
              </div>
              <div className="bg-[#1a1a1a]">
                <pre className="p-4 text-xs font-mono text-green-400/80 overflow-x-auto leading-relaxed max-h-72">
                  {response.error
                    ? response.error
                    : typeof response.body === "string"
                    ? response.body
                    : JSON.stringify(response.body, null, 2)}
                </pre>
              </div>
            </div>
          )}

          <p className="text-xs text-base-content/25">
            Requests are proxied server-side. Keys are never stored or logged.
          </p>
        </div>
      )}
    </div>
  );
}
