# SPEC: FIX-012 — Lighthouse CI Gate

**Status:** Approved → Implemented
**Author:** Son of Ivaldi
**Date:** 2026-08-27
**Branch:** `feature/tech-debt-4-goals`

---

## Problem

SPEC NFR-04/05/06 set measurable Lighthouse targets (Performance >90, SEO >90, Accessibility >90) and README.md §CI advertises a "Lighthouse" workflow on PRs to `staging` — but **no such workflow exists**. Only `pages.yml` (deploy) and `codeql.yml` (security) are present. The NFR targets are "Not measured", so we cannot prove or enforce compliance.

---

## Why

- The performance/SEO/a11y work (FIX-003/005/008) is currently **unverifiable** — no automated gate confirms the <1.5s FCP, <2.5s LCP, >90 scores.
- README promises a Lighthouse workflow that does not exist (documentation/system mismatch).
- An automated gate prevents regressions: a future PR that balloons the bundle or removes a11y attributes fails CI before merging.

---

## Solution

Add a Lighthouse CI workflow that builds the site (via the new Vite pipeline from FIX-010), serves it, runs Lighthouse, asserts scores, and gating PRs to `staging`.

### `.github/workflows/lighthouse.yml`
- Trigger: `pull_request` → `staging`, plus `workflow_dispatch`.
- Steps:
  1. Checkout (`actions/checkout@v4`).
  2. Setup Node 22.
  3. `npm ci`.
  4. `npm run build`.
  5. Serve `dist/` (e.g. `npx vite preview --host 127.0.0.1 --port 4173 &`).
  6. Run Lighthouse on `http://127.0.0.1:4173` using **`treosh/lighthouse-ci-action@v12`** with a config file `.github/lighthouserc.json`.
- Output: Lighthouse report uploaded as an artifact, and a check that fails if scores fall below the budget.

### `.github/lighthouserc.json`
- `ci.assert.assertions`:
  - `categories:performance`: `>= 0.90`
  - `categories:seo`: `>= 0.90`
  - `categories:accessibility`: `>= 0.90`
  - `categories:best-practices`: `>= 0.90`
- `ci.upload.startServerCommand` / url list: `http://127.0.0.1:4173`.

### Budget (optional) in `lighthouserc.json`
- `performance-budget` for total size / LCP to lock NFR-02/03.

---

## Design Pattern Used

**Observer / Gate** — CI observes every PR and blocks (gates) merges that violate the quality budget, implementing the NFR contract as an automated check.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | One workflow for one concern (quality audit). |
| **O**pen/Closed | Add a category to the assertion list without touching logic. |
| **D**RY | Single `lighthouserc.json` reused by the workflow. |

---

## CSS Architecture

Not applicable — CI only.

---

## SEO Impact

Enforces SEO >90 on every PR, preventing SEO regressions (e.g. removed meta tags, broken structured data) from reaching production.

---

## Performance Impact

Enforces Performance >90 + budget (LCP, total weight), locking the gains from FIX-003/010/011 and blocking regressions.

---

## Security

- `<script>`-based Lighthouse from user-provided action; pinned to major `treosh/lighthouse-ci-action@v12`.
- No elevated permissions.
- Report artifact is read-only.

---

## What We Avoid

1. Unverified NFR claims (scores were never measured).
2. SEO/performance/a11y regressions slipping into `staging`.
3. Documentation (README) promising a workflow that doesn't exist.

---

## Acceptance Criteria

- [ ] `.github/workflows/lighthouse.yml` exists and runs on PRs to `staging`.
- [ ] `.github/lighthouserc.json` asserts performance/SEO/a11y/best-practices >= 0.90.
- [ ] Workflow builds via Vite, serves `dist/`, runs Lighthouse, uploads report.
- [ ] Passing PR shows green check; a deliberately-bad score would fail CI.
- [ ] README workflow table updated to include Lighthouse.

---

## Status

Implemented on `feature/tech-debt-4-goals`. Awaiting review.
