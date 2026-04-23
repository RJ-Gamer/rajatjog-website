# Personal Portfolio & Engineering Journal

[![Astro](https://img.shields.io/badge/Astro-6.1.8-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Deploy to GitHub Pages](https://github.com/RJ-Gamer/rajatjog-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/RJ-Gamer/rajatjog-website/actions/workflows/deploy.yml)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rajat%20Jog-0077B5?logo=linkedin)](https://linkedin.com/in/rajat-jog)
[![PyPI](https://img.shields.io/badge/PyPI-rajatjog1294-3776AB?logo=pypi&logoColor=white)](https://pypi.org/user/rajatjog1294)

The personal website and technical portfolio of **Rajat Jog**, a Senior Backend Engineer specialising in Python, Django, and FastAPI. Built with a focus on high-signal content, performance, and clean architectural presentation.

---

## 🏛️ Project Sections

### ✍️ [Engineering Journal](/src/pages/blog)
A technical blog focusing on Django internals, system design patterns, and the realities of shipping production software in regulated environments (HIPAA/SOC2).

### 🛠️ [Projects](/src/pages/projects.astro)
A showcase of both client-led production systems and independent open-source contributions, including:
- **session-bridge-ai**: VS Code extension for AI context persistence.
- **timeblocks**: Concurrency-safe recurring availability for Django.
- **django-system-audit**: Intent-aware audit trails for compliance.
- **django-ml-audit**: Observability for production ML predictions.

### 🧩 [DSA Solutions](/src/pages/dsa)
A collection of Data Structures and Algorithms solutions solved in Python. Each problem is presented with its production context, complexity analysis, and underlying patterns. Features a real-time difficulty filter (Easy/Medium/Hard).

---

## 💻 Tech Stack

- **Framework**: [Astro 6.1.8](https://astro.build) (Static Site Generation)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS with custom properties (CSS Variables)
- **Content**: MDX & Content Collections
- **OG Images**: Dynamic generation using [Satori](https://github.com/vercel/satori) and [Resvg](https://github.com/yisibl/resvg-js)
- **Deployment**: [GitHub Pages](https://pages.github.com/) via GitHub Actions

---

## 🚀 Getting Started

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RJ-Gamer/rajatjog-website.git
   cd rajatjog-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

### Project Structure

```text
├── src/
│   ├── components/  # Reusable UI elements (Header, Footer, etc.)
│   ├── content/     # Blog posts (Markdown/MDX)
│   ├── layouts/     # Page templates
│   ├── pages/       # Routes (Index, About, Projects, Blog, DSA)
│   └── styles/      # Global CSS and themes
├── public/          # Static assets
└── astro.config.mjs # Framework configuration
```

---

## 🧞 Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Builds the production site to `./dist/` |
| `npm run preview` | Previews the build locally |

---

## 📄 License

This project is personal work. Feel free to use the code as inspiration for your own portfolio.
