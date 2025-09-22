This directory contains a guard script for CI environments that invoke ./gradlew by default.

Because this is an Expo managed app, the native Android project is not generated until you run:
  npm run prebuild:android

If CI tries to run ./gradlew before prebuild, the guard script exits successfully to avoid false failures.
When you actually need a native build in CI:
  1) npm run prebuild:android
  2) cd android
  3) Replace the guard with the real Gradle wrapper produced by prebuild (or just run the wrapper created by prebuild).
