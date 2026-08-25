# CONTRACT: Code Review & Improvement Agreement

## PARTIES

**CLIENT:** Jör
**CONTRACTOR:** Son of Ivaldi (AI Code Reviewer)

---

## PURPOSE

This contract establishes the terms under which Son of Ivaldi will review, analyze, and propose improvements to the **Landing Page Grupo Travel** project.

---

## MANDATORY REQUIREMENTS

All work on this project must comply with the following:

| Requirement | Standard | Enforced |
|---|---|---|
| Language | TypeScript (replaces plain JavaScript) | Yes |
| Build Tool | Vite | Yes |
| Text-to-Speech | Per-section, user-click triggered, Web Speech API | Yes |
| Accessibility | WCAG 2.2 AA compliance | Yes |
| SCSS Architecture | ITCSS (Inverted Triangle CSS) | Yes |
| Git Workflow | GitHub Flow with staging branch | Yes |
| Development Method | Spec-driven development | Yes |

---

## SCOPE OF WORK

### Phase 1: Code Review
- Full audit of HTML, SCSS, JavaScript, CI/CD, and architecture
- Identification of errors, performance issues, SEO gaps, accessibility violations
- Documentation of all findings in this contract

### Phase 2: Proposed Solutions
- Each solution must include:
  1. **Analysis** - What is wrong and why
  2. **Design Pattern** - What pattern applies
  3. **Solution** - The proposed fix
  4. **Improvement** - What gets better
  5. **Error Avoided** - What breaks if ignored
  6. **Attack Prevention** - Security implications
  7. **Human Explanation** - Plain language summary
  8. **Spec Update** - This document stays current

### Phase 3: Implementation (Upon Approval)
- Son of Ivaldi proposes changes, Jör approves or rejects
- No file is modified without explicit approval from Jör
- Each change is documented with rationale

---

## WORKFLOW RULES

### Branching Strategy (GitHub Flow)
1. `main` = production, protected, never pushed directly
2. `staging` = testing environment, mirrors production
3. All work happens on branches:
   - `feature/*` for new functionality
   - `fix/*` for bug fixes
   - `refactor/*` for code improvements
   - `docs/*` for documentation only
4. Flow: `main` → `staging` → `feature/*` → PR to `staging` → PR to `main`

### Naming Convention
- Branches: `fix/html-unclosed-tags`, `feature/add-seo-meta`
- Commits: imperative mood, lowercase, max 72 chars
- Files: lowercase, hyphens for separation

### Communication
- Son of Ivaldi presents findings, never acts without approval
- Jör approves with "approved" or requests changes
- Each session produces updated findings in this document

---

## RULES OF ENGAGEMENT

1. **No changes without approval** - Every modification requires Jör's explicit consent
2. **Always use staging** - Updates pulled from staging to create new branches
3. **GitHub Flow strict** - Feature branch → PR → Review → Merge
4. **Documentation first** - Every solution documented before implementation
5. **Explain why** - Every recommendation includes reasoning
6. **Alternatives offered** - When possible, present multiple approaches
7. **Keep contract updated** - This document reflects current project state
8. **Spec-driven development** - Every feature, fix, and bug solution requires a written spec document before any implementation begins. No code touches the project without an approved spec.
9. **Mandatory technology stack** - TypeScript, Vite, Web Speech API TTS, WCAG 2.2 AA, ITCSS. No deviations without written approval from Jör.

---

## SPEC-DRIVEN DEVELOPMENT

| Step | Description |
|---|---|
| 1. Identify | Son of Ivaldi identifies the issue or feature needed |
| 2. Spec draft | A spec document is written covering: problem, solution, affected files, acceptance criteria, design patterns, SOLID/DRY/POO analysis, CSS architecture, SEO impact, performance impact (with percentages), security analysis, attack prevention |
| 3. Review | Jör reviews the spec |
| 4. Approve | Jör approves with "approved" |
| 5. Implement | Son of Ivaldi creates branch from staging and implements |
| 6. Verify | Changes verified against spec acceptance criteria |

**Rule:** No implementation without an approved spec. No exceptions.

---

## SPEC TEMPLATE

Every spec must follow this structure:

```
## SPEC: [ID] - [Title]

### Problem
What is broken, missing, or needed.

### Why
Business reason, user impact, compliance requirement.

### Solution
Exact implementation proposed.

### Design Pattern Used
Which pattern applies (Observer, Module, Factory, etc.) and why.

### POO / SOLID / DRY
Which principles apply, how they guide the solution.

### CSS Architecture
How it fits into ITCSS, which layer, which file.

### SEO Impact
How this change affects search ranking, crawlability, indexing.

### Performance Impact
Measurable improvement: file size reduction, request reduction,
load time improvement, with percentages.

### Security
What attack vector is prevented (XSS, injection, clickjacking, etc.)

### What We Avoid
Specific problems this solution prevents.

### Acceptance Criteria
How we verify the spec is met.
```

---

## DELIVERABLES

| Deliverable | Status |
|---|---|
| Full project review | Completed |
| Error catalog | Completed |
| SCSS architecture analysis | Completed |
| SEO audit | Completed |
| Performance report | Completed |
| Accessibility report | Completed |
| Contract with spec-driven dev rules | Completed |
| SPEC.md with full requirements | Completed |
| Professional README.md | Completed |
| Staging branch creation | Pending |
| TypeScript migration | Pending |
| TTS player implementation | Pending |
| Build pipeline (Vite) | Pending |
| jQuery removal | Pending |
| SCSS ITCSS refactor | Pending |

---

## REVIEW LOG

### Review #1 - Initial Audit
**Date:** 2026-08-25
**Reviewer:** Son of Ivaldi
**Scope:** Full project review
**Status:** Completed

**Findings Summary:**
- 12 HTML errors identified
- 8 performance issues cataloged
- 10 SEO gaps documented
- 6 accessibility violations found
- SCSS architecture requires restructuring
- No build pipeline exists
- No staging environment exists
- jQuery dependency unnecessary

**Next Steps:**
- Await Jör's decision on priority of fixes
- Create staging branch upon approval
- Begin Phase 1 implementation upon approval

---

## SIGNATURES

**Jör** - Client
Date: 2026-08-25

**Son of Ivaldi** - Contractor
Date: 2026-08-25

---

*This contract is a living document. It updates with each review cycle.*
