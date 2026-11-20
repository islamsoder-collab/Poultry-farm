const CACHE = 'poultry-app-v1';
const CORE = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './fish.html', './broiler.html', './cow.html'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // ডেটা ও লগইনের সার্ভার কল ক্যাশ করা হবে না, Firestore নিজে অফলাইন ক্যাশ রাখে
  if (url.hostname.endsWith('googleapis.com') && !url.hostname.startsWith('fonts.')) return;
  if (url.hostname.includes('firestore') || url.hostname.includes('identitytoolkit') || url.hostname.includes('securetoken')) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((r) => r || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))
      )
  );
});
