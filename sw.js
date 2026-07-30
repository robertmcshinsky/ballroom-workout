/* Ballroom Fit — Service Worker
   Provides offline support. Auto-detects its own base path, so it works
   whether the app lives at /ballroom-workout/ or a custom-domain root. */

const VERSION = 'ballroomfit-v1';
// The scope's directory, e.g. "/ballroom-workout/" or "/"
const BASE = self.registration.scope.replace(self.location.origin, '');

// App shell to pre-cache on install.
const SHELL = [
  BASE,
  BASE + 'index.html',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.11.0/dist/tabler-icons.min.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(SHELL).catch(() => {/* tolerate CDN miss */}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Focus or open the app when a reminder notification is tapped.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow(BASE);
    })
  );
});

// Network-first for the page (so updates appear), cache-first for everything else.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const isPage = req.mode === 'navigate';
  if (isPage) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match(BASE + 'index.html') || caches.match(BASE)))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(VERSION).then((c) => c.put(req, copy));
      return res;
    }).catch(() => cached))
  );
});
