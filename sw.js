// IAM Trainer service worker — build 0357a21cf8
const CACHE = 'iam-0357a21cf8';
const ASSETS = ['./', 'index.html', 'manifest.json', 'icon-180.png', 'icon-512.png', 'cube-imgs/q1.png', 'cube-imgs/q10.png', 'cube-imgs/q11.png', 'cube-imgs/q12.png', 'cube-imgs/q13.png', 'cube-imgs/q14.png', 'cube-imgs/q15.png', 'cube-imgs/q16.png', 'cube-imgs/q17.png', 'cube-imgs/q18.png', 'cube-imgs/q19.png', 'cube-imgs/q2.png', 'cube-imgs/q20.png', 'cube-imgs/q3.png', 'cube-imgs/q4.png', 'cube-imgs/q5.png', 'cube-imgs/q6.png', 'cube-imgs/q7.png', 'cube-imgs/q8.png', 'cube-imgs/q9.png', 'slash-imgs/q1.png', 'slash-imgs/q10.png', 'slash-imgs/q11.png', 'slash-imgs/q12.png', 'slash-imgs/q13.png', 'slash-imgs/q14.png', 'slash-imgs/q15.png', 'slash-imgs/q16.png', 'slash-imgs/q17.png', 'slash-imgs/q18.png', 'slash-imgs/q19.png', 'slash-imgs/q2.png', 'slash-imgs/q20.png', 'slash-imgs/q21.png', 'slash-imgs/q22.png', 'slash-imgs/q23.png', 'slash-imgs/q24.png', 'slash-imgs/q25.png', 'slash-imgs/q26.png', 'slash-imgs/q27.png', 'slash-imgs/q28.png', 'slash-imgs/q29.png', 'slash-imgs/q3.png', 'slash-imgs/q30.png', 'slash-imgs/q31.png', 'slash-imgs/q32.png', 'slash-imgs/q33.png', 'slash-imgs/q34.png', 'slash-imgs/q35.png', 'slash-imgs/q36.png', 'slash-imgs/q37.png', 'slash-imgs/q38.png', 'slash-imgs/q39.png', 'slash-imgs/q4.png', 'slash-imgs/q40.png', 'slash-imgs/q41.png', 'slash-imgs/q42.png', 'slash-imgs/q43.png', 'slash-imgs/q44.png', 'slash-imgs/q45.png', 'slash-imgs/q46.png', 'slash-imgs/q47.png', 'slash-imgs/q48.png', 'slash-imgs/q49.png', 'slash-imgs/q5.png', 'slash-imgs/q50.png', 'slash-imgs/q51.png', 'slash-imgs/q52.png', 'slash-imgs/q53.png', 'slash-imgs/q54.png', 'slash-imgs/q55.png', 'slash-imgs/q56.png', 'slash-imgs/q57.png', 'slash-imgs/q58.png', 'slash-imgs/q59.png', 'slash-imgs/q6.png', 'slash-imgs/q60.png', 'slash-imgs/q7.png', 'slash-imgs/q8.png', 'slash-imgs/q9.png', 'slash-imgs/s1.png', 'slash-imgs/s2.png', 'slash-imgs/s3.png', 'slash-imgs/s4.png', 'slash-imgs/s5.png', 'slash-imgs/s6.png'];
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
