# CI Notes (notes_frontend)

This directory is an Expo-managed app. Native projects are generated only after running:
- npm run prebuild:android

For CI:
- Lint only: npm run ci:lint
- Safe build no-op: npm run ci:build

Gradle:
- Some CI pipelines call ./gradlew from here. A guard script (./gradlew) exits successfully when android/gradlew is absent.
- For a real native build in CI, add a prebuild step first:
  1) npm run prebuild:android
  2) cd android && ./gradlew assembleDebug
