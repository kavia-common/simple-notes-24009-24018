# Notes Frontend (Expo Managed)

This is an Expo-managed React Native app using the Ocean Professional theme.

Run locally:
- npm install
- npm start

Lint:
- npm run ci:lint

Build scripts:
- npm run build: Lint + skip Gradle if the native android project is not present (CI-safe).
- npm run build:native: Prebuild Android and then run Gradle assembleDebug.

Native build steps:
1) npm run prebuild:android
2) cd android && ./gradlew assembleDebug

Note: In managed workflow, android/ and ios/ do not exist until prebuild runs. CI should use npm run build or npm run ci:build to avoid failing on missing Gradle.
