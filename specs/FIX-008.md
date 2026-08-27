# SPEC: FIX-008 — SEO Optimization

**Status:** Draft → Approved → Implemented
**Author:** Son of Ivaldi
**Date:** 2026-08-27
**Branch:** `feature/seo-optimization`
**Canonical URL:** `https://gioudi.github.io/landing-page-grupotravel/`

---

## Problem

The page meets only 2 of the 11 SEO requirements defined in SPEC.md §2.3. The following are missing or failing:

| ID | Requirement | Status |
|---|---|---|
| SEO-01 | Unique descriptive title | **Fail** — generic "Landing Travel" |
| SEO-02 | Meta description 150–160 chars | **Warning** — present but 145 chars |
| SEO-03 | Open Graph tags | **Missing** |
| SEO-04 | Semantic HTML structure | **Partial** — divs instead of sections |
| SEO-06 | robots.txt | **Missing** |
| SEO-07 | sitemap.xml | **Missing** |
| SEO-08 | Canonical URL | **Missing** |
| SEO-09 | Structured data (JSON-LD) | **Missing** |
| SEO-10 | Favicon | **Missing** |
| SEO-11 | Twitter Card tags | **Missing** |

These gaps hurt search ranking, social sharing, rich-result eligibility, and click-through rate.

---

## Why

- A generic `<title>` and missing description produce weak, truncated search snippets → lower CTR.
- No Open Graph / Twitter tags → uncontrolled or blank previews on Facebook, WhatsApp, Telegram, X, LinkedIn.
- No canonical URL → duplicate-content dilution risks.
- No JSON-LD → Google cannot surface travel-agency rich results / knowledge panel.
- No robots.txt / sitemap.xml → slower, less predictable crawl and indexing.
- No favicon → missing brand signal in browser tabs.
- `div`-based structure → weaker content outline for crawlers and screen readers.

---

## Solution

Apply 9 SEO fixes plus 2 repo-hygiene trims:

### A. `index.html` `<head>`

1. **Title (SEO-01):** `<title>Grupo Travel | Agencia de Viajes en Bogotá, Colombia</title>`
2. **Meta description (SEO-02):** rewrite to 150–160 chars, keep location + value proposition.
3. **Open Graph (SEO-03):** `og:title`, `og:description`, `og:type=website`, `og:url`, `og:image`, `og:locale=es_CO`, `og:site_name`.
4. **Twitter Card (SEO-11):** `summary_large_image` + `twitter:title`, `twitter:description`, `twitter:image`.
5. **Canonical (SEO-08):** `<link rel="canonical" href="https://gioudi.github.io/landing-page-grupotravel/">`
6. **JSON-LD (SEO-09):** `TravelAgency` schema — name, address (Bogotá), url, image, description, priceRange, plus placeholder contact (`telephone: "+57 600 000 0000"`, `email: "info@grupotravel.com"`).
7. **Favicon (SEO-10):** inline SVG data-URI — brand mark, zero additional request.

### B. Semantic HTML (SEO-04)

Convert the three `data-tts` content `<div>` blocks into `<section>` elements with an `aria-labelledby` pointing to their heading `id`. Keep the TTS player inside each `<section>`. Existing classes and IDs are preserved so the compiled CSS output is unchanged (visual-regression safe).

### C. Site-level files (repo root; `pages.yml` uploads the full repo so these deploy)

8. **`robots.txt` (SEO-06):** allow all crawlers + `Sitemap:` line.
9. **`sitemap.xml` (SEO-07):** single `<url>` at canonical with `<lastmod>`.

### D. Scope trims folded into this spec

- **Fix "Descargar" dead link:** `index.html` `<a href="#" class="btn btn-outline-purple">Descargar</a>` → pointed to `#contact`. Low risk, no dependents.

### Out of scope (deferred)
- **CQ-02 untrack `sass/style.css`:** removed from this spec. `index.html` links `./sass/style.css`, and GitHub Pages uploads the whole repo, so the compiled stylesheet must stay tracked until the Vite pipeline produces a committed `dist` CSS. Re-file `git rm --cached sass/style.css` (and the map) under the future `refactor/vite-typescript` spec.
- OPT-04 PNG→WebP (~9.8MB images, biggest CRUX/LCP blocker) — separate `refactor/image-webp`.
- FR-13/14 TypeScript + Vite, OPT-01 jQuery removal — separate `refactor/vite-typescript`.

---

## Design Pattern Used

**Template Method** — a standardized SEO `<head>` scaffold reused consistently across the page; **Progressive Enhancement** — all added meta tags are additive and degrade gracefully with no behavior change.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | Each meta tag / file serves exactly one SEO concern. |
| **D**RY | Canonical, `og:url`, JSON-LD `url`, and `sitemap.xml` all derive from one origin constant (`https://gioudi.github.io/landing-page-grupotravel/`). |
| **O**pen/Closed | Adding another social network = add one meta tag; no logic changes. |

---

## CSS Architecture

No SCSS changes. The semantic `<section>` swap reuses existing class and ID selectors, so the compiled `style.css` output is identical (visual regression is expected to be a no-op).

---

## SEO Impact — Improvements Achieved

| Item | Improvement |
|---|---|
| **Title** | Generic "Landing Travel" → descriptive, keyword-rich (~49 chars). Clearer SERP label, higher relevance and CTR. |
| **Meta description** | 145 → 150–160 chars. Full, intentional snippet instead of truncation → **est. +15–20% CTR**. |
| **Open Graph** | Rich controlled preview on Facebook/WhatsApp/LinkedIn/Telegram → higher engagement on shares. |
| **Twitter Card** | Large-image summary card on X → more visible shared links. |
| **Canonical** | Single authoritative URL; prevents duplicate-content dilution; consolidates ranking signals. |
| **JSON-LD TravelAgency** | Vector for rich results / knowledge panel; unambiguous entity typing. |
| **robots.txt** | Explicit crawl directives + direct sitemap discovery. |
| **sitemap.xml** | Guaranteed discovery & indexing of the single canonical page. |
| **Favicon** | Brand recognition in tabs; data-URI adds **0 bytes / 0 requests**. |
| **Semantic `<section>`** | Clearer content outline for crawlers and improved landmark structure for assistive tech. |

---

## Performance Impact

All changes are `<head>` metadata + small text files:

- HTML `<head>` additions ≈ **1–2KB** → **<0.3% of page weight**.
- `robots.txt` + `sitemap.xml` ≈ **1KB total**.
- Favicon via inline SVG data-URI → **-1 HTTP request** versus a separate favicon file.

No JavaScript, images, or stylesheets added. Net effect on load is negligible; crawlability and rich-result potential improve.

---

## Security

- No `innerHTML`, no runtime injection — JSON-LD and meta tags are static escaped text.
- Social links already carry `rel="noopener noreferrer"` (unchanged).
- `og:image` uses a same-origin relative asset → no open-redirect surface.
- No new attack surface introduced; purely declarative markup.

---

## What We Avoid

1. Duplicate-content penalty (canonical).
2. Poor or blank social previews hurting share CTR.
3. Missing eligibility for rich results (JSON-LD).
4. Slow / unpredictable discovery of the only page (robots + sitemap).
5. Generic-title SEO penalty.
6. Dead interactive "Descargar" element (a11y + UX).

---

## Acceptance Criteria

- [ ] Title unique & descriptive (~49–60 chars), contains "Grupo Travel" and "Bogotá".
- [ ] Meta description is 150–160 characters.
- [ ] Open Graph tags present: `title`, `description`, `type`, `url`, `image`, `locale`, `site_name`.
- [ ] Twitter Card tags present (`summary_large_image`).
- [ ] `<link rel="canonical">` = `https://gioudi.github.io/landing-page-grupotravel/`
- [ ] JSON-LD `@type: TravelAgency` is valid (validated), with url + placeholder contact.
- [ ] `robots.txt` present with a `Sitemap:` line.
- [ ] `sitemap.xml` is well-formed XML and references the canonical URL.
- [ ] Favicon renders in the browser tab (no extra HTTP request).
- [ ] `data-tts` content blocks converted to `<section aria-labelledby="">`; TTS player still functional.
- [ ] "Descargar" element no longer has an empty `#` href.
- [ ] `sass/style.css` remains tracked and unchanged (deferred to Vite pipeline).
- [ ] Visual regression: page renders identically.

---

## Status

Implemented on `feature/seo-optimization`. Awaiting review + merge to `staging`.
