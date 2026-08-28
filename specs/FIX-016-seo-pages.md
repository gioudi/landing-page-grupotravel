# SPEC: FIX-016 — SEO Landing Pages (Destinations & Packages)

**Status:** Approved → Implemented
**Author:** Son of Ivaldi
**Date:** 2026-08-27
**Branch:** `feature/seo-pages` (based on `feature/theme-toggle`)

---

## Problem

The site is a **single-page** landing (only `index.html`). A one-page site offers almost
no long-tail search surface area for a travel agency whose core business is *destinations*
and *packages*. There is currently no crawlable, dedicated page to rank for queries like
*"paquetes turísticos a Cartagena"* or *"tours a San Andrés"*.

The build (`vite.config.ts`) is configured for a **single entry** (`index: 'index.html'`),
so there is no infrastructure for additional static pages yet.

---

## Why

- **SEO:** dedicated listing pages give each URL a clear keyword focus, a unique
  `<title>`/meta description, and targeted structured data (`ItemList`, `Product`/`Offer`)
  — a standard, high-leverage SEO pattern for travel sites.
- **Conversion:** the landing page is thin on actual *offerings*. Separate Destinations and
  Packages pages present concrete inventory, prices, and "includes", which directly supports
  the client's revenue goal.
- **Crawlability:** static HTML pages are crawled and indexed as-is (default `es` content;
  see SEO caveat in FIX-014).

---

## Solution

Turn Vite into a **multi-page** build and add two new static SEO pages that fully reuse the
existing design system, i18n, theme toggle, accessibility, and TTS infrastructure.

### Multi-page Vite config (`vite.config.ts`)

Extend `rollupOptions.input` to three entries:

```ts
input: {
  main: 'index.html',
  destinations: 'destinations.html',
  packages: 'packages.html',
}
```

Each page is its own HTML entry with its own `<title>`, meta description, canonical, hreflang,
Open Graph, Twitter Card, and structured data. All pages share:
- the same design tokens / SCSS (via `main.ts` importing `style.scss`),
- the same scripts (`main.ts`: theme + i18n + TTS + nav + scroll),
- the FOUC-prevention inline theme script (from FIX-015),
- the `skip-link`, `main-nav` (brand + hamburger + `#nav-links` + `.nav-actions` with lang
  switcher + theme toggle), TTS players, and footer.

### `destinations.html`

- Body: a hero + a list of destinations (Cartagena, San Andrés, Medellín, Santa Marta, Paris,
  Cancún). Each destination card shows name, tagline, and a short description.
- SEO: unique title/description, canonical `/destinations.html`, hreflang alternates, and
  `ItemList` structured data of the destinations.

### `packages.html`

- Body: a hero + a list of travel packages. Each package card shows name, short description,
  duration, and a price.
- SEO: unique title/description, canonical `/packages.html`, hreflang alternates, and
  `Product`/`Offer` structured data per package.

### i18n (`src/ts/i18n.ts`)

Add new namespaced keys (`dest.*`, `pkg.*`, `nav.home`, `nav.destinations`) for all three
locales (es/en/de) so every string on the new pages is localized. Reuse existing shared keys
where possible (`nav.packages`, `nav.contact`, `lang.*`, `tts.*`, `a11y.skip`, `footer.*`).

### Nav on subpages

The nav on the new pages links between pages instead of in-page anchors:
- Home → `./index.html`
- Destinations → `./destinations.html`
- Packages → `./packages.html`
- Contact → `./index.html#contact`

Existing anchor behavior on `index.html` is unchanged. `smooth-scroll.ts` / `navigation.ts` /
`scroll-effects.ts` are all null-safe, so they run without error on every page.

---

## Design Pattern Used

**Composite / shared chrome** — every page is assembled from the same layout building blocks;
each page contributes only its unique content. **Module** — one i18n dictionary and one entry
script serve all pages.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | One HTML page per concern (landing / destinations / packages); shared logic stays in `src/ts`. |
| **O**pen/Closed | Adding a page = add an HTML entry + an `input` key; no change to shared JS. |
| **D**RY | Nav, footer, i18n, theme, TTS are written once and included by every page. |
| **D**ependency Inversion | Pages depend on the i18n dictionary interface, not hardcoded strings. |

---

## CSS Architecture

No structural ITCSS change. Page-specific cards/tiles are styled in the shared page stylesheet
(`sass/pages/`) so all three pages keep a consistent look.

---

## SEO Impact

Each new URL has its own canonical, title/meta, Open Graph, Twitter, hreflang, and structured
data (`ItemList`, `Product`/`Offer`). They target distinct long-tail queries. Caveat (from
FIX-014): runtime i18n means crawlers index the default `es` content; per-language separate
URLs remain future work.

---

## Performance Impact

Two additional small HTML documents. Each pulls the same single CSS + JS bundle (cached after
the first page). Negligible incremental cost.

---

## Security

- No `innerHTML`; all i18n rendering uses `textContent` / attribute assignment.
- All external preloads/styles reuse the already-whitelisted origins (fonts, cdnjs).
- Structured data is static JSON authored in the HTML (no user input).

---

## What We Avoid

1. Adding a router/framework or code-splitting — static MPA with Vite's multi-page support only.
2. Duplicating layout logic — pages reuse shared modules.
3. Mixing in theme (FIX-015) or i18n (FIX-014) work — this spec is pages only (those features
   are assumed present as dependencies).

---

## Acceptance Criteria

- [ ] `npm run build` emits `index.html`, `destinations.html`, `packages.html` (plus assets).
- [ ] Each page has a unique title, meta description, canonical, hreflang, and structured data.
- [ ] Language switcher and theme toggle work identically across all three pages.
- [ ] Nav links cross-link between pages and to `index.html#contact`.
- [ ] TTS reads section text on the new pages in the active language.
- [ ] All visible content on the new pages translates for es/en/de.
- [ ] `npm run typecheck` and `npm run build` pass.
- [ ] Local serve confirms all three pages render without console errors.

---

## Status

Implementing on `feature/seo-pages`.
