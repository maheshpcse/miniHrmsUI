# HR product revision — 19 September 2026

This revision supersedes the earlier Learning Hub design. The product now contains HR management pages only.

## Changes

- Removed Learning Hub navigation, dashboard cards/metrics, Angular routes/components, learning styles and backend API handlers. Old saved learning shortcuts are filtered out. Previously applied migrations and unused historical learning tables are retained so existing database history and data are not destructively altered.
- Replaced the warm/tech theme switch with a consistent HR theme: neutral backgrounds, teal actions, Segoe UI typography, restrained forms/cards and standard arrow/hand/text cursors.
- Made the navbar sticky with an opaque surface and stable layering; the sidebar remains separate.
- Removed the search inputs' hover borders/shadows and inner outlines. The surrounding search control retains a focus indicator for keyboard access.
- Authentication pages use the viewport height, reduced spacing and compact signup fields. The illustration no longer forces a 680px minimum height. On unusually small screens, browser zoom or an open software keyboard, the form region can scroll to keep every field reachable without extending the page.

## Backend connection and logs

All frontend API services use `/api`. Angular's `proxy.conf.json` forwards development requests to `http://127.0.0.1:3663`, the miniHrmsServer backend. Production hosting must also forward `/api` to Express.

At verification time the backend was not listening on port 3663. After starting the actual backend, the Angular proxy returned HTTP 200 for `/api/server` and 401 for an unauthenticated `/api/portal/dashboard` request. Those requests appeared in the backend's console output.

Express now logs method, path, response status and duration. It does not log query strings, request bodies, passwords or authorization headers. Example: `GET /api/portal/dashboard 200 18ms`.

Start or restart both processes in separate terminals:

```powershell
# E:\MEAN\Apps\MiNi HRMS\miniHrmsServer
npm.cmd start
```

```powershell
# E:\MEAN\Apps\MiNi HRMS\miniHrmsUI
npm.cmd start
```

Open `http://localhost:7200`. Restarting the UI is necessary to load its new proxy configuration. Backend request logs appear in the terminal running the backend. No new migration is required for this revision.

## Validation

- Production Angular build passed (the existing HammerJS CommonJS optimization warning remains).
- Updated backend integration suite passed for employee CRUD/search, catalogs, masking, signup approval, permissions, HR-only dashboard, requests, recovery and session revocation. Tests used a separate database instance.
- 27 desktop/mobile/authentication page checks passed with no browser errors or horizontal overflow, using the installed Express backend through an Angular proxy with an isolated test database. No API response mocks were used.
- Login, signup, forgot password and reset password fitted without page or form scrolling at 1440x900, 1366x768, 390x844 and 375x667: 16 size/page combinations.
- Sticky navbar position passed after scrolling.
- Both navigation and directory search controls passed hover and keyboard-focus checks.
- Four automated axe WCAG A/AA audits passed with no violations: login, dashboard, employee form and employee profile. Browser employee create/search/card/profile interactions passed.

Evidence: `browser-validation.json`, `accessibility-validation.json`, `hr-auth-validation.json`, `hr-search-validation.json` and `screenshots/`.

## Previous database and artwork work

The original database reconciliation and additive HR portal migration remain installed. The HR illustrations are the previously generated 3D coworker asset at `src/assets/art/people-at-work.png`, created using the imagegen skill and built-in image tool. The brief was a diverse professional team around a laptop, soft studio lighting, cream background and no text or logos. No new artwork or external communications were generated for this revision.
