# SPEC: FIX-015 — Dark / Light Theme Toggle

**Status:** Approved → Implemented
**Author:** Son of Ivaldi
**Date:** 2026-08-27
**Branch:** `feature/theme-toggle` (based on `feature/i18n`)

---

## Problem

The palette is **hardcoded** to a single dark theme. Colors are baked into SCSS variables (`$charcoal`, `$off-white`, `$teal`, `$light-purple`, `$white`) and referenced directly in 54 places across `_typography.scss`, `_index.scss`, `_forms.scss`, `_buttons.scss`, `_tts-player.scss`, `_skip-link.scss`, `_hamburger.scss`, and `_focus.scss`. There is no way for users to choose a light theme, no persistence, and no respect for the operating system's `prefers-color-scheme`.

Incoming requirement: a **palette toggle (dark and light)**.

---

## Why

- **Mandatory/client request:** provide both dark and light appearances with a toggle control.
- **Accessibility & UX:** users who prefer light themes (and those with OS-level light preference) currently get a fixed dark page; respecting `prefers-color-scheme` is a WCAG/accessibility best practice.
- **Maintainability:** centralizing color as CSS **design tokens** (custom properties) makes both themes tuneable from one file instead of 50+ scattered literals.
- **SEO/technical:** CSS custom properties re-resolve at runtime, so the toggle needs no rebuild or re-serve.

---

## Solution

Convert the hardcoded palette into **CSS custom-property design tokens** under `:root` (light theme) and `[data-theme="dark"]` (dark theme, preserving the current look), then swap every SCSS color reference to a `var()` token. Provide a persisted, accessible toggle in the nav.

### Design tokens (in `sass/base/_variables.scss`)
Tokens hold **RGB triplets** so both solid (`rgb(var(--x))`) and alpha (`rgba(var(--x), a)`) usages are valid at runtime.

- `--bg` — page background.
- `--text` — body text / icon color.
- `--surface` — nav / footer / TTS background.
- `--on-surface` — text on surface.
- `--teal`, `--purple` — brand accents.
- `--white` — text on filled accent buttons.
- `--on-accent` — dark text on filled accent (skip-link, TTS active).
- `--border` — subtle borders.

**Light:** bg `#f8f9fa`, text `#1a1a1e`, surface `#ffffff`, teal `#00897b` (AA ≥ 4.5:1 on light), purple `#5458ff` (AA ≥ 4.6:1), white `#ffffff`, on-accent `#111111`.
**Dark (current):** bg `#111111`, text `#fefffe`, surface `#111111`, teal `#00d8b2`, purple `#5458ff`, white `#ffffff`, on-accent `#111111`.

All SCSS usages are rewritten from `$var` / `rgba($var, a)` to `rgb(var(--token))` / `rgba(var(--token), a)`. The SCSS `$vars` in `_variables.scss` are removed in favor of the custom-property tokens.

### Theme control module: `src/ts/theme.ts`
- `initTheme()`:
  - Reads `localStorage('theme')`; if absent falls back to `matchMedia('(prefers-color-scheme: dark)')`; applies `data-theme` to `<html>`.
  - Binds the toggle button (`.theme-toggle`) to flip `data-theme` between `light`/`dark`, persist, and update `<meta name="theme-color">`.

### FOUC prevention
A small inline script in `<head>` sets `data-theme` **before** first paint, so the correct palette renders immediately (no flash of the wrong theme).

### Nav toggle button (in `.main-nav`)
A sun/moon icon button with localized `aria-label` (added alongside the language switcher from FIX-014). Keyboard accessible; `aria-pressed` reflects current theme.

---

## Design Pattern Used

**Bridge/Token** — palette driven by a single set of design tokens rather than N scattered literals; **Strategy** — theme resolution (stored vs OS preference) via a small decision function; **State** — persisted theme in `localStorage`.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | `theme.ts` owns theme resolution/persistence only. |
| **O**pen/Closed | New theme = new `[data-theme]` token block, zero JS change. |
| **D**RY | One token source; every component references tokens. |
| **D**ependency Inversion | Components depend on `var(--token)`, not literal colors. |

---

## CSS Architecture

Preserves ITCSS. Tokens live in the settings layer (`_variables.scss`); components consume them. No specificity change beyond `:root`/`[data-theme]`.

---

## SEO Impact

None directly. `theme-color` meta sync improves mobile browser chrome theming (minor UX).

---

## Performance Impact

Neutral — a few KB of CSS custom-property definitions; no new requests. Theme toggle is a class/attribute swap.

---

## Security

- Inline FOUC script is static and show-safe; no user data is touched beyond `localStorage('theme')`.
- No `innerHTML`.

---

## What We Avoid

1. Shipping two full stylesheets or duplicating palettes.
2. FOUC / flash of wrong theme.
3. Breaking WCAG contrast in the new light palette.
4. Mixing the i18n (FIX-014) or new pages (FIX-016) into this spec.

---

## Acceptance Criteria

- [ ] Page renders light or dark and toggles live via the nav button.
- [ ] Theme choice persists across reloads (`localStorage`).
- [ ] Default respects `prefers-color-scheme` when nothing stored.
- [ ] No flash of the wrong theme on load.
- [ ] Both palettes pass WCAG AA contrast for body text.
- [ ] `<meta name="theme-color">` updates with the theme.
- [ ] `npm run typecheck` and `npm run build` pass; toggle is keyboard accessible.

---

## Status

Implemented on `feature/theme-toggle`. Awaiting review.
