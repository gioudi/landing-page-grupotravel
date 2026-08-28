# SPEC: FIX-017 — GitHub Actions Node 24 Runtime (deprecated Node 20 action runtime)

**Status:** Approved → Implemented
**Author:** Son of Ivaldi
**Date:** 2026-08-27
**Branch:** `feature/ci-actions-node24`

---

## Problem

GitHub Actions started deprecating the **Node 20 runtime** used internally by
first-party actions (announced 2025-09-19). Running workflows after the deprecation date
emits:

> Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced
> to run on Node.js 24: `actions/checkout@v4`, `actions/setup-node@v4`.

All three of our workflows currently pin first-party actions to the `@v4` majors, whose
internal runtime is Node 20:

| Workflow | Affected actions |
|---|---|
| `.github/workflows/pages.yml` | `actions/checkout@v4`, `actions/setup-node@v4` |
| `.github/workflows/lighthouse.yml` | `actions/checkout@v4`, `actions/setup-node@v4` |
| `.github/workflows/codeql.yml` | `actions/checkout@v4` |

While this is currently a warning (not a failure), the Node 20 runtime will be removed,
and staying on `@v4` risks future CI breakage and unsupported action runtimes.

---

## Why

- **Future-proofing:** `actions/checkout@v5` and `actions/setup-node@v5` run on Node 24,
  removing the deprecation warning and staying ahead of the Node 20 retirement.
- **CLI runtime, not project Node:** the project *already* requests Node 22 via
  `actions/setup-node` for `npm run build`. This spec is about the actions' own runtime,
  not the Node version used to build (which stays 22).
- **Consistency:** bring all workflows in line so none emit the deprecation warning.

---

## Solution

Bump the first-party action majors to their current stable releases (Node 24 runtime) in
all three workflows:

| Action | Current | Target |
|---|---|---|
| `actions/checkout` | `@v4` | `@v5` |
| `actions/setup-node` | `@v4` | `@v5` |

`node-version: 22` (used to run the build) is **unchanged** — the app and scripts are
built with Node 22 exactly as before.

No changes to triggers, permissions, concurrency, the CodeQL action versions
(`github/codeql-action@v3` remains), or the deploy/artifact steps in `pages.yml`
(`configure-pages@v5`, `upload-pages-artifact@v4`, `deploy-pages@v4` stay as-is).

---

## Design Pattern Used

**Dependency Upgrade / Biblioteconomy** — move first-party actions to the current stable
major to adopt the maintained Node 24 runtime and remove the deprecated Node 20 runtime.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | Each workflow keeps its single job; only action majors change. |
| **D**RY | Action versions remain declared once per step; the build Node version is unchanged. |
| **O**pen/Closed | Version bumps are additive; job behavior is unchanged. |

---

## CSS Architecture

Not applicable — CI/.github only. No SCSS, HTML, or TS changes.

---

## SEO Impact

None. Workflow-only change with no effect on page output or ranking.

---

## Performance Impact

None. `actions/setup-node@v5` downloads/caches the same Node 22 toolchain as `@v4`.

---

## Security

- `@v5` actions are the maintained, patched majors — reduces supply-chain risk from the
  retired Node 20 runtime.
- No new permissions granted; existing workflow permissions are unchanged.
- `github/codeql-action@v3` is untouched (already maintained).

---

## What We Avoid

1. Bumping the project build Node version (still 22 — not required here).
2. Touching CodeQL action versions (already current).
3. Overwriting unrelated deploy/codeql settings.

---

## Acceptance Criteria

- [ ] `.github/workflows/pages.yml`: `checkout@v5`, `setup-node@v5`.
- [ ] `.github/workflows/lighthouse.yml`: `checkout@v5`, `setup-node@v5`.
- [ ] `.github/workflows/codeql.yml`: `checkout@v5`.
- [ ] `node-version: 22` unchanged in `pages.yml` and `lighthouse.yml`.
- [ ] CI on the PR to `staging` no longer reports the "Node.js 20 is deprecated" warning.
- [ ] Workflows still pass (build + Lighthouse on staging PR; CodeQL + Pages on `main`).

---

## Status

Implementing on `feature/ci-actions-node24`.
