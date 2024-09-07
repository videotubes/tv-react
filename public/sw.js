const CACHE_NAME = 'tvideos-pwa-cache-v1';
const toCache = [
  '/',
  '/manifest.json',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(toCache)
    })
    .then(function () {
      return self.skipWaiting();
    })
  )
})

self.addEventListener('fetch', function (event) {
  if (event.request.url.startsWith('/api/')) {
    return;
  }
  else {
    return new Response('Offline content not available.', { status: 404, statusText: 'Not Found' });
  }
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
    .then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Delete old cache', key)
          return caches.delete(key)
        }
      }))
    })
    .then(() => self.clients.claim())
  )
})
