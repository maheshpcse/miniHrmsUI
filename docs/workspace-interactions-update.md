# Workspace interaction update

Implemented locally in the UI and backend. No commits or pushes were performed.

- The signed-in brand links to Overview. The avatar and account navigation expose My profile, Profile settings and Settings as separate routes.
- The navbar shows the authenticated user's unread notification count, capped visually at 99+. Counts refresh every 30 seconds while visible, on window focus, navigation and successful mutations. Mark all as read records a per-user high-water mark; new announcements remain unread. This is in-app polling, not browser push or WebSocket delivery.
- The desktop sidebar collapses to an icon rail and expands content space, with transitions and stored collapse preference. Mobile keeps its drawer. Sign out has orange/red hover and keyboard focus feedback.
- Theme scrollbars, smooth scrolling and consistent input/icon spacing apply to shared controls. Device reduced-motion preferences are respected; Settings also offers reduced motion and a default directory view, stored per account in this browser.
- Directory search/status filters share available width and 44px height. Mobile rearranges controls. The backend excludes the authenticated user before counting, filtering and pagination, so table/card views and page exports use the correct dataset.
- Heading actions remain in a separate aligned area and use Export page / Add new consistently. Sortable columns show neutral/ascending/descending arrows and aria-sort; changing columns resets the prior indicator. Columns that the API cannot sort no longer display misleading sorting controls.
- All active dropdowns use the shared themed overlay with separated options, pointer hover, keyboard navigation, selection state, Escape dismissal and focus handling.
- Successful creates/updates, request reviews, profile/preferences saves, signup and password reset show a themed animated confirmation dialog with focus trapping. Failed operations retain API/default error messages. The product currently has no delete operation; none was added by this design change.
- My profile loads the authenticated account from /me. Profile settings update only first/last name; role, identity and other account fields cannot be changed through that endpoint. Employment details remain available separately.

## Backend deployment

Added `db_migrations/202609210001_notification_read_state.js` for `portal_user_preferences`. Applied successfully to the configured local mini_hrms database. Deploy the backend routes and run the normal `npm run db:migrate` before using the new UI against another environment. Existing Railway migration preparation picks up this file automatically.

## Verification

- Backend integration suite passed against an isolated MySQL instance, including new assertions for exclusion before pagination/search, own-profile field allowlisting, recipient privacy, read counts and new notifications. Existing signup, approval, authentication, reset and permission checks passed.
- Deployment configuration: 8 tests passed. Backend route/migration syntax checks passed.
- Browser interaction tests used API fixtures to verify badge/reset, sort direction/reset and request parameters, identical filter dimensions, input/icon centering, keyboard dropdowns, sidebar content expansion, brand routing, profile-save and resource-save dialogs.
- Desktop/tablet/mobile widths 1366, 1024, 390 and 320 checked; no document horizontal overflow. Seven workspace accessibility scans (including an open dropdown) found no WCAG A/AA violations.
- Existing 36 home/authentication/shared-shell viewport checks passed; no layout or runtime regressions.
- Reports: `workspace-interactions-validation.json`, `viewport-artwork-validation.json`.

Production build passed using Angular 10 with Node 12.22.12; only the existing hammerjs CommonJS optimization warning remains. UI whitespace validation passed.
