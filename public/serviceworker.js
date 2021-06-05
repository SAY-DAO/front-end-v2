/* eslint-disable no-undef */
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
  '/index.html',
  '/manifest.json',
  '/',
  '/offline.html',
];

const self = this;

// install Service Worker and save cache to Application - Cache
self.addEventListener('install', (event) => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve files from the cache
self.addEventListener('fetch', (event) => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    // Check the cache for the requested resource
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        // If fails, we send the request to the network.
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then((response) =>
          // TODO 5 - Respond with custom 404 page
          caches.open(staticCacheName).then((cache) => {
            cache.put(event.request.url, response.clone());
            return response;
          })
        );
      })
      .catch((error) => {
        // Respond with custom offline page
        console.log('offline error ', error);
        return caches.match('offline.html');
      })
  );
});

// Delete outdated caches
self.addEventListener('activate', (event) => {
  console.log('Activating new service worker...');

  const cacheAllowlist = [staticCacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
