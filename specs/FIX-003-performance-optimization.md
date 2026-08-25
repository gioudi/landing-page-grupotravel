# SPEC: FIX-003 - Performance Optimization

**Status:** Draft
**Author:** Son of Ivaldi
**Date:** 2026-08-25
**Branch:** refactor/performance

---

## Problem

Page weight exceeds 500KB budget. Currently ~800KB+ due to jQuery (87KB), Animate.css (60KB), Normalize.css (7KB), and unoptimized PNGs. 12+ HTTP requests. No preconnect hints. No lazy loading.

---

## Why

| Metric | Target | Current | Impact |
|---|---|---|---|
| Total Transfer Size | < 500KB | ~800KB+ | +60% over budget |
| JavaScript Size | < 50KB | ~130KB | +160% over budget |
| HTTP Requests | < 10 | 12+ | +20% over budget |
| First Contentful Paint | < 1.5s | Unknown | SEO ranking factor |
| Largest Contentful Paint | < 2.5s | Unknown | Core Web Vital |

Google uses page speed as a ranking factor. Every 100ms of load time costs ~1% conversion. A 3-second load loses 53% of mobile users.

---

## Solution

### OPT-02: Replace Animate.css with CSS keyframes
- **Current:** Animate.css loaded from CDN (60KB), only 3 animations used (fadeInDown, fadeInLeft, fadeInRight, zoomIn)
- **Fix:** Write 4 custom `@keyframes` in `_animations.scss`
- **Savings:** -60KB (-46% total size)

### OPT-03: Remove Normalize.css
- **Current:** Normalize.css loaded from CDN (7KB), custom `_reset.scss` already exists
- **Fix:** Remove `<link>` tag from `index.html`
- **Savings:** -7KB (-5% total size), -1 HTTP request

### OPT-05: Add lazy loading to images
- **Current:** All 3 images load immediately
- **Fix:** Add `loading="lazy"` to `city2.png` and `city3.png` (below-the-fold). Keep `city.png` (hero) as eager.
- **Savings:** -200-400ms FCP improvement

### OPT-07: Add preconnect hints
- **Current:** No preconnect for Google Fonts or CDN domains
- **Fix:** Add `<link rel="preconnect">` for:
  - `https://fonts.googleapis.com`
  - `https://fonts.gstatic.com`
  - `https://cdnjs.cloudflare.com`
- **Savings:** -100-300ms (-10-15% load time)

### DEFERRED (requires TypeScript migration):
- OPT-01: Remove jQuery (-87KB) - deferred to TypeScript branch
- OPT-04: Convert PNG to WebP - deferred to image optimization
- OPT-06: Consolidate Google Fonts - deferred to build pipeline
- OPT-08: Vite tree-shaking - deferred to Vite setup

---

## Design Pattern Used

**Progressive Enhancement** - Add performance features that work without JavaScript. Lazy loading and preconnect are HTML-only improvements that degrade gracefully.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | Each optimization targets one metric |
| **D**RY | Custom animations replace library for identical results |
| **O**pen/Closed | CSS keyframes are extensible without modifying existing code |

---

## CSS Architecture

| New File | ITCSS Layer | Purpose |
|---|---|---|
| `_animations.scss` | Tools | Keyframe definitions, reusable animation mixins |

Added to `style.scss` after `_base.scss` import.

---

## SEO Impact

| Fix | SEO Effect |
|---|---|
| Faster load time | Google ranking boost (+1-3 positions estimated) |
| Better Core Web Vitals | Passes LCP threshold, avoids ranking penalty |
| Fewer HTTP requests | Faster TTFB, better crawl efficiency |

---

## Performance Impact

| Fix | Size Reduction | Request Reduction | Load Time |
|---|---|---|---|
| Remove Animate.css | -60KB | -1 | -200-400ms |
| Remove Normalize.css | -7KB | -1 | -50-100ms |
| Lazy loading | 0 | 0 | -200-400ms FCP |
| Preconnect | 0 | 0 | -100-300ms |
| **Total** | **-67KB** | **-2** | **-550ms to 1.2s** |

**Net result:** -67KB total, -2 HTTP requests, -10-15% load time

---

## Security

No security implications. All fixes are performance-only.

---

## What We Avoid

1. **Google ranking penalty** from slow page speed
2. **53% mobile user abandonment** from 3-second load
3. **Wasted bandwidth** on unused CSS animations
4. **Render-blocking resources** from unnecessary CDN requests
5. **Poor Core Web Vitals** scores affecting ad rank

---

## Acceptance Criteria

- [ ] Animate.css `<link>` tag removed from `index.html`
- [ ] Normalize.css `<link>` tag removed from `index.html`
- [ ] Custom `_animations.scss` created with fadeInDown, fadeInLeft, fadeInRight, zoomIn keyframes
- [ ] `style.scss` imports `_animations.scss`
- [ ] All `.astonish` elements still animate correctly
- [ ] `loading="lazy"` added to `city2.png` and `city3.png`
- [ ] `loading="eexplicit"` on `city.png` (hero image)
- [ ] Preconnect links added for Google Fonts and CDN
- [ ] Page visually identical after changes
- [ ] Total page weight reduced by ~67KB

---

## Status

**Awaiting Jör's approval before implementation.**
