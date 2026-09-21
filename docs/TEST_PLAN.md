# Test plan

These are verification requirements, not a claim that tests ran during this analysis. Existing validation JSON/update reports describe earlier work. Fixture browser tests do not establish live API/database behavior.

## Available commands

In UI with dependencies installed:

```powershell
node scripts/pages-config.test.js
node scripts/pages-routing.test.js
npm.cmd run build -- --prod
```

For Pages, set real public API_URL and PAGES_BASE_PATH in process environment, then npm.cmd run build:pages. The example file is not loaded automatically. npm test/lint/e2e are legacy Angular scripts: inspect their harness and use a compatible runtime before relying on them. No npm run typecheck script is configured.

Backend commands: npm.cmd run test:deployment; npm.cmd run test:portal; npm.cmd run db:test. Backend npm test is a placeholder that exits with failure, not the integration entry point.

Database tests require the dedicated disposable MySQL described in backend/database/README.md: 127.0.0.1:17360, matching MINI_HRMS_TEST_DATADIR and minihrms-migration-test- directory prefix. Tests may drop/recreate their schema. Never target application databases. MINI_HRMS_SOURCE_DIR enables original-dump upgrade cases. Use synthetic personnel fixtures.

## Acceptance matrix

| Case | Requirement | Expected outcome |
| --- | --- | --- |
| T-01 | P-01 | Invalid/inactive login and expired/revoked session denied; active valid account/role accepted. |
| T-02 | P-01 | Signup pending; wrong/expired/reused reset code rejected; successful recovery revokes sessions. |
| T-03 | P-02/P-03 | Self excluded before directory counting/paging and from overview aggregates. |
| T-04 | P-03/P-08 | Tampered fields/roles/sort do not bypass policy; search/paging/export match visible data. |
| T-05 | P-04 | Metadata hidden in UI; API returns only approved fields; nested address/empty values/dates render correctly. |
| T-06 | P-05 | Unauthorized/self-review denied; concurrent reviews produce one final transition. |
| T-07 | P-06 | Notification audiences/read state isolated per user; badge updates after polling/read. |
| T-08 | P-07 | Allowed profile edits persist, including username relationships; email/role/status tampering cannot change protected values. |
| T-09 | P-07 | Valid PNG/JPEG at size limit accepted; oversized/mismatched/multiple files rejected; removal restores initials. |
| T-10 | P-07 | Unauthenticated change and reused/invalid new password rejected; authenticated change needs no old password, revokes other sessions and preserves current session. |
| T-11 | P-09 | Only collapsed desktop sidebar tooltips appear, on the right; other controls suppressed; hover/Tab/dismissal works; programmatic focus creates no overlay. |
| T-12 | P-09 | Full-width filters, aligned forms, correct cursors, padded links, keyboard selects and sort directions. |
| T-13 | P-10 | Pages direct links/refresh/query/anchor/old hash/back work under root and project base; redirect boundaries enforced. |
| T-14 | P-10 | Backend outage produces safe UI error; health/logs/CORS correct; no frontend credentials. |
| T-15 | P-10 | Fresh/upgrade/repeated migrations preserve records; incorrect target refused; both names tested in isolation. |
| T-16 | P-09 | Narrow viewports, 200% zoom, reduced motion, focus and reading order work across pages. |

## Coverage and release evidence

UI CI currently validates API configuration, tests routing and builds Pages. Backend CI runs deployment tests, syntax checks and Docker configuration validation, not MySQL integration. HR-002/003 promote maintained database/browser gates.

Record revision, Node/npm versions, command, fixtures, timestamp, result and exceptions per release. A successful build alone is insufficient. Hosted sign-off also requires actual CORS/HTTPS, account smoke testing, recovery mail, migration status and tested restore. No fresh hosted sign-off was performed here.
