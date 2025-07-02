const CACHE_NAME = 'farid-pwa-v1';
const urlsToCache = [
  'index.html',
  'about.html',
  'farid.js',
  'farid.css',
  'manifest.json',
  'pwa-install.js',
  'sw.js',
  'صور/ea38686d-d848-4164-8faa-408ed067c94c.jpeg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
}); 