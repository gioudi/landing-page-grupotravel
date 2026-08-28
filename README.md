# Grupo Travel - Landing Page

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG-2.2%20AA-brightgreen.svg)](https://www.w3.org/WAI/WCAG22/quickref/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-purple.svg)](https://vitejs.dev/)

> A responsive, accessible, and performant landing page for Grupo Travel, built with TypeScript, SCSS (ITCSS architecture), and modern web standards.

---

## Live Demo

[View Live Site](https://gioudi.github.io/landing-page-grupotravel/)

---

## Screenshot

![Grupo Travel Landing Page](./dist/img/city.png)

---

## About

Grupo Travel is a travel agency based in Bogota, Colombia. This landing page serves as the company's digital storefront, showcasing travel packages and collecting customer inquiries through a contact form.

This project was built as a portfolio piece demonstrating modern front-end development practices, including:

- Spec-driven development workflow
- TypeScript for type-safe JavaScript
- ITCSS architecture for scalable CSS
- WCAG 2.2 AA accessibility compliance
- Text-to-speech accessibility feature
- Performance optimization

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | HTML5 |
| **Language** | TypeScript 5.x |
| **Styling** | SCSS (ITCSS Architecture) |
| **Build Tool** | Vite 6.x |
| **Animations** | CSS Keyframes (custom) |
| **Accessibility** | Web Speech API (Text-to-Speech) |
| **CI/CD** | GitHub Actions |
| **Hosting** | GitHub Pages |

---

## Features

- **Fully Responsive** - Mobile-first design, works on all screen sizes
- **Accessible** - WCAG 2.2 AA compliant, screen reader friendly
- **Text-to-Speech** - Per-section listen feature for visually impaired users
- **Internationalized (ES/EN/DE)** - Runtime dictionary i18n with a language switcher and localized TTS
- **Light/Dark Theme** - CSS custom-property design tokens, persisted preference, respects system theme
- **Multi-Page SEO** - Dedicated, indexable Destinations and Packages pages with structured data
- **Type-Safe** - TypeScript strict mode for error prevention
- **Performant** - Optimized bundle, lazy loading, minimal dependencies
- **SEO Optimized** - Meta tags, Open Graph, structured data, semantic HTML
- **Zero jQuery** - Vanilla TypeScript, no unnecessary dependencies

---

## Project Structure

```
landing-page-grupotravel/
├── src/
│   ├── ts/                    # TypeScript source
│   │   ├── main.ts            # Entry: init theme + i18n + TTS
│   │   ├── i18n.ts            # ES/EN/DE dictionary + locale switcher
│   │   ├── theme.ts           # Light/dark theme (persisted)
│   │   ├── navigation.ts      # Hamburger menu
│   │   ├── smooth-scroll.ts   # Smooth scroll
│   │   ├── scroll-effects.ts  # Navbar + animations
│   │   └── tts-player.ts      # Text-to-speech player
│   └── sass/                  # ITCSS-style SCSS (base, components, objects, pages)
├── public/
│   └── img/                   # WebP images (served at root)
├── dist/                      # Build output (gitignored)
├── index.html                 # Home landing page
├── destinations.html          # SEO: destinations page
├── packages.html              # SEO: packages page
├── specs/                     # Spec-driven development specs (FIX-00N-*.md)
├── package.json
├── tsconfig.json
└── vite.config.ts             # Multi-page build input
```

---

## ITCSS Architecture

This project follows the [ITCSS (Inverted Triangle CSS)](https://itcss.io/) methodology for scalable, maintainable CSS.

| Layer | Purpose | Specificity |
|---|---|---|
| **Settings** | Variables, config | Lowest |
| **Tools** | Mixins, functions | Low |
| **Generic** | Resets, normalize | Low |
| **Elements** | Bare HTML elements | Medium-Low |
| **Objects** | Layout patterns | Medium |
| **Components** | UI components | Medium-High |
| **Utilities** | Helper classes | Highest |

**Why ITCSS?**
- Prevents specificity wars
- Enforces separation of concerns
- Makes refactoring predictable
- Scales from small to large projects

---

## Architecture Decisions

Key decisions and their rationale:

| Decision | Choice | Rationale |
|---|---|---|
| **Styling** | CSS custom-property **design tokens** (RGB triplets) under `:root` / `[data-theme]` | One source of truth for both themes; `rgb(var(--x))` and `rgba(var(--x), a)` both resolve at runtime; theme toggle needs no rebuild |
| **Theming** | `data-theme` attribute on `<html>` + persisted `localStorage('theme')` + `prefers-color-scheme` fallback | No FOUC (inline head script sets it pre-paint); accessible sun/moon toggle in the nav |
| **i18n** | Zero-dependency **runtime dictionary** (`Record<Locale, Translation>`) | Fits the vanilla-TS/Vite stack; adding a language is one dictionary entry, no framework weight |
| **TTS** | Localized voices/status derived from the active locale | Speech matches the displayed language; status strings translated |
| **Build** | **Multi-page** Vite build (home + `destinations.html` + `packages.html`) | Dedicated, indexable SEO pages with structured data |
| **Tooling** | Vite + TypeScript + SCSS (ITCSS); vanilla TS, **no jQuery / frameworks** | Small, tree-shakeable, type-safe bundle |

These correspond to the specs under [`specs/`](./specs) (FIX-014 i18n, FIX-015 theme toggle, FIX-016 SEO pages).

---

## Design Patterns

| Pattern | Usage |
|---|---|
| **Observer** | Scroll events, TTS state changes, `i18n:change` event |
| **Module** | Each TypeScript file is self-contained |
| **Singleton** | TTS player (one instance per page) |
| **Strategy** | Voice selection with fallback chain; pluggable locale dictionary |
| **Template Method** | ITCSS layer structure |
| **Bridge / Token** | Theming driven by a single set of CSS custom-property design tokens instead of scattered color literals |
| **State** | Persisted UI state (`theme`, `lang`) in `localStorage` |

---

## SOLID Principles

| Principle | Application |
|---|---|
| **S**ingle Responsibility | Each file handles one concern |
| **O**pen/Closed | TTS accepts new voices without core changes |
| **I**nterface Segregation | TTS exposes minimal API: play(), pause(), stop() |
| **D**ependency Inversion | TTS depends on Web Speech API interface |

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Semi-dios/landing-page-grupotravel.git

# Navigate to project directory
cd landing-page-grupotravel

# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Performance

| Metric | Target | Status |
|---|---|---|
| Total Bundle Size | < 500KB | Optimized |
| JavaScript | < 50KB | TypeScript (tree-shaken) |
| CSS | < 50KB | SCSS (minified) |
| Lighthouse Performance | > 90 | Target |
| First Contentful Paint | < 1.5s | Target |
| Largest Contentful Paint | < 2.5s | Target |

### Optimizations Applied

- TypeScript tree-shaking via Vite
- CSS minification
- Image lazy loading
- Preconnect for external fonts
- No jQuery dependency
- Custom CSS animations (no Animate.css)

---

## Accessibility

This project targets **WCAG 2.2 AA** compliance.

### Features

- Semantic HTML structure (`<nav>`, `<main>`, `<section>`)
- Proper heading hierarchy (single `<h1>`)
- ARIA labels on all interactive elements
- Keyboard navigation support
- Visible focus indicators
- Skip-to-content link
- Text-to-speech player per section
- Touch targets >= 44x44px
- Color contrast >= 4.5:1

### Testing

- Keyboard-only navigation tested
- Screen reader compatibility (NVDA, VoiceOver)
- axe DevTools scan
- Lighthouse accessibility audit

---

## SEO

The site is a **multi-page build** (home + `destinations.html` + `packages.html`), each page with its own:

- Unique, descriptive `<title>` tag and meta description
- Canonical URL and hreflang alternates
- Open Graph tags (Facebook, LinkedIn) and Twitter Card tags
- Structured data (JSON-LD): `TravelAgency` (home), `ItemList` of destinations, `Product`/`Offer` packages
- Semantic HTML structure and descriptive alt text
- robots.txt, sitemap.xml

---

## Security

- TypeScript strict mode prevents type-related vulnerabilities
- No `innerHTML` usage (XSS prevention)
- `rel="noopener noreferrer"` on external links
- Content Security Policy headers
- Input sanitization on form fields

---

## CI/CD Pipeline

### GitHub Actions

| Workflow | Trigger | Purpose |
|---|---|---|
| **Deploy** | Push to `main` | Build and deploy to GitHub Pages |
| **CodeQL** | Push/PR to `main` | Security vulnerability scanning |
| **Lighthouse** | PR to `staging` | Performance, SEO, a11y audit |

### Branch Flow

```
main (production)
  └── staging (pre-production)
        ├── feature/* (new features)
        ├── fix/* (bug fixes)
        ├── refactor/* (code improvements)
        └── docs/* (documentation)
```

---

## Development Workflow

This project follows **Spec-Driven Development**:

1. **Identify** - Issue or feature identified
2. **Spec** - Written specification created (see SPEC.md)
3. **Review** - Client reviews spec
4. **Approve** - Client approves
5. **Implement** - Code written on feature branch
6. **Verify** - Changes verified against spec

**No code is written without an approved spec.**

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Write spec for your change
4. Get spec approved
5. Commit your changes (`git commit -m 'feat(scope): add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Commit Convention

```
type(scope): description

# Types: feat, fix, refactor, docs, chore, style, test
# Scopes: html, scss, ts, ci, a11y, seo, tts
```

---

## Author

**Jör** - [GitHub](https://github.com/Semi-dios)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with spec-driven development methodology
- Follows ITCSS architecture principles
- Implements SOLID, DRY, and POO principles
- Targets WCAG 2.2 AA accessibility standards
- Uses Web Speech API for text-to-speech feature
