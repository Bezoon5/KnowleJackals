# Knowle Jackals Matchday: recovery guide

Everything needed to rebuild the app if something goes wrong. Version at the time of writing: **4.4** (27 Nov 2026).

## What's where

| Thing | Where it lives |
|---|---|
| The app (code) | GitHub repo **Bezoon5/KnowleJackals**, served at https://bezoon5.github.io/KnowleJackals/ |
| Squad, fixtures, results, coaches | Firebase project **knowlejackals** (Firestore database), *not* in the code |
| Claude version | A separate artifact in the owner's Claude account, with its own separate copy of the data |

No player data is stored in the code or the GitHub history (removed on 25 Nov 2026 for data protection).

## 1. The app is broken after an update
Fastest fix: open an earlier version's link from `CHANGELOG.md`, e.g. https://bezoon5.github.io/KnowleJackals/versions/v3.5/. Same data, no install needed.

To put an older version back on the main link: copy `versions/vX.Y/index.html` over `index.html` in the repo and commit. GitHub Pages updates in a minute or two.

## 2. The GitHub repo is lost or damaged
The recovery zip contains `_recovery/KnowleJackals-git-history.bundle`, the full repo with every commit.

```
git clone KnowleJackals-git-history.bundle KnowleJackals
cd KnowleJackals
git remote set-url origin https://github.com/Bezoon5/KnowleJackals.git
git push -u origin main
```
Then in GitHub: **Settings → Pages → Deploy from a branch → main / (root)**.

Without git, the zip's folder is a ready-to-upload copy: upload every file (keep the folders) to a new repo and turn on Pages as above.

## 3. The data is lost or wrong
1. Open the app, sign in as a coach (admin).
2. **••• → Restore from a backup** and choose the newest backup `.json` file.

The zip includes `_recovery/data-backup-2026-11-27.json` (squad with shirt numbers, full opposition names, 11 results to 22 Nov 2026). It's older than your live data, so **make a fresh backup regularly** with **••• → Back up all data**, and always before closing a season. Backup files contain children's names: keep them private, never upload them to GitHub.

## 4. The Firebase project is lost (rebuild from scratch)
1. https://console.firebase.google.com → **Add project** (free Spark plan is enough).
2. **Build → Firestore Database → Create database** (production mode; any region, e.g. europe-west2 London).
3. **Firestore → Rules:** paste the contents of `firestore.rules` and **Publish**. The admin email is written in the rules (`beswick1985@yahoo.com`).
4. **Build → Authentication → Get started:** enable **Email/Password** and **Google**. Under **Settings → Authorised domains** make sure `bezoon5.github.io` is listed.
5. **Project settings → Your apps → Web app (</>)**: copy the `firebaseConfig` and replace `FB_CONFIG` near the top of the script in `index.html`. (This config is safe to be public; the rules do the protecting.)
6. Commit, then sign in as the admin. The app creates the coaches list automatically. Restore your latest backup (step 3).

## 5. Changing the admin
The admin email appears in two places and both must match:
- `firestore.rules` → `isOwner()` (then **Publish** in Firebase)
- `index.html` → `OWNER_EMAIL`

## Key settings in `index.html`
Search for these near the top of the script:
- `APP_VERSION`: version shown in the ••• menu
- `FB_CONFIG`: Firebase connection
- `OWNER_EMAIL`, `START_COACHES`, `COACH_UPDATE`: admin, starting coaches, main coach
- `REVEAL`: broadcast reveal speed (400 = 0.4 seconds per player)

## Developer test tools (in the zip only)
`_recovery/dev-tests/` has the Firebase stand-in and the regression test used during development (Python + Playwright). They use the original working folders, so the paths at the top need changing before use.
