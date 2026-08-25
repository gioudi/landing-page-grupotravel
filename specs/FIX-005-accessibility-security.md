# SPEC: FIX-005 - WCAG 2.2 AA Accessibility + Security Headers

**Status:** Draft
**Author:** Son of Ivaldi
**Date:** 2026-08-25
**Branch:** fix/accessibility-security

---

## Problem

The site fails WCAG 2.2 AA compliance on multiple criteria. No security headers are present. External links lack `rel="noopener noreferrer"`. 1.3 billion people with disabilities cannot properly use this site.

---

## Why

| Requirement | Why it matters |
|---|---|
| Skip-to-content link | Keyboard-only users must tab through entire nav before reaching content |
| ARIA labels | Screen readers cannot identify hamburger menu, social links, or form controls |
| Color contrast | `#00d8b2` (teal) on `#111` (charcoal) may fail 4.5:1 ratio for small text |
| Focus indicators | `outline: none` on inputs removes keyboard navigation visibility |
| Touch targets | Buttons and links must be >= 44x44px for motor accessibility |
| Security headers | XSS, clickjacking, MIME sniffing attacks possible without headers |
| rel=noopener | External links can access `window.opener` and redirect parent page |

---

## Solution

### Security Headers (HTML meta tags)
Add to `<head>`:
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
```

### A11Y-03: Skip-to-content link
- Add `<a href="#main-content" class="skip-link">Saltar al contenido</a>` as first child of `<body>`
- Add `id="main-content"` to `<main>`
- Style: visually hidden, visible on focus

### A11Y-04: ARIA labels
- Hamburger button: `aria-label="Menu de navegacion"`, `aria-expanded="false"`
- Social links: `aria-label` on each `<a>` (Facebook, Instagram, LinkedIn)
- Form: `aria-label="Formulario de contacto"`
- Map iframe: `aria-label="Mapa de ubicacion en Bogota"`

### A11Y-05: Color contrast
- Increase teal opacity or lighten for better contrast
- Target: 4.5:1 ratio for normal text

### A11Y-08: Focus indicators
- Add `:focus-visible` styles for all interactive elements
- 2px solid outline, 2px offset, high contrast color

### A11Y-09: Touch targets
- Minimum 44x44px on all buttons and links
- Add padding where needed

### A11Y-10: Keyboard traps
- Hamburger menu can be closed with Escape key
- Tab order follows logical reading order

### External link security
- Add `rel="noopener noreferrer"` to all external links
- Add `target="_blank"` with security attributes

---

## Design Pattern Used

**Defense in Depth** - Multiple layers of security (headers + link attributes) + multiple layers of accessibility (semantic HTML + ARIA + focus management).

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | Each ARIA label describes one element |
| **D**RY | Skip-link and focus styles are reusable CSS classes |
| **O**pen/Closed | ARIA labels are additive, don't change existing behavior |

---

## CSS Architecture

| File | ITCSS Layer | Purpose |
|---|---|---|
| `_skip-link.scss` | Components | Skip-to-content visibility + focus |
| `_focus.scss` | Utilities | Focus-visible indicators for all elements |

Added to `_default.scss` imports.

---

## SEO Impact

| Fix | SEO Effect |
|---|---|
| Semantic HTML | Better content understanding by crawlers |
| Proper heading hierarchy | Improved page outline for search engines |
| ARIA labels | Richer content interpretation |

---

## Performance Impact

No significant performance impact. Meta tags and ARIA attributes add <1KB.

---

## Security

| Fix | Attack Prevented |
|---|---|
| X-Content-Type-Options: nosniff | MIME sniffing attacks |
| X-Frame-Options: DENY | Clickjacking via iframe embedding |
| X-XSS-Protection: 1; mode=block | Reflected XSS in older browsers |
| rel=noopener noreferrer | Tabnapping / reverse tabnapping |

---

## What We Avoid

1. **Keyboard users trapped** without skip link
2. **Screen reader users lost** without ARIA labels
3. **Low vision users unable** to read low-contrast text
4. **Motor disability users** unable to tap small targets
5. **XSS attacks** via missing security headers
6. **Clickjacking** via iframe embedding
7. **Tabnapping** via malicious external links

---

## Acceptance Criteria

- [ ] Security meta headers added to `<head>`
- [ ] Skip-to-content link present and functional
- [ ] All interactive elements have ARIA labels
- [ ] Color contrast >= 4.5:1 for all text
- [ ] Focus indicators visible on all interactive elements
- [ ] Touch targets >= 44x44px
- [ ] Escape key closes hamburger menu
- [ ] External links have `rel="noopener noreferrer"`
- [ ] Page navigable using only keyboard
- [ ] Screen reader can identify all interactive elements

---

## Status

**Awaiting Jör's approval before implementation.**
