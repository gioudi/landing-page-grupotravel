# SPEC: FIX-002 - Code Quality Errors Resolution

**Status:** Draft
**Author:** Son of Ivaldi
**Date:** 2026-08-25
**Branch:** fix/code-quality

---

## Problem

Five code quality issues that affect maintainability, security scanning, and developer experience.

---

## Why

| Error | Why it matters |
|---|---|
| CQ-01: `console.log` in production | Exposes internal state to users via DevTools, unprofessional, slight performance cost on every resize event |
| CQ-02: `style.css.map` committed | Exposes source SCSS structure to anyone, clutters repo, should be gitignored |
| CQ-03: `_default.scss` 246 lines, 6+ responsibilities | Violates Single Responsibility Principle, hard to find styles, merge conflicts likely, violates ITCSS layer boundaries |
| CQ-04: `_grid.scss` 317 lines, repeated patterns | DRY violation: 12 column classes repeated 3 times (sm, md, lg) x 2 (flex, grid) = 72 nearly identical blocks |
| CQ-05: `codeql.yml` empty language matrix | CodeQL security scanning does nothing, vulnerabilities go undetected |

---

## Solution

### CQ-01: Remove `console.log` from `main.js`
- Line 11: Delete `console.log($(window).width());`
- **Zero risk** - no functional change

### CQ-02: Add `style.css.map` to `.gitignore`
- Create `.gitignore` with `sass/style.css.map`
- Remove tracked file from git index: `git rm --cached sass/style.css.map`
- **Note:** This fix will be applied in a future chore branch when build tooling is added. For now, we document it.

### CQ-03: Split `_default.scss` into focused partials
Current file handles 6 concerns. Split into:

| New File | Content | ITCSS Layer |
|---|---|---|
| `_reset.scss` | Universal selector, box-sizing | Generic |
| `_typography.scss` | h1-h6, body p, font sizes | Elements |
| `_buttons.scss` | .btn, .btn-outline-teal, .btn-outline-purple | Components |
| `_forms.scss` | .contact-form, .form-group, inputs, labels | Components |
| `_hamburger.scss` | #menu-button, .bar1-3, .change | Components |
| `_helpers.scss` | .text-center, .display-flex-between, .section-title | Utilities |
| `_wrappers.scss` | .wrapper, .content-wrapper-sm, .content-wrapper, .content-wrapper-lg | Objects |

### CQ-04: Refactor `_grid.scss` with SCSS loops
Replace 317 lines with ~60 lines using `@for` loop:
```scss
$breakpoints: (sm: 576px, md: 768px, lg: 992px);

@each $breakpoint, $min-width in $breakpoints {
  @media (min-width: $min-width) {
    @for $i from 1 through 12 {
      .grid-col-#{$breakpoint}-#{$i} {
        flex: 0 0 ($i / 12 * 100%);
        max-width: ($i / 12 * 100%);
      }
    }
  }
}
```
Same approach for the `@supports (display: grid)` block.

### CQ-05: Fix `codeql.yml` language matrix
- Change `language: [ ]` → `language: [ 'javascript' ]`
- Update action versions from v2/v3 to v4
- **Why JavaScript:** The project uses JavaScript (will be TypeScript later)

---

## Design Pattern Used

**Refactoring (Martin Fowler)** - Restructuring code without changing external behavior. Each split follows the Extract Class pattern: one file, one responsibility.

---

## POO / SOLID / DRY

| Principle | Current Violation | Fix |
|---|---|---|
| **S**ingle Responsibility | `_default.scss` does 6 things | Split into 7 focused files |
| **D**RY | `_grid.scss` repeats 72 blocks | SCSS `@for` loop generates all columns |
| **O**pen/Closed | Adding new breakpoint requires editing 3 places | Loop-based grid: add one entry to `$breakpoints` map |

---

## CSS Architecture

| Change | ITCSS Layer | Rationale |
|---|---|---|
| `_reset.scss` | Generic | Universal resets belong at the bottom of specificity |
| `_typography.scss` | Elements | Bare HTML element styling |
| `_buttons.scss` | Components | Reusable UI components |
| `_forms.scss` | Components | Form-specific styling |
| `_hamburger.scss` | Components | Mobile menu component |
| `_helpers.scss` | Utilities | Utility classes, highest specificity |
| `_wrappers.scss` | Objects | Layout patterns |

**Import order in `style.scss`:**
```scss
@import './base/base';      // settings, tools, generic, elements, objects
@import './components/...';  // components
@import './utilities/...';   // utilities
@import './pages/page';     // page-specific
```

---

## SEO Impact

No direct SEO impact. These are internal code quality improvements.

---

## Performance Impact

| Fix | Effect |
|---|---|
| Remove `console.log` | Eliminates function call on every window resize (-微量) |
| Grid refactor with loops | Compiled CSS output identical, no change |
| Split `_default.scss` | Compiled CSS output identical, no change |

---

## Security

| Fix | Security Effect |
|---|---|
| CQ-02: `.gitignore` for `.css.map` | Prevents source code exposure in public repo |
| CQ-05: CodeQL with `javascript` | Enables automated vulnerability scanning for JS code |

---

## What We Avoid

1. **Information leakage** from source maps in public repo
2. **Silent security failures** from non-functional CodeQL
3. **Merge conflicts** from monolithic SCSS files
4. **DRY violations** that make grid maintenance error-prone
5. **Professional appearance** issues from console.log in production

---

## Acceptance Criteria

- [x] Branch created from staging
- [ ] `console.log` removed from `main.js`
- [ ] `.gitignore` created with `sass/style.css.map`
- [ ] `_default.scss` split into 7 focused partials
- [ ] `_grid.scss` refactored with SCSS loops (~60 lines from 317)
- [ ] `codeql.yml` language matrix set to `['javascript']`
- [ ] `codeql.yml` action versions updated to v4
- [ ] `style.scss` import order updated
- [ ] Compiled CSS output matches current (visual regression)
- [ ] All existing styles still work

---

## Status

**Awaiting Jör's approval before implementation.**
