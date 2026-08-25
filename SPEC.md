# SPECIFICATION DOCUMENT
## Landing Page Grupo Travel

**Version:** 2.0
**Date:** 2026-08-25
**Author:** Son of Ivaldi
**Client:** Jör

---

## 1. PROJECT SPECIFICATION

### 1.1 Purpose
A responsive landing page for Grupo Travel, a travel agency based in Bogota, Colombia. The page serves as the company's digital storefront to showcase travel packages and collect customer inquiries.

### 1.2 Technology Stack

| Layer | Technology | Version | Status |
|---|---|---|---|
| Markup | HTML5 | 5.2 | Current |
| Styling | SCSS (ITCSS) | Dart Sass 1.x | **Refactor required** |
| Scripts | TypeScript | 5.x | **Mandatory** |
| Build Tool | Vite | 6.x | **Mandatory** |
| Hosting | GitHub Pages | - | Current |
| CI/CD | GitHub Actions | - | **Update required** |

### 1.3 Target Environment
- **Browsers:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Devices:** Mobile (320px+), Tablet (768px+), Desktop (992px+)
- **Language:** Spanish (es)

---

## 2. REQUIREMENTS SPECIFICATION

### 2.1 Functional Requirements

| ID | Requirement | Priority | Status |
|---|---|---|---|
| FR-01 | Responsive navigation with hamburger menu on mobile | High | Partial |
| FR-02 | Hero section with background image and title | High | Implemented |
| FR-03 | About section with company description | High | Implemented (lorem ipsum) |
| FR-04 | Packages/promotions section | Medium | Implemented (lorem ipsum) |
| FR-05 | Contact form with name, email, message | High | **Broken** (no submit, no action) |
| FR-06 | Google Maps embed showing Bogota location | Low | Implemented |
| FR-07 | Social media links in footer | Medium | Implemented (empty hrefs) |
| FR-08 | Smooth scroll to sections | Medium | Implemented |
| FR-09 | Scroll-triggered animations | Low | Implemented |
| FR-10 | Fixed navbar on scroll | Medium | Implemented |
| FR-11 | Text-to-speech player per section (user click) | High | **Missing** |
| FR-12 | Skip-to-content link for keyboard users | High | **Missing** |
| FR-13 | TypeScript source files | High | **Missing** |
| FR-14 | Vite build pipeline | High | **Missing** |

### 2.2 Non-Functional Requirements

| ID | Requirement | Target | Status |
|---|---|---|---|
| NFR-01 | First Contentful Paint | < 1.5s | Not measured |
| NFR-02 | Largest Contentful Paint | < 2.5s | Not measured |
| NFR-03 | Total page weight | < 500KB | Exceeded (jQuery + Animate.css) |
| NFR-04 | Lighthouse Performance | > 90 | Not measured |
| NFR-05 | Lighthouse SEO | > 90 | Will fail (no meta description) |
| NFR-06 | Lighthouse Accessibility | > 90 | Will fail (missing labels, no lang) |
| NFR-07 | WCAG 2.2 AA compliance | Pass | **Mandatory** |
| NFR-08 | TypeScript strict mode | Enabled | **Mandatory** |

### 2.3 SEO Requirements

| ID | Requirement | Status |
|---|---|---|
| SEO-01 | Unique title tag | **Fail** - Generic "Landing Travel" |
| SEO-02 | Meta description (150-160 chars) | **Fail** - Empty |
| SEO-03 | Open Graph tags | **Fail** - Missing |
| SEO-04 | Semantic HTML structure | **Fail** - divs instead of sections |
| SEO-05 | Image alt attributes | **Fail** - Some empty |
| SEO-06 | robots.txt | **Fail** - Missing |
| SEO-07 | sitemap.xml | **Fail** - Missing |
| SEO-08 | Canonical URL | **Fail** - Missing |
| SEO-09 | Structured data (JSON-LD) | **Fail** - Missing |
| SEO-10 | Favicon | **Fail** - Missing |
| SEO-11 | Twitter Card tags | **Fail** - Missing |

### 2.4 Accessibility Requirements (WCAG 2.2 AA)

| ID | Requirement | Status |
|---|---|---|
| A11Y-01 | html lang="es" attribute | **Fail** - Missing |
| A11Y-02 | Form labels associated with inputs | **Fail** - for/id mismatch |
| A11Y-03 | Keyboard navigable | **Fail** - No focus management |
| A11Y-04 | ARIA labels on interactive elements | **Fail** - Missing |
| A11Y-05 | Color contrast ratio >= 4.5:1 | **Fail** - Teal on dark |
| A11Y-06 | Skip to main content link | **Fail** - Missing |
| A11Y-07 | Alt text on all images | **Fail** - Some empty |
| A11Y-08 | Focus visible indicators | **Fail** - Outlines removed |
| A11Y-09 | Touch targets >= 24x24px | **Fail** - Not tested |
| A11Y-10 | No keyboard traps | **Fail** - Not tested |
| A11Y-11 | Text-to-speech player accessible | **Missing** |
| A11Y-12 | ARIA live regions for TTS state | **Missing** |

### 2.5 Text-to-Speech Requirements

| ID | Requirement | Status |
|---|---|---|
| TTS-01 | Per-section click to listen | **Missing** |
| TTS-02 | Spanish voice (es-CO or es-ES) | **Missing** |
| TTS-03 | Play / Pause / Stop controls | **Missing** |
| TTS-04 | Speed control (1x, 1.25x, 1.5x, 2x) | **Missing** |
| TTS-05 | Progress bar with reading position | **Missing** |
| TTS-06 | ARIA labels on all player controls | **Missing** |
| A11Y-07 | Keyboard operable (Tab, Enter, Space) | **Missing** |
| TTS-08 | Progressive enhancement (graceful fallback) | **Missing** |
| TTS-09 | Zero backend, Web Speech API only | **Missing** |
| TTS-10 | Player visually hidden from screen readers when not focused | **Missing** |

---

## 3. ARCHITECTURE SPECIFICATION

### 3.1 Current File Structure
```
landing-page-grupotravel/
├── .github/workflows/
│   ├── pages.yml          # Deploy to GitHub Pages
│   └── codeql.yml         # Security scanning (broken)
├── dist/
│   ├── img/
│   │   ├── city.png
│   │   ├── city2.png
│   │   └── city3.png
│   └── js/
│       ├── astonish.js    # Scroll animations
│       ├── main.js        # Mobile menu toggle
│       ├── nav.js         # Fixed navbar
│       └── scroll.js      # Smooth scroll
├── sass/
│   ├── base/
│   │   ├── _base.scss     # Imports all base partials
│   │   ├── _container.scss
│   │   ├── _default.scss  # TOO LARGE - 246 lines, mixed concerns
│   │   ├── _grid.scss     # TOO LARGE - 317 lines, DRY violations
│   │   ├── _mixin.scss
│   │   └── _variables.scss
│   ├── pages/
│   │   ├── _index.scss    # All page styles
│   │   └── _page.scss     # Just imports _index
│   ├── style.css          # COMPILED - should not be committed
│   ├── style.css.map      # SOURCE MAP - should not be committed
│   └── style.scss         # Entry point
├── index.html
├── README.md
└── CONTRACT.md
```

### 3.2 Target File Structure (Proposed)
```
landing-page-grupotravel/
├── .github/workflows/
│   ├── pages.yml
│   └── codeql.yml
├── src/
│   ├── img/
│   │   ├── city.webp
│   │   ├── city2.webp
│   │   └── city3.webp
│   ├── ts/
│   │   ├── navigation.ts      # Hamburger menu toggle
│   │   ├── smooth-scroll.ts   # Smooth scroll to anchors
│   │   ├── scroll-effects.ts  # Fixed navbar + scroll animations
│   │   └── tts-player.ts      # Text-to-speech per section
│   └── scss/
│       ├── settings/
│       │   └── _variables.scss
│       ├── tools/
│       │   └── _mixins.scss
│       ├── generic/
│       │   └── _reset.scss
│       ├── elements/
│       │   ├── _typography.scss
│       │   └── _base.scss
│       ├── objects/
│       │   ├── _container.scss
│       │   └── _grid.scss
│       ├── components/
│       │   ├── _navbar.scss
│       │   ├── _buttons.scss
│       │   ├── _forms.scss
│       │   ├── _hamburger.scss
│       │   ├── _tts-player.scss
│       │   └── _skip-link.scss
│       ├── utilities/
│       │   └── _helpers.scss
│       └── style.scss
├── dist/                   # Generated, gitignored
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── .editorconfig
├── SPEC.md
├── CONTRACT.md
└── README.md
```

### 3.3 ITCSS SCSS Architecture

| Layer | Purpose | Files |
|---|---|---|
| Settings | Variables, config | `_variables.scss` |
| Tools | Mixins, functions | `_mixins.scss` |
| Generic | Resets, normalize | `_reset.scss` |
| Elements | Bare HTML elements | `_typography.scss`, `_base.scss` |
| Objects | Layout patterns | `_container.scss`, `_grid.scss` |
| Components | UI components | `_navbar.scss`, `_buttons.scss`, `_forms.scss`, `_tts-player.scss` |
| Utilities | Helper classes | `_helpers.scss` |

### 3.4 Design Patterns

| Pattern | Usage | Location |
|---|---|---|
| Observer | Scroll events, TTS state changes | `scroll-effects.ts`, `tts-player.ts` |
| Module | Each .ts file is a self-contained module | All `src/ts/` files |
| Singleton | TTS player (one instance per page) | `tts-player.ts` |
| Strategy | TTS voice selection (fallback voices) | `tts-player.ts` |
| Template Method | ITCSS layer structure | `src/scss/` |

### 3.5 SOLID Principles Application

| Principle | Application |
|---|---|
| **S**ingle Responsibility | Each TS file handles one concern. Each SCSS partial handles one component. |
| **O**pen/Closed | TTS player accepts new voice strategies without modifying core logic. |
| **L**iskov Substitution | N/A for static site (no class inheritance). |
| **I**nterface Segregation | TTS player exposes minimal API: play(), pause(), stop(), setSpeed(). |
| **D**ependency Inversion | TTS player depends on Web Speech API interface, not concrete voice implementation. |

### 3.6 DRY Principles

| Violation | Current | Fix |
|---|---|---|
| Grid columns repeated 3x (sm, md, lg) x 2 (flex, grid) | 317 lines in `_grid.scss` | Use `@for` loop to generate |
| Button styles duplicated | Teal and purple variants identical except color | Use CSS custom properties or mixin with parameter |
| Wrapper classes share 90% of code | `.content-wrapper`, `.content-wrapper-sm`, `.content-wrapper-lg` | Single mixin with size parameter |

---

## 4. ERROR SPECIFICATION

### 4.1 Critical Errors (Must Fix)

| ID | File | Line | Error | Impact |
|---|---|---|---|---|
| ERR-01 | index.html | 54 | Unclosed `<li>` tag | DOM parsing error, broken nav |
| ERR-02 | index.html | 110 | `for="lasttName"` typo | Label not bound to input |
| ERR-03 | index.html | 115 | `type="text"` for email | No email validation |
| ERR-04 | index.html | 126 | `<a href="">` for form submit | Form never submits |
| ERR-05 | index.html | 151 | `src="js/menu.js"` | 404 - file does not exist |
| ERR-06 | index.html | 2 | Missing `lang="es"` | Accessibility violation |
| ERR-07 | index.html | 8 | Empty meta description | SEO penalty |
| ERR-08 | index.html | 53 | `#reserve` link, no target section | Broken navigation |

### 4.2 Code Quality Errors

| ID | File | Line | Error | Severity |
|---|---|---|---|---|
| CQ-01 | main.js | 10 | `console.log` in production | Low |
| CQ-02 | style.css.map | - | Committed to repo | Medium |
| CQ-03 | _default.scss | 1-246 | Multiple responsibilities | High |
| CQ-04 | _grid.scss | 1-317 | DRY violation (repeated patterns) | High |
| CQ-05 | codeql.yml | 35 | Empty language matrix | Medium |

---

## 5. PERFORMANCE SPECIFICATION

### 5.1 Current Budget

| Metric | Target | Estimated Current | Gap |
|---|---|---|---|
| Total Transfer Size | < 500KB | ~800KB+ | +60% over budget |
| JavaScript Size | < 50KB | ~130KB (jQuery 87KB + custom 43KB) | +160% over budget |
| CSS Size | < 50KB | ~25KB | Within budget |
| Image Size | < 200KB total | Unknown (PNGs, likely large) | Unknown |
| HTTP Requests | < 10 | 12+ (CDN + local) | +20% over budget |
| Time to Interactive | < 3s | Unknown | Not measured |

### 5.2 Optimization Targets

| ID | Action | Expected Savings | Percentage |
|---|---|---|---|
| OPT-01 | Remove jQuery, rewrite in TypeScript | -87KB | -67% JS size |
| OPT-02 | Replace Animate.css with CSS keyframes | -60KB | -46% total size |
| OPT-03 | Remove Normalize.css (custom reset exists) | -7KB | -5% total size |
| OPT-04 | Convert PNG to WebP | -50-70% image size | -50-70% images |
| OPT-05 | Add lazy loading to images | Faster FCP | -200-400ms FCP |
| OPT-06 | Consolidate Google Fonts request | Fewer HTTP requests | -1-2 requests |
| OPT-07 | Add preconnect for CDN domains | -100-300ms | -10-15% load time |
| OPT-08 | Vite tree-shaking + minification | -30-50% custom JS | -30-50% custom JS |

---

## 6. SECURITY SPECIFICATION

### 6.1 Attack Vectors Prevented

| Vector | Prevention |
|---|---|
| XSS (Cross-Site Scripting) | TypeScript strict mode, no innerHTML, textContent only |
| Clickjacking | X-Frame-Options header in meta tag |
| MIME sniffing | X-Content-Type-Options: nosniff in meta tag |
| Open redirect | Validate all external links, rel="noopener noreferrer" |
| Form injection | Input sanitization, server-side validation (when backend added) |
| Dependency vulnerabilities | npm audit in CI pipeline |

### 6.2 Security Headers (Meta Tags)

```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
```

---

## 7. BRANCHING SPECIFICATION

### 7.1 Branch Strategy

```
main (protected)
  └── staging
        ├── fix/html-errors
        ├── fix/form-broken
        ├── feature/add-seo-tags
        ├── feature/accessibility
        ├── feature/tts-player
        ├── refactor/scss-itcss
        ├── refactor/remove-jquery
        ├── refactor/typescript-migration
        └── chore/add-vite-build
```

### 7.2 Branch Rules

| Rule | Description |
|---|---|
| `main` | Production only. Protected. Requires PR + review. |
| `staging` | Pre-production. All feature branches merge here first. |
| `fix/*` | Bug fixes. Branch from `staging`. |
| `feature/*` | New functionality. Branch from `staging`. |
| `refactor/*` | Code restructure. Branch from `staging`. |
| `chore/*` | Tooling, config. Branch from `staging`. |
| `docs/*` | Documentation only. Branch from `staging`. |

### 7.3 Commit Convention

```
type(scope): description

# Examples:
fix(html): close unclosed li tag in navigation
feat(seo): add open graph meta tags
refactor(scss): split default partial into focused files
chore(ci): update github actions to latest versions
feat(tts): add per-section text-to-speech player
```

---

## 8. SPEC TEMPLATE

Every feature, fix, or bug solution must follow this template:

```
## SPEC: [ID] - [Title]

### Problem
What is broken, missing, or needed.

### Why
Business reason, user impact, compliance requirement.

### Solution
Exact implementation proposed.

### Design Pattern Used
Which pattern applies (Observer, Module, Factory, etc.) and why.

### POO / SOLID / DRY
Which principles apply, how they guide the solution.

### CSS Architecture
How it fits into ITCSS, which layer, which file.

### SEO Impact
How this change affects search ranking, crawlability, indexing.

### Performance Impact
Measurable improvement: file size reduction, request reduction,
load time improvement, with percentages.

### Security
What attack vector is prevented (XSS, injection, clickjacking, etc.)

### What We Avoid
Specific problems this solution prevents.

### Acceptance Criteria
How we verify the spec is met.
```

---

## 9. CHANGE LOG

| Date | Version | Author | Change |
|---|---|---|---|
| 2026-08-25 | 1.0 | Son of Ivaldi | Initial specification created |
| 2026-08-25 | 2.0 | Son of Ivaldi | Added TypeScript, TTS, WCAG 2.2 AA, ITCSS, spec template, security, design patterns, SOLID/DRY analysis |

---

*This specification is the source of truth. All changes must reference a spec ID.*
