# Design and interaction specification

Baseline: 21 September 2026. Latest HRMS requirements supersede older redesign notes. This is a source-based review, not a Figma inspection or a new mockup.

## Effective visual system

The later HR-product block in src/styles.css overrides earlier themes, including data-theme variants. Effective tokens: primary #1400C3, primary-soft #EFEDFF, orange #FF4E02, cream #F8F2D8, danger #BA0001, page #F3F5F7, surface #FFFFFF, ink #22313B, muted #586875 and line #E0E6E9. The later sage token is #FFF0E8. Radius is 14px; shadow is 0 4px 18px rgba(26,48,58,.04).

Effective heading/body font is Segoe UI, Arial, sans-serif. Initial Manrope/DM Sans declarations are overridden. Blue/orange is the brand direction; green is not the primary theme. Residual theme rules need consolidation under HR-008.

## Layout contracts

- Public home/auth: consistent brand placement, different contextual right artwork, no workspace navbar/footer, no unnecessary desktop scrolling. Permit scrolling for zoom, keyboard and errors; do not clip forms to enforce viewport fit.
- Workspace: sticky header, separate sidebar/footer, expanding content when sidebar collapses, mobile drawer. Brand opens Overview. Center workspace identity within its intended block.
- Actions: stable placement independent of title length; use Export page and Add new where applicable.
- Report filters: use full row width. Sole search expands; with multiple filters search uses approximately half the desktop row and other filters share remaining space beside fixed view/refresh controls. Use 12px gaps, not large distributed gaps. Stack on narrow screens.
- Add/edit forms: select dimensions match neighboring inputs. Report selector sizing must not leak into forms.

## Interaction contracts

Tooltips need deliberate hover (250ms) or keyboard Tab focus. Only collapsed desktop sidebar items show tooltips, positioned to their right; all other controls, including navbar and expanded/mobile sidebar, have none. Dismiss on leave, click, Escape, scroll, resize and destruction. Programmatic focus must not create ghost tooltips. Accessible names remain even without tooltips.

Custom selects use CDK overlay, equal trigger/popup width, spaced options and pointer affordances. Keyboard selection, Escape and focus restoration must work. Pointer inactivity close must not interrupt keyboard users. Buttons/action links use pointer; text inputs and textareas retain an insertion cursor before and during editing. Disabled/read-only fields must not imply editability.

Links have padded, stable hover highlights without underlines or layout shifts. Password-eye controls cannot cover text or alter field padding. Sorting shows direction only on the active column. View actions scroll/focus revealed details. Smooth motion respects reduced-motion preference.

Use consistent loading, empty, failure and success states. Mutations show themed feedback; failures use safe API messages or a default, never endpoint dumps. Dialogs trap focus, support keyboard dismissal and return focus.

## Data presentation and review

Use ui/presentation.ts for spaced Title Case labels, status mappings and formatted dates. Render address objects as fields. Technical keys/credentials are not profile content. Date-only formatting uses UTC to prevent day shifts; timestamps currently use viewer timezone. A business timezone policy remains a product decision.

Avatars are round with first/last initials fallback. Self-exclusion applies to directory/overview, not essential account controls. Profile, profile settings and application settings remain separate.

Test 320/390/768/1024/1536px, keyboard-only use, 200% zoom, reduced motion, long labels, empty data and validation errors. Check contrast, focus, reading order and overflow. See [test plan](TEST_PLAN.md). Historical screenshot reports are not current sign-off. Do not display image previews in chat.
