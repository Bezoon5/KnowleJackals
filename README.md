# Knowle Jackals Matchday

**Open the app: https://bezoon5.github.io/KnowleJackals/**

Current version: **1.8**. If an update breaks something, see [CHANGELOG.md](CHANGELOG.md) for links to every earlier version.

A matchday app for Knowle Jackals: pick the line-up, run the match clock, log goals and assists, and keep season stats.

Open `index.html` in a browser, or turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) to get a shareable link.

## What it does
- **Line-up**: 7, 9 or 11-a-side pitch with drag-and-drop players, formations, captain, and the next fixture (home games fill in 10:30 KO, 10:00 meet, West Warwickshire Sports Complex).
- **Share team sheet**: builds an image and WhatsApp text of the line-up and fixture details.
- **Broadcast view**: full-screen TV-style line-up graphic.
- **Match**: stopwatch, Jackals and opposition goals with scorer, assist and minute, player of the match, and full time saving.
- **Stats**: played, won, drawn, lost, goals, goal difference, clean sheets, form, goalkeeper stats (games in goal, clean sheets, goals conceded), and per-player appearances, starts, goals, assists, goal involvements and POTM. You can add and edit past results, share a match summary or season stats image, and export to CSV.
- **Team settings**: change the team name and crest, and the home-game defaults.

## Add to your iPhone Home Screen
Open the link in Safari, tap the Share button, then **Add to Home Screen**. It appears as an app with the Knowle Jackals crest.

## Where data is saved
The first time it's opened on a device, the app loads the current squad and this season's results (to 25 Nov 2026). After that, changes are saved in **that browser on that device** (localStorage). Each coach's phone keeps its own copy, and clearing browser data takes it back to the starting data.
