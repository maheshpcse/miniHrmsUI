# MiNi HRMS project analysis

Analysis date: 21 September 2026. Scope: miniHrmsUI and read-only inspection of its sibling miniHrmsServer. This is a source-based assessment, not production certification or a fresh run of previous tests.

## Documentation map

| Document | Purpose |
| --- | --- |
| [PRD](PRD.md) | Product scope, actors and acceptance criteria |
| [Architecture](ARCHITECTURE.md) | Runtime boundaries, APIs, database and deployment |
| [Design](DESIGN.md) | Effective theme and interaction requirements |
| [Test plan](TEST_PLAN.md) | Verification commands, matrix and coverage gaps |
| [Security](SECURITY.md) | Observed controls and unresolved risks |
| [Decisions](DECISIONS.md) | Implementation choices and consequences |
| [Memory](MEMORY.md) | Dated handoff and standing preferences |
| [Rules](../RULES.md) | Development conventions |
| [Tasks](../TASKS.md) | Prioritized follow-up work |
| [Deployment](DEPLOYMENT.md) | Existing operational setup instructions |
| [Environment example](../.env.example) | Public frontend build variables |

## Applying the supplied guide

Reference: *Vibe Coding: A Complete Beginner-to-Production Guide*, the user's 37-page PDF. Page numbers are PDF page positions.

| Guide section | Application to this project |
| --- | --- |
| Pages 3–7: problem, research, stack | Record existing HRMS scope and unknowns; do not invent interviews or usage measurements. |
| Pages 8–13: documentation, PRD, architecture, design | Use actual Angular/Express/MySQL architecture, not the example notes-app stack. |
| Pages 13–17: rules, tasks, decisions, memory | Root RULES/TASKS; separate durable decisions and current-state memory. |
| Pages 18–20: tests, security, configuration | Verification matrix, security findings and a public-only environment example. |
| Pages 21–32: incremental work, review, release | Bounded tasks with acceptance evidence; retain existing deployment guide. |
| Pages 33–37: maintenance | Explicit ownership roles and documentation update triggers. |

The guide's sample prompts and automatic commit suggestions are reference material, not user instructions. This analysis does not replace the stack, implement the backlog, commit, push or deploy. Optional Cursor rules were not installed; tool-neutral RULES.md provides the project context without editor-specific behavior.

## Assessment

The source implements authentication, an employee directory, overview, requests, notifications, administration catalogs and account self-service. Shared components centralize overlays, forms and presentation. Backend authorization is independent of the UI.

Operational readiness remains unverified. Repository variables, Railway settings, production schema, mail delivery, backups and live traffic were not inspected. Historical validation reports show earlier checks, not current deployment health.

| Finding | Source evidence | Follow-up |
| --- | --- | --- |
| Legacy frontend runtime is deliberately pinned | package.json; .nvmrc; Pages workflow | HR-006 |
| Database integration tests are absent from backend CI | backend package.json; backend-ci.yml | HR-002 |
| UI CI builds and checks routing, without broad browser regressions | deploy-pages.yml; historical validation reports | HR-003 |
| UI .env is tracked; contents were not printed | git ls-files .env | HR-001; tracking alone does not prove secret exposure |
| Historical Learning tables/content remain | backend db_migrations/202609190003_people_workspace.js | HR-007 |
| Avatar bytes live in employee JSON, also loaded by authentication | backend source/portal/router.js | HR-005 |
| UI field hiding is not API confidentiality | ui/presentation.ts; employee detail endpoint | HR-004 |
| Earlier style tokens are superseded by later overrides | src/styles.css | HR-008 |
| Recovery differs for active accounts when mailer is absent | backend forgot handler | HR-004 |

## Maintenance and evidence

Backend paths in these documents refer to the separate sibling checkout, not files bundled with this UI repository. Its database/ANALYSIS.md and DATA_DICTIONARY.md describe the original reconciliation; later portal migrations must also be considered.

Product owner owns scope and metrics; frontend maintainer owns design/browser evidence; backend maintainer owns contracts/data/security; release maintainer owns deployment and restore evidence. These are responsibility roles, not assigned people. Update affected docs with contract changes, MEMORY after a work session, and TASKS only when acceptance evidence exists.
