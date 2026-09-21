# Analysis follow-up backlog

Created 21 September 2026. All tasks are open proposals, not implemented by this documentation task. Priority indicates review order/impact, not externally verified vulnerability severity. Owners are responsibility roles, not assigned people.

| ID / priority | Work / owner | Acceptance and verification | Dependencies |
| --- | --- | --- | --- |
| HR-001 / P1 | Environment hygiene / maintainer | Classify tracked UI .env without printing values; distinguish public/secret keys; establish safe ignore/template policy. If exposure exists, plan rotation/history cleanup and verify remediation. | None |
| HR-002 / P1 | MySQL integration CI / backend-release | Fresh/upgrade/idempotency and portal tests run on disposable MySQL; wrong-target guard tested; no live credentials; failures gate release. | Safe fixtures |
| HR-003 / P1 | Maintained browser regression tests / frontend | Auth/account/report/tooltip/filter/keyboard/Pages tests versioned and run in CI; distinguish fixture vs live integration; include configuration tests. | Stable fixtures; HR-002 for integrated job |
| HR-004 / P1 | API disclosure/recovery privacy / backend | Explicit response field policy; negative permission tests inspect JSON; recovery outcomes tested with/without mail; token/rendering/CSP review recorded. | Product access matrix; HR-002 |
| HR-005 / P2 | Avatar cost/validation / backend | Measure near-limit payload/query cost; validate decoded dimensions; decide compatible storage/thumbnail strategy; upload/remove/fallback preserved without data loss. | HR-002; storage decision |
| HR-006 / P2 | Dependency/runtime modernization / full stack | Inventory locked versions/reachable libraries/advisories; staged Angular plan removes Node12 dependency; backend changes pass integration; deployment parity demonstrated. | HR-002/003 |
| HR-007 / P2 | Obsolete Learning persistence / backend-product | Inventory references/data; agree retention; removal only through approved forward migration; preserve applied history and HR workflows. | Retention decision; HR-002 |
| HR-008 / P2 | Consolidate theme overrides / frontend | One documented effective palette/font source; preserve brand, full filters, form sizing, tooltips, mobile and reduced motion. | HR-003 |
| HR-009 / P1 before live sign-off | Release/restore evidence / release | Actual API/CORS/mail/readiness checked; backup restored to isolation; alert ownership/recovery steps documented; RPO/RTO/retention agreed. | Hosting access; HR-002/003 |
| HR-010 / P2 | Data dictionary/API schema / backend | Cover all five migrations, current DTOs, permissions, indexes and statuses; identify historical artifacts; validate against isolated migrated schema. | HR-002/004 |

## Completion rule

Close a task only with its acceptance evidence, source revision and remaining limits. Update MEMORY and affected specialist docs. Existing code or old passing reports alone do not prove completion. Commit, push and deployment remain outside automatic execution.
