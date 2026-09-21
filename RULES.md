# MiNi HRMS development rules

These conventions support the guide's context-first workflow. Current user instructions take precedence. Reading this document does not authorize the backlog, publishing or destructive operations.

1. Read relevant source and docs/PROJECT_ANALYSIS.md before changes. Distinguish implemented state, requirements and unknowns.
2. Preserve Angular TypeScript and CommonJS Express conventions. Reuse existing components rather than replacing the stack or adding libraries for small changes.
3. Use shared UI, presentation helpers, PortalService and resource configuration. Keep database logic out of templates; preserve keyboard support and accessible names.
4. Enforce server authorization, validation and sensitive-field allowlists. Client guards/hidden fields are not security boundaries.
5. Preserve mini_hrms locally and railway in production. Add forward migrations; never rewrite applied baselines or target application databases with destructive tests.
6. Keep secrets/personnel records out of browser assets, examples, logs and tests. Use synthetic fixtures.
7. Follow docs/DESIGN.md, including latest tooltip suppression, full filter-row width, pointer/caret behavior and reduced motion.
8. Keep changes scoped and reviewable; preserve unrelated work. Run appropriate meaningful checks and report actual results/limits.
9. Update affected contracts/design/test docs with behavior changes. Decisions record tradeoffs; MEMORY records current state; TASKS tracks evidence-backed completion.
10. Do not automatically commit/push either repository. Do not display image previews in chat. Deployment/remote settings are outside a documentation-analysis task.

A bounded task brief specifies requirement ID, files, constraints, acceptance and verification. These rules add no mandatory pause or permission request for already-authorized routine local work.
