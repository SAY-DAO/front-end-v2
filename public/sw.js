// service-worker.js (fixed)

// Cache names
const STATIC_CACHE = 'SAY-DAPP-static-v2.3.1';
const RUNTIME_CACHE = 'SAY-DAPP-runtime-v2.3.1';

// Precache - adjust at build time
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  // '/images/fallback.png'  // uncomment if you use an image fallback and precache it
];

// Install
self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  self.skipWaiting();
  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)));
});

// Activate - cleanup old caches
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

// Main fetch handler - wrapped as an async IIFE so respondWith always gets a Promise<Response>
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Non-GET requests: let network handle; on failure return a clear Response
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

  // Always provide a Response object from the Promise we give respondWith
  event.respondWith(
    (async () => {
      try {
        // Navigation requests (SPA routes) => network-first, fallback to index/offline
        if (isNavigationRequest(request)) {
          try {
            const networkResp = await fetch(request);
            // Optionally cache updated index.html for offline fallback (non-blocking)
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
            // final fallback HTML
            return htmlOfflineResponse('Offline');
          }
        }

        // API / JSON requests -> prefer same-origin handling; always return JSON response on failure
        const sameOriginApi = isSameOriginAPI(url);
        const looksForJSON = acceptsJSON(request);

        if (sameOriginApi || (looksForJSON && url.origin === self.location.origin)) {
          try {
            const networkResp = await fetch(request);
            // optionally cache GET API responses:
            // if (request.method === 'GET' && networkResp && networkResp.ok) {
            //   const copy = networkResp.clone();
            //   caches.open(RUNTIME_CACHE).then(cache => cache.put(request, copy));
            // }
            return networkResp;
          } catch (apiErr) {
            console.warn('[SW] API fetch failed, trying cache:', request.url, apiErr);
            const cached = await caches.match(request);
            if (cached) return cached;
            // return a JSON error response (so callers expecting JSON don't get undefined)
            return jsonErrorResponse('Service unavailable (offline)');
          }
        }

        // Cross-origin JSON (CORS) or other cross-origin requests:
        // - We avoid caching cross-origin opaque responses.
        // - Let the network handle it and return a safe fallback on error.
        if (url.origin !== self.location.origin) {
          try {
            const crossResp = await fetch(request);
            return crossResp;
          } catch (crossErr) {
            console.warn('[SW] cross-origin fetch failed:', request.url, crossErr);
            // If it's an image, return a cached fallback if available
            if (request.destination === 'image') {
              const imgFallback = await caches.match('/images/fallback.png');
              if (imgFallback) return imgFallback;
            }
            // For fetches that likely expect JSON, give JSON; otherwise generic text fallback
            if (acceptsJSON(request)) return jsonErrorResponse('Cross-origin resource unavailable');
            return new Response('Cross-origin resource unavailable', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' },
            });
          }
        }

        // Static assets (same-origin): cache-first, then network, then fallback
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }

        try {
          const networkResp = await fetch(request);
          // Only cache same-origin, basic (non-opaque) ok responses
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
          // image fallback if available
          if (request.destination === 'image') {
            const imgFallback = await caches.match('/images/fallback.png');
            if (imgFallback) return imgFallback;
          }
          // else generic offline response
          return new Response('Offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
          });
        }
      } catch (err) {
        // Extremely defensive: ensure we never resolve to undefined
        console.error('[SW] Unexpected error in fetch handler:', err);
        return new Response('Service Worker error', {
          status: 500,
          headers: { 'Content-Type': 'text/plain' },
        });
      }
    })(),
  );
});
