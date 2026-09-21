# Product requirements: MiNi HRMS

Baseline: 21 September 2026. “Implemented” means present in inspected source; release verification is separate.

## Product and actors

MiNi HRMS brings employee information, access approval, requests and account self-service into one permission-controlled workspace. Reduced administration effort is an intended benefit, not a measured result.

Actors: applicant awaiting approval, active employee, HR operator with assigned permissions, and administrator. Job titles alone do not grant access. Backend permission codes are employees:read, employees:write, settings:write, requests:review and notifications:write, with administrator privileges.

## Requirements

| ID | Capability | Acceptance and boundary |
| --- | --- | --- |
| P-01 | Authentication | Active account/role required; signup awaits approval; reset challenges expire and cannot be reused; failures use friendly messages. |
| P-02 | Overview | Team cards/counts exclude the signed-in person and unauthorized data; brand click opens Overview. |
| P-03 | Directory | Exclude self before count/pagination; search/status/sort/export agree with results; add/edit require server permission. |
| P-04 | Employee details | Readable labels/status/dates; structured address; no technical IDs/credentials in presentation; rounded avatar or initials. API disclosure reviewed separately. |
| P-05 | Requests | Scoped access; permitted review; no self-review; concurrent reviews produce one final transition. |
| P-06 | Notifications | Audience filtering and per-user read state; badge refreshes from API. Current implementation polls, not browser push. |
| P-07 | Self-service | Separate profile/profile settings/settings; personal field edits exclude work email, role and status; PNG/JPEG up to 5 MB; authenticated session for password change; current password is not requested. |
| P-08 | Administration | Permission-controlled menus, roles, permissions, attendance/leave types and existing encryption resource. Direct API requests enforce policy. |
| P-09 | Consistent interaction | Full filter-row use, aligned forms, active sort direction, predictable overlays, keyboard support and responsive navigation. |
| P-10 | Hosting | Local proxy and production HTTPS API; clean Pages links restore on refresh; environment-specific database target. |

Source areas: src/app/admin/admin-routing.module.ts, admin/pages/workspace, ui, api-services, and backend source/portal/router.js.

## Scope boundaries

Learning Hub is excluded. Payroll calculation, benefits, biometric attendance, complete leave accrual, multi-tenant isolation, native apps, browser push and generic deletion are not established capabilities. Lookup catalogs do not constitute complete attendance/payroll workflows.

Self-exclusion applies to directory/overview reporting. Personal account controls, own requests and personal notifications necessarily retain account context; removing those would require a separate product decision.

## Success and open questions

Proposed release gates: all applicable critical cases in TEST_PLAN pass; no unauthorized data disclosure; no raw API URLs in UI failures; no horizontal page overflow at specified viewports. These are targets, not current measured results.

Product owner must define workforce scale, browser support, performance budget, retention, uptime/restore objectives and adoption targets. No interviews, competitive study or production analytics were performed in this assessment.
