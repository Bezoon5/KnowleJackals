# Knowle Jackals Matchday

**Open the app: https://bezoon5.github.io/KnowleJackals/**

Current version: **3.12** (27 Nov 2026) · [All versions and what changed](CHANGELOG.md)

A matchday app for Knowle Jackals (Under 12s, 2026/27). Pick the line-up, share the team sheet, run the match clock, log goals and assists, and keep season stats, all from your phone.

## Put it on your phone
**iPhone:** open the link in Safari, tap Share, then **Add to Home Screen**. It appears as "Jackals" with the club crest and opens full screen like an app.
**Android:** open the link in Chrome, tap ⋮, then **Add to Home screen**.

## Home screen
The link opens on the club home screen, showing the crest, the next fixture and the last result.
- **Coach log in:** sign in once on each phone. After that the phone goes straight into the app.
- **Parents & players:** no sign-in needed. It opens a locked, view-only app, even on a phone that's signed in as a coach:
  - **Line-up:** the fixture details can't be changed; no Clear, Share or Manage squad; players can't be moved. **Broadcast** is available.
  - **Match:** view only (live score, clock and goals), no controls.
  - **Stats** and **Table:** everything can be viewed, and the stats image and player cards shared, but results can't be added, edited or deleted.
  - The ••• menu is hidden. The phone remembers the choice next time.
- **Back to the home screen:** coaches use **••• → Home screen**; parents tap the crest at the top.

## The four tabs

### Line-up
- **Next fixture:** opposition, date, **Home / Away** and **League / Cup**. Home games fill in kick-off 10:30, arrive 10:00 and West Warwickshire Sports Complex automatically. Away games ask for location, kick-off and arrival time. For any match, entering a kick-off fills in arrival 30 minutes earlier (unless you've typed your own).
- **Pitch:** drag players into position, or tap a sub to fill the next spot. Tap two players to swap them. Drag a player back to the bench to take them off.
- **Squad:** add or remove players and mark the **Captain** (tap the C again to remove it), **Goalkeeper** (green shirt), **Injured** 🩹 or **Away** ✈️. Unavailable players are left out of the line-up and listed on the team sheet. Renaming a player or changing a shirt number also updates past results.
- **Buttons under the fixture: Clear, Share, Broadcast**
  - **Clear** takes everyone off the pitch, ready to pick a new team. **••• → Undo last change** puts them back.
  - **Share** offers **Share image + details**, **Save image** or **Preview**. The team sheet image shows the fixture, line-up, subs and who's unavailable. **Share image + details** sends the picture with the match details (date, kick-off, arrival and location, each on its own line) as one WhatsApp message. On a laptop it saves the image and copies the details to paste as the caption.
  - **Broadcast** opens a full-screen TV-style line-up graphic:
    - **Upright** (phones): pitch and list, with **Replay** and **Back** buttons. Turn the phone sideways for the sideways view.
    - **Sideways** (tablets, TVs, laptops, phones turned round): red side band, a full green pitch in perspective with the keeper at the bottom, players revealed one by one (0.4s apart), and a side panel with crest, fixture, substitutes, unavailable players and live score. Buttons: Upright, Replay, Full screen and Share.

### Match
- **Clock:** Kick off, Pause, Half-time and Full time. The second half restarts at the half mark.
- **Half length:** set it in the ••• menu. A banner tells you when half-time and full time are due.
- **Goals:** Jackals goal (scorer, assist or **Penalty**, minute), Opposition goal, and **Undo last goal**.
- **Player of the match:** chosen at full time before the result is saved, then a **match summary image** is ready to share.
- **Subs:** rolling subs are made on the Line-up tab. If you want each sub logged with a minute, turn on **Track substitutions** in the ••• menu.
- **Live score bar:** during a game, a live score bar stays at the top of the other tabs.

### Stats
- **Season and filter:** choose the **season** (or All seasons). **League** and **Cup** switch on and off independently: both, either, or neither.
- **Team stats:** played, won, drawn, lost, goals for and against, goal difference, clean sheets, form and win rate.
- **Player stats:** appearances, starts, goals, assists, goal involvements (GI), player of the match and games as captain (Capt). Tap a player for their **player card** image.
- **Goalkeeper:** games in goal, clean sheets, goals conceded and record.
- **Results:** every match with scorers, assists and who played. You can **Share summary**, **Edit** or **Delete** each one.
- **Share image:** the whole season's stats as one picture.

### Table
- **Open league table** takes you to the league table, results and fixtures on the FA Full-Time website, kept up to date by the league.

## The ••• menu (top right)
What's in it depends on the tab you're on:
- **Line-up:** team size (7, 9 or 11-a-side) and formation, team settings (name, crest, home details, coaches), **undo last change**, share team sheet, broadcast view.
- **Match:** half length, track substitutions, discard match.
- **Stats:** add a past result, export results or player stats (CSV for Excel or Sheets), rename season, **close season**.
- **Every tab:** **Back up all data** and **Restore from a backup**. The app version is shown at the bottom.

## Seasons
At the end of the season, use **••• → Close season** on the Stats tab. Nothing is deleted. The season is kept with all its results and can be picked from the Season list at any time. Your squad and settings carry over into the new season.

## Where your data is saved
- **Shared database:** the app saves to the club's Firebase database, so every phone sees the same squad, live score and results within a second or two. It keeps working without signal and catches up when the phone is back online.
- **Who can change things:** anyone with the link can **view**. Coaches tap **Coach log in** (email and password, or Google) to make changes. The first time, choose **Create account** and tap the confirmation link Firebase emails you.
- **Coaches only:** if someone who isn't on the coaches list signs in, the app removes that account and opens the parents view. For extra safety, turn off new sign-ups in Firebase (**Authentication → Settings → User actions → Enable create (sign-up)**) once every coach has an account.
- **Coaches list:** the admin adds or removes coaches in **••• → Team settings**, can give each coach a name (✎) and choose the **Main coach**. The database's security rules (`firestore.rules`) enforce the same list.
- **Backups:** use **Back up all data** now and then, and always before closing a season.

## If an update breaks something
Every version from 1.3 onwards has its own link in [CHANGELOG.md](CHANGELOG.md). Open the previous version's link and carry on; your data on that phone is shared between versions. The main link can also be rolled back to any earlier version without losing history.

## Files
| File | What it is |
|---|---|
| `index.html` | The app (the version the main link opens) |
| `crest.png` | Club crest used inside the app |
| `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `manifest.webmanifest` | Home-screen icon and app settings |
| `versions/` | A working copy of each earlier version |
| `CHANGELOG.md` | Version history with links |
| `firestore.rules` | Security rules pasted into Firebase (who can read and write) |
| `fonts/` | Barlow fonts stored with the app (no Google Fonts), with their open licence |
| `RECOVERY.md` | How to get everything back if something goes wrong |
