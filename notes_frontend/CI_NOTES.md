# CI notes for Expo managed app

This project uses Expo managed workflow. Native android/ and ios/ projects are not checked in by default.

- Lint: npm run ci:lint
- Build (CI-safe): npm run ci:build
  - This script is a no-op if android/gradlew is absent.
- Local native build:
  1) npm run prebuild:android
  2) cd android && ./gradlew assembleDebug

If CI requires an actual Gradle build, insert a prebuild step before invoking any Gradle tasks.
