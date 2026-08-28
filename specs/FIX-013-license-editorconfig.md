# SPEC: FIX-013 — LICENSE + .editorconfig Hygiene

**Status:** Approved → Implemented
**Author:** Son of Ivaldi
**Date:** 2026-08-27
**Branch:** `feature/tech-debt-4-goals`

---

## Problem

Two documentation/configuration gaps remain:
1. **Missing `LICENSE` file** — README.md declares the project MIT-licensed and links to a `LICENSE` file, but no such file exists in the repo.
2. **Missing `.editorconfig`** — SPEC.md §3.2 (target structure) lists `.editorconfig`, but none exists. Editor/IDE conventions (indentation, charset, newlines) are not declared.

---

## Why

- **Legal correctness:** declaring MIT in README without the license text is incomplete and could be misleading about terms.
- **Consistency:** `.editorconfig` enforces uniform indentation (2 spaces for HTML/SCSS/TS), UTF-8 charset, and LF/CRLF handling across all editors/contributors, reducing whitespace churn in PRs (aligns with the repo's commit conventions).

---

## Solution

### `LICENSE` (root)
MIT license text for the project (`Copyright (c) 2026 Jör / Grupo Travel`), matching the MIT badge in README.

### `.editorconfig` (root)
```
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

---

## Design Pattern Used

**Convention over Configuration** — small config file encodes shared conventions so all editors behave identically without per-developer setup.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **D**RY | Coding conventions defined once in `.editorconfig`, applied everywhere. |
| **S**ingle Responsibility | One file (`.editorconfig`) owns formatting rules only. |

---

## CSS Architecture

No code changes. `.editorconfig` governs formatting of existing SCSS/HTML/TS uniformly (including the new `src/` from FIX-010).

---

## SEO Impact

None.

---

## Performance Impact

None (no runtime resources).

---

## Security

None.

---

## What We Avoid

1. Incomplete MIT licensing (README claims a license the repo lacks).
2. Inconsistent formatting/whitespace churn across editors and PRs.

---

## Acceptance Criteria

- [ ] `LICENSE` file present at repo root with MIT text and copyright line.
- [ ] `.editorconfig` present at repo root with above settings.
- [ ] README license link resolves to an existing file.

---

## Status

Implemented on `feature/tech-debt-4-goals`. Awaiting review.
