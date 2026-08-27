# SPEC: FIX-010 — TypeScript + Vite Build Migration

**Status:** Approved → Implemented
**Author:** Son of Ivaldi
**Date:** 2026-08-27
**Branch:** `feature/tech-debt-4-goals`

---

## Problem

The project still runs plain JavaScript (`dist/js/*.js`) loaded via multiple `<script>` tags, and depends on **jQuery** for all interactivity (navigation, smooth scroll, scroll effects, animations). There is no build tooling: no `package.json`, no `tsconfig.json`, no `vite.config.ts`, and no `src/` directory. FR-13 (TypeScript, strict), FR-14 (Vite), NFR-08 (TS strict mode), and OPT-01 (remove jQuery) are all unmet — these are the **mandatory** items in CONTRACT.md rule #9 and SPEC §3.2.

The compiled `sass/style.css` is also committed by hand and referenced directly by `index.html`.

---

## Why

- **Mandatory stack:** CONTRACT and SPEC require TypeScript (strict) + Vite. This is the biggest architectural gap and blocks full compliance.
- **jQuery costs ~87KB** and is unnecessary for the small amount of interactivity on the page (OPT-01 targets -67% JS size).
- **No build pipeline** means no tree-shaking, no minification, no type-checking — OPT-08 (tree-shaking/minify) is impossible today.
- **Hand-committed CSS** (`sass/style.css`) contradicts the git model; once Vite compiles SCSS to `dist`, the source CSS/MAP can be untracked (deferred CQ-02 resolved properly).

---

## Solution

Introduce a Vite-powered TypeScript build that compiles both TS and SCSS, and update `index.html` to consume the built bundle. Remove jQuery entirely.

### New files
- `package.json` — deps (no runtime deps; devDeps: `vite`, `typescript`, `sass`) + scripts (`dev`, `build`, `preview`, `typecheck`).
- `tsconfig.json` — TypeScript `strict: true`.
- `vite.config.ts` — entry `index.html`, alias for `public`/image handling, output to `dist`.
- `src/ts/main.ts` — app entry that imports the SCSS and wires all modules.
- `src/ts/navigation.ts` — hamburger menu toggle + Escape + resize reset (**was `main.js`**).
- `src/ts/smooth-scroll.ts` — smooth scroll to anchors (**was `scroll.js`**).
- `src/ts/scroll-effects.ts` — fixed navbar + scroll-triggered animations (**was `nav.js` + `astonish.js`**).
- `src/ts/tts-player.ts` — TTS singleton (**was `tts.js`**).
- `.editorconfig` moved is FIX-013 (do not mix specs).

### Rewrites
All jQuery callsites replaced with native DOM APIs:
- `$(sel).on('click', ...)` → `document.querySelectorAll` + `addEventListener`.
- `$window.scrollTop()` / `offset().top` → `window.scrollY` / `getBoundingClientRect().top + window.scrollY`.
- `$this.data('animation')` → `el.dataset.animated` (fixes latent `data-animation` vs `data-animated` mismatch).

### SCSS handling
- Vite compiles `sass/style.scss` → CSS into the build. Vite resolves the modern `@use`/ITCSS partial paths.
- `dist/` becomes **Vite's output directory** (replacing the hand-built `dist/`).
- `index.html` `./sass/style.css` link → replaced by the Vite-built CSS (via `build.rollupOptions.input` on `index.html`), and all 5 `<script>` tags → single Vite `main.ts` module script.
- `sass/style.css` + `sass/style.css.map` are added to `.gitignore` (already ignored) and **untracked** now that Vite builds them (`git rm --cached`).
- All old `dist/js/*.js` and `dist/img/*.png` build artifacts untracked.

### Deployment pipeline (`pages.yml`)
- Because `dist/` is gitignored (Vite output), the whole-repo Pages upload would no longer contain the built site. `pages.yml` now **builds** via `npm ci && npm run build` and uploads `dist/` (still `upload-pages-artifact@v4`, `deploy-pages@v4`).
- `robots.txt` + `sitemap.xml` moved from repo root into `public/` so Vite copies them into `dist/` for deployment.

### Demo/site behavior preserved
Navigation hamburger, fixed navbar, smooth scroll, scroll animations, and TTS must all behave exactly as before.

---

## Design Pattern Used

**Facade** — `main.ts` exposes a single entry behind which modules coordinate; **Module** — each `.ts` file is a self-contained unit; **Singleton** — TTS player.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | One TS module per concern (navigation, scroll, effects, TTS). |
| **I**nterface Segregation | TTS exposes only `play/pause/stop/setRate`. |
| **D**ependency Inversion | Modules depend on DOM/Web Speech interfaces, not concrete jQuery. |
| **D**RY | Shared helper logic extracted; no repeated jQuery patterns. |

---

## CSS Architecture

No ITCSS structure change. Vite compiles the existing ITCSS partials; the compiled CSS is identical. The `sass/style.css` artifact is no longer committed (build output only).

---

## SEO Impact

No direct change. Cleaner, faster, smaller JS bundle indirectly improves Core Web Vitals (smaller render-blocking payload).

---

## Performance Impact

| Metric | Before | After |
|---|---|---|
| JS size | ~130KB (jQuery 87KB + custom) | ~15–30KB minified + tree-shaken (OPT-01, OPT-08) |
| HTTP requests | 5 `<script>` + 1 CSS | 1 JS + 1 CSS |
| File weight | over budget | within <500KB total |
| Build | none | minified + tree-shaken + type-checked |

---

## Security

- No `innerHTML` used (XSS avoided) — all changes use `textContent`/`addEventListener`.
- TypeScript `strict` catches type-related vulnerabilities (NFR-08).
- `npm audit` can now run in CI (deps introduced).

---

## What We Avoid

1. Continuing to violate the mandatory TypeScript/Vite stack (CONTRACT rule #9).
2. Shipping 87KB of unused jQuery (OPT-01).
3. Committed build artifacts and source maps leaking source (`style.css`, `.map`).
4. The `data-animation`/`data-animated` bug causing wrong animation names.

---

## Acceptance Criteria

- [ ] `package.json`, `tsconfig.json`, `vite.config.ts`, `src/ts/*` exist.
- [ ] `npm run typecheck` passes (TypeScript strict).
- [ ] `npm run build` succeeds; output in `dist/`.
- [ ] `dist/` contains hashed JS + CSS; built JS has no jQuery.
- [ ] `index.html` references the built bundle (single module script + CSS), no jQuery `<script>`.
- [ ] `sass/style.css` + `.map` untracked (gitignored).
- [ ] Navigation, fixed navbar, smooth scroll, scroll animations, TTS all functional in browser.
- [ ] Visual regression identical.

---

## Status

Implemented on `feature/tech-debt-4-goals`. Awaiting review.
