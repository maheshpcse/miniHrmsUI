# Viewport layout and authentication artwork

## Changes

- Home uses a viewport-height grid, with flexible hero space and a compact HR essentials panel. It has no navbar or footer.
- Home, authentication and workspace shells share logo position and size: 26px left / 20px top on desktop, 20px left / 18px top on mobile, with a 42px brand mark.
- Login, signup, account recovery and password reset use distinct HR illustrations, descriptive alternative text and page-specific panel copy. Home retains the existing team illustration.
- Narrow layouts hide the illustration to keep the main actions accessible. Overflow remains available within content panels when an unusually small viewport, zoom level or validation message needs more space.
- The password recovery help link is separated visually from the expiry explanation for accessibility.

## Generated assets

Generated with the built-in image_gen tool using the imagegen skill, one illustration per call. Final assets are stored in the project:

| Page | Asset |
| --- | --- |
| Login | `src/assets/art/auth-login.png` |
| Signup | `src/assets/art/auth-signup.png` |
| Forgot password | `src/assets/art/auth-forgot.png` |
| Reset password | `src/assets/art/auth-reset.png` |

Prompt set (scene and style specifications):

Shared style: premium polished 3D clay illustration with expressive adult faces and high-end animated-film quality, square composition, cream #F8F2D8 background, cobalt #1400C3 and orange #FF4E02 accents, soft studio lighting, no text, logos or watermarks.

- Login: friendly South Asian man with wavy dark hair in a cobalt jacket at a laptop, floating shield/check and orange mug, communicating secure employee sign-in.
- Signup: Black HR colleague with curly hair and orange cardigan welcoming a new East Asian female employee in cobalt holding a blank identity badge; onboarding board with a checkmark.
- Forgot password: South Asian woman with shoulder-length dark hair and cobalt sweater checking a smartphone at a desk, with an envelope notification and key communicating account recovery.
- Reset password: Black man with glasses, curly hair and cobalt sweater holding an orange key beside a cobalt padlock/check and a closed cream laptop, communicating a secure new password.

## Validation

Browser checks covered 1918x909, 1536x727, 1366x768, 1024x768, 390x844 and 375x667.

- Home and all four authentication routes: no document or form-panel scrolling at the tested sizes.
- Shared workspace header: matching logo coordinates and dimensions. Workspace content scrolling is allowed.
- All 36 route/viewport checks passed; no browser runtime errors.
- Automated axe WCAG A/AA checks on home, all four authentication pages and the shared-shell not-found page found no violations at 1366x768.
- See `viewport-artwork-validation.json` and `screenshots/viewport-*.png` for recorded results and visual checks.

No commits or pushes were performed.

Production validation: `ng build --prod` passed (Angular 10 using Node 12.22.12). The build reports the existing hammerjs CommonJS optimization warning. `git diff --check` passed.
