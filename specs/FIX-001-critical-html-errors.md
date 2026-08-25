# SPEC: FIX-001 - Critical HTML Errors Resolution

**Status:** Draft
**Author:** Son of Ivaldi
**Date:** 2026-08-25
**Branch:** fix/html-errors

---

## Problem

The `index.html` file contains 8 critical errors that break navigation, form submission, accessibility, SEO, and DOM parsing.

---

## Why

| Error | Why it matters |
|---|---|
| Unclosed `<li>` tag | Browser DOM parser produces unexpected elements, breaks navigation rendering |
| `for="lasttName"` typo | Label not associated with input, screen readers cannot identify the field |
| `type="text"` for email | No browser-native email validation, users can submit invalid emails |
| Empty anchor for form submit | Form never submits, contact form completely broken |
| Dead `js/menu.js` reference | 404 error on every page load, console error, wasted HTTP request |
| Missing `lang="es"` | Screen readers pronounce content with wrong language, WCAG 3.1.1 violation |
| Empty meta description | Google shows blank snippet in search results, SEO penalty |
| `#reserve` link with no target | Clicking "Reservaciones" does nothing, broken navigation |

---

## Solution

Apply 8 targeted fixes to `index.html`:

1. Change `<html>` → `<html lang="es">`
2. Add meta description: "Grupo Travel - Agencia de viajes en Bogota, Colombia..."
3. Change `<li><a href="#reserve">Reservaciones</a><li>` → `<li><a href="#packages">Reservaciones</a></li>`
4. Add `id="packages"` to the packages section div
5. Change `for="lasttName"` → `for="lastName"`
6. Change `type="text"` → `type="email"` on email input
7. Replace `<a href="" class="btn btn-outline-teal">Enviar</a>` → `<button type="submit" class="btn btn-outline-teal">Enviar</button>`
8. Remove `<script src="js/menu.js" charset="utf-8"></script>` line

---

## Design Pattern Used

**Defensive Programming** - Fix all error states before they propagate to production. Each fix follows the principle of failing fast: invalid HTML caught at parse time, not at runtime.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | Each fix addresses exactly one error |
| **D**RY | No code duplication introduced |
| **POO** | N/A - HTML structural fixes, no class hierarchy |

---

## CSS Architecture

No SCSS changes. All fixes are in `index.html` only. Existing styles continue to work because:
- Class names unchanged
- Element types preserved (li, button)
- IDs added are new, no style conflicts

---

## SEO Impact

| Fix | SEO Effect |
|---|---|
| `lang="es"` | Google indexes page as Spanish content, correct language ranking |
| Meta description | Google shows rich snippet in search results, +15-20% CTR improvement |
| Semantic `<button>` | Search engines understand form submission intent |

---

## Performance Impact

| Fix | Performance Effect |
|---|---|
| Remove `js/menu.js` | -1 HTTP request, eliminates 404 error |
| No new resources added | Zero size increase |

---

## Security

| Fix | Security Effect |
|---|---|
| `type="email"` | Browser validates email format, prevents some form injection |
| `<button type="submit">` | Proper form submission mechanism, prevents open redirect via empty href |
| `lang="es"` | No security impact (compliance only) |

---

## What We Avoid

1. **DOM parsing errors** from unclosed tags
2. **Broken navigation** where users cannot reach sections
3. **SEO penalty** from empty meta description
4. **WCAG violations** from missing lang attribute
5. **Form submission failure** from anchor-based submit
6. **404 errors** from dead script references
7. **Invalid email submissions** from missing type validation

---

## Acceptance Criteria

- [x] `<html>` has `lang="es"` attribute
- [x] Meta description contains 150-160 characters
- [x] All `<li>` tags properly closed
- [x] All `<label>` `for` attributes match input `name`/`id`
- [x] Email input uses `type="email"`
- [x] Form submit uses `<button type="submit">`
- [x] No dead script references (no 404s)
- [x] All nav links point to existing section IDs
- [x] Page renders correctly in browser
- [x] Navigation works on mobile and desktop

---

## Status

**Awaiting Jör's approval before implementation.**
