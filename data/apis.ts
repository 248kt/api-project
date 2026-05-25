import { generateCodeExamples, type Language } from "@/lib/codeGen";

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  codeExamples: Record<Language, string>;
  responsePreview: string;
}

export interface Api {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  baseUrl: string;
  authType: "none" | "apiKey" | "bearer" | "oauth2";
  authHeader?: string;
  authQuery?: string;
  extraHeaders?: Record<string, string>;
  tags: string[];
  docsUrl: string;
  websiteUrl: string;
  featured?: boolean;
  freeTier?: boolean;
  endpoints: ApiEndpoint[];
}

// ── AI & ML ─────────────────────────────────────────────────

const openai: Api = {
  slug: "openai",
  name: "OpenAI",
  tagline: "GPT-4, DALL·E, Whisper, and embeddings",
  description: "Access state-of-the-art language models, image generation, speech-to-text, and embeddings through a simple REST API.",
  category: "ai-ml",
  baseUrl: "https://api.openai.com/v1",
  authType: "bearer",
  tags: ["GPT-4o", "embeddings", "images", "speech", "moderation"],
  docsUrl: "https://platform.openai.com/docs",
  websiteUrl: "https://openai.com",
  featured: true,
  endpoints: [
    {
      method: "POST",
      path: "/chat/completions",
      description: "Generate a chat completion using GPT-4o or another model.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        authType: "bearer",
        body: { model: "gpt-4o", messages: [{ role: "user", content: "Hello!" }] },
      }),
      responsePreview: `{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "model": "gpt-4o",
  "choices": [{
    "message": { "role": "assistant", "content": "Hello! How can I help you today?" },
    "finish_reason": "stop",
    "index": 0
  }],
  "usage": { "prompt_tokens": 10, "completion_tokens": 9 }
}`,
    },
    {
      method: "POST",
      path: "/embeddings",
      description: "Create a vector embedding for a given text input.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.openai.com/v1/embeddings",
        authType: "bearer",
        body: { model: "text-embedding-3-small", input: "The quick brown fox" },
      }),
      responsePreview: `{
  "object": "list",
  "data": [{
    "object": "embedding",
    "embedding": [0.0023, -0.009, "..."],
    "index": 0
  }],
  "model": "text-embedding-3-small",
  "usage": { "prompt_tokens": 5, "total_tokens": 5 }
}`,
    },
  ],
};

const anthropic: Api = {
  slug: "anthropic",
  name: "Anthropic Claude",
  tagline: "Reliable, interpretable AI for complex tasks",
  description: "Claude is Anthropic's AI assistant — capable of analysis, writing, coding, and nuanced conversation with a strong focus on safety.",
  category: "ai-ml",
  baseUrl: "https://api.anthropic.com/v1",
  authType: "apiKey",
  authHeader: "x-api-key",
  extraHeaders: { "anthropic-version": "2023-06-01" },
  tags: ["Claude", "reasoning", "coding", "analysis", "vision"],
  docsUrl: "https://docs.anthropic.com",
  websiteUrl: "https://anthropic.com",
  featured: true,
  endpoints: [
    {
      method: "POST",
      path: "/messages",
      description: "Send a message and receive a response from Claude.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.anthropic.com/v1/messages",
        authType: "apiKey",
        authHeader: "x-api-key",
        extraHeaders: { "anthropic-version": "2023-06-01" },
        body: { model: "claude-sonnet-4-6", max_tokens: 1024, messages: [{ role: "user", content: "Hello!" }] },
      }),
      responsePreview: `{
  "id": "msg_01XFDUDYJgAACzvnptvVoYEL",
  "type": "message",
  "role": "assistant",
  "content": [{ "type": "text", "text": "Hello! How can I help?" }],
  "model": "claude-sonnet-4-6",
  "stop_reason": "end_turn",
  "usage": { "input_tokens": 10, "output_tokens": 6 }
}`,
    },
  ],
};

const huggingface: Api = {
  slug: "huggingface",
  name: "Hugging Face",
  tagline: "Run 300,000+ open-source models via API",
  description: "Access thousands of community-trained models for NLP, computer vision, audio, and more through the Inference API.",
  category: "ai-ml",
  baseUrl: "https://api-inference.huggingface.co",
  authType: "bearer",
  tags: ["transformers", "NLP", "vision", "audio", "open-source"],
  docsUrl: "https://huggingface.co/docs/api-inference",
  websiteUrl: "https://huggingface.co",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/models/{model_id}",
      description: "Run inference on any Hugging Face model.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api-inference.huggingface.co/models/gpt2",
        authType: "bearer",
        body: { inputs: "The meaning of life is" },
      }),
      responsePreview: `[
  {
    "generated_text": "The meaning of life is to find your gift. The purpose of life is to give it away."
  }
]`,
    },
  ],
};

const googleGemini: Api = {
  slug: "google-gemini",
  name: "Google Gemini",
  tagline: "Google's multimodal AI with vision and reasoning",
  description: "Gemini is Google's most capable AI model family, supporting text, images, audio, and video inputs across multiple model sizes.",
  category: "ai-ml",
  baseUrl: "https://generativelanguage.googleapis.com/v1beta",
  authType: "apiKey",
  authQuery: "key",
  tags: ["multimodal", "vision", "reasoning", "Gemini 2.0", "Google"],
  docsUrl: "https://ai.google.dev/docs",
  websiteUrl: "https://deepmind.google/technologies/gemini",
  featured: true,
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/models/gemini-2.0-flash:generateContent",
      description: "Generate text content using Gemini.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        authType: "apiKey",
        authQuery: "key",
        body: { contents: [{ parts: [{ text: "Explain quantum computing in simple terms." }] }] },
      }),
      responsePreview: `{
  "candidates": [{
    "content": {
      "parts": [{ "text": "Quantum computing uses quantum bits (qubits) that can be 0, 1, or both simultaneously..." }],
      "role": "model"
    },
    "finishReason": "STOP"
  }],
  "usageMetadata": { "promptTokenCount": 9, "candidatesTokenCount": 142 }
}`,
    },
  ],
};

// ── Auth ─────────────────────────────────────────────────────

const clerk: Api = {
  slug: "clerk",
  name: "Clerk",
  tagline: "Drop-in auth with users, sessions, and orgs",
  description: "Complete user management with pre-built UI components, session handling, MFA, social login, and organization support.",
  category: "auth",
  baseUrl: "https://api.clerk.com/v1",
  authType: "bearer",
  tags: ["users", "sessions", "MFA", "organizations", "social login"],
  docsUrl: "https://clerk.com/docs",
  websiteUrl: "https://clerk.com",
  featured: true,
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/users",
      description: "List all users in your Clerk application.",
      codeExamples: generateCodeExamples({
        url: "https://api.clerk.com/v1/users?limit=10",
        authType: "bearer",
      }),
      responsePreview: `[
  {
    "id": "user_2abc123",
    "email_addresses": [{ "email_address": "jane@example.com" }],
    "first_name": "Jane",
    "last_name": "Doe",
    "created_at": 1714000000000,
    "last_sign_in_at": 1714050000000
  }
]`,
    },
    {
      method: "POST",
      path: "/users",
      description: "Create a new user programmatically.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.clerk.com/v1/users",
        authType: "bearer",
        body: { email_address: ["jane@example.com"], password: "securepassword", first_name: "Jane" },
      }),
      responsePreview: `{
  "id": "user_2xyz789",
  "email_addresses": [{ "email_address": "jane@example.com", "verification": { "status": "verified" } }],
  "first_name": "Jane",
  "created_at": 1714000000000
}`,
    },
  ],
};

const auth0: Api = {
  slug: "auth0",
  name: "Auth0",
  tagline: "Enterprise identity platform with 30+ social connections",
  description: "Authenticate and authorize users with Auth0's flexible, secure identity platform supporting social login, SSO, MFA, and role-based access.",
  category: "auth",
  baseUrl: "https://YOUR_DOMAIN.auth0.com/api/v2",
  authType: "bearer",
  tags: ["SSO", "OAuth2", "OIDC", "MFA", "RBAC"],
  docsUrl: "https://auth0.com/docs",
  websiteUrl: "https://auth0.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/users",
      description: "Get a list of users in your Auth0 tenant.",
      codeExamples: generateCodeExamples({
        url: "https://YOUR_DOMAIN.auth0.com/api/v2/users?per_page=10",
        authType: "bearer",
      }),
      responsePreview: `[
  {
    "user_id": "auth0|abc123",
    "email": "jane@example.com",
    "name": "Jane Doe",
    "logins_count": 42,
    "last_login": "2024-05-01T10:00:00.000Z",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]`,
    },
  ],
};

const firebaseAuth: Api = {
  slug: "firebase-auth",
  name: "Firebase Auth",
  tagline: "Google's authentication service for any app",
  description: "Add sign-in with email/password, phone, Google, Apple, and more to your app using Firebase Authentication's REST API.",
  category: "auth",
  baseUrl: "https://identitytoolkit.googleapis.com/v1",
  authType: "apiKey",
  authQuery: "key",
  tags: ["email", "social login", "phone auth", "Google", "anonymous"],
  docsUrl: "https://firebase.google.com/docs/reference/rest/auth",
  websiteUrl: "https://firebase.google.com/products/auth",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/accounts:signUp",
      description: "Create a new user with email and password.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
        authType: "apiKey",
        authQuery: "key",
        body: { email: "jane@example.com", password: "securepassword", returnSecureToken: true },
      }),
      responsePreview: `{
  "idToken": "eyJhbGciOi...",
  "email": "jane@example.com",
  "refreshToken": "AMf-vBzb...",
  "expiresIn": "3600",
  "localId": "tRcfmLH7o..."
}`,
    },
  ],
};

const supabaseAuth: Api = {
  slug: "supabase-auth",
  name: "Supabase Auth",
  tagline: "Open source auth with magic links, OAuth, and SSO",
  description: "Supabase Auth provides email/password, magic link, OTP, and OAuth sign-in with built-in row-level security integration.",
  category: "auth",
  baseUrl: "https://YOUR_PROJECT.supabase.co/auth/v1",
  authType: "apiKey",
  authHeader: "apikey",
  tags: ["magic link", "OTP", "OAuth", "RLS", "open source"],
  docsUrl: "https://supabase.com/docs/guides/auth",
  websiteUrl: "https://supabase.com/auth",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/signup",
      description: "Sign up a new user with email and password.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://YOUR_PROJECT.supabase.co/auth/v1/signup",
        authType: "apiKey",
        authHeader: "apikey",
        body: { email: "jane@example.com", password: "securepassword" },
      }),
      responsePreview: `{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "abc123xyz",
  "user": {
    "id": "a1b2c3d4-...",
    "email": "jane@example.com",
    "created_at": "2024-05-01T10:00:00Z"
  }
}`,
    },
  ],
};

// ── Payments ─────────────────────────────────────────────────

const stripe: Api = {
  slug: "stripe",
  name: "Stripe",
  tagline: "Payments infrastructure for the internet",
  description: "Accept payments, manage subscriptions, and send payouts globally. The most developer-friendly payments API available.",
  category: "payments",
  baseUrl: "https://api.stripe.com/v1",
  authType: "bearer",
  tags: ["payments", "subscriptions", "invoicing", "payouts", "webhooks"],
  docsUrl: "https://stripe.com/docs/api",
  websiteUrl: "https://stripe.com",
  featured: true,
  endpoints: [
    {
      method: "POST",
      path: "/payment_intents",
      description: "Create a PaymentIntent to begin accepting payment.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.stripe.com/v1/payment_intents",
        authType: "bearer",
        body: { amount: 2000, currency: "usd" },
      }),
      responsePreview: `{
  "id": "pi_3NmGsn2eZvKYlo2C1234",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "requires_payment_method",
  "client_secret": "pi_secret_..."
}`,
    },
    {
      method: "GET",
      path: "/customers",
      description: "List all customers in your Stripe account.",
      codeExamples: generateCodeExamples({
        url: "https://api.stripe.com/v1/customers?limit=10",
        authType: "bearer",
      }),
      responsePreview: `{
  "object": "list",
  "data": [
    { "id": "cus_abc", "email": "jane@example.com", "name": "Jane Doe" }
  ],
  "has_more": true
}`,
    },
  ],
};

const paypal: Api = {
  slug: "paypal",
  name: "PayPal",
  tagline: "Accept PayPal, cards, and Venmo worldwide",
  description: "Create orders, capture payments, and issue refunds globally using PayPal's REST APIs with support for one-time and subscription payments.",
  category: "payments",
  baseUrl: "https://api-m.paypal.com/v2",
  authType: "bearer",
  tags: ["PayPal", "orders", "subscriptions", "refunds", "global"],
  docsUrl: "https://developer.paypal.com/docs/api/overview",
  websiteUrl: "https://paypal.com",
  endpoints: [
    {
      method: "POST",
      path: "/checkout/orders",
      description: "Create a payment order to initiate checkout.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api-m.paypal.com/v2/checkout/orders",
        authType: "bearer",
        body: {
          intent: "CAPTURE",
          purchase_units: [{ amount: { currency_code: "USD", value: "10.00" } }],
        },
      }),
      responsePreview: `{
  "id": "8F0R5VGBCR",
  "status": "CREATED",
  "links": [
    { "rel": "approve", "href": "https://www.paypal.com/checkoutnow?token=8F0R5VGBCR", "method": "GET" }
  ]
}`,
    },
  ],
};

const lemonSqueezy: Api = {
  slug: "lemon-squeezy",
  name: "Lemon Squeezy",
  tagline: "All-in-one payments for software companies",
  description: "Sell software products, SaaS subscriptions, and digital downloads with Lemon Squeezy handling tax compliance globally.",
  category: "payments",
  baseUrl: "https://api.lemonsqueezy.com/v1",
  authType: "bearer",
  tags: ["SaaS", "subscriptions", "digital products", "tax", "licensing"],
  docsUrl: "https://docs.lemonsqueezy.com/api",
  websiteUrl: "https://lemonsqueezy.com",
  endpoints: [
    {
      method: "GET",
      path: "/products",
      description: "List all products in your Lemon Squeezy store.",
      codeExamples: generateCodeExamples({
        url: "https://api.lemonsqueezy.com/v1/products",
        authType: "bearer",
      }),
      responsePreview: `{
  "data": [{
    "id": "1",
    "type": "products",
    "attributes": {
      "name": "Pro Plan",
      "slug": "pro-plan",
      "status": "published",
      "price": 1900,
      "buy_now_url": "https://yourstore.lemonsqueezy.com/checkout/buy/..."
    }
  }]
}`,
    },
  ],
};

const paddle: Api = {
  slug: "paddle",
  name: "Paddle",
  tagline: "Revenue delivery platform for B2B SaaS",
  description: "Paddle acts as your Merchant of Record, handling global payments, taxes, fraud, and subscriptions for SaaS companies.",
  category: "payments",
  baseUrl: "https://api.paddle.com",
  authType: "bearer",
  tags: ["subscriptions", "MoR", "tax compliance", "SaaS", "billing"],
  docsUrl: "https://developer.paddle.com/api-reference",
  websiteUrl: "https://paddle.com",
  endpoints: [
    {
      method: "GET",
      path: "/products",
      description: "List all products in your Paddle catalog.",
      codeExamples: generateCodeExamples({
        url: "https://api.paddle.com/products",
        authType: "bearer",
      }),
      responsePreview: `{
  "data": [{
    "id": "pro_01abc",
    "name": "Pro Subscription",
    "status": "active",
    "type": "standard",
    "created_at": "2024-01-01T00:00:00Z"
  }],
  "meta": { "pagination": { "total": 1 } }
}`,
    },
  ],
};

// ── Database ─────────────────────────────────────────────────

const supabase: Api = {
  slug: "supabase",
  name: "Supabase",
  tagline: "Open source Firebase alternative with Postgres",
  description: "A Postgres-backed backend-as-a-service with auto-generated REST APIs, realtime subscriptions, auth, and storage built in.",
  category: "database",
  baseUrl: "https://YOUR_PROJECT.supabase.co/rest/v1",
  authType: "apiKey",
  authHeader: "apikey",
  tags: ["Postgres", "realtime", "REST", "open source", "BaaS"],
  docsUrl: "https://supabase.com/docs",
  websiteUrl: "https://supabase.com",
  featured: true,
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/{table}",
      description: "Query any Postgres table with filtering and pagination.",
      codeExamples: generateCodeExamples({
        url: "https://YOUR_PROJECT.supabase.co/rest/v1/posts?select=*&limit=10",
        authType: "apiKey",
        authHeader: "apikey",
      }),
      responsePreview: `[
  {
    "id": 1,
    "title": "Hello World",
    "content": "My first post",
    "user_id": "a1b2c3",
    "created_at": "2024-05-01T10:00:00Z"
  }
]`,
    },
    {
      method: "POST",
      path: "/{table}",
      description: "Insert a new row into a Postgres table.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://YOUR_PROJECT.supabase.co/rest/v1/posts",
        authType: "apiKey",
        authHeader: "apikey",
        body: { title: "New Post", content: "Hello!", user_id: "a1b2c3" },
      }),
      responsePreview: `[
  {
    "id": 42,
    "title": "New Post",
    "content": "Hello!",
    "user_id": "a1b2c3",
    "created_at": "2024-05-01T12:00:00Z"
  }
]`,
    },
  ],
};

const firebase: Api = {
  slug: "firebase",
  name: "Firebase",
  tagline: "Google's real-time NoSQL database and BaaS",
  description: "Firebase Realtime Database and Firestore provide NoSQL cloud databases with real-time sync, offline support, and auto-scaling.",
  category: "database",
  baseUrl: "https://YOUR_PROJECT.firebaseio.com",
  authType: "apiKey",
  authQuery: "auth",
  tags: ["NoSQL", "realtime", "Firestore", "Google", "offline"],
  docsUrl: "https://firebase.google.com/docs/database/rest/start",
  websiteUrl: "https://firebase.google.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/{path}.json",
      description: "Read data at a database path.",
      codeExamples: generateCodeExamples({
        url: "https://YOUR_PROJECT.firebaseio.com/users/jane.json",
        authType: "apiKey",
        authQuery: "auth",
      }),
      responsePreview: `{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "admin",
  "created_at": 1714000000000
}`,
    },
    {
      method: "PUT",
      path: "/{path}.json",
      description: "Write or replace data at a database path.",
      codeExamples: generateCodeExamples({
        method: "PUT",
        url: "https://YOUR_PROJECT.firebaseio.com/users/jane.json",
        authType: "apiKey",
        authQuery: "auth",
        body: { name: "Jane Doe", email: "jane@example.com", role: "admin" },
      }),
      responsePreview: `{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "admin"
}`,
    },
  ],
};

const neon: Api = {
  slug: "neon",
  name: "Neon",
  tagline: "Serverless Postgres with instant branching",
  description: "Neon is a serverless Postgres platform with autoscaling, database branching for dev/test, and a generous free tier.",
  category: "database",
  baseUrl: "https://console.neon.tech/api/v2",
  authType: "bearer",
  tags: ["Postgres", "serverless", "branching", "autoscale", "free tier"],
  docsUrl: "https://neon.tech/docs/reference/api-reference",
  websiteUrl: "https://neon.tech",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/projects",
      description: "List all Neon projects in your account.",
      codeExamples: generateCodeExamples({
        url: "https://console.neon.tech/api/v2/projects",
        authType: "bearer",
      }),
      responsePreview: `{
  "projects": [{
    "id": "odd-forest-12345",
    "name": "my-app",
    "region_id": "aws-us-east-2",
    "pg_version": 16,
    "created_at": "2024-01-01T00:00:00Z",
    "branch": { "id": "br-main-abc", "name": "main" }
  }]
}`,
    },
  ],
};

const planetscale: Api = {
  slug: "planetscale",
  name: "PlanetScale",
  tagline: "Serverless MySQL with non-blocking schema changes",
  description: "PlanetScale is a MySQL-compatible serverless database platform with branching workflows, connection pooling, and horizontal sharding.",
  category: "database",
  baseUrl: "https://api.planetscale.com/v1",
  authType: "bearer",
  tags: ["MySQL", "serverless", "branching", "sharding", "vitess"],
  docsUrl: "https://api-docs.planetscale.com",
  websiteUrl: "https://planetscale.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/organizations/{org}/databases",
      description: "List all databases in a PlanetScale organization.",
      codeExamples: generateCodeExamples({
        url: "https://api.planetscale.com/v1/organizations/my-org/databases",
        authType: "bearer",
      }),
      responsePreview: `{
  "data": [{
    "id": "abc123",
    "name": "my-database",
    "state": "ready",
    "region": { "slug": "us-east", "display_name": "US East" },
    "created_at": "2024-01-01T00:00:00Z"
  }]
}`,
    },
  ],
};

const mongodbAtlas: Api = {
  slug: "mongodb-atlas",
  name: "MongoDB Atlas",
  tagline: "Multi-cloud document database with a free tier",
  description: "MongoDB Atlas is a fully managed cloud database with a Data API for CRUD operations over HTTPS, plus aggregation and search.",
  category: "database",
  baseUrl: "https://data.mongodb-api.com/app/data-abcde/endpoint/data/v1",
  authType: "apiKey",
  authHeader: "api-key",
  tags: ["MongoDB", "document DB", "aggregation", "Atlas", "free tier"],
  docsUrl: "https://www.mongodb.com/docs/atlas/api/data-api",
  websiteUrl: "https://mongodb.com/atlas",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/action/find",
      description: "Query documents from a MongoDB collection.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://data.mongodb-api.com/app/data-abcde/endpoint/data/v1/action/find",
        authType: "apiKey",
        authHeader: "api-key",
        body: { dataSource: "Cluster0", database: "mydb", collection: "users", filter: { role: "admin" } },
      }),
      responsePreview: `{
  "documents": [
    { "_id": "663abc...", "name": "Jane Doe", "email": "jane@example.com", "role": "admin" }
  ]
}`,
    },
  ],
};

// ── Storage ──────────────────────────────────────────────────

const cloudinary: Api = {
  slug: "cloudinary",
  name: "Cloudinary",
  tagline: "Image and video upload, transform, and deliver",
  description: "Upload, store, transform, and deliver images and videos with a powerful CDN and on-the-fly transformation pipeline.",
  category: "storage",
  baseUrl: "https://api.cloudinary.com/v1_1/{cloud_name}",
  authType: "bearer",
  tags: ["images", "video", "CDN", "transformations", "optimization"],
  docsUrl: "https://cloudinary.com/documentation",
  websiteUrl: "https://cloudinary.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/image/upload",
      description: "Upload an image to your Cloudinary account.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/YOUR_CLOUD/image/upload",
        authType: "bearer",
        body: { file: "https://example.com/photo.jpg", public_id: "my-image" },
      }),
      responsePreview: `{
  "public_id": "my-image",
  "version": 1714000000,
  "format": "jpg",
  "width": 1920,
  "height": 1080,
  "bytes": 245678,
  "secure_url": "https://res.cloudinary.com/YOUR_CLOUD/image/upload/my-image.jpg"
}`,
    },
  ],
};

const uploadthing: Api = {
  slug: "uploadthing",
  name: "UploadThing",
  tagline: "File uploads for full-stack TypeScript apps",
  description: "UploadThing provides type-safe file upload infrastructure designed for Next.js and other full-stack TypeScript frameworks.",
  category: "storage",
  baseUrl: "https://uploadthing.com/api",
  authType: "apiKey",
  authHeader: "x-uploadthing-api-key",
  tags: ["file upload", "TypeScript", "Next.js", "type-safe", "S3"],
  docsUrl: "https://docs.uploadthing.com",
  websiteUrl: "https://uploadthing.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/listFiles",
      description: "List all uploaded files in your UploadThing app.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://uploadthing.com/api/listFiles",
        authType: "apiKey",
        authHeader: "x-uploadthing-api-key",
        body: {},
      }),
      responsePreview: `{
  "files": [{
    "id": "abc123",
    "key": "abc123-photo.jpg",
    "name": "photo.jpg",
    "status": "Uploaded",
    "size": 245678,
    "url": "https://utfs.io/f/abc123-photo.jpg"
  }]
}`,
    },
  ],
};

const awsS3: Api = {
  slug: "aws-s3",
  name: "AWS S3",
  tagline: "Industry-standard scalable object storage",
  description: "Amazon S3 stores and retrieves any amount of data with 99.999999999% durability, used by millions of apps worldwide.",
  category: "storage",
  baseUrl: "https://s3.amazonaws.com",
  authType: "bearer",
  tags: ["object storage", "buckets", "presigned URLs", "CDN", "AWS"],
  docsUrl: "https://docs.aws.amazon.com/s3",
  websiteUrl: "https://aws.amazon.com/s3",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/{bucket}?list-type=2",
      description: "List objects in an S3 bucket.",
      codeExamples: generateCodeExamples({
        url: "https://s3.amazonaws.com/my-bucket?list-type=2&max-keys=10",
        authType: "bearer",
      }),
      responsePreview: `<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult>
  <Name>my-bucket</Name>
  <KeyCount>2</KeyCount>
  <Contents>
    <Key>images/photo.jpg</Key>
    <Size>245678</Size>
    <LastModified>2024-05-01T10:00:00Z</LastModified>
  </Contents>
</ListBucketResult>`,
    },
  ],
};

const imagekit: Api = {
  slug: "imagekit",
  name: "ImageKit",
  tagline: "Real-time image and video optimization CDN",
  description: "ImageKit delivers optimized images and videos with real-time resizing, compression, and format conversion via a simple URL-based API.",
  category: "storage",
  baseUrl: "https://api.imagekit.io/v1",
  authType: "bearer",
  tags: ["image optimization", "CDN", "video", "WebP", "transformations"],
  docsUrl: "https://docs.imagekit.io",
  websiteUrl: "https://imagekit.io",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/files",
      description: "List all uploaded files in your ImageKit media library.",
      codeExamples: generateCodeExamples({
        url: "https://api.imagekit.io/v1/files?limit=10",
        authType: "bearer",
      }),
      responsePreview: `[
  {
    "fileId": "abc123",
    "name": "photo.jpg",
    "filePath": "/photo.jpg",
    "url": "https://ik.imagekit.io/YOUR_ID/photo.jpg",
    "size": 245678,
    "mime": "image/jpeg",
    "width": 1920,
    "height": 1080
  }
]`,
    },
  ],
};

// ── Search ───────────────────────────────────────────────────

const algolia: Api = {
  slug: "algolia",
  name: "Algolia",
  tagline: "Blazing-fast hosted search and discovery",
  description: "Algolia provides AI-powered search with sub-10ms response times, typo tolerance, faceting, and personalization.",
  category: "search",
  baseUrl: "https://YOUR_APP_ID-dsn.algolia.net",
  authType: "apiKey",
  authHeader: "X-Algolia-API-Key",
  extraHeaders: { "X-Algolia-Application-Id": "YOUR_APP_ID" },
  tags: ["full-text", "faceting", "typo tolerance", "AI", "realtime"],
  docsUrl: "https://www.algolia.com/doc",
  websiteUrl: "https://algolia.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/1/indexes/{index}/query",
      description: "Search an Algolia index for matching records.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://YOUR_APP_ID-dsn.algolia.net/1/indexes/products/query",
        authType: "apiKey",
        authHeader: "X-Algolia-API-Key",
        extraHeaders: { "X-Algolia-Application-Id": "YOUR_APP_ID" },
        body: { query: "iPhone", hitsPerPage: 5, filters: "in_stock:true" },
      }),
      responsePreview: `{
  "hits": [{
    "objectID": "prod_123",
    "name": "iPhone 15 Pro",
    "brand": "Apple",
    "price": 999,
    "_highlightResult": { "name": { "value": "<em>iPhone</em> 15 Pro" } }
  }],
  "nbHits": 42,
  "processingTimeMS": 3
}`,
    },
  ],
};

const meilisearch: Api = {
  slug: "meilisearch",
  name: "Meilisearch",
  tagline: "Open source instant search engine",
  description: "Meilisearch is a fast, typo-tolerant, open source search engine with a clean API and strong developer experience.",
  category: "search",
  baseUrl: "https://ms-YOUR_ID.meilisearch.io",
  authType: "bearer",
  tags: ["open source", "instant", "typo tolerance", "faceting", "self-host"],
  docsUrl: "https://www.meilisearch.com/docs",
  websiteUrl: "https://meilisearch.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/indexes/{uid}/search",
      description: "Search an index for matching documents.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://ms-YOUR_ID.meilisearch.io/indexes/movies/search",
        authType: "bearer",
        body: { q: "batman", limit: 5, facets: ["genre"] },
      }),
      responsePreview: `{
  "hits": [{
    "id": 29751,
    "title": "Batman Begins",
    "genre": ["Action", "Drama"],
    "_formatted": { "title": "<em>Batman</em> Begins" }
  }],
  "estimatedTotalHits": 4,
  "processingTimeMs": 1,
  "query": "batman"
}`,
    },
  ],
};

const typesense: Api = {
  slug: "typesense",
  name: "Typesense",
  tagline: "Typo-tolerant open source search engine",
  description: "Typesense is a fast, privacy-friendly, open source search engine that is easy to self-host or use via Typesense Cloud.",
  category: "search",
  baseUrl: "https://YOUR_CLUSTER.a1.typesense.net",
  authType: "apiKey",
  authHeader: "X-TYPESENSE-API-KEY",
  tags: ["open source", "self-host", "vector search", "typo tolerance", "fast"],
  docsUrl: "https://typesense.org/docs",
  websiteUrl: "https://typesense.org",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/collections/{collection}/documents/search",
      description: "Search a Typesense collection.",
      codeExamples: generateCodeExamples({
        url: "https://YOUR_CLUSTER.a1.typesense.net/collections/books/documents/search?q=harry+potter&query_by=title",
        authType: "apiKey",
        authHeader: "X-TYPESENSE-API-KEY",
      }),
      responsePreview: `{
  "found": 7,
  "hits": [{
    "document": {
      "id": "1",
      "title": "Harry Potter and the Sorcerer's Stone",
      "author": "J.K. Rowling",
      "year": 1997
    },
    "highlight": { "title": { "snippet": "<mark>Harry Potter</mark> and the Sorcerer's Stone" } }
  }]
}`,
    },
  ],
};

// ── Analytics ────────────────────────────────────────────────

const posthog: Api = {
  slug: "posthog",
  name: "PostHog",
  tagline: "Open source product analytics and feature flags",
  description: "PostHog provides product analytics, session replays, feature flags, A/B testing, and surveys — self-hostable or cloud-hosted.",
  category: "analytics",
  baseUrl: "https://app.posthog.com",
  authType: "bearer",
  tags: ["product analytics", "feature flags", "session replay", "A/B testing", "open source"],
  docsUrl: "https://posthog.com/docs/api",
  websiteUrl: "https://posthog.com",
  featured: true,
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/capture",
      description: "Capture a custom event from your application.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://app.posthog.com/capture",
        authType: "bearer",
        body: {
          api_key: "phc_yourkey",
          event: "user_signed_up",
          distinct_id: "user_123",
          properties: { plan: "pro", source: "landing_page" },
        },
      }),
      responsePreview: `{
  "status": 1
}`,
    },
    {
      method: "GET",
      path: "/api/projects/{project_id}/events",
      description: "Query events from your PostHog project.",
      codeExamples: generateCodeExamples({
        url: "https://app.posthog.com/api/projects/12345/events?event=user_signed_up&limit=5",
        authType: "bearer",
      }),
      responsePreview: `{
  "results": [{
    "id": "abc123",
    "event": "user_signed_up",
    "distinct_id": "user_123",
    "properties": { "plan": "pro" },
    "timestamp": "2024-05-01T10:00:00Z"
  }],
  "next": "https://app.posthog.com/api/..."
}`,
    },
  ],
};

const googleAnalytics: Api = {
  slug: "google-analytics",
  name: "Google Analytics",
  tagline: "Web and app analytics at scale",
  description: "The Google Analytics Data API gives access to report data from GA4 properties — sessions, users, events, conversions, and custom dimensions.",
  category: "analytics",
  baseUrl: "https://analyticsdata.googleapis.com/v1beta",
  authType: "bearer",
  tags: ["GA4", "pageviews", "events", "conversions", "Google"],
  docsUrl: "https://developers.google.com/analytics/devguides/reporting/data/v1",
  websiteUrl: "https://analytics.google.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/properties/{propertyId}:runReport",
      description: "Run a custom report on your GA4 property.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://analyticsdata.googleapis.com/v1beta/properties/YOUR_PROPERTY_ID:runReport",
        authType: "bearer",
        body: {
          dimensions: [{ name: "country" }],
          metrics: [{ name: "sessions" }],
          dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        },
      }),
      responsePreview: `{
  "rows": [
    { "dimensionValues": [{ "value": "United States" }], "metricValues": [{ "value": "12430" }] },
    { "dimensionValues": [{ "value": "United Kingdom" }], "metricValues": [{ "value": "4210" }] }
  ],
  "rowCount": 45,
  "metadata": { "currencyCode": "USD" }
}`,
    },
  ],
};

const plausible: Api = {
  slug: "plausible",
  name: "Plausible",
  tagline: "Privacy-first, lightweight web analytics",
  description: "Plausible is a GDPR-compliant web analytics tool with no cookies, no personal data collection, and a clean API for stats.",
  category: "analytics",
  baseUrl: "https://plausible.io/api/v1",
  authType: "bearer",
  tags: ["privacy-first", "GDPR", "no cookies", "lightweight", "open source"],
  docsUrl: "https://plausible.io/docs/stats-api",
  websiteUrl: "https://plausible.io",
  endpoints: [
    {
      method: "GET",
      path: "/stats/aggregate",
      description: "Get aggregate stats for a site over a time period.",
      codeExamples: generateCodeExamples({
        url: "https://plausible.io/api/v1/stats/aggregate?site_id=yoursite.com&period=30d&metrics=visitors,pageviews,bounce_rate",
        authType: "bearer",
      }),
      responsePreview: `{
  "results": {
    "visitors": { "value": 14230 },
    "pageviews": { "value": 38140 },
    "bounce_rate": { "value": 52.4 }
  }
}`,
    },
  ],
};

const mixpanel: Api = {
  slug: "mixpanel",
  name: "Mixpanel",
  tagline: "Event-based product analytics for mobile and web",
  description: "Mixpanel tracks user interactions and lets you analyze funnels, retention, cohorts, and custom events across platforms.",
  category: "analytics",
  baseUrl: "https://mixpanel.com/api/2.0",
  authType: "bearer",
  tags: ["funnels", "retention", "cohorts", "events", "mobile"],
  docsUrl: "https://developer.mixpanel.com/reference",
  websiteUrl: "https://mixpanel.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/track",
      description: "Track a user event in Mixpanel.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://mixpanel.com/api/2.0/track",
        authType: "bearer",
        body: {
          data: btoa(JSON.stringify([{
            event: "Sign Up",
            properties: { distinct_id: "user_123", token: "YOUR_TOKEN", plan: "pro" }
          }])),
        },
      }),
      responsePreview: `1`,
    },
  ],
};

// ── Communication ────────────────────────────────────────────

const resend: Api = {
  slug: "resend",
  name: "Resend",
  tagline: "Email API built for developers",
  description: "Resend is the easiest way to send transactional emails from your app using React Email templates or plain HTML.",
  category: "communication",
  baseUrl: "https://api.resend.com",
  authType: "bearer",
  tags: ["email", "React Email", "transactional", "developer-first", "webhooks"],
  docsUrl: "https://resend.com/docs",
  websiteUrl: "https://resend.com",
  featured: true,
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/emails",
      description: "Send a transactional email.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.resend.com/emails",
        authType: "bearer",
        body: {
          from: "Acme <onboarding@resend.dev>",
          to: ["user@example.com"],
          subject: "Welcome to Acme!",
          html: "<p>Thanks for signing up!</p>",
        },
      }),
      responsePreview: `{
  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794"
}`,
    },
    {
      method: "GET",
      path: "/emails/{id}",
      description: "Get the status and details of a sent email.",
      codeExamples: generateCodeExamples({
        url: "https://api.resend.com/emails/49a3999c-0ce1-4ea6-ab68-afcd6dc2e794",
        authType: "bearer",
      }),
      responsePreview: `{
  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794",
  "from": "Acme <onboarding@resend.dev>",
  "to": ["user@example.com"],
  "subject": "Welcome to Acme!",
  "created_at": "2024-05-01T10:00:00.000Z",
  "last_event": "delivered"
}`,
    },
  ],
};

const sendgrid: Api = {
  slug: "sendgrid",
  name: "SendGrid",
  tagline: "Transactional and marketing email at scale",
  description: "Send transactional emails reliably, manage marketing campaigns, and track opens, clicks, and bounces in real time.",
  category: "communication",
  baseUrl: "https://api.sendgrid.com/v3",
  authType: "bearer",
  tags: ["email", "SMTP", "templates", "analytics", "campaigns"],
  docsUrl: "https://docs.sendgrid.com",
  websiteUrl: "https://sendgrid.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/mail/send",
      description: "Send a transactional email.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.sendgrid.com/v3/mail/send",
        authType: "bearer",
        body: {
          personalizations: [{ to: [{ email: "user@example.com" }] }],
          from: { email: "sender@yourdomain.com" },
          subject: "Hello!",
          content: [{ type: "text/plain", value: "Test email" }],
        },
      }),
      responsePreview: `HTTP 202 Accepted

(No body — check the X-Message-Id header for tracking)

X-Message-Id: abc123xyz`,
    },
  ],
};

const twilio: Api = {
  slug: "twilio",
  name: "Twilio",
  tagline: "SMS, voice calls, and WhatsApp messaging",
  description: "Programmatically send SMS, make and receive phone calls, and build WhatsApp integrations with one unified API.",
  category: "communication",
  baseUrl: "https://api.twilio.com/2010-04-01",
  authType: "bearer",
  tags: ["SMS", "voice", "WhatsApp", "phone numbers", "verify"],
  docsUrl: "https://www.twilio.com/docs",
  websiteUrl: "https://twilio.com",
  featured: true,
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/Accounts/{AccountSid}/Messages.json",
      description: "Send an SMS message to a phone number.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json",
        authType: "bearer",
        body: { From: "+15551234567", To: "+15557654321", Body: "Hello from Twilio!" },
      }),
      responsePreview: `{
  "sid": "SM123abc",
  "status": "queued",
  "from": "+15551234567",
  "to": "+15557654321",
  "body": "Hello from Twilio!",
  "price": "-0.0079",
  "date_created": "2024-01-15T12:00:00Z"
}`,
    },
  ],
};

const mailgun: Api = {
  slug: "mailgun",
  name: "Mailgun",
  tagline: "Email API for developers and high-volume senders",
  description: "Send, receive, and track emails with Mailgun's reliable API. Supports SMTP, webhooks, email validation, and mailing lists.",
  category: "communication",
  baseUrl: "https://api.mailgun.net/v3",
  authType: "bearer",
  tags: ["email", "SMTP", "validation", "mailing lists", "tracking"],
  docsUrl: "https://documentation.mailgun.com",
  websiteUrl: "https://mailgun.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/{domain}/messages",
      description: "Send an email via Mailgun.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.mailgun.net/v3/YOUR_DOMAIN/messages",
        authType: "bearer",
        body: {
          from: "Excited User <mailgun@YOUR_DOMAIN>",
          to: ["user@example.com"],
          subject: "Hello!",
          text: "Testing some Mailgun awesomeness!",
        },
      }),
      responsePreview: `{
  "id": "<20240501100000.1234567890@YOUR_DOMAIN>",
  "message": "Queued. Thank you."
}`,
    },
  ],
};

// ── Maps & Location ──────────────────────────────────────────

const googlemaps: Api = {
  slug: "google-maps",
  name: "Google Maps",
  tagline: "Geocoding, routing, and Places data at scale",
  description: "Embed maps, geocode addresses, calculate routes, and search for places using Google's world-class location platform.",
  category: "maps",
  baseUrl: "https://maps.googleapis.com/maps/api",
  authType: "apiKey",
  authQuery: "key",
  tags: ["geocoding", "directions", "places", "distance matrix", "embed"],
  docsUrl: "https://developers.google.com/maps",
  websiteUrl: "https://maps.google.com",
  featured: true,
  endpoints: [
    {
      method: "GET",
      path: "/geocode/json",
      description: "Convert an address to latitude/longitude coordinates.",
      codeExamples: generateCodeExamples({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Pkwy",
        authType: "apiKey",
        authQuery: "key",
      }),
      responsePreview: `{
  "status": "OK",
  "results": [{
    "formatted_address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
    "geometry": {
      "location": { "lat": 37.4224764, "lng": -122.0842499 }
    }
  }]
}`,
    },
  ],
};

const mapbox: Api = {
  slug: "mapbox",
  name: "Mapbox",
  tagline: "Custom maps, navigation, and search",
  description: "Build custom map styles, get turn-by-turn navigation, search for places, and process geospatial data at scale.",
  category: "maps",
  baseUrl: "https://api.mapbox.com",
  authType: "apiKey",
  authQuery: "access_token",
  tags: ["custom maps", "navigation", "search", "GL JS", "vector tiles"],
  docsUrl: "https://docs.mapbox.com",
  websiteUrl: "https://mapbox.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/geocoding/v5/mapbox.places/{query}.json",
      description: "Forward geocode a search query to coordinates.",
      codeExamples: generateCodeExamples({
        url: "https://api.mapbox.com/geocoding/v5/mapbox.places/Brooklyn.json",
        authType: "apiKey",
        authQuery: "access_token",
      }),
      responsePreview: `{
  "type": "FeatureCollection",
  "features": [{
    "place_name": "Brooklyn, New York, United States",
    "center": [-73.9442, 40.6782],
    "geometry": { "type": "Point", "coordinates": [-73.9442, 40.6782] }
  }]
}`,
    },
  ],
};

const nominatim: Api = {
  slug: "nominatim",
  name: "Nominatim",
  tagline: "Free geocoding powered by OpenStreetMap",
  description: "Nominatim is OpenStreetMap's free geocoding API — convert addresses to coordinates and reverse-geocode coordinates to addresses.",
  category: "maps",
  baseUrl: "https://nominatim.openstreetmap.org",
  authType: "none",
  tags: ["geocoding", "reverse geocoding", "OpenStreetMap", "free", "open source"],
  docsUrl: "https://nominatim.org/release-docs/develop/api/Overview",
  websiteUrl: "https://nominatim.openstreetmap.org",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/search",
      description: "Search for locations by name or address.",
      codeExamples: generateCodeExamples({
        url: "https://nominatim.openstreetmap.org/search?q=Eiffel+Tower&format=json&limit=1",
        authType: "none",
      }),
      responsePreview: `[
  {
    "place_id": 308390637,
    "display_name": "Tour Eiffel, Avenue Anatole France, Paris, Île-de-France, France",
    "lat": "48.8583701",
    "lon": "2.2922926",
    "type": "tourism",
    "importance": 0.878
  }
]`,
    },
  ],
};

const radar: Api = {
  slug: "radar",
  name: "Radar",
  tagline: "Geofencing, geocoding, and location tracking",
  description: "Radar is a location platform for geofencing, trip tracking, geocoding, and address verification with a simple API.",
  category: "maps",
  baseUrl: "https://api.radar.io/v1",
  authType: "apiKey",
  authHeader: "Authorization",
  tags: ["geofencing", "geocoding", "trip tracking", "address verification"],
  docsUrl: "https://radar.com/documentation/api",
  websiteUrl: "https://radar.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/geocode/forward",
      description: "Forward geocode an address to coordinates.",
      codeExamples: generateCodeExamples({
        url: "https://api.radar.io/v1/geocode/forward?query=20+Jay+St+Brooklyn+NY",
        authType: "apiKey",
        authHeader: "Authorization",
      }),
      responsePreview: `{
  "addresses": [{
    "latitude": 40.7034,
    "longitude": -73.9875,
    "formattedAddress": "20 Jay St, Brooklyn, NY 11201",
    "city": "Brooklyn",
    "state": "NY",
    "country": "US",
    "confidence": "exact"
  }]
}`,
    },
  ],
};

// ── Weather ───────────────────────────────────────────────────

const openweather: Api = {
  slug: "openweathermap",
  name: "OpenWeatherMap",
  tagline: "Current weather, forecasts, and history",
  description: "Access weather data for any location — current conditions, 5-day forecasts, historical data, and UV index for 200,000+ cities.",
  category: "weather",
  baseUrl: "https://api.openweathermap.org/data/2.5",
  authType: "apiKey",
  authQuery: "appid",
  tags: ["forecast", "current", "historical", "UV", "global"],
  docsUrl: "https://openweathermap.org/api",
  websiteUrl: "https://openweathermap.org",
  featured: true,
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/weather",
      description: "Get current weather data for a city.",
      codeExamples: generateCodeExamples({
        url: "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric",
        authType: "apiKey",
        authQuery: "appid",
      }),
      responsePreview: `{
  "name": "London",
  "main": {
    "temp": 14.2,
    "feels_like": 13.1,
    "humidity": 72
  },
  "weather": [{ "main": "Clouds", "description": "overcast clouds" }],
  "wind": { "speed": 4.1 }
}`,
    },
    {
      method: "GET",
      path: "/forecast",
      description: "Get a 5-day / 3-hour step forecast.",
      codeExamples: generateCodeExamples({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric",
        authType: "apiKey",
        authQuery: "appid",
      }),
      responsePreview: `{
  "list": [
    { "dt": 1718100000, "main": { "temp": 14.2 }, "weather": [{ "main": "Rain" }] },
    { "dt": 1718110800, "main": { "temp": 13.8 }, "weather": [{ "main": "Clouds" }] }
  ],
  "city": { "name": "London" }
}`,
    },
  ],
};

const weatherapi: Api = {
  slug: "weatherapi",
  name: "WeatherAPI",
  tagline: "Hyperlocal weather with minute-by-minute rain",
  description: "Real-time and forecast weather data with astronomy, sports, and air quality. 14-day forecasts with hourly breakdowns.",
  category: "weather",
  baseUrl: "https://api.weatherapi.com/v1",
  authType: "apiKey",
  authQuery: "key",
  tags: ["realtime", "forecast", "astronomy", "air quality", "alerts"],
  docsUrl: "https://www.weatherapi.com/docs",
  websiteUrl: "https://www.weatherapi.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/current.json",
      description: "Get real-time weather for any location.",
      codeExamples: generateCodeExamples({
        url: "https://api.weatherapi.com/v1/current.json?q=New+York",
        authType: "apiKey",
        authQuery: "key",
      }),
      responsePreview: `{
  "location": { "name": "New York", "country": "USA" },
  "current": {
    "temp_c": 22.1,
    "feelslike_c": 21.4,
    "humidity": 60,
    "condition": { "text": "Partly cloudy" }
  }
}`,
    },
  ],
};

// ── Finance ───────────────────────────────────────────────────

const coingecko: Api = {
  slug: "coingecko",
  name: "CoinGecko",
  tagline: "Crypto price data for 10,000+ coins",
  description: "Free access to real-time and historical cryptocurrency market data, including prices, volume, and market cap.",
  category: "finance",
  baseUrl: "https://api.coingecko.com/api/v3",
  authType: "none",
  tags: ["crypto", "prices", "market cap", "DeFi", "historical"],
  docsUrl: "https://docs.coingecko.com",
  websiteUrl: "https://coingecko.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/simple/price",
      description: "Get current price of any cryptocurrency.",
      codeExamples: generateCodeExamples({
        url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",
        authType: "none",
      }),
      responsePreview: `{
  "bitcoin": { "usd": 67240.15 },
  "ethereum": { "usd": 3512.40 }
}`,
    },
  ],
};

const alphavantage: Api = {
  slug: "alpha-vantage",
  name: "Alpha Vantage",
  tagline: "Stocks, forex, crypto, and economic indicators",
  description: "Free stock market data API with 20+ years of historical data, real-time quotes, technical indicators, and FX rates.",
  category: "finance",
  baseUrl: "https://www.alphavantage.co/query",
  authType: "apiKey",
  authQuery: "apikey",
  tags: ["stocks", "forex", "technical indicators", "historical", "ETF"],
  docsUrl: "https://www.alphavantage.co/documentation",
  websiteUrl: "https://www.alphavantage.co",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "?function=GLOBAL_QUOTE",
      description: "Get the latest price and volume for a stock.",
      codeExamples: generateCodeExamples({
        url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL",
        authType: "apiKey",
        authQuery: "apikey",
      }),
      responsePreview: `{
  "Global Quote": {
    "01. symbol": "AAPL",
    "05. price": "189.30",
    "06. volume": "52431621",
    "10. change percent": "+1.2300%"
  }
}`,
    },
  ],
};

const finnhub: Api = {
  slug: "finnhub",
  name: "Finnhub",
  tagline: "Real-time stocks, forex, and market news",
  description: "Access real-time stock quotes, fundamental data, earnings calendars, company news, and alternative data for 50,000+ securities.",
  category: "finance",
  baseUrl: "https://finnhub.io/api/v1",
  authType: "apiKey",
  authQuery: "token",
  tags: ["stocks", "earnings", "market news", "fundamental data", "crypto"],
  docsUrl: "https://finnhub.io/docs/api",
  websiteUrl: "https://finnhub.io",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/quote",
      description: "Get real-time quote data for a stock symbol.",
      codeExamples: generateCodeExamples({
        url: "https://finnhub.io/api/v1/quote?symbol=AAPL",
        authType: "apiKey",
        authQuery: "token",
      }),
      responsePreview: `{
  "c": 189.30,
  "d": 2.15,
  "dp": 1.15,
  "h": 190.12,
  "l": 187.54,
  "o": 187.60,
  "pc": 187.15,
  "t": 1714564800
}`,
    },
    {
      method: "GET",
      path: "/company-news",
      description: "Get latest news articles for a company.",
      codeExamples: generateCodeExamples({
        url: "https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2024-05-01&to=2024-05-07",
        authType: "apiKey",
        authQuery: "token",
      }),
      responsePreview: `[
  {
    "category": "company news",
    "headline": "Apple Reports Record Q2 Earnings",
    "source": "Reuters",
    "summary": "Apple Inc. reported quarterly earnings that exceeded analyst expectations...",
    "datetime": 1714600000,
    "url": "https://reuters.com/..."
  }
]`,
    },
  ],
};

// ── DevOps ───────────────────────────────────────────────────

const github: Api = {
  slug: "github",
  name: "GitHub",
  tagline: "Repos, issues, PRs, Actions, and code search",
  description: "The GitHub REST API lets you interact with repositories, users, organizations, code, pull requests, issues, and GitHub Actions.",
  category: "devops",
  baseUrl: "https://api.github.com",
  authType: "bearer",
  extraHeaders: { "Accept": "application/vnd.github+json" },
  tags: ["repos", "PRs", "issues", "actions", "code search"],
  docsUrl: "https://docs.github.com/rest",
  websiteUrl: "https://github.com",
  featured: true,
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/repos/{owner}/{repo}",
      description: "Get metadata for a GitHub repository.",
      codeExamples: generateCodeExamples({
        url: "https://api.github.com/repos/vercel/next.js",
        authType: "bearer",
        extraHeaders: { "Accept": "application/vnd.github+json" },
      }),
      responsePreview: `{
  "id": 123456,
  "name": "next.js",
  "full_name": "vercel/next.js",
  "description": "The React Framework for the Web",
  "stargazers_count": 120000,
  "forks_count": 25400,
  "open_issues_count": 2100
}`,
    },
    {
      method: "GET",
      path: "/search/repositories",
      description: "Search for repositories by keyword.",
      codeExamples: generateCodeExamples({
        url: "https://api.github.com/search/repositories?q=react&sort=stars",
        authType: "bearer",
        extraHeaders: { "Accept": "application/vnd.github+json" },
      }),
      responsePreview: `{
  "total_count": 412000,
  "items": [
    { "full_name": "facebook/react", "stargazers_count": 219000 }
  ]
}`,
    },
  ],
};

const vercel: Api = {
  slug: "vercel",
  name: "Vercel",
  tagline: "Manage deployments, projects, and domains",
  description: "The Vercel REST API lets you manage projects, trigger deployments, configure domains, and access deployment logs programmatically.",
  category: "devops",
  baseUrl: "https://api.vercel.com",
  authType: "bearer",
  tags: ["deployments", "projects", "domains", "edge functions", "CI/CD"],
  docsUrl: "https://vercel.com/docs/rest-api",
  websiteUrl: "https://vercel.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/v9/projects",
      description: "List all projects in your Vercel account.",
      codeExamples: generateCodeExamples({
        url: "https://api.vercel.com/v9/projects?limit=10",
        authType: "bearer",
      }),
      responsePreview: `{
  "projects": [{
    "id": "prj_abc123",
    "name": "my-nextjs-app",
    "framework": "nextjs",
    "latestDeployments": [{
      "url": "my-nextjs-app.vercel.app",
      "state": "READY",
      "createdAt": 1714000000000
    }]
  }]
}`,
    },
    {
      method: "GET",
      path: "/v6/deployments",
      description: "List recent deployments across your account.",
      codeExamples: generateCodeExamples({
        url: "https://api.vercel.com/v6/deployments?limit=5",
        authType: "bearer",
      }),
      responsePreview: `{
  "deployments": [{
    "uid": "dpl_abc123",
    "name": "my-nextjs-app",
    "url": "my-nextjs-app-git-main.vercel.app",
    "state": "READY",
    "createdAt": 1714000000000,
    "target": "production"
  }]
}`,
    },
  ],
};

const netlify: Api = {
  slug: "netlify",
  name: "Netlify",
  tagline: "Automate deployments, builds, and sites",
  description: "The Netlify API lets you manage sites, trigger builds, set environment variables, manage forms, and configure deploy contexts.",
  category: "devops",
  baseUrl: "https://api.netlify.com/api/v1",
  authType: "bearer",
  tags: ["deployments", "sites", "builds", "forms", "edge functions"],
  docsUrl: "https://open-api.netlify.com",
  websiteUrl: "https://netlify.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/sites",
      description: "List all sites in your Netlify account.",
      codeExamples: generateCodeExamples({
        url: "https://api.netlify.com/api/v1/sites",
        authType: "bearer",
      }),
      responsePreview: `[
  {
    "id": "abc123def456",
    "name": "my-site",
    "url": "https://my-site.netlify.app",
    "state": "current",
    "published_deploy": {
      "id": "deploy_abc",
      "state": "ready",
      "created_at": "2024-05-01T10:00:00Z"
    }
  }
]`,
    },
  ],
};

const dockerHub: Api = {
  slug: "docker-hub",
  name: "Docker Hub",
  tagline: "Pull image metadata and repository details",
  description: "The Docker Hub API provides access to image metadata, tags, repository information, and organization management.",
  category: "devops",
  baseUrl: "https://hub.docker.com/v2",
  authType: "bearer",
  tags: ["containers", "images", "tags", "repositories", "Docker"],
  docsUrl: "https://docs.docker.com/docker-hub/api/latest",
  websiteUrl: "https://hub.docker.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/repositories/{namespace}/{name}/",
      description: "Get details about a Docker Hub repository.",
      codeExamples: generateCodeExamples({
        url: "https://hub.docker.com/v2/repositories/library/node/",
        authType: "bearer",
      }),
      responsePreview: `{
  "name": "node",
  "namespace": "library",
  "description": "Node.js is a JavaScript-based platform for server-side and networking applications.",
  "pull_count": 12400000000,
  "star_count": 14000,
  "is_official": true
}`,
    },
    {
      method: "GET",
      path: "/repositories/{namespace}/{name}/tags",
      description: "List all available tags for a Docker image.",
      codeExamples: generateCodeExamples({
        url: "https://hub.docker.com/v2/repositories/library/node/tags?page_size=5",
        authType: "bearer",
      }),
      responsePreview: `{
  "count": 842,
  "results": [
    { "name": "22-alpine", "full_size": 40123456, "last_updated": "2024-05-01T10:00:00Z" },
    { "name": "lts", "full_size": 395678901, "last_updated": "2024-05-01T10:00:00Z" }
  ]
}`,
    },
  ],
};

// ── Social ────────────────────────────────────────────────────

const reddit: Api = {
  slug: "reddit",
  name: "Reddit",
  tagline: "Subreddits, posts, comments, and search",
  description: "Access Reddit content — browse subreddits, read posts and comments, search across the platform, and authenticate users via OAuth.",
  category: "social",
  baseUrl: "https://www.reddit.com",
  authType: "oauth2",
  tags: ["subreddits", "posts", "comments", "OAuth", "search"],
  docsUrl: "https://www.reddit.com/dev/api",
  websiteUrl: "https://reddit.com",
  endpoints: [
    {
      method: "GET",
      path: "/r/{subreddit}/top.json",
      description: "Fetch top posts from a subreddit.",
      codeExamples: generateCodeExamples({
        url: "https://www.reddit.com/r/programming/top.json?limit=10",
        authType: "oauth2",
      }),
      responsePreview: `{
  "data": {
    "children": [{
      "data": {
        "title": "I built X in Y days",
        "score": 14200,
        "url": "https://example.com",
        "num_comments": 432
      }
    }]
  }
}`,
    },
  ],
};

// ── Entertainment ─────────────────────────────────────────────

const spotify: Api = {
  slug: "spotify",
  name: "Spotify",
  tagline: "Tracks, artists, playlists, and playback",
  description: "Search for songs, albums, and artists; manage playlists; get audio features; and control playback on connected devices.",
  category: "entertainment",
  baseUrl: "https://api.spotify.com/v1",
  authType: "oauth2",
  tags: ["music", "tracks", "playlists", "artists", "playback"],
  docsUrl: "https://developer.spotify.com/documentation/web-api",
  websiteUrl: "https://spotify.com",
  featured: true,
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/search",
      description: "Search for tracks, albums, artists, or playlists.",
      codeExamples: generateCodeExamples({
        url: "https://api.spotify.com/v1/search?q=radiohead&type=artist&limit=5",
        authType: "oauth2",
      }),
      responsePreview: `{
  "artists": {
    "items": [{
      "name": "Radiohead",
      "popularity": 82,
      "followers": { "total": 8200000 },
      "genres": ["alternative rock", "art rock"]
    }]
  }
}`,
    },
    {
      method: "GET",
      path: "/audio-features/{id}",
      description: "Get audio feature analysis for a track.",
      codeExamples: generateCodeExamples({
        url: "https://api.spotify.com/v1/audio-features/4uLU6hMCjMI75M1A2tKUQC",
        authType: "oauth2",
      }),
      responsePreview: `{
  "danceability": 0.421,
  "energy": 0.812,
  "key": 5,
  "loudness": -6.34,
  "tempo": 148.002,
  "valence": 0.198,
  "duration_ms": 254387
}`,
    },
  ],
};

const tmdb: Api = {
  slug: "tmdb",
  name: "TMDB",
  tagline: "Movies, TV shows, and cast data",
  description: "The Movie Database (TMDB) provides metadata for millions of movies and TV shows — cast, ratings, trailers, posters, and more.",
  category: "entertainment",
  baseUrl: "https://api.themoviedb.org/3",
  authType: "bearer",
  tags: ["movies", "TV shows", "cast", "ratings", "images"],
  docsUrl: "https://developer.themoviedb.org/docs",
  websiteUrl: "https://themoviedb.org",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/movie/popular",
      description: "Fetch a list of currently popular movies.",
      codeExamples: generateCodeExamples({
        url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        authType: "bearer",
      }),
      responsePreview: `{
  "page": 1,
  "results": [{
    "title": "Dune: Part Two",
    "vote_average": 8.3,
    "popularity": 1420.5,
    "release_date": "2024-03-01",
    "overview": "Follow the mythic journey of Paul Atreides..."
  }]
}`,
    },
  ],
};

const youtube: Api = {
  slug: "youtube",
  name: "YouTube Data API",
  tagline: "Search videos, channels, and playlists",
  description: "Access YouTube's catalog to search for videos, retrieve channel metadata, manage playlists, and get video statistics.",
  category: "entertainment",
  baseUrl: "https://www.googleapis.com/youtube/v3",
  authType: "apiKey",
  authQuery: "key",
  tags: ["videos", "channels", "playlists", "search", "statistics"],
  docsUrl: "https://developers.google.com/youtube/v3",
  websiteUrl: "https://developers.google.com/youtube",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/search",
      description: "Search YouTube for videos, channels, or playlists.",
      codeExamples: generateCodeExamples({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=Next.js+tutorial&type=video&maxResults=5",
        authType: "apiKey",
        authQuery: "key",
      }),
      responsePreview: `{
  "kind": "youtube#searchListResponse",
  "pageInfo": { "totalResults": 12400 },
  "items": [{
    "id": { "kind": "youtube#video", "videoId": "dQw4w9WgXcQ" },
    "snippet": {
      "title": "Next.js 14 Full Course",
      "channelTitle": "Fireship",
      "publishedAt": "2024-01-15T12:00:00Z"
    }
  }]
}`,
    },
    {
      method: "GET",
      path: "/videos",
      description: "Get statistics and details for specific video IDs.",
      codeExamples: generateCodeExamples({
        url: "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=dQw4w9WgXcQ",
        authType: "apiKey",
        authQuery: "key",
      }),
      responsePreview: `{
  "items": [{
    "id": "dQw4w9WgXcQ",
    "snippet": { "title": "Rick Astley - Never Gonna Give You Up" },
    "statistics": {
      "viewCount": "1400000000",
      "likeCount": "15000000",
      "commentCount": "2800000"
    }
  }]
}`,
    },
  ],
};

const googleBooks: Api = {
  slug: "google-books",
  name: "Google Books API",
  tagline: "Search millions of books and preview content",
  description: "Access Google Books to search volumes by title, author, or ISBN, retrieve metadata, and get preview links for books.",
  category: "entertainment",
  baseUrl: "https://www.googleapis.com/books/v1",
  authType: "apiKey",
  authQuery: "key",
  tags: ["books", "ISBN", "preview", "authors", "metadata"],
  docsUrl: "https://developers.google.com/books",
  websiteUrl: "https://books.google.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/volumes",
      description: "Search for books by query, title, author, or ISBN.",
      codeExamples: generateCodeExamples({
        url: "https://www.googleapis.com/books/v1/volumes?q=inauthor:tolkien&maxResults=5",
        authType: "apiKey",
        authQuery: "key",
      }),
      responsePreview: `{
  "totalItems": 142,
  "items": [{
    "id": "abc123",
    "volumeInfo": {
      "title": "The Lord of the Rings",
      "authors": ["J.R.R. Tolkien"],
      "publishedDate": "1954",
      "pageCount": 1178,
      "imageLinks": { "thumbnail": "https://books.google.com/..." }
    }
  }]
}`,
    },
  ],
};

// ── News ───────────────────────────────────────────────────────

const newsapi: Api = {
  slug: "newsapi",
  name: "NewsAPI",
  tagline: "Breaking headlines from 150,000+ sources",
  description: "Search articles and headlines from 150,000+ news sources and blogs worldwide, filterable by keyword, category, and country.",
  category: "news",
  baseUrl: "https://newsapi.org/v2",
  authType: "apiKey",
  authQuery: "apiKey",
  tags: ["headlines", "search", "sources", "categories", "global"],
  docsUrl: "https://newsapi.org/docs",
  websiteUrl: "https://newsapi.org",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/top-headlines",
      description: "Get breaking news headlines for a country or category.",
      codeExamples: generateCodeExamples({
        url: "https://newsapi.org/v2/top-headlines?country=us&category=technology",
        authType: "apiKey",
        authQuery: "apiKey",
      }),
      responsePreview: `{
  "totalResults": 38,
  "articles": [{
    "title": "Tech Giants Report Strong Q1 Earnings",
    "source": { "name": "Reuters" },
    "publishedAt": "2024-05-01T09:00:00Z",
    "url": "https://reuters.com/..."
  }]
}`,
    },
  ],
};

const gnews: Api = {
  slug: "gnews",
  name: "GNews",
  tagline: "Aggregated news from 60,000+ sources worldwide",
  description: "GNews aggregates articles from 60,000+ news sources in 70+ languages with keyword search, full-text access, and historical data.",
  category: "news",
  baseUrl: "https://gnews.io/api/v4",
  authType: "apiKey",
  authQuery: "apikey",
  tags: ["headlines", "full-text", "multilingual", "search", "global"],
  docsUrl: "https://gnews.io/docs",
  websiteUrl: "https://gnews.io",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/top-headlines",
      description: "Get the latest top headlines.",
      codeExamples: generateCodeExamples({
        url: "https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&max=5",
        authType: "apiKey",
        authQuery: "apikey",
      }),
      responsePreview: `{
  "totalArticles": 42000,
  "articles": [{
    "title": "New AI Model Breaks Benchmark Records",
    "description": "Researchers have unveiled a new AI model...",
    "url": "https://techcrunch.com/...",
    "source": { "name": "TechCrunch" },
    "publishedAt": "2024-05-01T09:00:00Z"
  }]
}`,
    },
  ],
};

const guardian: Api = {
  slug: "the-guardian",
  name: "The Guardian",
  tagline: "Full-text access to Guardian journalism",
  description: "Search and retrieve full-text content from The Guardian — articles, sections, contributors, and tags — going back to 1999.",
  category: "news",
  baseUrl: "https://content.guardianapis.com",
  authType: "apiKey",
  authQuery: "api-key",
  tags: ["articles", "full-text", "search", "sections", "tags"],
  docsUrl: "https://open-platform.theguardian.com/documentation",
  websiteUrl: "https://theguardian.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/search",
      description: "Search across all Guardian content.",
      codeExamples: generateCodeExamples({
        url: "https://content.guardianapis.com/search?q=climate+change&show-fields=bodyText",
        authType: "apiKey",
        authQuery: "api-key",
      }),
      responsePreview: `{
  "response": {
    "total": 12400,
    "results": [{
      "webTitle": "Climate crisis: scientists alarmed by ocean heat spike",
      "sectionName": "Environment",
      "webPublicationDate": "2024-04-30"
    }]
  }
}`,
    },
  ],
};

// ── Jobs ──────────────────────────────────────────────────────

const adzuna: Api = {
  slug: "adzuna",
  name: "Adzuna",
  tagline: "Job listings across 16 countries",
  description: "Search millions of job listings across the US, UK, Germany, Canada, and 12 other countries with salary estimates and company data.",
  category: "jobs",
  baseUrl: "https://api.adzuna.com/v1/api",
  authType: "apiKey",
  authQuery: "app_key",
  tags: ["jobs", "salary", "remote", "tech", "global"],
  docsUrl: "https://developer.adzuna.com",
  websiteUrl: "https://adzuna.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/jobs/{country}/search/{page}",
      description: "Search for job listings in a specific country.",
      codeExamples: generateCodeExamples({
        url: "https://api.adzuna.com/v1/api/jobs/us/search/1?results_per_page=5&what=software+engineer&where=new+york&app_id=YOUR_APP_ID",
        authType: "apiKey",
        authQuery: "app_key",
      }),
      responsePreview: `{
  "count": 4200,
  "results": [{
    "id": "4872592369",
    "title": "Senior Software Engineer",
    "company": { "display_name": "Acme Corp" },
    "location": { "display_name": "New York, NY" },
    "salary_min": 140000,
    "salary_max": 180000,
    "created": "2024-05-01T10:00:00Z"
  }]
}`,
    },
  ],
};

const arbeitnow: Api = {
  slug: "arbeitnow",
  name: "Arbeitnow",
  tagline: "Remote and European tech job board API",
  description: "Arbeitnow provides a free API with thousands of remote and EU-based tech job listings, no authentication required.",
  category: "jobs",
  baseUrl: "https://www.arbeitnow.com/api",
  authType: "none",
  tags: ["remote", "Europe", "tech jobs", "free", "no auth"],
  docsUrl: "https://arbeitnow.com/api",
  websiteUrl: "https://arbeitnow.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/job-board-api",
      description: "Get a paginated list of remote tech job listings.",
      codeExamples: generateCodeExamples({
        url: "https://www.arbeitnow.com/api/job-board-api?page=1",
        authType: "none",
      }),
      responsePreview: `{
  "data": [{
    "slug": "senior-fullstack-engineer-at-acme",
    "company_name": "Acme GmbH",
    "title": "Senior Full-Stack Engineer",
    "location": "Berlin / Remote",
    "remote": true,
    "tags": ["TypeScript", "React", "Node.js"],
    "created_at": 1714000000
  }],
  "links": { "next": "https://www.arbeitnow.com/api/job-board-api?page=2" }
}`,
    },
  ],
};

// ── Sports ────────────────────────────────────────────────────

const sportsdb: Api = {
  slug: "thesportsdb",
  name: "TheSportsDB",
  tagline: "Free sports data for leagues and teams worldwide",
  description: "Access free sports data covering football, basketball, baseball, and more — including teams, events, and results.",
  category: "sports",
  baseUrl: "https://www.thesportsdb.com/api/v1/json/3",
  authType: "none",
  tags: ["football", "basketball", "soccer", "teams", "free"],
  docsUrl: "https://www.thesportsdb.com/api.php",
  websiteUrl: "https://thesportsdb.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/searchteams.php",
      description: "Search for a sports team by name.",
      codeExamples: generateCodeExamples({
        url: "https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=Arsenal",
        authType: "none",
      }),
      responsePreview: `{
  "teams": [{
    "idTeam": "133604",
    "strTeam": "Arsenal",
    "strLeague": "English Premier League",
    "strCountry": "England",
    "intFormedYear": "1886"
  }]
}`,
    },
  ],
};

const apifootball: Api = {
  slug: "api-football",
  name: "API-Football",
  tagline: "Live scores, fixtures, and standings",
  description: "Real-time football data: live scores, fixtures, standings, player statistics, and odds across 1,000+ leagues.",
  category: "sports",
  baseUrl: "https://v3.football.api-sports.io",
  authType: "apiKey",
  authHeader: "x-apisports-key",
  tags: ["live scores", "fixtures", "standings", "statistics", "odds"],
  docsUrl: "https://www.api-football.com/documentation-v3",
  websiteUrl: "https://www.api-football.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/fixtures",
      description: "Get fixtures for a league and season.",
      codeExamples: generateCodeExamples({
        url: "https://v3.football.api-sports.io/fixtures?league=39&season=2023",
        authType: "apiKey",
        authHeader: "x-apisports-key",
      }),
      responsePreview: `{
  "results": 380,
  "response": [{
    "fixture": { "id": 867946, "date": "2023-08-11T19:00:00+00:00", "status": { "short": "FT" } },
    "teams": { "home": { "name": "Arsenal" }, "away": { "name": "Nottingham Forest" } },
    "goals": { "home": 2, "away": 1 }
  }]
}`,
    },
  ],
};

// ── Health ─────────────────────────────────────────────────────

const nutritionix: Api = {
  slug: "nutritionix",
  name: "Nutritionix",
  tagline: "Largest verified nutrition database",
  description: "Access nutrition facts for 800,000+ foods and restaurant menu items. Search by natural language like 'I ate two eggs and toast'.",
  category: "health",
  baseUrl: "https://trackapi.nutritionix.com/v2",
  authType: "apiKey",
  authHeader: "x-app-key",
  extraHeaders: { "x-app-id": "YOUR_APP_ID" },
  tags: ["nutrition", "calories", "food", "NLP", "restaurant"],
  docsUrl: "https://docx.syndigo.com/developer",
  websiteUrl: "https://nutritionix.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/natural/nutrients",
      description: "Get nutrition facts from natural language food input.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
        authType: "apiKey",
        authHeader: "x-app-key",
        extraHeaders: { "x-app-id": "YOUR_APP_ID" },
        body: { query: "2 eggs and a slice of whole wheat toast" },
      }),
      responsePreview: `{
  "foods": [
    { "food_name": "egg", "nf_calories": 143, "nf_protein": 12.6 },
    { "food_name": "whole wheat toast", "nf_calories": 81, "nf_protein": 3.4 }
  ]
}`,
    },
  ],
};

const openfda: Api = {
  slug: "openfda",
  name: "OpenFDA",
  tagline: "Drug labels, adverse events, and recalls",
  description: "Access FDA datasets including drug adverse events, device recalls, food enforcement actions, and drug labeling information.",
  category: "health",
  baseUrl: "https://api.fda.gov",
  authType: "none",
  tags: ["drugs", "adverse events", "recalls", "FDA", "public data"],
  docsUrl: "https://open.fda.gov/apis",
  websiteUrl: "https://open.fda.gov",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/drug/event.json",
      description: "Search for drug adverse event reports.",
      codeExamples: generateCodeExamples({
        url: "https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:aspirin&limit=5",
        authType: "none",
      }),
      responsePreview: `{
  "meta": { "total": 152430 },
  "results": [{
    "patient": {
      "reaction": [{ "reactionmeddrapt": "Gastrointestinal haemorrhage" }],
      "drug": [{ "medicinalproduct": "ASPIRIN", "drugindication": "PAIN" }]
    }
  }]
}`,
    },
  ],
};

// ── Developer ─────────────────────────────────────────────────

const pokeapi: Api = {
  slug: "pokeapi",
  name: "PokéAPI",
  tagline: "Complete Pokémon data — all 1,025 Pokémon",
  description: "A free RESTful API with data on every Pokémon, move, ability, type, and game mechanic from all generations.",
  category: "developer",
  baseUrl: "https://pokeapi.co/api/v2",
  authType: "none",
  tags: ["Pokémon", "games", "free", "REST", "educational"],
  docsUrl: "https://pokeapi.co/docs/v2",
  websiteUrl: "https://pokeapi.co",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/pokemon/{name}",
      description: "Get data for a specific Pokémon by name or ID.",
      codeExamples: generateCodeExamples({
        url: "https://pokeapi.co/api/v2/pokemon/pikachu",
        authType: "none",
      }),
      responsePreview: `{
  "name": "pikachu",
  "id": 25,
  "height": 4,
  "weight": 60,
  "base_experience": 112,
  "types": [{ "type": { "name": "electric" } }],
  "stats": [{ "stat": { "name": "speed" }, "base_stat": 90 }]
}`,
    },
  ],
};

const jsonplaceholder: Api = {
  slug: "jsonplaceholder",
  name: "JSONPlaceholder",
  tagline: "Fake REST API for testing and prototyping",
  description: "A free online REST API with predictable fake data — perfect for testing frontend code, prototyping, or teaching HTTP basics.",
  category: "developer",
  baseUrl: "https://jsonplaceholder.typicode.com",
  authType: "none",
  tags: ["testing", "mock", "REST", "free", "prototyping"],
  docsUrl: "https://jsonplaceholder.typicode.com",
  websiteUrl: "https://jsonplaceholder.typicode.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/posts",
      description: "Get a list of 100 fake posts.",
      codeExamples: generateCodeExamples({
        url: "https://jsonplaceholder.typicode.com/posts",
        authType: "none",
      }),
      responsePreview: `[
  {
    "id": 1,
    "userId": 1,
    "title": "sunt aut facere repellat provident...",
    "body": "quia et suscipit..."
  }
]`,
    },
    {
      method: "POST",
      path: "/posts",
      description: "Create a fake post (returns the created resource).",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        authType: "none",
        body: { title: "My Post", body: "Hello world", userId: 1 },
      }),
      responsePreview: `{
  "id": 101,
  "title": "My Post",
  "body": "Hello world",
  "userId": 1
}`,
    },
  ],
};

const qrserver: Api = {
  slug: "qrserver",
  name: "QR Server",
  tagline: "Generate QR codes via URL parameters",
  description: "A free, no-auth QR code generation and reading API — just construct the URL with your data and get back a PNG image.",
  category: "developer",
  baseUrl: "https://api.qrserver.com/v1",
  authType: "none",
  tags: ["QR codes", "image generation", "free", "no auth", "utility"],
  docsUrl: "https://goqr.me/api/doc/create-qr-code",
  websiteUrl: "https://goqr.me/api",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/create-qr-code/",
      description: "Generate a QR code image for any text or URL.",
      codeExamples: generateCodeExamples({
        url: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://github.com",
        authType: "none",
      }),
      responsePreview: `Returns a PNG image directly.

Example URL:
https://api.qrserver.com/v1/create-qr-code/
  ?size=200x200
  &data=https://github.com
  &format=png
  &color=000000
  &bgcolor=ffffff`,
    },
  ],
};

const ipapi: Api = {
  slug: "ipapi",
  name: "ipapi",
  tagline: "IP address geolocation with no auth required",
  description: "Look up geolocation, currency, timezone, and ISP information for any IP address — free tier with no API key needed.",
  category: "developer",
  baseUrl: "https://ipapi.co",
  authType: "none",
  tags: ["IP", "geolocation", "timezone", "currency", "free"],
  docsUrl: "https://ipapi.co/api",
  websiteUrl: "https://ipapi.co",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/{ip}/json/",
      description: "Get full geolocation data for an IP address.",
      codeExamples: generateCodeExamples({
        url: "https://ipapi.co/8.8.8.8/json/",
        authType: "none",
      }),
      responsePreview: `{
  "ip": "8.8.8.8",
  "city": "Mountain View",
  "region": "California",
  "country_code": "US",
  "country_name": "United States",
  "latitude": 37.4056,
  "longitude": -122.0775,
  "timezone": "America/Los_Angeles",
  "currency": "USD",
  "org": "AS15169 Google LLC"
}`,
    },
  ],
};

const ipinfo: Api = {
  slug: "ipinfo",
  name: "IPinfo",
  tagline: "Accurate IP geolocation, ASN, and VPN detection",
  description: "IPinfo provides highly accurate IP data including geolocation, ASN, carrier, privacy detection, and company information.",
  category: "developer",
  baseUrl: "https://ipinfo.io",
  authType: "bearer",
  tags: ["IP", "geolocation", "ASN", "VPN detection", "company"],
  docsUrl: "https://ipinfo.io/developers",
  websiteUrl: "https://ipinfo.io",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/{ip}/json",
      description: "Get full details for an IP address.",
      codeExamples: generateCodeExamples({
        url: "https://ipinfo.io/8.8.8.8/json",
        authType: "bearer",
      }),
      responsePreview: `{
  "ip": "8.8.8.8",
  "hostname": "dns.google",
  "city": "Mountain View",
  "region": "California",
  "country": "US",
  "loc": "37.4056,-122.0775",
  "org": "AS15169 Google LLC",
  "timezone": "America/Los_Angeles"
}`,
    },
  ],
};

const randomuser: Api = {
  slug: "randomuser",
  name: "Random User",
  tagline: "Randomized user data for prototyping",
  description: "Generate random user data — names, emails, addresses, avatars, and more — perfect for seeding databases or populating UIs.",
  category: "developer",
  baseUrl: "https://randomuser.me/api",
  authType: "none",
  tags: ["mock data", "avatars", "testing", "free", "no auth"],
  docsUrl: "https://randomuser.me/documentation",
  websiteUrl: "https://randomuser.me",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "Get random user profiles.",
      codeExamples: generateCodeExamples({
        url: "https://randomuser.me/api/?results=3&nat=us",
        authType: "none",
      }),
      responsePreview: `{
  "results": [{
    "name": { "first": "Jane", "last": "Doe" },
    "email": "jane.doe@example.com",
    "phone": "(555) 123-4567",
    "location": { "city": "Austin", "state": "Texas", "country": "United States" },
    "picture": { "thumbnail": "https://randomuser.me/api/portraits/thumb/women/42.jpg" }
  }]
}`,
    },
  ],
};

// ── E-commerce ────────────────────────────────────────────────

const shopify: Api = {
  slug: "shopify",
  name: "Shopify Admin",
  tagline: "Products, orders, and customers for your store",
  description: "Manage every aspect of a Shopify store — products, collections, inventory, orders, customers, and discounts — via REST or GraphQL.",
  category: "ecommerce",
  baseUrl: "https://{store}.myshopify.com/admin/api/2024-01",
  authType: "bearer",
  tags: ["products", "orders", "inventory", "customers", "GraphQL"],
  docsUrl: "https://shopify.dev/docs/api/admin-rest",
  websiteUrl: "https://shopify.com",
  endpoints: [
    {
      method: "GET",
      path: "/products.json",
      description: "List all products in the store.",
      codeExamples: generateCodeExamples({
        url: "https://your-store.myshopify.com/admin/api/2024-01/products.json?limit=10",
        authType: "bearer",
      }),
      responsePreview: `{
  "products": [{
    "id": 632910392,
    "title": "IPod Nano - 8GB",
    "status": "active",
    "variants": [{ "price": "199.00", "inventory_quantity": 10 }]
  }]
}`,
    },
  ],
};

// ── Security ──────────────────────────────────────────────────

const hibp: Api = {
  slug: "haveibeenpwned",
  name: "HaveIBeenPwned",
  tagline: "Check if emails or passwords appear in breaches",
  description: "Search billions of compromised credentials from hundreds of data breaches to check if an account or password has been exposed.",
  category: "security",
  baseUrl: "https://haveibeenpwned.com/api/v3",
  authType: "apiKey",
  authHeader: "hibp-api-key",
  tags: ["breaches", "passwords", "email", "data leak", "HIBP"],
  docsUrl: "https://haveibeenpwned.com/API/v3",
  websiteUrl: "https://haveibeenpwned.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/breachedaccount/{email}",
      description: "Check if an email appears in any known data breach.",
      codeExamples: generateCodeExamples({
        url: "https://haveibeenpwned.com/api/v3/breachedaccount/test@example.com",
        authType: "apiKey",
        authHeader: "hibp-api-key",
      }),
      responsePreview: `[
  {
    "Name": "Adobe",
    "Domain": "adobe.com",
    "BreachDate": "2013-10-04",
    "PwnCount": 152445165,
    "DataClasses": ["Email addresses", "Passwords", "Usernames"]
  }
]`,
    },
  ],
};

const virustotal: Api = {
  slug: "virustotal",
  name: "VirusTotal",
  tagline: "Scan URLs, files, and IPs against 70+ AV engines",
  description: "Analyze suspicious files, URLs, domains, and IP addresses through 70+ antivirus engines and threat intelligence services.",
  category: "security",
  baseUrl: "https://www.virustotal.com/api/v3",
  authType: "apiKey",
  authHeader: "x-apikey",
  tags: ["malware", "URLs", "threat intel", "antivirus", "IOC"],
  docsUrl: "https://docs.virustotal.com/reference",
  websiteUrl: "https://virustotal.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/domains/{domain}",
      description: "Get analysis and reputation for a domain.",
      codeExamples: generateCodeExamples({
        url: "https://www.virustotal.com/api/v3/domains/example.com",
        authType: "apiKey",
        authHeader: "x-apikey",
      }),
      responsePreview: `{
  "data": {
    "id": "example.com",
    "type": "domain",
    "attributes": {
      "reputation": 0,
      "last_analysis_stats": {
        "malicious": 0,
        "suspicious": 0,
        "clean": 68
      }
    }
  }
}`,
    },
  ],
};

// ── Government ────────────────────────────────────────────────

const nasa: Api = {
  slug: "nasa",
  name: "NASA",
  tagline: "Space imagery, asteroids, and planetary data",
  description: "Access NASA's open data: Astronomy Picture of the Day, Mars rover photos, near-Earth objects, and EPIC Earth imagery.",
  category: "government",
  baseUrl: "https://api.nasa.gov",
  authType: "apiKey",
  authQuery: "api_key",
  tags: ["space", "astronomy", "Mars", "asteroids", "free"],
  docsUrl: "https://api.nasa.gov",
  websiteUrl: "https://nasa.gov",
  featured: true,
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/planetary/apod",
      description: "Get the Astronomy Picture of the Day.",
      codeExamples: generateCodeExamples({
        url: "https://api.nasa.gov/planetary/apod",
        authType: "apiKey",
        authQuery: "api_key",
      }),
      responsePreview: `{
  "date": "2024-05-01",
  "title": "A Sky Full of Galaxies",
  "explanation": "Thousands of galaxies appear...",
  "url": "https://apod.nasa.gov/apod/image/...",
  "media_type": "image",
  "copyright": "NASA/ESA"
}`,
    },
    {
      method: "GET",
      path: "/neo/rest/v1/feed",
      description: "List near-Earth asteroids for a date range.",
      codeExamples: generateCodeExamples({
        url: "https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-05-01&end_date=2024-05-07",
        authType: "apiKey",
        authQuery: "api_key",
      }),
      responsePreview: `{
  "element_count": 42,
  "near_earth_objects": {
    "2024-05-01": [{
      "name": "2024 JL1",
      "estimated_diameter": { "kilometers": { "max": 0.214 } },
      "is_potentially_hazardous_asteroid": false
    }]
  }
}`,
    },
  ],
};

const openlibrary: Api = {
  slug: "open-library",
  name: "Open Library",
  tagline: "Metadata for 20+ million books",
  description: "The Internet Archive's Open Library provides bibliographic data for over 20 million books — searchable by title, author, ISBN, or subject.",
  category: "government",
  baseUrl: "https://openlibrary.org",
  authType: "none",
  tags: ["books", "bibliographic", "ISBN", "authors", "free"],
  docsUrl: "https://openlibrary.org/developers/api",
  websiteUrl: "https://openlibrary.org",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/search.json",
      description: "Search for books by title, author, or ISBN.",
      codeExamples: generateCodeExamples({
        url: "https://openlibrary.org/search.json?q=the+great+gatsby&limit=5",
        authType: "none",
      }),
      responsePreview: `{
  "numFound": 184,
  "docs": [{
    "title": "The Great Gatsby",
    "author_name": ["F. Scott Fitzgerald"],
    "first_publish_year": 1925,
    "isbn": ["9780743273565"]
  }]
}`,
    },
  ],
};

// ── AI & ML (continued) ──────────────────────────────────────

const mistral: Api = {
  slug: "mistral",
  name: "Mistral AI",
  tagline: "Fast, open-weight language models via API",
  description: "Mistral AI offers high-performance open-weight LLMs including Mistral 7B, Mixtral 8x7B, and Mistral Large — accessible via a clean OpenAI-compatible REST API.",
  category: "ai-ml",
  baseUrl: "https://api.mistral.ai/v1",
  authType: "bearer",
  tags: ["LLM", "open-weight", "chat", "embeddings", "fast"],
  docsUrl: "https://docs.mistral.ai",
  websiteUrl: "https://mistral.ai",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/chat/completions",
      description: "Generate a chat completion using Mistral models.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.mistral.ai/v1/chat/completions",
        authType: "bearer",
        body: { model: "mistral-large-latest", messages: [{ role: "user", content: "Explain transformers." }] },
      }),
      responsePreview: `{
  "id": "cmpl-abc123",
  "object": "chat.completion",
  "model": "mistral-large-latest",
  "choices": [{
    "message": { "role": "assistant", "content": "Transformers are neural network architectures..." },
    "finish_reason": "stop"
  }],
  "usage": { "prompt_tokens": 8, "completion_tokens": 42 }
}`,
    },
  ],
};

const elevenlabs: Api = {
  slug: "elevenlabs",
  name: "ElevenLabs",
  tagline: "Hyper-realistic AI voice synthesis",
  description: "Convert text to speech with hyper-realistic AI voices, clone voices from audio samples, and build audio experiences with ElevenLabs' voice API.",
  category: "ai-ml",
  baseUrl: "https://api.elevenlabs.io/v1",
  authType: "apiKey",
  authHeader: "xi-api-key",
  tags: ["text-to-speech", "voice cloning", "audio", "TTS", "synthesis"],
  docsUrl: "https://elevenlabs.io/docs",
  websiteUrl: "https://elevenlabs.io",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/text-to-speech/{voice_id}",
      description: "Convert text to speech using a specific voice.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
        authType: "apiKey",
        authHeader: "xi-api-key",
        body: { text: "Hello, world!", model_id: "eleven_monolingual_v1" },
      }),
      responsePreview: `// Returns raw audio bytes (audio/mpeg)
// Save as .mp3 or stream directly to audio element`,
    },
    {
      method: "GET",
      path: "/voices",
      description: "List all available voices.",
      codeExamples: generateCodeExamples({
        url: "https://api.elevenlabs.io/v1/voices",
        authType: "apiKey",
        authHeader: "xi-api-key",
      }),
      responsePreview: `{
  "voices": [{
    "voice_id": "21m00Tcm4TlvDq8ikWAM",
    "name": "Rachel",
    "category": "premade",
    "labels": { "accent": "american", "age": "young" }
  }]
}`,
    },
  ],
};

const replicate: Api = {
  slug: "replicate",
  name: "Replicate",
  tagline: "Run open-source ML models via API",
  description: "Run thousands of open-source machine learning models — image generation, video, audio, language — with a single API call. No GPU setup required.",
  category: "ai-ml",
  baseUrl: "https://api.replicate.com/v1",
  authType: "bearer",
  tags: ["image generation", "models", "Stable Diffusion", "open-source", "GPU"],
  docsUrl: "https://replicate.com/docs",
  websiteUrl: "https://replicate.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/predictions",
      description: "Run a model to create a prediction.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.replicate.com/v1/predictions",
        authType: "bearer",
        body: { version: "stability-ai/sdxl:latest", input: { prompt: "A photorealistic astronaut riding a horse" } },
      }),
      responsePreview: `{
  "id": "xyz789pred",
  "status": "starting",
  "model": "stability-ai/sdxl",
  "urls": { "get": "https://api.replicate.com/v1/predictions/xyz789pred" }
}`,
    },
  ],
};

const stabilityai: Api = {
  slug: "stability-ai",
  name: "Stability AI",
  tagline: "Generate and edit images with Stable Diffusion",
  description: "Stability AI's REST API gives access to Stable Diffusion XL, image-to-image, inpainting, upscaling, and video generation at scale.",
  category: "ai-ml",
  baseUrl: "https://api.stability.ai/v2beta",
  authType: "bearer",
  tags: ["image generation", "Stable Diffusion", "SDXL", "inpainting", "upscale"],
  docsUrl: "https://platform.stability.ai/docs/api-reference",
  websiteUrl: "https://stability.ai",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/stable-image/generate/core",
      description: "Generate an image from a text prompt.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.stability.ai/v2beta/stable-image/generate/core",
        authType: "bearer",
        body: { prompt: "A neon-lit cyberpunk street at night", output_format: "png" },
      }),
      responsePreview: `// Returns binary image data (PNG)
// Set "Accept: image/*" header to receive raw image bytes`,
    },
  ],
};

const perplexity: Api = {
  slug: "perplexity",
  name: "Perplexity AI",
  tagline: "Real-time web search + LLM reasoning",
  description: "Perplexity's Sonar models combine real-time web search with LLM reasoning — get grounded, cited answers using an OpenAI-compatible API.",
  category: "ai-ml",
  baseUrl: "https://api.perplexity.ai",
  authType: "bearer",
  tags: ["search", "RAG", "citations", "real-time", "Sonar"],
  docsUrl: "https://docs.perplexity.ai",
  websiteUrl: "https://perplexity.ai",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/chat/completions",
      description: "Get a grounded answer with real-time web citations.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.perplexity.ai/chat/completions",
        authType: "bearer",
        body: { model: "sonar", messages: [{ role: "user", content: "What happened in tech news today?" }] },
      }),
      responsePreview: `{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Here are today's top tech stories..."
    }
  }],
  "citations": ["https://techcrunch.com/...", "https://theverge.com/..."]
}`,
    },
  ],
};

// ── Auth (continued) ──────────────────────────────────────────

const workos: Api = {
  slug: "workos",
  name: "WorkOS",
  tagline: "Enterprise SSO, SCIM, and directory sync",
  description: "Add enterprise-grade authentication to your app in hours — Single Sign-On via SAML/OIDC, SCIM directory sync, and admin portal, all via a clean REST API.",
  category: "auth",
  baseUrl: "https://api.workos.com",
  authType: "bearer",
  tags: ["SSO", "SAML", "SCIM", "enterprise", "directory sync"],
  docsUrl: "https://workos.com/docs",
  websiteUrl: "https://workos.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/user_management/users",
      description: "List all users in your WorkOS environment.",
      codeExamples: generateCodeExamples({
        url: "https://api.workos.com/user_management/users",
        authType: "bearer",
      }),
      responsePreview: `{
  "data": [{
    "object": "user",
    "id": "user_01H7X3Y...",
    "email": "alice@acme.com",
    "first_name": "Alice",
    "last_name": "Smith",
    "email_verified": true,
    "created_at": "2024-01-15T09:00:00Z"
  }],
  "list_metadata": { "after": null }
}`,
    },
  ],
};

// ── Database (continued) ──────────────────────────────────────

const turso: Api = {
  slug: "turso",
  name: "Turso",
  tagline: "SQLite at the edge with libSQL",
  description: "Turso provides edge-hosted SQLite databases powered by libSQL — query via HTTP anywhere, replicate globally, and embed databases close to your users.",
  category: "database",
  baseUrl: "https://{database}-{org}.turso.io",
  authType: "bearer",
  tags: ["SQLite", "edge", "libSQL", "replicated", "serverless"],
  docsUrl: "https://docs.turso.tech",
  websiteUrl: "https://turso.tech",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/v2/pipeline",
      description: "Execute SQL statements against a Turso database.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://your-db-org.turso.io/v2/pipeline",
        authType: "bearer",
        body: { requests: [{ type: "execute", stmt: { sql: "SELECT * FROM users LIMIT 10" } }] },
      }),
      responsePreview: `{
  "results": [{
    "type": "ok",
    "response": {
      "type": "execute",
      "result": {
        "cols": [{ "name": "id" }, { "name": "email" }],
        "rows": [["1", "alice@example.com"]]
      }
    }
  }]
}`,
    },
  ],
};

const convex: Api = {
  slug: "convex",
  name: "Convex",
  tagline: "Reactive backend database with TypeScript",
  description: "Convex is a reactive backend-as-a-service — define your database schema and server functions in TypeScript, and get real-time queries that update automatically.",
  category: "database",
  baseUrl: "https://{deployment}.convex.cloud",
  authType: "bearer",
  tags: ["real-time", "TypeScript", "reactive", "serverless", "BaaS"],
  docsUrl: "https://docs.convex.dev",
  websiteUrl: "https://convex.dev",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/api/query",
      description: "Call a Convex query function.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://your-deployment.convex.cloud/api/query",
        authType: "bearer",
        body: { path: "tasks:getAll", args: {} },
      }),
      responsePreview: `{
  "status": "success",
  "value": [
    { "_id": "jd7abc123", "text": "Buy groceries", "completed": false },
    { "_id": "kx9xyz456", "text": "Write tests", "completed": true }
  ]
}`,
    },
  ],
};

const airtable: Api = {
  slug: "airtable",
  name: "Airtable",
  tagline: "Database-spreadsheet hybrid with a REST API",
  description: "Read and write data from any Airtable base — list records, create rows, filter and sort, and integrate structured data from team-managed spreadsheets.",
  category: "database",
  baseUrl: "https://api.airtable.com/v0",
  authType: "bearer",
  tags: ["spreadsheet", "no-code", "records", "CMS", "tables"],
  docsUrl: "https://airtable.com/developers/web/api/introduction",
  websiteUrl: "https://airtable.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/{baseId}/{tableIdOrName}",
      description: "List records from an Airtable table.",
      codeExamples: generateCodeExamples({
        url: "https://api.airtable.com/v0/appXXXXXXXX/Tasks?maxRecords=10&view=Grid+view",
        authType: "bearer",
      }),
      responsePreview: `{
  "records": [{
    "id": "recABCDEF",
    "createdTime": "2024-01-01T00:00:00.000Z",
    "fields": {
      "Name": "Launch campaign",
      "Status": "In progress",
      "Assignee": "Alice"
    }
  }]
}`,
    },
  ],
};

// ── Storage (continued) ───────────────────────────────────────

const cloudflareR2: Api = {
  slug: "cloudflare-r2",
  name: "Cloudflare R2",
  tagline: "S3-compatible object storage with zero egress fees",
  description: "Cloudflare R2 is S3-compatible object storage with zero egress costs — store and serve files globally without bandwidth charges.",
  category: "storage",
  baseUrl: "https://{accountId}.r2.cloudflarestorage.com",
  authType: "bearer",
  tags: ["S3-compatible", "egress-free", "CDN", "object storage", "global"],
  docsUrl: "https://developers.cloudflare.com/r2",
  websiteUrl: "https://cloudflare.com/developer-platform/r2",
  freeTier: true,
  endpoints: [
    {
      method: "PUT",
      path: "/{bucket}/{key}",
      description: "Upload an object to an R2 bucket.",
      codeExamples: generateCodeExamples({
        method: "PUT",
        url: "https://account-id.r2.cloudflarestorage.com/my-bucket/hello.txt",
        authType: "bearer",
        body: { data: "Hello, R2!" },
      }),
      responsePreview: `// HTTP 200 OK on success
// ETag: "d3b07384..."
// Content-Length: 0`,
    },
  ],
};

const backblaze: Api = {
  slug: "backblaze-b2",
  name: "Backblaze B2",
  tagline: "Low-cost S3-compatible cloud storage",
  description: "Backblaze B2 is S3-compatible cloud object storage at a fraction of AWS S3's cost — ideal for backups, media files, and large-scale storage.",
  category: "storage",
  baseUrl: "https://api.backblazeb2.com/b2api/v3",
  authType: "apiKey",
  authHeader: "Authorization",
  tags: ["S3-compatible", "backups", "object storage", "cheap", "CDN"],
  docsUrl: "https://www.backblaze.com/apidocs/introduction-to-the-b2-native-api",
  websiteUrl: "https://backblaze.com/cloud-storage",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/b2_list_buckets",
      description: "List all buckets in your B2 account.",
      codeExamples: generateCodeExamples({
        url: "https://api.backblazeb2.com/b2api/v3/b2_list_buckets?accountId=YOUR_ACCOUNT_ID",
        authType: "bearer",
      }),
      responsePreview: `{
  "buckets": [{
    "accountId": "YOUR_ACCOUNT_ID",
    "bucketId": "e73ede9969c64c3db4cc",
    "bucketName": "my-media-bucket",
    "bucketType": "allPrivate",
    "lifecycleRules": []
  }]
}`,
    },
  ],
};

// ── Communication (continued) ─────────────────────────────────

const onesignal: Api = {
  slug: "onesignal",
  name: "OneSignal",
  tagline: "Push notifications for web and mobile apps",
  description: "Send push notifications, in-app messages, SMS, and email to any device. OneSignal's free tier supports unlimited subscribers and 10,000 emails/month.",
  category: "communication",
  baseUrl: "https://api.onesignal.com",
  authType: "bearer",
  tags: ["push notifications", "mobile", "web push", "in-app", "SMS"],
  docsUrl: "https://documentation.onesignal.com/reference",
  websiteUrl: "https://onesignal.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/notifications",
      description: "Send a push notification to subscribed users.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.onesignal.com/notifications",
        authType: "bearer",
        body: { app_id: "YOUR_APP_ID", included_segments: ["All"], headings: { en: "New update!" }, contents: { en: "Version 2.0 is live." } },
      }),
      responsePreview: `{
  "id": "458dcec4-cf53-11e3-add2-000c2940e62c",
  "recipients": 5142,
  "external_id": null
}`,
    },
  ],
};

const discordWebhooks: Api = {
  slug: "discord-webhooks",
  name: "Discord Webhooks",
  tagline: "Post messages to Discord channels without OAuth",
  description: "Discord Webhooks let you send richly formatted messages to any Discord channel using a simple POST request — no OAuth or bot setup required.",
  category: "communication",
  baseUrl: "https://discord.com/api/webhooks",
  authType: "none",
  tags: ["Discord", "webhooks", "notifications", "embeds", "no auth"],
  docsUrl: "https://discord.com/developers/docs/resources/webhook",
  websiteUrl: "https://discord.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/{webhook.id}/{webhook.token}",
      description: "Send a message to a Discord channel via webhook.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN",
        authType: "none",
        body: { content: "Hello from APIYard!", username: "APIYard Bot", embeds: [{ title: "Deployment complete", color: 5763719 }] },
      }),
      responsePreview: `// HTTP 204 No Content on success
// The message is now visible in the Discord channel`,
    },
  ],
};

// ── DevOps (continued) ────────────────────────────────────────

const cloudflare: Api = {
  slug: "cloudflare",
  name: "Cloudflare",
  tagline: "DNS, CDN, Workers, and security via API",
  description: "Manage DNS records, configure caching rules, deploy Workers scripts, set up firewall rules, and control your entire Cloudflare stack programmatically.",
  category: "devops",
  baseUrl: "https://api.cloudflare.com/client/v4",
  authType: "bearer",
  tags: ["DNS", "CDN", "Workers", "firewall", "edge"],
  docsUrl: "https://developers.cloudflare.com/api",
  websiteUrl: "https://cloudflare.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/zones/{zone_id}/dns_records",
      description: "List DNS records for a zone.",
      codeExamples: generateCodeExamples({
        url: "https://api.cloudflare.com/client/v4/zones/ZONE_ID/dns_records?type=A",
        authType: "bearer",
      }),
      responsePreview: `{
  "result": [{
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "type": "A",
    "name": "example.com",
    "content": "198.51.100.4",
    "proxied": true,
    "ttl": 1
  }],
  "success": true
}`,
    },
  ],
};

const railway: Api = {
  slug: "railway",
  name: "Railway",
  tagline: "Deploy services and databases in seconds",
  description: "Railway's API lets you programmatically manage projects, services, deployments, and environment variables — the fastest way to ship backends and databases.",
  category: "devops",
  baseUrl: "https://backboard.railway.app/graphql/v2",
  authType: "bearer",
  tags: ["deployment", "databases", "services", "CI/CD", "serverless"],
  docsUrl: "https://docs.railway.com/reference/public-api",
  websiteUrl: "https://railway.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/",
      description: "Query Railway via GraphQL — list projects and deployments.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://backboard.railway.app/graphql/v2",
        authType: "bearer",
        body: { query: "{ me { projects { edges { node { id name } } } } }" },
      }),
      responsePreview: `{
  "data": {
    "me": {
      "projects": {
        "edges": [
          { "node": { "id": "abc123", "name": "my-app" } }
        ]
      }
    }
  }
}`,
    },
  ],
};

const linear: Api = {
  slug: "linear",
  name: "Linear",
  tagline: "Project management and issue tracking API",
  description: "Linear's GraphQL API gives full access to teams, projects, issues, cycles, and comments — perfect for automating developer workflows and integrating with your toolchain.",
  category: "devops",
  baseUrl: "https://api.linear.app/graphql",
  authType: "bearer",
  tags: ["project management", "issues", "GraphQL", "sprints", "automation"],
  docsUrl: "https://developers.linear.app/docs",
  websiteUrl: "https://linear.app",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/",
      description: "Query issues assigned to the authenticated user.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://api.linear.app/graphql",
        authType: "bearer",
        body: { query: "{ viewer { assignedIssues { nodes { title priority state { name } } } } }" },
      }),
      responsePreview: `{
  "data": {
    "viewer": {
      "assignedIssues": {
        "nodes": [
          { "title": "Fix auth bug", "priority": 1, "state": { "name": "In Progress" } }
        ]
      }
    }
  }
}`,
    },
  ],
};

// ── Social (continued) ────────────────────────────────────────

const twitter: Api = {
  slug: "twitter",
  name: "X (Twitter) API v2",
  tagline: "Tweets, users, trends, and social graph",
  description: "Access tweets, users, timelines, trends, and the social graph via X's v2 API — search recent tweets, post on behalf of users, and stream real-time data.",
  category: "social",
  baseUrl: "https://api.twitter.com/2",
  authType: "bearer",
  tags: ["tweets", "users", "timeline", "search", "OAuth 2.0"],
  docsUrl: "https://developer.twitter.com/en/docs/twitter-api",
  websiteUrl: "https://developer.twitter.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/tweets/search/recent",
      description: "Search for recent tweets matching a query.",
      codeExamples: generateCodeExamples({
        url: "https://api.twitter.com/2/tweets/search/recent?query=%23buildinpublic&tweet.fields=created_at,author_id&max_results=10",
        authType: "bearer",
      }),
      responsePreview: `{
  "data": [{
    "id": "1234567890",
    "text": "Launched v2 today! #buildinpublic",
    "created_at": "2024-05-01T12:00:00Z",
    "author_id": "98765"
  }],
  "meta": { "result_count": 10, "newest_id": "1234567890" }
}`,
    },
  ],
};

const discord: Api = {
  slug: "discord",
  name: "Discord API",
  tagline: "Build bots, read channels, and manage servers",
  description: "The Discord REST API lets you build bots and integrations — read messages, manage guild members, create channels, assign roles, and react to events.",
  category: "social",
  baseUrl: "https://discord.com/api/v10",
  authType: "bearer",
  tags: ["bots", "guilds", "channels", "messages", "OAuth 2.0"],
  docsUrl: "https://discord.com/developers/docs",
  websiteUrl: "https://discord.com/developers",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/guilds/{guild.id}/members",
      description: "List members of a Discord server.",
      codeExamples: generateCodeExamples({
        url: "https://discord.com/api/v10/guilds/GUILD_ID/members?limit=100",
        authType: "bearer",
      }),
      responsePreview: `[{
  "user": {
    "id": "80351110224678912",
    "username": "Nelly",
    "discriminator": "1337",
    "avatar": "8342729096ea3675442027381ff50dfe"
  },
  "roles": ["431930842472013825"],
  "joined_at": "2015-04-26T06:26:56.936000+00:00"
}]`,
    },
  ],
};

const slack: Api = {
  slug: "slack",
  name: "Slack API",
  tagline: "Messages, channels, and workflows in Slack",
  description: "Send messages, create channels, manage users, and build Slack apps using the Web API and Webhooks — integrates with any backend.",
  category: "social",
  baseUrl: "https://slack.com/api",
  authType: "bearer",
  tags: ["messages", "channels", "bots", "webhooks", "notifications"],
  docsUrl: "https://api.slack.com/methods",
  websiteUrl: "https://api.slack.com",
  freeTier: true,
  endpoints: [
    {
      method: "POST",
      path: "/chat.postMessage",
      description: "Send a message to a Slack channel.",
      codeExamples: generateCodeExamples({
        method: "POST",
        url: "https://slack.com/api/chat.postMessage",
        authType: "bearer",
        body: { channel: "#general", text: "Hello from APIYard!", blocks: [] },
      }),
      responsePreview: `{
  "ok": true,
  "channel": "C024BE91L",
  "ts": "1503435956.000247",
  "message": {
    "text": "Hello from APIYard!",
    "username": "My Bot",
    "type": "message"
  }
}`,
    },
    {
      method: "GET",
      path: "/conversations.list",
      description: "List all channels in a Slack workspace.",
      codeExamples: generateCodeExamples({
        url: "https://slack.com/api/conversations.list?types=public_channel&limit=20",
        authType: "bearer",
      }),
      responsePreview: `{
  "ok": true,
  "channels": [{
    "id": "C024BE91L",
    "name": "general",
    "is_member": true,
    "num_members": 42
  }],
  "response_metadata": { "next_cursor": "" }
}`,
    },
  ],
};

// ── Entertainment (continued) ─────────────────────────────────

const twitch: Api = {
  slug: "twitch",
  name: "Twitch Helix",
  tagline: "Streams, games, clips, and channel data",
  description: "Access live streams, channel data, top games, clips, follows, and subscriptions via Twitch's Helix API — perfect for dashboards and stream tooling.",
  category: "entertainment",
  baseUrl: "https://api.twitch.tv/helix",
  authType: "bearer",
  tags: ["streams", "gaming", "clips", "OAuth 2.0", "live"],
  docsUrl: "https://dev.twitch.tv/docs/api",
  websiteUrl: "https://dev.twitch.tv",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/streams",
      description: "Get currently live streams with optional filters.",
      codeExamples: generateCodeExamples({
        url: "https://api.twitch.tv/helix/streams?game_id=21779&first=10",
        authType: "bearer",
      }),
      responsePreview: `{
  "data": [{
    "id": "123456789",
    "user_name": "xQc",
    "game_name": "Just Chatting",
    "title": "!gamba | big plays",
    "viewer_count": 42000,
    "started_at": "2024-05-01T14:00:00Z",
    "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/..."
  }]
}`,
    },
  ],
};

const lastfm: Api = {
  slug: "lastfm",
  name: "Last.fm",
  tagline: "Music listening history, charts, and artist data",
  description: "Access Last.fm's music data — top charts, artist biographies, similar artists, user listening history, and scrobble tracking.",
  category: "entertainment",
  baseUrl: "https://ws.audioscrobbler.com/2.0",
  authType: "apiKey",
  authQuery: "api_key",
  tags: ["music", "charts", "scrobbling", "artists", "history"],
  docsUrl: "https://www.last.fm/api",
  websiteUrl: "https://last.fm",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "Fetch global top tracks from Last.fm charts.",
      codeExamples: generateCodeExamples({
        url: "https://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=YOUR_KEY&format=json&limit=5",
        authType: "apiKey",
        authQuery: "api_key",
      }),
      responsePreview: `{
  "tracks": {
    "track": [{
      "name": "Blinding Lights",
      "artist": { "name": "The Weeknd" },
      "playcount": "2141900",
      "listeners": "982000",
      "url": "https://www.last.fm/music/The+Weeknd/_/Blinding+Lights"
    }]
  }
}`,
    },
  ],
};

// ── Developer (continued) ─────────────────────────────────────

const dicebear: Api = {
  slug: "dicebear",
  name: "DiceBear",
  tagline: "Generate avatar images from any seed string",
  description: "DiceBear generates deterministic SVG avatars from any seed string — pick from 50+ styles including pixel art, illustrated characters, and abstract shapes.",
  category: "developer",
  baseUrl: "https://api.dicebear.com/9.x",
  authType: "none",
  tags: ["avatars", "SVG", "generated", "free", "no auth"],
  docsUrl: "https://www.dicebear.com/how-to-use/http-api",
  websiteUrl: "https://dicebear.com",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/{style}/svg",
      description: "Generate an SVG avatar using a style and seed.",
      codeExamples: generateCodeExamples({
        url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Felix&radius=50",
        authType: "none",
      }),
      responsePreview: `// Returns SVG image data
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <!-- Deterministic avatar based on seed "Felix" -->
  <circle cx="60" cy="60" r="50" fill="#b6e3f4"/>
  ...
</svg>`,
    },
  ],
};

const fakerapi: Api = {
  slug: "fakerapi",
  name: "FakerAPI",
  tagline: "Generate fake datasets for testing",
  description: "FakerAPI generates realistic fake data on demand — persons, addresses, companies, credit cards, images, and more — no auth required.",
  category: "developer",
  baseUrl: "https://fakerapi.it/api/v2",
  authType: "none",
  tags: ["fake data", "testing", "seed", "mock", "no auth"],
  docsUrl: "https://fakerapi.it/en",
  websiteUrl: "https://fakerapi.it",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/persons",
      description: "Generate fake person records.",
      codeExamples: generateCodeExamples({
        url: "https://fakerapi.it/api/v2/persons?_quantity=3&_locale=en_US",
        authType: "none",
      }),
      responsePreview: `{
  "status": "OK",
  "total": 3,
  "data": [{
    "id": 1,
    "firstname": "Emma",
    "lastname": "Johnson",
    "email": "emma.johnson@example.com",
    "phone": "+1-555-234-5678",
    "birthday": "1992-08-14",
    "address": { "city": "Denver", "country": "United States" }
  }]
}`,
    },
  ],
};

// ── Finance (continued) ───────────────────────────────────────

const polygon: Api = {
  slug: "polygon",
  name: "Polygon.io",
  tagline: "Real-time and historical stock market data",
  description: "Polygon.io provides real-time and historical data for stocks, options, forex, and crypto — trades, quotes, aggregates, and company fundamentals.",
  category: "finance",
  baseUrl: "https://api.polygon.io",
  authType: "apiKey",
  authQuery: "apiKey",
  tags: ["stocks", "options", "forex", "crypto", "real-time"],
  docsUrl: "https://polygon.io/docs",
  websiteUrl: "https://polygon.io",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}",
      description: "Get OHLCV aggregate bars for a stock ticker.",
      codeExamples: generateCodeExamples({
        url: "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2024-01-01/2024-01-31",
        authType: "apiKey",
        authQuery: "apiKey",
      }),
      responsePreview: `{
  "ticker": "AAPL",
  "resultsCount": 23,
  "results": [{
    "v": 72143000,
    "o": 186.09,
    "c": 185.92,
    "h": 188.44,
    "l": 185.83,
    "t": 1704067200000,
    "n": 783456
  }]
}`,
    },
  ],
};

// ── Security (continued) ──────────────────────────────────────

const shodan: Api = {
  slug: "shodan",
  name: "Shodan",
  tagline: "Internet-wide device and service intelligence",
  description: "Shodan continuously scans the internet — search for exposed services, open ports, banners, and vulnerabilities on any IP or domain.",
  category: "security",
  baseUrl: "https://api.shodan.io",
  authType: "apiKey",
  authQuery: "key",
  tags: ["OSINT", "ports", "services", "CVEs", "threat intel"],
  docsUrl: "https://developer.shodan.io/api",
  websiteUrl: "https://shodan.io",
  freeTier: true,
  endpoints: [
    {
      method: "GET",
      path: "/shodan/host/{ip}",
      description: "Look up all information for a specific IP address.",
      codeExamples: generateCodeExamples({
        url: "https://api.shodan.io/shodan/host/8.8.8.8",
        authType: "apiKey",
        authQuery: "key",
      }),
      responsePreview: `{
  "ip_str": "8.8.8.8",
  "org": "Google LLC",
  "country_name": "United States",
  "ports": [53, 443],
  "vulns": [],
  "data": [{
    "port": 53,
    "transport": "udp",
    "product": "Google public DNS"
  }]
}`,
    },
  ],
};

// ── Export ────────────────────────────────────────────────────

export const APIS: Api[] = [
  // AI & ML
  openai, anthropic, huggingface, googleGemini,
  mistral, elevenlabs, replicate, stabilityai, perplexity,
  // Auth
  clerk, auth0, firebaseAuth, supabaseAuth, workos,
  // Payments
  stripe, paypal, lemonSqueezy, paddle,
  // Database
  supabase, firebase, neon, planetscale, mongodbAtlas,
  turso, convex, airtable,
  // Storage
  cloudinary, uploadthing, awsS3, imagekit,
  cloudflareR2, backblaze,
  // Search
  algolia, meilisearch, typesense,
  // Analytics
  posthog, googleAnalytics, plausible, mixpanel,
  // Communication
  resend, sendgrid, twilio, mailgun, onesignal, discordWebhooks,
  // Maps
  googlemaps, mapbox, nominatim, radar,
  // Weather
  openweather, weatherapi,
  // Finance
  coingecko, alphavantage, finnhub, polygon,
  // DevOps
  github, vercel, netlify, dockerHub, cloudflare, railway, linear,
  // Social
  reddit, twitter, discord, slack,
  // Entertainment
  spotify, tmdb, youtube, googleBooks, twitch, lastfm,
  // News
  newsapi, gnews, guardian,
  // Jobs
  adzuna, arbeitnow,
  // Sports
  sportsdb, apifootball,
  // Health
  nutritionix, openfda,
  // Developer
  pokeapi, jsonplaceholder, qrserver, ipapi, ipinfo, randomuser,
  dicebear, fakerapi,
  // E-commerce
  shopify,
  // Security
  hibp, virustotal, shodan,
  // Government
  nasa, openlibrary,
];

export function getApiBySlug(slug: string): Api | undefined {
  return APIS.find((a) => a.slug === slug);
}

export function getApisByCategory(category: string): Api[] {
  return APIS.filter((a) => a.category === category);
}
