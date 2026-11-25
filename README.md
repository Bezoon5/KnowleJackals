# Knowle Jackals Matchday

A matchday app for Knowle Jackals: pick the line-up, run the match clock, log goals and assists, and keep season stats.

Open `index.html` in a browser, or turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) to get a shareable link.

## What it does
- **Line-up**: 7, 9 or 11-a-side pitch with drag-and-drop players, formations, captain, and the next fixture (home games fill in 10:30 KO, 10:00 meet, West Warwickshire Sports Complex).
- **Share team sheet**: builds an image and WhatsApp text of the line-up and fixture details.
- **Broadcast view**: full-screen TV-style line-up graphic.
- **Match**: stopwatch, Jackals and opposition goals with scorer, assist and minute, player of the match, and full time saving.
- **Stats**: played, won, drawn, lost, goals, goal difference, clean sheets, form, and per-player appearances, starts, goals, assists, goal involvements and POTM. You can add and edit past results and share a match summary image.
- **Team settings**: change the team name and crest, and the home-game defaults.

## Where data is saved
When it runs on GitHub Pages, the squad and match history are saved in **that browser on that device** (localStorage). Each coach's phone keeps its own copy. Clearing browser data removes it.
