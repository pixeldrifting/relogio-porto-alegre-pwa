const CACHE = 'relogio-poa-v1';
const FILES = ['/', '/index.html', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  // Try network first, fallback to cache
  evt.respondWith(
    fetch(evt.request).catch(()=>caches.match(evt.request))
  );
});
