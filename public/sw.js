const staticCacheName = 'SAY-DAPP-v2.1.17';
const urlsToCache = [];

const self = this;

// install Service Worker and save cache to Application - Cache
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing service worker');
  self.skipWaiting(); // to take over old service worker without waiting for session to be finishes e,g: opening new tab

  event.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        console.log('Service Worker: Caching');
        cache.addAll(urlsToCache);
      })
      .catch((e) => console.log({ e })),
  );
});

// activate
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating new service worker...');
  const cacheAllowlist = [staticCacheName];

  // remove unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old service worker...');
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
});

// fetch
self.addEventListener('fetch', (event) => {
  // console.log('Service Worker: Fetching ', event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        // console.log('Network request for ', event.request.url);
        return fetch(event.request);

        // TODO 4 - Add fetched files to the cache
      })
      .catch((error) => {
        console.log(error);
        // TODO 6 - Respond with custom offline page
      }),
  );
});
