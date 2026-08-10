---
name: testing-material-dashboard-angular
description: How to run and browser-test the material-dashboard-angular2 app locally, including Node version pitfalls, route list, and pages that look broken but are expected to be (Google Maps key, material.io iframe).
---

# Testing material-dashboard-angular2 locally

## Running the app
- This is an Angular 14 app. The system default `node` on PATH may be very old (v12) and will fail.
  Always select Node 24 first: `. ~/.nvm/nvm.sh && nvm use 24`.
- Installs: `npm install --legacy-peer-deps` (plain `npm install` may fail on peer deps).
- Dev server: `npm start` (= `ng serve`) → http://localhost:4200. First compile takes ~25s;
  wait for `✔ Compiled successfully.` in the log before opening the browser.
- Checks: `npm run lint` (ESLint via `@angular-eslint/builder:lint`) and `npm run build`.
  Lint may legitimately exit 0 with warnings — verify **0 errors**, don't just check the exit code.

## Navigating the UI
- Routing uses **hash URLs** (`RouterModule.forRoot(routes, {useHash: true})`), so deep links are
  `http://localhost:4200/#/dashboard`, `#/user-profile`, `#/table-list`, `#/typography`, `#/icons`,
  `#/maps`, `#/notifications`, `#/upgrade`. Route table: `src/app/layouts/admin-layout/admin-layout.routing.ts`.
- Sidebar items are defined in `src/app/components/sidebar/sidebar.component.ts` (`ROUTES`).
- The **fixed-plugin** cog button floats at the right edge (~x=993 on a 1024-wide viewport) and often
  overlaps page content. Click it to collapse the dropdown before clicking anything underneath it.
  Its color badges change the sidebar accent color and the thumbnails change the sidebar background —
  good smoke tests that jQuery / bootstrap-material-design still work.

## Good runtime smoke tests (they exercise the jQuery/vendor bundle)
- **Dashboard charts**: three Chartist SVGs must actually draw. Verify with
  `document.querySelectorAll('.ct-chart svg').length === 3` and a non-zero count of
  `.ct-chart .ct-line, .ct-chart .ct-bar` — an empty white card means Chartist failed to init.
- **Notifications page**: the six "Notifications Places" buttons call `$.notify(...)`. A visible toast
  proves jQuery + bootstrap-notify loaded. If nothing appears, check for `$.notify is not a function`.
- **Navbar bell dropdown**: opening it proves the bootstrap dropdown JS is wired.

## Known-broken pages (do NOT report as regressions without checking)
- **Maps** (`#/maps`): `src/index.html` ships the literal placeholder key
  `https://maps.googleapis.com/maps/api/js?key=YOUR-KEY-HERE`, so Google renders
  "Oops! Something went wrong." and logs `InvalidKeyMapError`. This is the only console *error* in a
  healthy run. Functionally verifying the map requires a real Google Maps API key
  (see "Devin Secrets Needed").
- **Icons** (`#/icons`): the card body is an `<iframe>` pointing at
  `https://material.io/design/iconography/system-icons.html`, which now 301-redirects to the
  deprecated `m2.material.io` and renders blank when framed. The URL loads fine in a standalone tab,
  so a blank Icons card is an upstream/third-party issue, not an app or dependency failure. If it ever
  needs fixing, embedding `https://fonts.google.com/icons` or rendering icons locally may work.

## Recording tips
- Maximize Chrome before recording: `wmctrl -a "Google Chrome for Testing" && wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz`.
- Toasts auto-dismiss after ~4s (`timer: 4000`), so screenshot within a second or two of clicking.

## Devin Secrets Needed
- `GOOGLE_MAPS_API_KEY` — only needed to functionally verify the `#/maps` page; everything else is
  testable without any secrets.
