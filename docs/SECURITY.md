# Security assessment and requirements

Source review only, 21 September 2026. No penetration test, advisory lookup, production inspection or compliance certification was performed.

## Assets and controls

Protect personnel identities, contact/address/DOB data, bank/onboarding details, password hashes, reset challenges, sessions and administrator permissions. Browser state, uploads and request parameters are untrusted. Pages assets/runtime config are public; database/signing/SMTP credentials belong only on the backend.

Observed in backend source/portal/router.js: HS256 token verification plus unexpired/unrevoked database sessions; active user/role checks; server permissions and field allowlists; bcrypt credentials; expiring, attempt-limited recovery challenges; session revocation; transactional request review with no self-review. Throttling is database-backed. Pagination is bounded and sort fields allowlisted.

Avatar handling permits one PNG/JPEG up to 5 MB with MIME and signature/trailer checks. Selected bank fields are removed and account numbers masked. source/server.js gates legacy routes behind administrator authentication. Request metadata logging omits bodies/query strings. These observations do not establish universal endpoint safety.

## Findings

| Finding | Required verification or treatment | Task |
| --- | --- | --- |
| UI .env is tracked | Privately classify keys. If sensitive values exist, rotate and plan removal/history remediation. Never echo values. Ignore rules alone do not untrack files. | HR-001 |
| Broad employee detail row selection | Define response DTO allowlists; verify network JSON, not only UI visibility. | HR-004 |
| Recovery response differs without mailer | Active account can receive 503 while absent account receives generic success; address account-enumeration tradeoff. | HR-004 |
| Base64 avatar in employee JSON | Near-5MB file expands to about 6.7 MB; auth loads employee row. Measure query/memory cost; signature checks are not full image decoding/dimension validation. | HR-005 |
| Browser-accessible session token | XSS can read sessionStorage. Review rendering, third-party scripts and hosting-compatible CSP. Revocation does not prevent theft. | HR-004 |
| Legacy dependencies/routes | Inspect exact locked versions and advisories before assigning severity; review reachable handlers, uploads and logging. | HR-006 |
| Operational controls unverified | Assign owners/evidence for rotation, retention, backups, restores and alerts. | HR-009 |

## Acceptance

Exercise direct APIs with missing/expired/revoked credentials, low privilege and tampered identifiers. Unauthorized reads/writes must fail. Validate real CORS origins and TRUST_PROXY against ingress. Never log credentials, recovery codes or personnel payloads.

Schema changes use forward migrations with backups and isolated upgrade checks. Do not delete records to reconcile schema drift. Avatar changes need compatible migration/fallback. Retention/export/access policy requires product-owner input; do not claim regulatory compliance from this document.

See [test plan](TEST_PLAN.md) and [tasks](../TASKS.md).
