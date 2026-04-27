export const homeStats = [
  { label: "Experience", value: "7+", unit: "years" },
  { label: "PyPI Packages", value: "3", unit: "published" },
  { label: "Compliance", value: "HIPAA", unit: "and SOC2" },
  { label: "Certified", value: "AWS", unit: "ML Specialty" },
];

export const homeSkills = [
  { category: "Backend", tags: ["Python", "Django", "FastAPI", "Django REST Framework", "Celery", "Redis"] },
  { category: "Database", tags: ["PostgreSQL", "Query Optimisation", "Database Indexing", "Schema Design"] },
  { category: "Cloud & Infra", tags: ["AWS SageMaker", "Lambda", "S3", "Docker", "Railway"] },
  { category: "Domains", tags: ["HIPAA", "SOC2", "HL7/FHIR", "Healthtech", "Fintech"] },
  { category: "Focus", tags: ["System Design", "DSA", "AI Agents"] },
];

export const homeProjects = [
  {
    name: "OppVenuz",
    meta: "Client / E-Commerce / Mindbowser Inc / Jun 2023 - Nov 2024",
    description:
      "Architected backend infrastructure for vendor listings, user profiles, and booking flows with scalable DRF APIs, PostgreSQL optimisation, and Redis caching.",
    tags: ["Django", "DRF", "PostgreSQL", "Redis"],
    links: [{ label: "Website", href: "https://www.oppvenuz.com/" }],
    accent: "accent",
  },
  {
    name: "Allday | Dayo",
    meta: "Client / Mobile App / Mindbowser Inc / Jan 2023 - Feb 2024",
    description:
      "Built the backend for a wellness rewards app, including Shopify marketplace integration, LLM-based insights, and real-time data sync.",
    tags: ["Django", "DRF", "Shopify", "LLMs"],
    links: [],
    accent: "teal",
  },
  {
    name: "session-bridge-ai",
    meta: "Open Source / VS Code Marketplace",
    quote: "Credits die mid-sentence. Context shouldn't.",
    description:
      "VS Code extension that preserves AI coding context across Claude, Gemini, and OpenAI. One-click handoff when credits run out — plus a token usage dashboard built from Claude Code telemetry.",
    tags: ["TypeScript", "VS Code", "AI"],
    links: [
      { label: "Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=RajatJog.session-bridge-ai" },
      { label: "GitHub", href: "https://github.com/RJ-Gamer/session-bridge-ai" },
    ],
    accent: "blue",
  },
  {
    name: "timeblocks",
    meta: "Open Source / PyPI",
    quote: "Healthcare scheduling fails because availability is modelled as mutable state, not invariants.",
    description:
      "Recurring availability scheduling for Django. Concurrency-safe, so changing availability never corrupts booked records.",
    tags: ["Python", "Django"],
    links: [
      { label: "PyPI", href: "https://pypi.org/project/timeblocks/" },
      { label: "GitHub", href: "https://github.com/RJ-Gamer/timeblocks" },
    ],
    accent: "teal",
  },
];

export const homeCoreStack = ["python", "django", "fastapi", "postgresql", "redis", "aws"];
