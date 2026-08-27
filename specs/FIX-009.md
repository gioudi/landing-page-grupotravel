# SPEC: FIX-009 — Upgrade GitHub Pages Actions (deprecated `upload-artifact` v3)

**Status:** Approved → Implemented
**Author:** Son of Ivaldi
**Date:** 2026-08-27
**Branch:** `fix/ci-actions-upgrade`

---

## Problem

The GitHub Pages deploy workflow fails with:

> Error: This request has been automatically failed because it uses a deprecated version of `actions/upload-artifact: v3`.

`.github/workflows/pages.yml` uses `actions/upload-pages-artifact@v1`, which internally depends on the deprecated `actions/upload-artifact@v3` (blocked since Jan 30, 2025). Every push to `main` — including the 1.0.1 deployment push — fails at the upload step, so the live site is not updated.

Related pinned actions are also outdated.

---

## Why

A failing deploy workflow means the site cannot be published. Keeping old action majors also risks future deprecation failures (Node runtime, `upload-artifact` v4 requirement). This blocks release 1.0.1 from reaching production.

---

## Solution

Upgrade the four actions in `.github/workflows/pages.yml` to the officially documented stable versions:

| Action | Current | Target |
|---|---|---|
| `actions/checkout` | `@v3` | `@v4` |
| `actions/configure-pages` | `@v2` | `@v5` |
| `actions/upload-pages-artifact` | `@v1` | `@v4` |
| `actions/deploy-pages` | `@v1` | `@v4` |

No change to triggers, permissions, concurrency, or `path: '.'`. `codeql.yml` already uses current versions (`checkout@v4`, `codeql-action@v3`) and is left untouched.

---

## Design Pattern Used

**Dependency Upgrade / Biblioteconomy** — pin to current stable majors to remove deprecated transitive dependencies (the `upload-artifact` v3 dependency is resolved by moving to `upload-pages-artifact@v4`).

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | Workflow does one thing (build + deploy static site). |
| **D**RY | Action versions defined once per step; no duplication introduced. |
| **O**pen/Closed | Version bumps are additive; workflow behavior unchanged. |

---

## CSS Architecture

Not applicable — CI/.github only. No SCSS or HTML changes.

---

## SEO Impact

Indirect: unblocks the SEO-enabled `main` build (FIX-008) from reaching the live site, so the canonical/OG/JSON-LD/robots/sitemap take effect. No direct ranking change from the workflow itself.

---

## Performance Impact

None on the client. CI artifact upload uses the faster v4 artifact implementation with no change to what is uploaded (`path: '.'`).

---

## Security

- `actions/checkout@v4` and `upload-pages-artifact@v4` are the maintained, patched versions — reduces supply-chain risk from using retired action runtimes.
- No new permissions granted; existing `contents: read`, `pages: write`, `id-token: write` unchanged.

---

## What We Avoid

1. Perpetual deploy failures blocking publication.
2. Future deprecation failures (Node runtime, artifact-actions v4 requirement).
3. Running unmaintained, potentially vulnerable action code.

---

## Acceptance Criteria

- [ ] `pages.yml`: `checkout@v4`, `configure-pages@v5`, `upload-pages-artifact@v4`, `deploy-pages@v4`.
- [ ] Workflow re-runs on `main` (push or `workflow_dispatch`) and the deploy job is **green**.
- [ ] Upload step executes with `upload-artifact@v4` — no deprecation error/warning.
- [ ] Live site at `https://gioudi.github.io/landing-page-grupotravel/` serves the merged content.
- [ ] No changes to triggers, permissions, concurrency, or upload path.
- [ ] `codeql.yml` unchanged.

---

## Status

Implemented on `fix/ci-actions-upgrade`. Forming PR to `staging`; `main` deployment requires explicit approval per contract.
