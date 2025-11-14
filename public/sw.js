// service-worker.js

const STATIC_CACHE = 'SAY-DAPP-static-v2.3.1';
const RUNTIME_CACHE = 'SAY-DAPP-runtime-v2.3.1';

// list critical files your app needs to boot (adjust at build time)
const PRECACHE_URLS = [
  '/', // index.html (your build should ensure index.html is available)
  '/index.html',
  '/offline.html', // simple offline page
  // add other static assets that are safe to precache, e.g. '/css/main.css', '/images/logo.png'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  self.skipWaiting(); // activate new SW immediately

  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)));
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  // remove old caches
  const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (!currentCaches.includes(key)) {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            }
            return null;
          }),
        ),
      )
      .then(() => self.clients.claim()), // take control of clients immediately
  );
});

// Utility helpers
const isNavigationRequest = (req) => req.mode === 'navigate';
const isGET = (req) => req.method === 'GET';
const isSameOriginAPI = (url) =>
  url.origin === self.location.origin && url.pathname.startsWith('/api');
const acceptsJSON = (req) => {
  const header = req.headers.get('accept') || '';
  return header.includes('application/json');
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Do not handle non-GET requests inside the cache layer; let them go to network
  if (!isGET(request)) {
    return event.respondWith(fetch(request).catch(() => new Response(null, { status: 504 })));
  }

  // 1) Navigation requests (SPA routes) -> network-first, fallback to precached index/offline
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((networkResp) => {
          // optionally update index cache for offline fallback
          caches.open(STATIC_CACHE).then((cache) => {
            // clone and cache if it's an OK response
            if (networkResp && networkResp.ok) cache.put('/index.html', networkResp.clone());
          });
          return networkResp;
        })
        .catch(() =>
          // offline fallback: index.html if present, otherwise offline.html
          caches.match('/index.html').then((r) => r || caches.match('/offline.html')),
        ),
    );
    return;
  }

  // 2) API / JSON requests (same-origin or Accept: application/json) -> network-first, fallback to cache
  if (isSameOriginAPI(url) || acceptsJSON(request)) {
    event.respondWith(
      fetch(request)
        .then((networkResp) => {
          // don't cache responses for API by default, but you could cache GET API responses selectively:
          // if (networkResp && networkResp.ok) { caches.open(RUNTIME_CACHE).then(cache => cache.put(request, networkResp.clone())); }
          return networkResp;
        })
        .catch(() => caches.match(request)), // return cached API response if any
    );
    return;
  }

  // 3) Static assets (images, CSS, JS) -> cache-first, then network and cache new responses
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request)
        .then((networkResp) => {
          // only cache same-origin, basic responses (avoid opaque cross-origin)
          if (networkResp && networkResp.ok && networkResp.type === 'basic') {
            const copy = networkResp.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return networkResp;
        })
        .catch(() => {
          // optional: fallback for images to a placeholder if you cached one
          if (request.destination === 'image') {
            return caches.match('/images/fallback.png'); // ensure you precached this if used
          }
          // otherwise nothing else to do
          return new Response(null, { status: 503, statusText: 'Offline' });
        });
    }),
  );
});
