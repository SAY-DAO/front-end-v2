const staticCacheName = 'SAY-DAPP-v2.0.0';
const urlsToCache = [
  'static/js/439.773fe221.chunk.js',
  'images/back_gray.svg',
  'images/back_orange.svg',
  'images/logo.png',
  'images/icons/changePassword.svg',
  'images/icons/email.svg',
  'images/icons/exit.svg',
  'images/icons/info.svg',
  'images/icons/language.svg',
  'images/icons/Money.svg',
  'images/icons/settings.svg',
  'images/icons/Task.svg',
  'images/icons/un.svg',
  'images/icons/upload.svg',
  'images/icons/wallet.svg',
  'images/icons/family.svg',
  'images/icons/doneNeeds/child.svg',
  'images/icons/doneNeeds/hand.svg',
  'images/icons/doneNeeds/ngo.svg',
  'images/icons/doneNeeds/package.svg',
  'images/icons/doneNeeds/receipts/ngo_delivered.jpg',
  'images/icons/doneNeeds/receipts/done.jpg',
  'images/cartWhite.svg',
  'images/favicon.png',
  'images/finalForm.svg',
  'images/say_donation.svg',
  'images/back.svg',
  'images/intro.png',
  'images/otp.svg',
  'images/child/background.png',
  'images/child/searchChild.png',
  'images/register.svg',
  'assets/locales/translations/fa.json',
  'assets/locales/translations/en.json',
  'offline.html',
];

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
  console.log('Service Worker: Fetching ', event.request.url);
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
      .catch((error) => {
        console.log(error);
        // TODO 6 - Respond with custom offline page
      }),
  );
});
