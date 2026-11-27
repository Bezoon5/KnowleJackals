/* Knowle Jackals service worker
   - offline: the app opens with no signal (latest copy is kept on the phone)
   - match alerts: shows push notifications sent by the Firebase function */
const CACHE = 'kj-v1';
const SHELL = ['./', 'crest.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'manifest.webmanifest',
  'fonts/Barlow-Regular.woff', 'fonts/Barlow-SemiBold.woff', 'fonts/BarlowCondensed-SemiBold.woff',
  'fonts/BarlowCondensed-ExtraBold.woff', 'fonts/BarlowCondensed-ExtraBoldItalic.woff'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

const timeout = (p, ms) => Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error('slow')), ms))]);

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  // the update check always goes to the network
  if (url.searchParams.has('kjcheck')) return;
  // the app page: newest from the network, the saved copy if there's no (or very slow) signal
  if (req.mode === 'navigate' && url.origin === location.origin) {
    e.respondWith(timeout(fetch(req), 4000).then(res => {
      if (res.ok && !url.pathname.includes('/versions/')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./', copy)); }
      return res;
    }).catch(() => caches.match(url.pathname.includes('/versions/') ? req : './', { ignoreSearch: true }).then(r => r || caches.match('./'))));
    return;
  }
  // Firebase's code (fixed version numbers): keep a copy so the app can start offline
  if (url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/')) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }
  // crest, icons, fonts: saved copy straight away, refreshed in the background
  if (url.origin === location.origin && /\.(png|woff2?|webmanifest)$/.test(url.pathname)) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; }).catch(() => hit);
      return hit || net;
    }));
  }
  // everything else (the shared database etc.) goes straight through
});

/* ---------- match alerts ---------- */
self.addEventListener('push', e => {
  let p = {};
  try { p = e.data ? e.data.json() : {}; } catch (err) { p = { data: { body: e.data && e.data.text() } }; }
  const d = p.data || p.notification || p;
  e.waitUntil(self.registration.showNotification(d.title || 'Knowle Jackals', {
    body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: d.tag || 'kj', renotify: true,
    data: { url: d.url || './#match' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = new URL((e.notification.data && e.notification.data.url) || './#match', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if (c.url.startsWith(self.registration.scope)) { c.navigate(target).catch(() => {}); return c.focus(); }
    return self.clients.openWindow(target);
  }));
});
