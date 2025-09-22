# simple-notes-24009-24018

Mobile Notes App - Ocean Professional Theme

How to run:
- cd notes_frontend
- npm install
- npm start
- Use Expo Go or a simulator to view the app.

Notes for native build:
- This is an Expo managed app. The android/ and ios/ folders are not present until you run an Expo prebuild.
- To create native projects: npm run prebuild:android (and for iOS: expo prebuild --platform ios on macOS).
- After prebuild, you can build with: cd android && ./gradlew assembleDebug
- CI should avoid calling Gradle directly before prebuild; use:
  - npm run ci:lint for lint checks
  - npm run ci:build to safely no-op build in managed workflow (or ensure prebuild occurs before any Gradle command)

Features:
- Notes list with categories (All, Work, Personal)
- Search notes
- Create, edit, delete notes
- Floating action button for adding
- Modern UI with rounded corners, subtle shadows, gradients, and smooth presses

Data:
- Stored locally using AsyncStorage mock (no backend required).