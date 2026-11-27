/* Knowle Jackals match alerts: sends push notifications to parents' phones.
   Deployed with:  firebase deploy --only functions,firestore:rules   (see PUSH-SETUP.md) */
'use strict';
const { onDocumentWritten, onDocumentCreated } = require('firebase-functions/v2/firestore');
const { setGlobalOptions } = require('firebase-functions/v2');
const admin = require('firebase-admin');
const { liveMessages, fullTimeMessage } = require('./notify');

// Must match the Firestore database location (see PUSH-SETUP.md step 4)
const REGION = process.env.DB_REGION || 'europe-west2';
setGlobalOptions({ region: REGION, maxInstances: 2, memory: '256MiB' });

admin.initializeApp();
const db = admin.firestore();
const APP_URL = 'https://bezoon5.github.io/KnowleJackals/#match';

async function send(msg) {
  const snap = await db.collection('subs').get();
  const subs = snap.docs.filter(d => { const p = d.get('prefs') || {}; return p[msg.pref] !== false; });
  const tokens = subs.map(d => d.get('token')).filter(Boolean);
  for (let i = 0; i < tokens.length; i += 500) {
    const batch = tokens.slice(i, i + 500);
    const res = await admin.messaging().sendEachForMulticast({
      tokens: batch,
      data: { title: msg.title, body: msg.body, tag: msg.tag, url: APP_URL },
      webpush: { headers: { Urgency: 'high', TTL: '3600' } }
    });
    // tidy up phones that have uninstalled or turned alerts off
    const dead = [];
    res.responses.forEach((r, j) => {
      const code = r.error && r.error.code;
      if (code === 'messaging/registration-token-not-registered' || code === 'messaging/invalid-registration-token' || code === 'messaging/invalid-argument') dead.push(batch[j]);
    });
    await Promise.all(dead.map(t => db.collection('subs').doc(t).delete().catch(() => {})));
    console.log(`${msg.tag}: sent ${res.successCount}, failed ${res.failureCount}, removed ${dead.length}`);
  }
}

// kick-off, goals, half-time, second half: changes to the live match in club/main
exports.liveAlerts = onDocumentWritten('club/main', async event => {
  const before = event.data.before.exists ? event.data.before.data() : null;
  const after = event.data.after.exists ? event.data.after.data() : null;
  for (const msg of liveMessages(before, after)) await send(msg);
});

// full time: a finished match is saved
exports.fullTimeAlert = onDocumentCreated('matches/{id}', async event => {
  const club = (await db.doc('club/main').get()).data();
  const msg = fullTimeMessage(event.data.data(), club, Date.now());
  if (msg) await send(msg);
});
