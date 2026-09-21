# Profile and directory design review

## Changes

- Overview employee totals, active/inactive counts, recent people and role breakdown exclude the signed-in account in the backend query. Pending-request totals exclude their own requests. Login activity also excludes their account; the People directory retains its existing exclusion. Personal identity is no longer printed in the Overview greeting or navbar. Personal request and notification workflows remain available.
- My Profile, Profile Settings and Settings use the available workspace width. Employment details has a spaced action area and its own `/admin/profile/employment` route.
- Employee details use shared readable labels, Title Case status/role/category values and dates such as `04 May 1990` (timestamps include time in the browser's local timezone). Nested address and other objects become labeled fields rather than raw JSON. Internal IDs, audit-user references and credential fields are omitted from detail rendering.
- Rounded avatars show first/last initials when no image is present. Profile Settings supports authenticated PNG/JPEG uploads up to 256 KB and photo removal. The backend checks file size and image signatures, preserves other profile metadata, and stores the image in the existing `employees.profile` JSON column. No migration or ephemeral upload filesystem is needed. My Profile and employee profile detail responses include the saved avatar.
- Dropdowns size to their labels, with the popup matching the measured input width. Options use readable capitalization. Pointer-operated popups close after four seconds away from the control/options; hovering pauses the timer and keyboard navigation keeps the popup open.
- Record View actions focus and scroll to the details panel. Employee-profile navigation scrolls to its profile header. Sticky-header offsets and reduced-motion preferences are respected.

## Validation

- Isolated MySQL backend integration passed: Overview/login-activity exclusion, authenticated avatar upload, invalid/oversized file rejection, avatar persistence/read/removal, preservation of other profile fields, and existing authentication/permission/request workflows.
- Browser API-fixture tests passed: full-width account cards, button spacing, initials and avatar upload/reload, readable address/date fields, metadata exclusion, popup width, hover timeout, keyboard persistence, record focus/scroll, and mobile overflow checks at 390px and 320px.
- Automated accessibility scans on My Profile, Profile Settings and Settings reported no WCAG A/AA violations. No browser runtime errors. Results: `profile-review-validation.json`.

Deploy the updated backend together with the UI to enable the new avatar endpoints. Changes remain local; no commits, pushes or live deployment were performed.

Production build passed. The existing hammerjs CommonJS optimization warning remains. Backend syntax and both repositories' whitespace checks passed.
