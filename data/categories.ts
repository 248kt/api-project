export interface Category {
  slug: string;
  label: string;
  icon: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { slug: "ai-ml",         label: "AI & ML",         icon: "Brain",          description: "Machine learning and generative AI" },
  { slug: "auth",          label: "Auth",             icon: "KeyRound",       description: "Authentication and identity management" },
  { slug: "payments",      label: "Payments",         icon: "CreditCard",     description: "Payment processing and billing" },
  { slug: "database",      label: "Database",         icon: "Database",       description: "Databases, BaaS, and data storage" },
  { slug: "storage",       label: "Storage",          icon: "HardDrive",      description: "File storage, CDN, and media" },
  { slug: "search",        label: "Search",           icon: "Search",         description: "Full-text and vector search" },
  { slug: "analytics",     label: "Analytics",        icon: "BarChart3",      description: "Usage tracking and product analytics" },
  { slug: "communication", label: "Communication",    icon: "MessageSquare",  description: "SMS, email, and messaging APIs" },
  { slug: "maps",          label: "Maps",             icon: "MapPin",         description: "Geolocation, routing, and mapping" },
  { slug: "weather",       label: "Weather",          icon: "Cloud",          description: "Forecasts, climate, and atmospheric data" },
  { slug: "finance",       label: "Finance",          icon: "TrendingUp",     description: "Markets, crypto, and financial data" },
  { slug: "devops",        label: "DevOps",           icon: "Layers",         description: "Deployment, CI/CD, and infrastructure" },
  { slug: "social",        label: "Social",           icon: "Users",          description: "Social networks and community platforms" },
  { slug: "entertainment", label: "Entertainment",    icon: "Clapperboard",   description: "Music, movies, and media" },
  { slug: "news",          label: "News",             icon: "Newspaper",      description: "Articles, feeds, and headlines" },
  { slug: "jobs",          label: "Jobs",             icon: "Briefcase",      description: "Job listings and recruiting data" },
  { slug: "sports",        label: "Sports",           icon: "Trophy",         description: "Scores, stats, and live events" },
  { slug: "health",        label: "Health",           icon: "HeartPulse",     description: "Nutrition, fitness, and medical data" },
  { slug: "developer",     label: "Developer",        icon: "Code2",          description: "Tools and utilities for developers" },
  { slug: "ecommerce",     label: "E-commerce",       icon: "ShoppingCart",   description: "Storefronts, orders, and products" },
  { slug: "security",      label: "Security",         icon: "ShieldCheck",    description: "Threat intel, vulnerability, and auth" },
  { slug: "government",    label: "Government",       icon: "Building2",      description: "Public data and open government APIs" },
];
