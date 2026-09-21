# Final filters and profile settings review

- Report toolbars use a consistent 12px gap, with adjacent controls rather than space-between distribution. Search uses available width on single-search reports, and approximately 50% alongside additional filters on desktop. Narrow screens stack controls.
- Form dropdowns fill their input columns, including Status in Add New Employee; their option overlays retain the trigger width. Report dropdowns use a compact 180px width.
- The sidebar workspace title/subtitle and icon are vertically centered.
- Shared themed tooltips support pointer hover, keyboard focus, Escape and viewport positioning. Common text links have a highlighted hover/focus background without underlines.
- Upload Photo has a pointer cursor, and both frontend/backend accept PNG/JPEG files up to 5 MB. Existing 256 KB guidance is superseded.
- Profile Settings edits names, username, mobile number, date of birth and address. Work email, employee ID, role and account status remain HR-managed. Updates preserve avatar/profile metadata and synchronize username references in the login tables.
- A separate Change Password form verifies the current password, validates confirmation/new-password requirements, invalidates outstanding recovery requests and signs out other sessions. The current session remains active. Password fields are cleared after success.

## Migration and deployment

Backend migration `202609210002_profile_username_cascade.js` updates login username foreign keys to ON UPDATE CASCADE while preserving deletion behavior. Applied to the configured local database. Railway must deploy the backend and apply this migration before using username editing from the new UI; its normal deploy preparation runs pending migrations. No live deployment, commits or pushes were performed.

## Verification

- Browser checks passed for search width/gaps, matching form controls, tooltip behavior, sidebar centering, editable profile fields, 5 MB upload rejection, password mismatch/API error/success states, and responsive overflow at 1024/390/320px.
- No browser runtime errors or WCAG A/AA violations in the profile-settings scan. Results: `final-review-validation.json`.
- Isolated MySQL integration passed for upload limits, profile update allowlisting, synchronized usernames, duplicate rollback, current-password verification, new-password login and other-session revocation, plus the existing portal suite.
- Ten deployment configuration tests passed.

Production build passed; only the existing hammerjs CommonJS optimization warning remains. Backend syntax and repository whitespace checks passed.
