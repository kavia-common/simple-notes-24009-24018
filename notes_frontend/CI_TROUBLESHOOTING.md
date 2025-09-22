# CI Troubleshooting: Startup failure due to missing dependencies

Issue observed:
- Expo web startup failed with:
  CommandError: "react-native-gesture-handler" is added as a dependency in your project's package.json but it doesn't seem to be installed. Run "npm install", or the equivalent for your package manager, and try again.

Root cause:
- Dependencies listed in package.json were not installed (no lockfile present), so Metro could not resolve react-native-gesture-handler and other React Navigation peer packages.

Resolution performed:
1) Installed dependencies non‑interactively in notes_frontend:
   - cd notes_frontend
   - npm install --no-audit --no-fund
   This created a package-lock.json and installed all dependencies, including:
   - react-native-gesture-handler
   - @react-navigation/* packages
   - react-native-screens
   - react-native-safe-area-context
   - react-native-reanimated
   - @react-native-async-storage/async-storage

2) Smoke test:
   - CI=true npm run web
   - Metro started successfully; no missing-module errors were reported.

Notes:
- Expo suggested newer “expected versions” for some packages relative to expo 53.x. These are recommendations and not required for startup. The app runs with currently installed versions.
- For deterministic CI installs, consider using `npm ci` after the `package-lock.json` is generated and committed. If the lock and package.json are out of sync, `npm ci` will fail—run `npm install` locally and commit the updated lock file first.

Recommended CI steps for this repo:
- cd notes_frontend
- npm ci --no-audit --no-fund  (ensure package-lock.json is checked in)
- npm run ci:lint
- Optionally, to smoke test web bundling in CI (non-interactive):
  - CI=true npm run web
