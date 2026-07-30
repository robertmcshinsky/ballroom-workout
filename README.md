# 💎 Ballroom Fit

[![Deploy to GitHub Pages](https://github.com/robertmcshinsky/ballroom-workout/actions/workflows/deploy.yml/badge.svg)](https://github.com/robertmcshinsky/ballroom-workout/actions/workflows/deploy.yml)

Ballroom dance competition prep workout tracker with offline support. A single-page PWA you install on your phone — no accounts, no server.

## Setup
1. **Clone:** `git clone https://github.com/robertmcshinsky/ballroom-workout.git`
2. **Customize (optional):** edit `index.html` — the `LIBRARY` array near the top holds every workout. *You only need to touch this file to change workouts. Everything else is automatic.*
3. **Push:** commit and `git push origin main`.
4. **Enable Pages:** repo **Settings → Pages → Source: Deploy from a branch → `main` / `root`**.
5. **Open:** `https://robertmcshinsky.github.io/ballroom-workout/` (live 1–2 min after each push).

## Install on your phone
- **iOS:** open the URL in **Safari** → **Share** → **Add to Home Screen**.
- **Android:** open the URL in **Chrome** → **⋮ menu** → **Install app**.

## Features
- Workout **Library** of ballroom-specific routines (Latin, Standard, core, mobility)
- **Today** view with a live session, exercise check-off, RPE + notes
- **Progress** dashboard: streak, minutes, 7-day chart, history
- Light/dark mode, fully responsive, installable PWA
- **Offline-first** — works with no signal after first load

## Your data
All history is stored **locally on your phone** (localStorage). Nothing is uploaded or synced — GitHub only hosts the app code, never your data. Clearing your browser data or "Clear all data" erases it.
