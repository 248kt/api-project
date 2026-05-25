// APIs added in the May 2026 batch (original)
const MAY_2026_BATCH = [
  "google-gemini", "clerk", "auth0", "firebase-auth", "supabase-auth",
  "paypal", "lemon-squeezy", "paddle", "supabase", "firebase", "neon",
  "planetscale", "mongodb-atlas", "cloudinary", "uploadthing", "aws-s3",
  "imagekit", "algolia", "meilisearch", "typesense", "posthog",
  "google-analytics", "plausible", "mixpanel", "resend", "mailgun",
  "nominatim", "radar", "finnhub", "vercel", "netlify", "docker-hub",
  "youtube", "google-books", "gnews", "adzuna", "arbeitnow", "qrserver",
  "ipapi", "ipinfo", "randomuser",
];

// APIs added in the June 2026 batch
const JUNE_2026_BATCH = [
  "mistral", "elevenlabs", "replicate", "stability-ai", "perplexity",
  "workos", "turso", "convex", "airtable", "cloudflare-r2", "backblaze-b2",
  "onesignal", "discord-webhooks", "cloudflare", "railway", "linear",
  "twitter", "discord", "slack", "twitch", "lastfm", "dicebear",
  "fakerapi", "polygon", "shodan",
];

export const NEW_API_SLUGS = new Set([...MAY_2026_BATCH, ...JUNE_2026_BATCH]);
