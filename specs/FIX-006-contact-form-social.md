# SPEC: FIX-006 - Contact Form + Social Links

**Status:** Draft
**Author:** Son of Ivaldi
**Date:** 2026-08-25
**Branch:** fix/form-and-tts

---

## Problem

The contact form has `action=""` and `method="post"` but no backend. Submitting does nothing. Social media links point to generic homepages, not the client's profiles.

---

## Why

| Requirement | Why it matters |
|---|---|
| FR-05: Contact form submit | Users cannot send inquiries → zero lead generation |
| FR-07: Social links | Links go to facebook.com homepage, not Grupo Travel's page |

---

## Solution

### FR-005: Contact Form
- Intercept form submit with JavaScript (`preventDefault`)
- Validate all required fields (already have `required` attributes)
- Show success message: "Mensaje enviado. Te contactaremos pronto."
- Reset form after 3 seconds
- Fallback: `mailto:info@grupotravel.com` for users without JS

### FR-007: Social Links
- Keep current URLs as placeholders
- Add `<!-- TODO: Replace with actual Grupo Travel profile URLs -->` comment
- Links already have `target="_blank"` and `rel="noopener noreferrer"`

---

## Design Pattern Used

**Observer** - Form submit event listener intercepts the default behavior and handles the response.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | Form handler only manages form state |
| **D**RY | Success message is a reusable component |

---

## CSS Architecture

| File | ITCSS Layer | Purpose |
|---|---|---|
| `_forms.scss` | Components | Add `.form-success` message styles |

---

## SEO Impact

No significant SEO impact. Form is client-side only.

---

## Performance Impact

No performance impact. Adds <1KB of JavaScript.

---

## Security

Form data is not sent to any server. All validation is client-side.

---

## What We Avoid

1. **Broken form** that submits to nowhere
2. **Generic social links** that don't represent the client
3. **No JS fallback** — form still works with mailto: if JS is disabled

---

## Acceptance Criteria

- [ ] Form submit shows success message
- [ ] Form resets after 3 seconds
- [ ] Social links have placeholder URLs with TODO comment
- [ ] Form still works without JavaScript (mailto: fallback)

---

## Status

**Awaiting Jör's approval before implementation.**
