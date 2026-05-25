import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — APIYard",
  description: "A log of APIs added and features shipped to APIYard.",
};

const ENTRIES = [
  {
    date: "June 2026",
    title: "25 new APIs — AI, social, DevOps & more",
    items: [
      "Added AI & ML: Mistral AI, ElevenLabs (voice synthesis), Replicate, Stability AI, Perplexity AI",
      "Added Auth: WorkOS (enterprise SSO + SCIM)",
      "Added Database: Turso (libSQL edge), Convex, Airtable",
      "Added Storage: Cloudflare R2, Backblaze B2",
      "Added Communication: OneSignal (push notifications), Discord Webhooks",
      "Added DevOps: Cloudflare API, Railway, Linear",
      "Added Social: X (Twitter) API v2, Discord API, Slack API",
      "Added Entertainment: Twitch Helix, Last.fm",
      "Added Developer: DiceBear Avatars, FakerAPI",
      "Added Finance: Polygon.io",
      "Added Security: Shodan",
      "APIYard now has 96 curated APIs across 22 categories",
    ],
  },
  {
    date: "May 2026",
    title: "41 new APIs + major feature update",
    items: [
      "Added Auth category: Clerk, Auth0, Firebase Auth, Supabase Auth",
      "Added Payments category: Stripe, PayPal, Lemon Squeezy, Paddle",
      "Added Database category: Supabase, Firebase, Neon, PlanetScale, MongoDB Atlas",
      "Added Storage category: Cloudinary, UploadThing, AWS S3, ImageKit",
      "Added Search category: Algolia, Meilisearch, Typesense",
      "Added Analytics category: PostHog, Google Analytics, Plausible, Mixpanel",
      "Added DevOps category: Vercel API, Netlify API, Docker Hub",
      "Added Email: Resend, Mailgun",
      "Added Jobs category: Adzuna, Arbeitnow",
      "Added Maps: Nominatim (OpenStreetMap), Radar",
      "Added Finance: Finnhub",
      "Added Media: YouTube Data API, Google Books, GNews",
      "Added Utilities: QRServer, ipapi, IPinfo, RandomUser, Google Gemini",
      "Launched Compare mode — select up to 4 APIs and compare side-by-side",
      "Added Try It panel — live requests proxied securely from the detail page",
      "Added auth type filter pills on the explorer",
      "Tag clicking now searches that tag across all APIs",
      "Quick-copy base URL button on cards",
      "Skeleton loading states on initial page load",
      "OG images for every API detail page",
      "Added /sitemap.xml and /robots.txt",
      "JSON feed at /api/apis.json",
      "Submit an API form (opens a pre-filled GitHub issue)",
    ],
  },
  {
    date: "April 2026",
    title: "Initial launch — 29 APIs",
    items: [
      "Launched APIYard with 29 curated APIs",
      "Categories: AI & ML, Weather, Finance, Maps, Social, Communication, Utilities, News, and more",
      "APIs include: OpenAI, Anthropic, OpenWeather, WeatherAPI, CoinGecko, Alpha Vantage, Spotify, TMDB, GitHub, Twilio, SendGrid, NewsAPI, JSONPlaceholder, and others",
      "Fuzzy search with Fuse.js across name, tagline, description, and tags",
      "Favorites — starred APIs persist in localStorage",
      "Dark / light theme toggle",
      "Keyboard shortcuts: / to search, Esc to clear, g h / g a / g s to navigate, t to toggle theme, ? for shortcuts modal",
      "Code examples in cURL, JavaScript, Python, and Go",
      "Response previews on every endpoint",
      "Category filter pills with live counts",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-base-content/50 hover:text-base-content mb-8 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to APIs
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Changelog</h1>
        <p className="text-base-content/50">APIs added and features shipped.</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-base-300" />

        <div className="space-y-12 pl-8">
          {ENTRIES.map((entry) => (
            <div key={entry.date} className="relative">
              {/* Dot */}
              <div className="absolute -left-8 top-1.5 w-2 h-2 rounded-full bg-base-content/40 -translate-x-[3px]" />

              <p className="text-xs font-medium text-base-content/40 uppercase tracking-widest mb-1">
                {entry.date}
              </p>
              <h2 className="text-lg font-semibold mb-4">{entry.title}</h2>
              <ul className="space-y-2">
                {entry.items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-base-content/70">
                    <span className="text-base-content/30 shrink-0 mt-0.5">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
