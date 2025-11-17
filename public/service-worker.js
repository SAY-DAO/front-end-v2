/* eslint-disable no-restricted-globals */
/* ================================================================
   3) service-worker.js (fixed robust SW)
   Versioned cache names are important: bump them on each deploy to ensure
   clients fetch the new worker and assets.

   IMPORTANT: put this file at /service-worker.js (or adjust registration scope)
   ================================================================ */

// service-worker.js
const STATIC_CACHE = 'SAY-DAPP-static-v2.3.5'; // bump this version when you deploy
const RUNTIME_CACHE = 'SAY-DAPP-runtime-v2.3.5';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  // '/images/fallback.png',
];

self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch((e) => {
        console.error('[SW] Precache failed', e);
      }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
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
      .then(() => self.clients.claim()),
  );
});

// Message listener to support SKIP_WAITING
self.addEventListener('message', (evt) => {
  if (!evt.data) return;
  if (evt.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Helpers
const isNavigationRequest = (req) => req.mode === 'navigate';
const isGET = (req) => req.method === 'GET';
const isSameOriginAPI = (url) =>
  url.origin === self.location.origin && url.pathname.startsWith('/api');
const acceptsJSON = (req) => {
  const header = req.headers.get('accept') || '';
  return header.includes('application/json');
};

const jsonErrorResponse = (message = 'Offline or unavailable') =>
  new Response(JSON.stringify({ error: message }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });

const htmlOfflineResponse = (message = 'Offline') =>
  new Response(`<html><body><h1>${message}</h1></body></html>`, {
    status: 503,
    headers: { 'Content-Type': 'text/html' },
  });

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Let the browser perform the fetch and CORS handling itself.
  if (url.origin !== self.location.origin) {
    // Do NOT call event.respondWith(...) for cross-origin requests.
    // This makes CORS failures surface to the browser instead of our SW returning a fallback.
    return;
  }
  // Non-GETs: let network handle; respond with clear fallback on error
  if (!isGET(request)) {
    event.respondWith(
      fetch(request).catch((err) => {
        console.warn('[SW] non-GET fetch failed:', request.method, request.url, err);
        return new Response('Network request failed', {
          status: 504,
          statusText: 'Gateway Timeout',
          headers: { 'Content-Type': 'text/plain' },
        });
      }),
    );
    return;
  }

  event.respondWith(
    (async () => {
      try {
        // Navigation: network-first, fall back to index/offline
        if (isNavigationRequest(request)) {
          try {
            const networkResp = await fetch(request);
            if (networkResp && networkResp.ok) {
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put('/index.html', networkResp.clone()).catch((e) => {
                  console.warn('[SW] cache.put failed for index.html', e);
                });
              });
            }
            return networkResp;
          } catch (navErr) {
            console.warn('[SW] Navigation fetch failed, trying cached fallbacks:', navErr);
            const cachedIndex = await caches.match('/index.html');
            if (cachedIndex) return cachedIndex;
            const cachedOffline = await caches.match('/offline.html');
            if (cachedOffline) return cachedOffline;
            return htmlOfflineResponse('Offline');
          }
        }

        // API/JSON: only handle same-origin API or same-origin JSON (do NOT intercept cross-origin JSON)
        const sameOriginApi = isSameOriginAPI(url);
        const looksForJSON = acceptsJSON(request);

        if (sameOriginApi || (looksForJSON && url.origin === self.location.origin)) {
          try {
            const networkResp = await fetch(request);
            return networkResp;
          } catch (apiErr) {
            console.warn('[SW] API fetch failed, trying cache:', request.url, apiErr);
            const cached = await caches.match(request);
            if (cached) return cached;
            return jsonErrorResponse('Service unavailable (offline)');
          }
        }

        // Avoid intercepting cross-origin requests (let network handle) but provide safe fallback if network fails
        if (url.origin !== self.location.origin) {
          try {
            const crossResp = await fetch(request);
            return crossResp;
          } catch (crossErr) {
            console.warn('[SW] cross-origin fetch failed:', request.url, crossErr);
            if (request.destination === 'image') {
              const imgFallback = await caches.match('/images/fallback.png');
              if (imgFallback) return imgFallback;
            }
            if (acceptsJSON(request)) return jsonErrorResponse('Cross-origin resource unavailable');
            return new Response('Cross-origin resource unavailable', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' },
            });
          }
        }

        // Static assets (same-origin): cache-first then network then fallback
        const cached = await caches.match(request);
        if (cached) return cached;

        try {
          const networkResp = await fetch(request);
          if (networkResp && networkResp.ok && networkResp.type === 'basic') {
            const copy = networkResp.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, copy).catch((e) => {
                console.warn('[SW] cache.put failed', request.url, e);
              });
            });
          }
          return networkResp;
        } catch (staticErr) {
          console.warn('[SW] static fetch failed:', request.url, staticErr);
          if (request.destination === 'image') {
            const imgFallback = await caches.match('/images/fallback.png');
            if (imgFallback) return imgFallback;
          }
          return new Response('Offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
          });
        }
      } catch (err) {
        console.error('[SW] Unexpected error in fetch handler:', err);
        return new Response('Service Worker error', {
          status: 500,
          headers: { 'Content-Type': 'text/plain' },
        });
      }
    })(),
  );
});

/* End of file */
