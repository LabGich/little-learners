# Little Learners — React Native / Expo starter

A bilingual (English/Kiswahili), offline-first learning app starter for children aged 6–8. Built with Expo, React Native and TypeScript.

## Included in this project

- Responsive Expo Router app structure for Android, iOS and tablets
- Home, learning catalogue, subject pages, lesson player, progress and parent area
- Starter content in English and Kiswahili: phonics, early reading, counting, addition, writing, science, healthy habits and patterns
- Spoken lesson instructions and questions using Expo Speech
- Local SQLite storage for completed lesson results
- AsyncStorage for language, child name and learning age
- Simple parent-area arithmetic gate
- No advertising, chat or external links in the child learning flow

## Run locally

1. Install Node.js 22.13+ and a code editor (VS Code recommended).
2. In this folder run `npm install`.
3. Run `npx expo install --fix` to align Expo packages with SDK 58.
4. Run `npx expo start`.
5. Use an SDK 58-compatible Expo Go build, or a development build on an Android emulator / iOS simulator.

For Android builds use EAS Build after configuring your Expo account and app identifiers. iOS device builds require Apple signing credentials.

## Important implementation notes

This is a runnable MVP foundation, not yet a fully published commercial app. The current lesson catalogue is sample content and should be expanded and reviewed by an early-years teacher, especially the Kiswahili curriculum content. Audio uses device text-to-speech; downloadable recorded narration can be added for consistent child-friendly voices.

Offline lesson use and local progress work without an account. Cloud sync is optional and requires configuration: create a Supabase project, run `supabase-schema.sql` in its SQL Editor, copy `.env.example` to `.env`, and add the project URL and anon/publishable key. Restart Expo after setting environment variables. Parent email one-time-code sign-in and upload of local lesson results are scaffolded. Do not put a Supabase service-role key in the mobile app. The sync flow merges remote and local records by the most recent completion timestamp, then uploads the merged result. Test this carefully with multiple child profiles before production; this starter schema currently scopes records to the parent account.

Before release, add automated tests, accessibility checks, privacy/consent flows, a stronger parent authentication method, curriculum review, app icons/splash assets, and production bundle identifiers. The parent arithmetic check is only a prototype gate, not secure authentication.
"# little-learners" 
