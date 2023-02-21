/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
const staticCacheName = 'SAY-v2.0.0-beta';
const dynamicCacheName = 'SAY-dynamic-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/assets/locales/translations/fa.json',
  '/assets/locales/translations/en.json',
  '/images/Say_donation.png',
  '/images/register.svg',
  '/images/otp.svg',
  '/images/logo2.png',
  '/images/logo.png',
  '/images/intro.png',
  '/images/finalForm.svg',
  '/images/favicon.png',
  '/images/favicon.ico',
  '/images/cartWhite.svg',
  '/images/back.svg',
  '/images/back_orange.svg',
  '/images/back_gray.svg',
  '/images/icons/changePassword.svg',
  '/images/icons/email.svg',
  '/images/icons/exit.svg',
  '/images/icons/family.svg',
  '/images/icons/info.svg',
  '/images/icons/language.svg',
  '/images/icons/Money.svg',
  '/images/icons/settings.svg',
  '/images/icons/Task.svg',
  '/images/icons/un.svg',
  '/images/icons/upload.svg',
  '/images/icons/wallet.svg',
];

// Install service worker
self.addEventListener('install', (e) => {
  // console.log('service worker installed');
  e.waitUntil(
    (async () => {
      const cache = await caches.open(staticCacheName);
      console.log('caching shell assets');
      await cache.addAll(urlsToCache);
    })()
  );
});

// activate event - deleting old caches
self.addEventListener('activate', (e) => {
  // console.log('service worker has been activated');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', (e) => {
  // console.log('fetch event', e);
  e.respondWith(
    (async () => {
      try {
        const r = await caches.match(e.request);
        if (r) {
          return r;
        }
        const response = await fetch(e.request);
        const cache = await caches.open(dynamicCacheName);
        await cache.put(e.request.url, response.clone());
        return response;
      } catch {
        if (e.request.url.indexOf('.html') > -1) {
          return caches.match('/offline.html');
        }
      }
    })()
  );
});
