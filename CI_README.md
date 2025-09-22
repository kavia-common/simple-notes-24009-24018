# CI Notes (Workspace Root)

This repository contains an Expo-managed React Native app in notes_frontend.

- Lint only:
  - cd notes_frontend && npm run ci:lint
- CI build (safe no-op without native projects):
  - cd notes_frontend && npm run ci:build

Gradle wrapper invocation:
- Some CI systems try to run ./gradlew from the repo root. A guard wrapper is provided at:
  - ./gradlew (root)
  - notes_frontend/android/gradlew
- These wrappers exit successfully if the native Android project does not exist yet.

To perform a real native build:
1) cd notes_frontend
2) npm run prebuild:android
3) cd android && ./gradlew assembleDebug
