# Authentication layout and palette update

- Set the authentication layout to the actual viewport height and gave Angular host elements block layout, removing the unused strip below the login page.
- Moved the illustration into its own grid section below the heading. The image now uses contain sizing, keeps all three faces visible and blends its edges into the cream panel.
- Kept the mobile form layout and compact signup arrangement; very short viewports can scroll inside the form when needed to keep controls reachable.
- Replaced teal primary controls with #1400C3 blue, #FF4E02 orange accents and #BA0001 error red. Shared sidebar, navbar, links, focus indicators and form/button styles use the updated palette.

Validation: production build passed; 24 authentication page/viewport checks passed at 1918x909, 1536x727, 1366x768, 1024x768, 390x844 and 375x667; no gaps, horizontal overflow, image/text overlap or browser errors. Automated login WCAG A/AA audit passed. See `auth-layout-validation.json` and `screenshots/login-blue-*.png`.
