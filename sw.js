// IAM Trainer service worker — build d1c2bcf6f1
const CACHE = 'iam-d1c2bcf6f1';
const ASSETS = ['./', 'index.html', 'manifest.json', 'icon-180.png', 'icon-512.png', 'cube-imgs/q1.png', 'cube-imgs/q10.png', 'cube-imgs/q11.png', 'cube-imgs/q12.png', 'cube-imgs/q13.png', 'cube-imgs/q14.png', 'cube-imgs/q15.png', 'cube-imgs/q16.png', 'cube-imgs/q17.png', 'cube-imgs/q18.png', 'cube-imgs/q19.png', 'cube-imgs/q2.png', 'cube-imgs/q20.png', 'cube-imgs/q3.png', 'cube-imgs/q4.png', 'cube-imgs/q5.png', 'cube-imgs/q6.png', 'cube-imgs/q7.png', 'cube-imgs/q8.png', 'cube-imgs/q9.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// network-first with cache:'no-store' — GitHub Pages sends max-age=600, so a
// plain fetch could serve a stale HTTP-cached page for up to 10 minutes after
// an update; no-store forces a real network hit. Offline falls back to cache.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() =>
      caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
