/* Decides which match alerts to send. Pure functions so they can be tested without Firebase.
   pref 'ko'    = kick-off, half-time, second half, full time
   pref 'goals' = goals for and against */
'use strict';

const score = events => (events || []).reduce((s, e) => {
  if (e.t === 'for') s.f++; else if (e.t === 'against') s.a++;
  return s;
}, { f: 0, a: 0 });

const nameOf = (club, id) => {
  if (!id) return '';
  if (id === 'og') return 'Own goal';
  const p = ((club && club.players) || []).find(x => x.id === id);
  return p ? p.name : '';
};

const teams = club => ({
  team: (club && club.team) || 'Knowle Jackals',
  short: (club && club.short) || 'Knowle',
  opp: ((club && club.fix && club.fix.opp) || '').trim() || 'the opposition'
});

/* alerts from a change to club/main (the live match lives in .live) */
function liveMessages(before, after) {
  const B = before && before.live, A = after && after.live, out = [];
  if (!A) return out;
  const { team, short, opp } = teams(after);
  const line = ev => { const s = score(ev); return `${short} ${s.f}–${s.a} ${opp}`; };

  if (!B) {
    out.push({ pref: 'ko', tag: 'kj-ko', title: '⚽ Kick-off', body: `${team} v ${opp} is under way` });
    return out;
  }
  // new goals (each event has an id)
  const seen = new Set((B.events || []).map(e => e.id));
  (A.events || []).forEach((e, i) => {
    if (seen.has(e.id)) return;
    const upTo = A.events.slice(0, i + 1), min = e.min != null ? ` ${e.min}'` : '';
    if (e.t === 'for') {
      const who = nameOf(after, e.scorer) || 'Goal', ast = nameOf(after, e.assist);
      out.push({ pref: 'goals', tag: 'kj-goal-' + e.id, title: `⚽ GOAL! ${line(upTo)}`,
        body: `${who}${min}${e.pen ? ' (pen)' : ''}${ast && !e.pen ? ` · assist ${ast}` : ''}` });
    } else if (e.t === 'against') {
      out.push({ pref: 'goals', tag: 'kj-goal-' + e.id, title: `${opp} score`, body: `${line(upTo)}${min}` });
    }
  });
  // half-time and second half
  const atHT = L => L && L.half === 2 && !L.running && L.htAt === L.acc;
  if (!atHT(B) && atHT(A) && B.half !== 2) out.push({ pref: 'ko', tag: 'kj-ht', title: '⏸ Half-time', body: line(A.events) });
  if (atHT(B) && A.half === 2 && A.running) out.push({ pref: 'ko', tag: 'kj-2h', title: '▶️ Second half under way', body: line(A.events) });
  return out;
}

/* alert when a finished match is saved (manual results added afterwards are ignored) */
function fullTimeMessage(m, club, now) {
  if (!m || m.manual) return null;
  if (m.finishedAt != null && now && now - m.finishedAt > 3 * 3600 * 1000) return null;
  const short = (club && club.short) || 'Knowle', opp = (m.opp || '').trim() || 'the opposition';
  const tally = {};
  (m.events || []).forEach(e => {
    if (e.t !== 'for') return;
    const n = e.scorer ? (e.scorer.name || (e.scorer === 'og' ? 'Own goal' : '')) : '';
    if (n) tally[n] = (tally[n] || 0) + 1;
  });
  const scorers = Object.entries(tally).map(([n, c]) => c > 1 ? `${n} ${c}` : n).join(', ');
  const potm = m.potm && m.potm.name;
  return { pref: 'ko', tag: 'kj-ft', title: `🏁 Full time: ${short} ${m.gf}–${m.ga} ${opp}`,
    body: [scorers && `Scorers: ${scorers}`, potm && `⭐ Player of the match: ${potm}`].filter(Boolean).join(' · ') || 'Final score' };
}

module.exports = { liveMessages, fullTimeMessage, score };
