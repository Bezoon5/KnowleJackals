# Match alerts: one-time setup

This turns on lock-screen notifications for parents (kick-off, goals, half-time, second half, full time). It takes about 15–20 minutes, once. You'll need a laptop and the Google account that owns the Firebase project.

## 1. Switch Firebase to the Blaze plan (needs a card) ✅ done
1. Open https://console.firebase.google.com and choose **knowlejackals**.
2. Bottom left, click **Upgrade** (next to "Spark") → choose **Blaze** → add a card.
3. When asked, set a **budget alert of £1**. At one team's size this should stay at £0: the free allowance covers millions of function runs and notifications a month.

## 2. Create the notification key ✅ done 27 Nov 2026
Key created and added to the app in v4.6. Only repeat this if the Firebase project is rebuilt.

1. Firebase → ⚙️ **Project settings** → **Cloud Messaging** tab.
2. Scroll to **Web configuration → Web Push certificates** → **Generate key pair**.
3. Copy the long **Key pair** text (starts with "B…") and send it to Claude. It's a public key, safe to share.

## 3. Find the database location ✅ done: europe-west2 (London)
Already set in `functions/.env`. Only repeat this if the Firebase project is rebuilt.

Firebase → **Firestore Database** → the **Data** tab shows the location near the top (or ⚙️ **Project settings → General → Default GCP resource location**). It looks like `europe-west2`, `eur3` or `nam5`. Send it to Claude so the alert code runs in the same place.

## 4. Install the alert code ✅ done 27 Nov 2026
Both functions (liveAlerts, fullTimeAlert) run on Node 22 in europe-west2, and a cleanup policy deletes old build images after 1 day. Cloud Shell is already signed in, so the `login` line isn't needed. To redeploy after changing the functions, do the steps below. The first deploy on a new project can fail with an "Eventarc Service Agent" permission error; wait 3 minutes and run it again.

Claude will confirm the region first. Then:
1. Open https://console.cloud.google.com/?project=knowlejackals, signed in with the same Google account.
2. Click the **Cloud Shell** button (a `>_` icon, top right). A terminal opens at the bottom. Click **Authorize** if asked.
3. Copy and paste these lines, one at a time, pressing Enter after each:
   ```
   git clone https://github.com/Bezoon5/KnowleJackals.git
   cd KnowleJackals/functions && npm install && cd ..
   npx firebase-tools@latest login --no-localhost
   ```
   The login line shows a link: open it, sign in with the same Google account, copy the code it gives you, paste it back into Cloud Shell and press Enter.
4. Then paste:
   ```
   npx firebase-tools@latest deploy --only functions,firestore:rules --project knowlejackals
   ```
   - If it asks to **enable APIs**, type `y`.
   - If it asks about an **artifact cleanup policy**, type `y` (or press Enter for 1 day).
   - It takes 2–4 minutes and ends with **Deploy complete!**
5. Copy anything red or any error and send it to Claude.

This also publishes the updated database security rules (the same rules as before, plus one that lets phones register for alerts).

## 5. Test it
1. On your phone, open the app (from the home screen on an iPhone) → **Match** tab → **Get match alerts** → **Turn on alerts** → **Allow**.
2. Lock your phone. On another phone or laptop signed in as a coach, tap **Kick off**, then log a goal.
3. Your locked phone should show "⚽ Kick-off" and "⚽ GOAL! …". Then tap **Discard** (••• menu) so the test isn't saved.

## Later updates
Updates to the app itself don't need this again. Only changes to the alert code (`functions/` folder) need step 4 repeated: in Cloud Shell, `cd KnowleJackals && git pull`, then the deploy line.
