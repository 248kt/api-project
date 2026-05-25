export interface ApiMeta {
  pricing?: {
    free?: string;
    paid?: string;
  };
  rateLimit?: string;
  protocol?: string[];
  sdks?: string[];
  latency?: "low" | "medium" | "high";
}

const meta: Record<string, ApiMeta> = {
  // ── AI & ML ────────────────────────────────────────────────
  "openai": {
    pricing: { free: "No free tier", paid: "From $0.002 / 1K tokens" },
    rateLimit: "500 RPM (Tier 1)",
    protocol: ["REST"],
    sdks: ["Python", "Node.js", ".NET", "Go"],
    latency: "medium",
  },
  "anthropic": {
    pricing: { free: "No free tier", paid: "From $0.25 / MTok (input)" },
    rateLimit: "50 RPM (Tier 1)",
    protocol: ["REST"],
    sdks: ["Python", "TypeScript"],
    latency: "medium",
  },
  "huggingface": {
    pricing: { free: "Free (rate-limited)", paid: "From $9 / mo (PRO)" },
    rateLimit: "~1 req/s (free)",
    protocol: ["REST"],
    sdks: ["Python", "JavaScript"],
    latency: "high",
  },
  "google-gemini": {
    pricing: { free: "Free up to 15 RPM", paid: "From $0.07 / 1M tokens" },
    rateLimit: "15 RPM (free)",
    protocol: ["REST"],
    sdks: ["Python", "Node.js", "Go", "Java"],
    latency: "medium",
  },

  // ── Auth ───────────────────────────────────────────────────
  "clerk": {
    pricing: { free: "Up to 10K MAU", paid: "From $25 / mo" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["React", "Next.js", "Node.js", "Python", "Go"],
    latency: "low",
  },
  "auth0": {
    pricing: { free: "Up to 7,500 MAU", paid: "From $35 / mo" },
    rateLimit: "2 req/s (free tier)",
    protocol: ["REST", "OAuth 2.0", "OIDC"],
    sdks: ["Node.js", "Python", "PHP", "Java", "Go", "Ruby", ".NET"],
    latency: "low",
  },
  "firebase-auth": {
    pricing: { free: "Unlimited (Spark plan)", paid: "Pay-as-you-go (Blaze)" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["iOS", "Android", "Web", "Flutter", "Unity"],
    latency: "low",
  },
  "supabase-auth": {
    pricing: { free: "Up to 50K MAU", paid: "From $25 / mo" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript", "Python", "Flutter", "Swift", "Kotlin"],
    latency: "low",
  },

  // ── Payments ───────────────────────────────────────────────
  "stripe": {
    pricing: { free: "Test mode free", paid: "2.9% + 30¢ / transaction" },
    rateLimit: "100 read / s, 100 write / s",
    protocol: ["REST"],
    sdks: ["Python", "Node.js", "Ruby", "PHP", "Go", "Java", ".NET"],
    latency: "low",
  },
  "paypal": {
    pricing: { free: "No monthly fee", paid: "3.49% + fixed fee / transaction" },
    rateLimit: "50 req/s (default)",
    protocol: ["REST"],
    sdks: ["JavaScript", "Python", "PHP", "Java", ".NET", "Ruby"],
    latency: "medium",
  },
  "lemon-squeezy": {
    pricing: { free: "Free to start", paid: "5% + payment fees" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript / TypeScript"],
    latency: "low",
  },
  "paddle": {
    pricing: { free: "Free to start", paid: "5% + $0.50 / transaction" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript", "Python", "PHP"],
    latency: "low",
  },

  // ── Database ───────────────────────────────────────────────
  "supabase": {
    pricing: { free: "500MB DB, 5GB bandwidth", paid: "From $25 / mo" },
    rateLimit: "Not published",
    protocol: ["REST", "GraphQL", "WebSocket"],
    sdks: ["JavaScript", "Python", "Flutter", "Swift", "Kotlin"],
    latency: "low",
  },
  "firebase": {
    pricing: { free: "Spark plan (1GB DB)", paid: "Blaze pay-as-you-go" },
    rateLimit: "Not published",
    protocol: ["REST", "WebSocket"],
    sdks: ["iOS", "Android", "Web", "Flutter", "Unity"],
    latency: "low",
  },
  "neon": {
    pricing: { free: "0.5GB storage, 190hr compute/mo", paid: "From $19 / mo" },
    rateLimit: "Not published",
    protocol: ["REST (API)", "TCP (Postgres)"],
    sdks: ["Any Postgres driver"],
    latency: "low",
  },
  "planetscale": {
    pricing: { free: "No free tier (deprecated)", paid: "From $39 / mo" },
    rateLimit: "Not published",
    protocol: ["REST", "MySQL protocol"],
    sdks: ["Any MySQL driver"],
    latency: "low",
  },
  "mongodb-atlas": {
    pricing: { free: "512MB shared cluster", paid: "From $0.10 / hr (M10)" },
    rateLimit: "Not published",
    protocol: ["REST (Data API)", "MongoDB wire protocol"],
    sdks: ["Node.js", "Python", "Java", "Go", "Ruby", "C#", "PHP"],
    latency: "low",
  },

  // ── Storage ────────────────────────────────────────────────
  "cloudinary": {
    pricing: { free: "25 credits / mo", paid: "From $89 / mo" },
    rateLimit: "500 req / hr (free)",
    protocol: ["REST"],
    sdks: ["Node.js", "Python", "Ruby", "PHP", "Java", "iOS", "Android"],
    latency: "low",
  },
  "uploadthing": {
    pricing: { free: "2GB storage", paid: "From $10 / mo" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["React", "Next.js", "SvelteKit", "SolidStart"],
    latency: "low",
  },
  "aws-s3": {
    pricing: { free: "5GB for 12 months (new accounts)", paid: "From $0.023 / GB / mo" },
    rateLimit: "3,500 PUT / s, 5,500 GET / s (per prefix)",
    protocol: ["REST"],
    sdks: ["Python (boto3)", "Node.js", "Java", "Go", ".NET", "Ruby", "PHP"],
    latency: "low",
  },
  "imagekit": {
    pricing: { free: "20GB bandwidth / mo", paid: "From $49 / mo" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript", "Python", "PHP", "Ruby", "Java", "Android", "iOS"],
    latency: "low",
  },

  // ── Search ─────────────────────────────────────────────────
  "algolia": {
    pricing: { free: "10K search units / mo", paid: "From $0.50 / 1K operations" },
    rateLimit: "10 req/s (free)",
    protocol: ["REST"],
    sdks: ["JavaScript", "Python", "Ruby", "PHP", "Go", "Java", ".NET", "Swift", "Kotlin"],
    latency: "low",
  },
  "meilisearch": {
    pricing: { free: "Open source (self-host) / Cloud free trial", paid: "From $30 / mo (Cloud)" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript", "Python", "Rust", "Go", "Ruby", "PHP", "Swift", ".NET"],
    latency: "low",
  },
  "typesense": {
    pricing: { free: "Open source (self-host) / Cloud from free", paid: "From $0.000004 / doc / hr (Cloud)" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript", "Python", "Go", "Ruby", "PHP", "Java", "Swift", "Dart"],
    latency: "low",
  },

  // ── Analytics ──────────────────────────────────────────────
  "posthog": {
    pricing: { free: "1M events / mo", paid: "From $0.00031 / event" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript", "Python", "Node.js", "Ruby", "PHP", "iOS", "Android", "Flutter"],
    latency: "low",
  },
  "google-analytics": {
    pricing: { free: "Free (GA4)", paid: "Google Analytics 360 (~$50K / yr)" },
    rateLimit: "10 req/s, 10K req/day (API)",
    protocol: ["REST"],
    sdks: ["JavaScript (tag)", "Python", "Java", "PHP"],
    latency: "medium",
  },
  "plausible": {
    pricing: { free: "30-day trial", paid: "From $9 / mo (10K pageviews)" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript (script tag)"],
    latency: "low",
  },
  "mixpanel": {
    pricing: { free: "20M events / mo", paid: "From $28 / mo" },
    rateLimit: "2K req / hr (free)",
    protocol: ["REST"],
    sdks: ["JavaScript", "Python", "Node.js", "Ruby", "PHP", "iOS", "Android"],
    latency: "low",
  },

  // ── Communication ──────────────────────────────────────────
  "resend": {
    pricing: { free: "3K emails / mo, 1 domain", paid: "From $20 / mo" },
    rateLimit: "2 req/s (free)",
    protocol: ["REST"],
    sdks: ["Node.js", "Python", "Ruby", "PHP", "Go", "Elixir", "Rust"],
    latency: "low",
  },
  "mailgun": {
    pricing: { free: "100 emails / day (trial)", paid: "From $35 / mo (50K emails)" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["Python", "Ruby", "PHP", "Node.js", "Java", "C#"],
    latency: "low",
  },
  "sendgrid": {
    pricing: { free: "100 emails / day", paid: "From $19.95 / mo" },
    rateLimit: "600 req / min",
    protocol: ["REST"],
    sdks: ["Python", "Node.js", "Ruby", "PHP", "Java", "Go", "C#"],
    latency: "low",
  },
  "twilio": {
    pricing: { free: "Trial credit ($15)", paid: "From $0.0085 / SMS" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["Python", "Node.js", "Ruby", "PHP", "Java", "Go", "C#"],
    latency: "low",
  },

  // ── Maps ───────────────────────────────────────────────────
  "google-maps": {
    pricing: { free: "$200 credit / mo", paid: "From $7 / 1K requests" },
    rateLimit: "3K RPM (Maps JS)",
    protocol: ["REST"],
    sdks: ["JavaScript", "Android", "iOS", "Python", "Go", "Java"],
    latency: "low",
  },
  "nominatim": {
    pricing: { free: "Free (1 req/s usage policy)", paid: "Self-host for higher limits" },
    rateLimit: "1 req/s (public API)",
    protocol: ["REST"],
    sdks: ["Any HTTP client"],
    latency: "medium",
  },
  "radar": {
    pricing: { free: "100K API calls / mo", paid: "From $200 / mo" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript", "iOS", "Android", "React Native", "Flutter"],
    latency: "low",
  },

  // ── Finance ────────────────────────────────────────────────
  "coingecko": {
    pricing: { free: "30 calls / min (Demo)", paid: "From $129 / mo (Analyst)" },
    rateLimit: "30 calls / min (free)",
    protocol: ["REST"],
    sdks: ["Python", "Node.js", "PHP"],
    latency: "medium",
  },
  "alpha-vantage": {
    pricing: { free: "25 req / day", paid: "From $50 / mo" },
    rateLimit: "25 req / day (free)",
    protocol: ["REST"],
    sdks: ["Python", "JavaScript", "PHP", "C#"],
    latency: "medium",
  },
  "finnhub": {
    pricing: { free: "60 API calls / min (free tier)", paid: "From $299 / mo" },
    rateLimit: "60 calls / min (free)",
    protocol: ["REST", "WebSocket"],
    sdks: ["Python", "JavaScript", "Go", "Kotlin"],
    latency: "low",
  },

  // ── Weather ────────────────────────────────────────────────
  "openweather": {
    pricing: { free: "1K calls / day", paid: "From $40 / mo" },
    rateLimit: "60 calls / min (free)",
    protocol: ["REST"],
    sdks: ["Any HTTP client"],
    latency: "low",
  },
  "weatherapi": {
    pricing: { free: "1M calls / mo", paid: "From $4 / mo" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["Any HTTP client"],
    latency: "low",
  },

  // ── DevOps ─────────────────────────────────────────────────
  "vercel": {
    pricing: { free: "Hobby plan", paid: "From $20 / mo (Pro)" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript / TypeScript (Vercel SDK)"],
    latency: "low",
  },
  "netlify": {
    pricing: { free: "Starter plan (100GB bandwidth)", paid: "From $19 / mo" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["JavaScript (Netlify SDK)"],
    latency: "low",
  },
  "docker-hub": {
    pricing: { free: "1 private repo, 200 pulls / 6hr", paid: "From $5 / mo (Pro)" },
    rateLimit: "200 pulls / 6 hr (anonymous)",
    protocol: ["REST"],
    sdks: ["Docker CLI", "Any HTTP client"],
    latency: "low",
  },
  "github": {
    pricing: { free: "Free (5K req / hr authenticated)", paid: "GitHub Enterprise" },
    rateLimit: "5K req / hr (authenticated)",
    protocol: ["REST", "GraphQL"],
    sdks: ["JavaScript (Octokit)", "Python", "Ruby", "Go", "Java"],
    latency: "low",
  },

  // ── Entertainment ──────────────────────────────────────────
  "spotify": {
    pricing: { free: "Free for developers", paid: "N/A (API access is free)" },
    rateLimit: "~180 req / min (rolling window)",
    protocol: ["REST", "WebSocket (Playback SDK)"],
    sdks: ["Web Playback SDK", "iOS", "Android"],
    latency: "low",
  },
  "tmdb": {
    pricing: { free: "Free with attribution", paid: "TMDB Pro (contact)" },
    rateLimit: "50 req / s",
    protocol: ["REST"],
    sdks: ["Any HTTP client"],
    latency: "low",
  },
  "youtube": {
    pricing: { free: "10K units / day", paid: "Additional quota on request" },
    rateLimit: "10K units / day (free)",
    protocol: ["REST"],
    sdks: ["JavaScript", "Python", "Java", "Go", "PHP", "Ruby", ".NET"],
    latency: "low",
  },

  // ── News ───────────────────────────────────────────────────
  "newsapi": {
    pricing: { free: "100 req / day (Developer)", paid: "From $449 / mo (Business)" },
    rateLimit: "100 req / day (free)",
    protocol: ["REST"],
    sdks: ["Any HTTP client"],
    latency: "low",
  },
  "gnews": {
    pricing: { free: "100 req / day", paid: "From $79 / mo" },
    rateLimit: "100 req / day (free)",
    protocol: ["REST"],
    sdks: ["Any HTTP client"],
    latency: "low",
  },

  // ── Social ─────────────────────────────────────────────────
  "twitter": {
    pricing: { free: "Free (1,500 tweets / mo write)", paid: "From $100 / mo (Basic)" },
    rateLimit: "500K tweet reads / mo (Basic)",
    protocol: ["REST", "WebSocket (Streaming)"],
    sdks: ["JavaScript", "Python", "Ruby", "Java"],
    latency: "low",
  },

  // ── Utilities ──────────────────────────────────────────────
  "ipapi": {
    pricing: { free: "1K req / day", paid: "From $10 / mo" },
    rateLimit: "1K req / day (free)",
    protocol: ["REST"],
    sdks: ["Any HTTP client"],
    latency: "low",
  },
  "ipinfo": {
    pricing: { free: "50K req / mo", paid: "From $99 / mo" },
    rateLimit: "50K req / mo (free)",
    protocol: ["REST"],
    sdks: ["Python", "Node.js", "Go", "Ruby", "Java", "PHP"],
    latency: "low",
  },
  "randomuser": {
    pricing: { free: "Free, unlimited", paid: "N/A" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["Any HTTP client"],
    latency: "low",
  },
  "jsonplaceholder": {
    pricing: { free: "Free, unlimited", paid: "N/A" },
    rateLimit: "Not published",
    protocol: ["REST"],
    sdks: ["Any HTTP client"],
    latency: "low",
  },
};

export function getApiMeta(slug: string): ApiMeta {
  return meta[slug] ?? {};
}
