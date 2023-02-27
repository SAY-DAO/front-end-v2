/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
const staticCacheName = 'SAY-v2.0.1-beta';
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
  '/images/say_donation.svg',
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
  '/images/icons/doneNeeds/child.svg',
  '/images/icons/doneNeeds/hand.svg',
  '/images/icons/doneNeeds/ngo.svg',
  '/images/icons/doneNeeds/package.svg',
  '/images/icons/doneNeeds/receipts/done.jpg',
  '/images/icons/doneNeeds/receipts/ngo_delivered.jpg',
];

// Limiting cache size
const limitCacheSize = async (name, size) => {
  const cache = await caches.open(name);
  const keyList = await cache.keys();
  if (keyList.length > size) {
    await cache.delete(keyList[0]);
    await limitCacheSize(name, size);
  }
};

// Install service worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(staticCacheName);
      await cache.addAll(urlsToCache);
    })()
  );
});

// activate event - deleting old caches
self.addEventListener('activate', (e) => {
  const cacheKeepList = [staticCacheName, dynamicCacheName];
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList
          .filter((key) => !cacheKeepList.includes(key))
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', (e) => {
  if (
    e.request.url.indexOf('/api/') === -1 &&
    e.request.url.startsWith('http')
  ) {
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
          await limitCacheSize(dynamicCacheName, 50);
          return response;
        } catch (err) {
          console.log('catch', err);
          // if (e.request.url.indexOf('.html') > -1) {
          // return caches.match('/offline.html');
          // }
        }
      })()
    );
  }
});
