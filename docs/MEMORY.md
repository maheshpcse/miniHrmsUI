# Project memory

Snapshot: 21 September 2026. This handoff does not authorize executing the backlog.

## Current work

Analyzed the 37-page guide and created project-specific requirements, architecture, design, testing, security, decisions, rules and task documents. This session changes documentation and a configuration example only. No feature, dependency, migration or hosting setting was changed; no fresh application build/integration run is claimed.

## Standing preferences

- Do not automatically commit or push either project.
- Do not display image previews in chat.
- Product is HRMS only; Learning Hub is excluded.
- Local database mini_hrms; production railway.
- Blue/orange HR theme; latest tooltip/filter/cursor requirements supersede older notes.
- Keep public brand placement consistent; separate profile, profile settings and settings.

## Current source state

Public home/auth, guarded HR workspace, shared resource/account views, custom select/tooltip/feedback/avatar and Pages fallback exist. Backend has session/permission validation, profile/password/avatar endpoints and five migration files. Notifications poll. Historical Learning tables remain. CI does not establish complete browser/database workflow coverage.

UI .env is tracked; contents were not printed and exposure is not established. Classify privately first. Effective fonts are Segoe UI/Arial despite earlier declarations. Backend multer declaration is 1.4.3; do not assume a newer major.

## Handoff

Start at [analysis](PROJECT_ANALYSIS.md), then [tasks](../TASKS.md). HR-001 is first proposed review; HR-002/003 establish regression gates before broad refactoring. Remote settings, production health/data and hosting credentials were not checked. Earlier validation files describe previous runs only.

Update this file after work sessions with completed task IDs, checks actually run, remaining limits and next bounded action. Keep personal data, secrets and transient transcripts out.


## 22 September 2026: HR core modules

Added connected HR module pages and role-scoped organization hierarchy, with core backend workflows, policy enforcement and local database migration. Payroll mode chosen by user: import finalized results. See hr-core-implementation.md for actual coverage, tests and advanced features not yet implemented. Earlier statements about the absence of these modules describe the prior snapshot. No commits/pushes or production deployment.

## 22 September 2026 � module workspace revision
See [revision notes](module-workspace-revision.md) for stable hierarchy rendering, module dashboards/entry/report views, active navigation, scoped people data, module folders and opt-in email/SMS queue. Credentials/provider configuration and production deployment remain external setup. No commits, pushes or image previews.
