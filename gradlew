#!/usr/bin/env bash
# Root-level Gradle guard for CI environments that attempt to run ./gradlew by default.
# This is an Expo-managed project; native projects are generated only after `expo prebuild`.
if [ -f "notes_frontend/android/gradlew" ]; then
  echo "Delegating to notes_frontend/android/gradlew"
  cd notes_frontend/android && ./gradlew "$@"
  exit $?
fi
echo "Gradle guard: No native Android project found. Run 'cd notes_frontend && npm run prebuild:android' to generate it."
exit 0
