// Guideline: https://web.dev/offline-cookbook/
const staticCacheName = 'SAY-v0.0.0';
const urlsToCache = [
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/static/js/vendors~main.chunk.js',
  '/static/js/main.482930e5.chunk.js',
  '/static/js/2.a637ec1e.chunk.js',
  '/favicon.ico',
  '/images/logo.png',
  '/images/back_orange.svg',
  '/images/intro.png',
  '/images/otp.svg',
  '/images/register.svvg',
  '/index.html',
  '/manifest.json',
  '/',
  // '/offline.html',
];

const self = this;

// install Service Worker and save cache to Application - Cache
self.addEventListener('install', (event) => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => cache.addAll(urlsToCache))
  );
});
// Serve files from the cache
self.addEventListener('fetch', (event) => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request);

        // TODO 4 - Add fetched files to the cache
      })
      .then((response) => {
        // TODO 5 - Respond with custom 404 page
        caches.open(staticCacheName).then((cache) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
      .catch((error) => {
        // TODO 6 - Respond with custom offline page
        console.log('offline error ', error);
      })
  );
});

// Delete outdated caches
self.addEventListener('activate', (event) => {
  console.log('Activating new service worker...');
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
      )
  );
});
