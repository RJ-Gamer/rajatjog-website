export const clientProjects = [
  {
    title: "OppVenuz",
    type: "E-Commerce Platform",
    period: "Jun 2023 - Nov 2024",
    association: "Mindbowser Inc",
    accent: "accent",
    stat: "18 months",
    bullets: [
      "Architected complete backend infrastructure for vendor listings, user profiles, and booking functionalities.",
      "Built scalable RESTful APIs with Django REST Framework supporting dynamic content delivery across the platform.",
      "Optimized PostgreSQL schemas and queries, enhancing data retrieval speeds and application performance.",
      "Implemented Redis caching strategies to reduce server load on high-traffic endpoints.",
    ],
    stack: ["Django", "DRF", "PostgreSQL", "Redis"],
    links: [{ label: "Visit website", href: "https://www.oppvenuz.com/" }],
  },
  {
    title: "Allday | Dayo",
    type: "Mobile App Backend",
    period: "Jan 2023 - Feb 2024",
    association: "Mindbowser Inc",
    accent: "teal",
    stat: "13 months",
    bullets: [
      "Developed backend for a wellness rewards app with real-time data sync and user engagement features.",
      "Built and integrated a custom Shopify marketplace for in-app reward redemption.",
      "Used LLM-based summarisation to generate concise user insights and analytics dashboards.",
      "Designed APIs supporting seamless reward mechanisms across devices.",
    ],
    stack: ["Django", "DRF", "Shopify", "LLMs"],
    links: [],
  },
];

export const openSourceProjects = [
  {
    title: "session-bridge-ai",
    domain: "Developer Tools",
    quote: "Credits die mid-sentence. Context shouldn't.",
    accent: "blue",
    install: "ext install RajatJog.session-bridge-ai",
    bullets: [
      "VS Code extension that maintains a running SESSION.md across Claude, Gemini, OpenAI and Codex sessions.",
      "Automatically captures git diffs, open files, and progress notes — generates structured AI handoff documents.",
      "Built-in token usage dashboard reads Claude Code telemetry to show burn rate and cost per project.",
    ],
    stack: ["TypeScript", "VS Code API", "Gemini AI", "Node.js"],
    links: [
      {
        label: "VS Code Marketplace",
        href: "https://marketplace.visualstudio.com/items?itemName=RajatJog.session-bridge-ai",
        sub: "ext install RajatJog.session-bridge-ai",
      },
      {
        label: "GitHub repo",
        href: "https://github.com/RJ-Gamer/session-bridge-ai",
        sub: "Source and issues",
      },
    ],
  },
  {
    title: "django-system-audit",
    domain: "Compliance",
    quote:
      "Signals capture effects. Compliance systems need to capture intent.",
    accent: "accent",
    install: "pip install django-system-audit",
    bullets: [
      "Intent-aware audit trail library for Django and DRF.",
      "Records audit events explicitly through views and admin actions, capturing why something happened.",
      "Built for HIPAA and SOC2 environments where audit logs must be legally defensible.",
    ],
    stack: ["Python", "Django", "DRF"],
    links: [
      {
        label: "PyPI package",
        href: "https://pypi.org/project/django-system-audit/",
        sub: "pip install django-system-audit",
      },
      {
        label: "GitHub repo",
        href: "https://github.com/RJ-Gamer/django-system-audit",
        sub: "Source and issues",
      },
    ],
  },
  {
    title: "timeblocks",
    domain: "Scheduling",
    quote:
      "Healthcare scheduling fails because availability is modelled as mutable state, not invariants.",
    accent: "teal",
    install: "pip install timeblocks",
    bullets: [
      "Recurring time availability scheduling for Django.",
      "Handles daily, weekly, custom weekday, monthly, and yearly patterns with concurrency-safe slot generation.",
      "Changing availability never corrupts already-booked records.",
    ],
    stack: ["Python", "Django"],
    links: [
      {
        label: "PyPI package",
        href: "https://pypi.org/project/timeblocks/",
        sub: "pip install timeblocks",
      },
      {
        label: "GitHub repo",
        href: "https://github.com/RJ-Gamer/timeblocks",
        sub: "Source and issues",
      },
    ],
  },
  {
    title: "django-ml-audit",
    domain: "ML Observability",
    quote:
      "Debugging a strange prediction from last month should not mean spelunking through logs across five services.",
    accent: "teal",
    install: "pip install django-ml-audit",
    bullets: [
      "Per-prediction audit logging for ML systems built with Django.",
      "Stores request, response, model version, and metadata for later inspection.",
      "Designed to make production ML behavior explainable without bespoke observability stacks.",
    ],
    stack: ["Python", "Django", "ML Ops"],
    links: [
      {
        label: "PyPI package",
        href: "https://pypi.org/project/django-ml-audit/",
        sub: "pip install django-ml-audit",
      },
      {
        label: "GitHub repo",
        href: "https://github.com/RJ-Gamer/django-ml-audit",
        sub: "Source and issues",
      },
    ],
  },
];
