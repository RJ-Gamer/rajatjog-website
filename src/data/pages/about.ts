import { SOCIAL_LINKS } from "../../consts";

export const aboutFacts = [
  ["Location", "Pune, India"],
  ["Experience", "7+ years"],
  ["Domains", "Healthtech / Fintech"],
  ["Stack", "Python / Django / FastAPI"],
  ["Status", "Open to roles"],
];

export const aboutSocialLinks = [
  ["Email", SOCIAL_LINKS.email],
  ["LinkedIn", SOCIAL_LINKS.linkedin],
  ["GitHub", SOCIAL_LINKS.github],
];

export const aboutExperience = [
  {
    role: "Senior Software Engineer",
    company: "Mindbowser Inc",
    period: "Feb 2024 - Present",
    location: "Remote",
    current: true,
    bullets: [
      "Integrated production ML workflows using AWS SageMaker for predictive healthcare analytics.",
      "Engineered HIPAA and SOC2-compliant platforms using HL7 and FHIR protocols.",
      "Led 5+ engineers, reduced production bugs 25%, accelerated delivery by 6 weeks.",
    ],
    tags: ["SageMaker", "HIPAA", "SOC2", "HL7", "FHIR"],
  },
  {
    role: "Software Engineer",
    company: "Mindbowser Inc",
    period: "Nov 2022 - Feb 2024",
    location: "Remote",
    current: false,
    bullets: [
      "Reduced API latency 60% via PostgreSQL indexing and Redis caching.",
      "Architected Django and FastAPI backends for 5k DAU, 300 RPM healthcare platforms.",
    ],
    tags: ["Django", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    role: "Software Engineer",
    company: "KiwiTech",
    period: "Apr 2022 - Nov 2022",
    location: "Remote",
    current: false,
    bullets: [
      "Scaled RESTful APIs for 7+ clients handling 5-7 GB daily data throughput.",
      "Built Celery task queues for 15+ daily background jobs with zero missed deliveries.",
    ],
    tags: ["Django", "Celery", "REST APIs"],
  },
  {
    role: "Python Developer",
    company: "KSBS Group Pte Ltd",
    period: "Mar 2021 - Apr 2022",
    location: "Remote",
    current: false,
    bullets: [
      "Led a 3-person team to ship an e-commerce platform for 500 concurrent users.",
      "Maintained a Django attendance system with 99% production uptime.",
    ],
    tags: ["Python", "Django", "E-Commerce"],
  },
];

export const aboutCertifications = [
  {
    org: "AWS",
    name: "AWS Machine Learning Specialty (MLS-C01)",
    issued: "January 2026",
    accent: "accent",
  },
  {
    org: "Hugging Face",
    name: "AI Agents Fundamentals",
    issued: "March 2026",
    accent: "teal",
  },
];

export const aboutOpenSource = [
  {
    name: "session-bridge-ai",
    description: "VS Code extension that preserves AI coding context across Claude, Gemini, and OpenAI.",
    href: "https://marketplace.visualstudio.com/items?itemName=RajatJog.session-bridge-ai",
    linkText: "Marketplace ->",
  },
  {
    name: "timeblocks",
    description: "Recurring time availability scheduling for Django.",
    href: "https://pypi.org/project/timeblocks/",
    linkText: "PyPI ->",
  },
  {
    name: "django-system-audit",
    description: "Intent-aware audit trails for Django and DRF.",
    href: "https://pypi.org/project/django-system-audit/",
    linkText: "PyPI ->",
  },
  {
    name: "django-ml-audit",
    description: "Per-prediction ML audit trails for Django production systems.",
    href: "https://pypi.org/project/django-ml-audit/",
    linkText: "PyPI ->",
  },
];
