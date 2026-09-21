# Password change workflow update

21 September 2026. User-requested change: Current Password is no longer required for signed-in account password changes.

The profile-settings form now contains New Password and Confirm New Password. It validates required/minimum-length fields and matching confirmation, then sends only password to POST /api/portal/me/password. Success resets both fields and displays feedback.

The backend no longer checks the old password. It still requires an active authenticated session, scopes the change to that session's user, throttles requests, validates new-password length/UTF-8 bytes, rejects reuse and revokes other sessions/reset challenges. The current session remains active. The signed-in session now authorizes the change without password re-entry; recovery via email is unchanged.

Validation: backend portal integration suite passed against isolated disposable MySQL, including password-only success, unauthenticated rejection, short/reused-password rejection, credential updates and session revocation. Browser checks passed two-field layout, required/mismatch validation, password-only request, success feedback/reset and no runtime errors. Angular development compilation and backend syntax checks passed. No live database changes, commits or pushes.
