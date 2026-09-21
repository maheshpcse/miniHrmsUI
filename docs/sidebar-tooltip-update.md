# Sidebar tooltip and cursor update

21 September 2026.

- Tooltip directive now attaches only to explicit uiTooltip hosts and requires a collapsed desktop sidebar. Other aria-labelled controls retain accessible names without tooltip behavior.
- Sidebar tooltips appear 12px to the right, vertically centered with viewport bounds protection.
- Navigation links have 6px vertical margins in expanded/collapsed states; collapsed icon padding remains 12px by 8px.
- Text inputs and textareas use text cursors before/during focus. Action controls and date/file/selection controls retain pointer affordances.

Validation: Angular development compilation passed. Headless Chrome checks with fixture API responses passed collapsed-only/right-side positioning, expanded/navbar/report suppression, both-state menu spacing, mouse dismissal, programmatic-focus suppression, keyboard Tab/Escape, mobile suppression/overflow, text input/textarea cursors and absence of runtime errors. No live backend verification was needed for these interaction changes. No images displayed, commits or pushes.
