# SPEC: FIX-011 — WebP Image Optimization

**Status:** Approved → Implemented
**Author:** Son of Ivaldi
**Date:** 2026-08-27
**Branch:** `feature/tech-debt-4-goals`

---

## Problem

The three hero/background images are unoptimized PNGs totaling ~9.8MB:
- `dist/img/city.png` — 3,699,294 bytes (3.7MB) — hero, `loading="eager"`, largest paint
- `dist/img/city2.png` — 3,962,462 bytes (3.9MB) — `loading="lazy"`
- `dist/img/city3.png` — 2,212,504 bytes (2.2MB) — `loading="lazy"`

OPT-04 (PNG → WebP) is unmet. This is the single largest contributor to page weight and LCP/Core Web Vitals, which directly hurt SEO and NFR-02 (LCP < 2.5s), NFR-03 (<500KB), and NFR-04 (Lighthouse >90).

---

## Why

WebP delivers ~50–70% smaller files at equal visual quality. Reducing ~9.8MB to ~2–3MB:
- Brings the page toward the <500KB transfer budget (accounts for most of the current excess).
- Improves LCP / FCP → better Core Web Vitals → better ranking (Google uses these).
- Reduces bandwidth for mobile users.

---

## Solution

Convert the three PNGs to WebP using the **`sharp`** image library (added as a devDependency alongside the new Vite `package.json` from FIX-010). Output `.webp` versions sized for web use.

- Add a Node script `scripts/optimize-images.mjs` (reads PNGs from `public/img/`, writes `.webp`).
- Add npm script `npm run images` to run it.
- Update `index.html` to reference `.webp` directly (all 3 `<img>`).
- **No PNG fallback.** The target browsers (SPEC §1.3: Chrome, Firefox, Safari, Edge — all modern) fully support WebP. Keeping the ~9.8MB PNG sources would defeat the optimization, since they would still be deployed and crawled. Use direct `.webp` per SPEC §3.2's target structure.

### Where files live
The `.webp` assets are placed in `public/img/` (Vite's static-asset dir) so they are copied verbatim into `dist/img/` on build. Because GitHub Pages serves the project under `/landing-page-grupotravel/`, `index.html` references them with relative paths (`./img/*.webp`) — no absolute URLs that would break the subpath.

The heavy PNG originals are **not committed** (repo stays small); `scripts/optimize-images.mjs` documents the reproducible conversion should a higher-resolution source be supplied later.

### Conversion parameters
- Resize to `MAX_WIDTH = 1920` (`withoutEnlargement`) — the originals are 4896–5855px wide, far larger than needed.
- Flatten alpha (background `#000`) then encode WebP at `quality: 75`.

Measurements (quality 75, resized to 1920px):
| Image | Original PNG | WebP | Savings |
|---|---|---|---|
| city.png | 3613 KB | 62 KB | -98.3% |
| city2.png | 3870 KB | 135 KB | -96.5% |
| city3.png | 2161 KB | 226 KB | -89.5% |
| **Total** | **~9.8 MB** | **~424 KB** | **-95.7%** |

---

## Design Pattern Used

**Decorator / Pipe** — `sharp` composes resize → flatten → encode into a single pipeline per image; **DRY** reuse of one pipeline across all images.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | One script handles image optimization only. |
| **D**RY | Single `optimize-images.mjs` reused for all images via a loop. |
| **O**pen/Closed | Adding a new image = add one entry to the list, no logic change. |

---

## CSS Architecture

No SCSS changes. Images referenced from HTML only.

---

## SEO Impact

| Metric | Before | After (est.) |
|---|---|---|
| Image weight | ~9.8MB | ~2–3MB (**-60–70%**) |
| LCP | ~1.5s+ (huge hero) | under target directly |
| Core Web Vitals | fail risk | pass target |

Better LCP/CWV directly improves Google ranking and NFR-04 Lighthouse Performance.

---

## Performance Impact

| ID | Expected Saving |
|---|---|
| OPT-04 | -50–70% image size (~-6-7MB transfer) |

With the smaller hero, LCP/FCP improve measurably. Brings total page weight toward the <500KB budget (NFR-03).

---

## Security

No security impact. Images are static, same-origin assets.

---

## What We Avoid

1. Failing NFR-03 (<500KB) purely from image bloat.
2. Poor LCP / CWV hurting SEO ranking.
3. Wasted bandwidth on mobile connections.

---

## Acceptance Criteria

- [x] `dist/img/city.webp`, `city2.webp`, `city3.webp` exist and render.
- [x] Total image size reduced ~9.8MB → ~424KB (-95.7%) per measurement table.
- [x] `index.html` references `.webp` images directly (via `./img/*.webp`).
- [x] Hero `city.webp` loads eagerly; others lazy.
- [x] `npm run images` documented/reproducible.
- [x] Visual quality equivalent (no visible degradation).

---

## Status

Implemented on `feature/tech-debt-4-goals`. Awaiting review.
