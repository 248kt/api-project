import { NextRequest, NextResponse } from "next/server";
import { APIS } from "@/data/apis";

const ALLOWED_HOSTS = new Set(
  APIS.flatMap((api) => {
    try {
      return [new URL(api.baseUrl.replace(/\{[^}]+\}/g, "x")).hostname];
    } catch {
      return [];
    }
  })
);

export async function POST(req: NextRequest) {
  let url: string, method: string, headers: Record<string, string>, body: string | undefined;

  try {
    ({ url, method = "GET", headers = {}, body } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const host = new URL(url).hostname;
    if (!ALLOWED_HOSTS.has(host)) {
      return NextResponse.json({ error: `Host "${host}" is not in the Devdex catalog` }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const upstream = await fetch(url, {
      method,
      headers: { "User-Agent": "devdex/1.0 (try-it)", ...headers },
      body: body && method !== "GET" ? body : undefined,
      signal: AbortSignal.timeout(10_000),
    });

    const text = await upstream.text();
    let parsed: unknown;
    try { parsed = JSON.parse(text); } catch { parsed = text; }

    return NextResponse.json({
      status: upstream.status,
      statusText: upstream.statusText,
      body: parsed,
      raw: typeof parsed === "string" ? text : undefined,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Upstream request failed", detail: msg }, { status: 502 });
  }
}
