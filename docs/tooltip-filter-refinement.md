# Tooltip, filter width and cursor refinement

- Navbar tooltips are disabled. Sidebar tooltips are enabled only on the collapsed desktop icon rail; expanded and mobile navigation do not show them.
- Tooltips wait for deliberate hover (250ms), clear pending timers, dismiss after mouse leave/click/Escape/scroll, and clean up on navigation or input changes. Programmatic or mouse-restored focus does not open them. Keyboard Tab focus remains supported on eligible controls.
- Report rows use all available width. On desktop the People search occupies half the row and the status selector fills the remaining space alongside view/refresh controls with 12px gaps. Single-search reports use available width; mobile refresh controls remain aligned to the right edge.
- Enabled inputs show pointer before focus and a text cursor while editing. Picker/checkbox/file controls keep pointer. Text links have stable padded hover highlights without underlines.

Validation: browser checks passed for tooltip suppression/dismissal, collapsed navigation, automatic focus, full row width and overflow at 1536/1024/390/320px, and input cursors. No browser runtime errors. No commits or pushes.
