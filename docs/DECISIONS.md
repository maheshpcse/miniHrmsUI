# Architecture decision record

Recorded 21 September 2026. Observed choices describe existing implementation, not invented historical approvals. Proposed changes remain in TASKS.

| ID | Status | Decision and evidence | Consequence / revisit trigger |
| --- | --- | --- | --- |
| ADR-001 | Observed | Angular/Express/MySQL in separate repositories; manifests/deployment files. | Coordinate API releases; do not adopt the guide's illustrative Next.js/Supabase stack. |
| ADR-002 | Observed workaround | Angular uses Node12.22.12; backend Node24; scripts/workflows. | Compatibility maintained; HR-006 removes workaround through verified modernization. |
| ADR-003 | User-required, implemented | Pages frontend/Railway backend; clean paths through fallback. | Deep links initially return HTTP404; server rewrites need different hosting. |
| ADR-004 | User-required, implemented | Local mini_hrms, production railway; target validator. | Reject wrong targets; does not rename/copy databases. |
| ADR-005 | Observed | Database sessions supplement JWT; active roles/permissions reloaded. | Revocation effective server-side; authenticated requests depend on database. |
| ADR-006 | Observed, review planned | Avatar stored in employee JSON. | Simple persistence, larger payload/query cost; HR-005 evaluates alternatives. |
| ADR-007 | Observed | Notification polling plus read watermark. | Not browser push; immediate-delivery requirements need a new decision. |
| ADR-008 | User-required | HRMS only; no Learning Hub. | Historical Learning artifacts need forward cleanup, not edits to applied migrations. |
| ADR-009 | User-required | No automatic commits/pushes; no image previews in chat. | Local changes remain reviewable; guide examples cannot override this. |
| ADR-010 | Documentation choice | Cross-project analysis in UI docs; backend read-only. | Sibling references require both checkouts; backend operational docs retain authority. |

New decisions should state context, alternatives, tradeoff, affected contracts, migration/recovery implications and evidence. Mark replaced decisions superseded rather than erasing history.
