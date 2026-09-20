# Home, authentication and local API fixes

- `/` is a standalone interactive HR home screen with no application navbar, sidebar or footer. People, Requests and Updates buttons explain the real HR features; sign-in and signup links open the existing authentication pages.
- Removed the unsupported `01 / 03` decoration. Removed the image entrance transform that competed with horizontal centering, so it no longer slides sideways on refresh or route changes.
- Centred the password visibility button in a fixed 36px hit area and reserved input padding so text does not run under it. Hover and focus do not change its position; the button exposes its pressed state.
- Shared API error formatting displays a plain API message when available, otherwise a friendly default. Angular HTTP diagnostics, URLs and HTML proxy responses are not shown as page messages.
- The actual local API was stopped; the proxy could not connect to port 3663. Backend localhost binding now explicitly uses IPv4, matching the frontend proxy.
- `proxy.conf.js` returns a friendly JSON 503 when the backend is unavailable. Terminal diagnostics still indicate that the API needs starting.

## Run both projects

From `miniHrmsUI`:

```powershell
npm.cmd run start:all
```

The launcher starts `miniHrmsServer` on port 3663, waits for its health endpoint, then starts Angular on port 7200. Backend request logs appear in the same terminal. If a backend is already running, it reuses it; its logs stay in that backend's original terminal. Ctrl+C stops only the processes started by the launcher. Keep the existing MySQL service running and backend `.env` configured.

Alternatively, run `npm.cmd start` separately in each project. Restart the frontend once to load the new JavaScript proxy configuration.

## Validation

Browser checks passed for the standalone home page, interactive feature selection, mobile width, stable illustration position, eye-control centering/password visibility and the actual offline-proxy message. Home and login axe accessibility audits reported no violations. Formatter checks cover empty API messages, transport errors, HTML responses and preserving plain API messages.

The combined launcher started the real backend. Through the Angular proxy, `/api/health/ready` returned 200 and a login request with missing fields returned 400 with `Username is required.` Backend request logs were visible. No real employee credentials or records were changed.

Screenshots: `screenshots/home-desktop.png`, `screenshots/home-mobile.png`. Detailed browser evidence: `home-workflow-validation.json`.

Changes are local only: no commit or push.

Production build passed. The existing HammerJS optimization warning is nonfatal. Duplicate HPM endpoint diagnostics are replaced with one concise backend-unavailable message in development.

